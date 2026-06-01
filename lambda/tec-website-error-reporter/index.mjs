import { SNSClient, PublishCommand } from '@aws-sdk/client-sns';

const sns = new SNSClient({ region: 'us-east-1' });

export const handler = async (event) => {
  // Handle CORS preflight
  if (event.requestContext?.http?.method === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': 'https://dev.trenteducation.co.uk',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: '',
    };
  }

  try {
    const body = JSON.parse(event.body || '{}');

    const message = [
      `🚨 TEC Website — JavaScript Error`,
      ``,
      `Type:      ${body.type || 'unknown'}`,
      `Message:   ${body.message || 'No message'}`,
      `Page:      ${body.url || 'unknown'}`,
      `Time:      ${body.timestamp || new Date().toISOString()}`,
      `Browser:   ${body.userAgent || 'unknown'}`,
      ``,
      `Stack Trace:`,
      `────────────────────────────────────────`,
      body.stack || 'No stack trace available',
      `────────────────────────────────────────`,
    ].join('\n');

    await sns.send(new PublishCommand({
      TopicArn: process.env.SNS_TOPIC_ARN,
      Subject: `🚨 TEC Error: ${(body.message || 'Unknown error').slice(0, 80)}`,
      Message: message,
    }));

    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': 'https://dev.trenteducation.co.uk' },
      body: JSON.stringify({ ok: true }),
    };

  } catch (err) {
    console.error('Error reporter failed:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ ok: false }),
    };
  }
};
