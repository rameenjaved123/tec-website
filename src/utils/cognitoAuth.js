import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
  CognitoUserAttribute,
} from 'amazon-cognito-identity-js';

const POOL = new CognitoUserPool({
  UserPoolId: 'eu-west-2_sbCIAMB5c',
  ClientId:   '7ksedbont2d0annicgrp3jeua5',
});

// ── Get current session (returns null if not logged in) ───────────────────────
export function getCurrentSession() {
  return new Promise((resolve) => {
    const user = POOL.getCurrentUser();
    if (!user) return resolve(null);
    user.getSession((err, session) => {
      if (err || !session?.isValid()) return resolve(null);
      const payload = session.getIdToken().decodePayload();
      resolve({
        cognitoUser: user,
        email:  payload.email  || '',
        name:   payload.name   || payload.email || '',
        groups: payload['cognito:groups'] || [],
      });
    });
  });
}

// ── Sign in ───────────────────────────────────────────────────────────────────
export function signIn(email, password) {
  return new Promise((resolve, reject) => {
    const cognitoUser = new CognitoUser({ Username: email.trim(), Pool: POOL });
    const authDetails = new AuthenticationDetails({ Username: email.trim(), Password: password });

    cognitoUser.authenticateUser(authDetails, {
      onSuccess(session) {
        const payload = session.getIdToken().decodePayload();
        resolve({
          status: 'success',
          cognitoUser,
          email:  payload.email  || '',
          name:   payload.name   || payload.email || '',
          groups: payload['cognito:groups'] || [],
        });
      },
      onFailure(err) {
        reject(err);
      },
      newPasswordRequired(userAttributes) {
        // First login with a temp password set by admin — must set permanent password
        delete userAttributes.email_verified;
        delete userAttributes.email;
        resolve({ status: 'new-password', cognitoUser, userAttributes });
      },
    });
  });
}

// ── Complete new-password challenge (first-time admin-created users) ──────────
export function completeNewPassword(cognitoUser, newPassword, userAttributes) {
  return new Promise((resolve, reject) => {
    cognitoUser.completeNewPasswordChallenge(newPassword, userAttributes, {
      onSuccess(session) {
        const payload = session.getIdToken().decodePayload();
        resolve({
          email:  payload.email  || '',
          name:   payload.name   || payload.email || '',
          groups: payload['cognito:groups'] || [],
        });
      },
      onFailure(err) { reject(err); },
    });
  });
}

// ── Sign up ───────────────────────────────────────────────────────────────────
export function signUp(name, email, password) {
  return new Promise((resolve, reject) => {
    const attrs = [
      new CognitoUserAttribute({ Name: 'name',  Value: name.trim() }),
      new CognitoUserAttribute({ Name: 'email', Value: email.trim() }),
    ];
    POOL.signUp(email.trim(), password, attrs, null, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
}

// ── Verify email with OTP code ────────────────────────────────────────────────
export function verifyEmail(email, code) {
  return new Promise((resolve, reject) => {
    const user = new CognitoUser({ Username: email.trim(), Pool: POOL });
    user.confirmRegistration(code.trim(), true, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
}

// ── Resend verification code ──────────────────────────────────────────────────
export function resendCode(email) {
  return new Promise((resolve, reject) => {
    const user = new CognitoUser({ Username: email.trim(), Pool: POOL });
    user.resendConfirmationCode((err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
}

// ── Get current ID token (JWT string) — for API Authorization header ─────────
export function getIdToken() {
  return new Promise((resolve) => {
    const user = POOL.getCurrentUser();
    if (!user) return resolve(null);
    user.getSession((err, session) => {
      if (err || !session?.isValid()) return resolve(null);
      resolve(session.getIdToken().getJwtToken());
    });
  });
}

// ── Sign out ──────────────────────────────────────────────────────────────────
export function signOut() {
  const user = POOL.getCurrentUser();
  if (user) user.signOut();
}
