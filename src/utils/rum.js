import { AwsRum } from 'aws-rum-web';

/**
 * CloudWatch RUM — Real User Monitoring
 * Tracks page views, device types, performance, and JS errors.
 * Monitor: tec-website  |  Region: us-east-1
 */
try {
  const config = {
    sessionSampleRate: 1,
    identityPoolId: 'us-east-1:2752baff-2a47-408c-bf26-4d303532a5c5',
    endpoint: 'https://dataplane.rum.us-east-1.amazonaws.com',
    telemetries: ['performance', 'errors', 'http'],
    allowCookies: true,
    enableXRay: false,
    signing: true,
  };

  const APPLICATION_ID      = '2188d62a-dc82-4a16-90a5-e9af6d50c7a6';
  const APPLICATION_VERSION = '1.0.0';
  const APPLICATION_REGION  = 'us-east-1';

  new AwsRum(APPLICATION_ID, APPLICATION_VERSION, APPLICATION_REGION, config);
} catch (error) {
  // Silently ignore RUM initialisation errors — never break the site
}
