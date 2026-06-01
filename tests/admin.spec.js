import { test, expect } from '@playwright/test';

// For login tests: set ADMIN_EMAIL and ADMIN_PASSWORD in your environment
// or in GitHub Actions secrets. Tests that need a real login are skipped
// if credentials are not provided.
const ADMIN_EMAIL    = process.env.ADMIN_EMAIL    || '';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || '';
const canLogin       = ADMIN_EMAIL && ADMIN_PASSWORD;

// Helper: fills email + password and clicks Sign In
async function loginAs(page, email, password) {
  await page.goto('/admin');
  await page.locator('input[type="email"]').fill(email);
  await page.locator('input[type="password"]').fill(password);
  await page.locator('.adm-login-btn').click();
}

test.describe('Admin Page (/admin)', () => {

  test('ADM-01: Login screen shown at /admin', async ({ page }) => {
    await page.goto('/admin');
    await expect(page.locator('.adm-login-wrap')).toBeVisible();
  });

  test('ADM-02: No navbar on admin page', async ({ page }) => {
    await page.goto('/admin');
    await expect(page.locator('.navbar')).not.toBeVisible();
  });

  test('ADM-03: No footer on admin page', async ({ page }) => {
    await page.goto('/admin');
    await expect(page.locator('footer, .footer')).not.toBeVisible();
  });

  test('ADM-04: Wrong password shows error', async ({ page }) => {
    await page.goto('/admin');
    await page.locator('input[type="email"]').fill('wrong@example.com');
    await page.locator('input[type="password"]').fill('wrongpassword');
    await page.locator('.adm-login-btn').click();
    await expect(page.locator('.adm-login-error')).toBeVisible({ timeout: 10000 });
  });

  test('ADM-05: Login form has email and password fields', async ({ page }) => {
    await page.goto('/admin');
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
    await expect(page.locator('.adm-login-btn')).toBeVisible();
  });

  test('ADM-06: Correct credentials log in and show sidebar', async ({ page }) => {
    test.skip(!canLogin, 'Set ADMIN_EMAIL and ADMIN_PASSWORD env vars to run this test');
    await loginAs(page, ADMIN_EMAIL, ADMIN_PASSWORD);
    await expect(page.locator('.adm-sidebar')).toBeVisible({ timeout: 15000 });
  });

  test('ADM-07: Admin scroll — main content has overflow-y auto', async ({ page }) => {
    test.skip(!canLogin, 'Set ADMIN_EMAIL and ADMIN_PASSWORD env vars to run this test');
    await loginAs(page, ADMIN_EMAIL, ADMIN_PASSWORD);
    await expect(page.locator('.adm-sidebar')).toBeVisible({ timeout: 15000 });
    const overflow = await page.locator('.adm-main').evaluate(el => window.getComputedStyle(el).overflowY);
    expect(overflow).toBe('auto');
  });

  test('ADM-08: Stat cards visible after login', async ({ page }) => {
    test.skip(!canLogin, 'Set ADMIN_EMAIL and ADMIN_PASSWORD env vars to run this test');
    await loginAs(page, ADMIN_EMAIL, ADMIN_PASSWORD);
    await expect(page.locator('.adm-stats')).toBeVisible({ timeout: 15000 });
  });

  test('ADM-09: Logout button visible after login', async ({ page }) => {
    test.skip(!canLogin, 'Set ADMIN_EMAIL and ADMIN_PASSWORD env vars to run this test');
    await loginAs(page, ADMIN_EMAIL, ADMIN_PASSWORD);
    await expect(page.locator('.adm-logout')).toBeVisible({ timeout: 15000 });
  });

});
