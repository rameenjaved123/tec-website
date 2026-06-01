import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

const ses = new SESClient({ region: "us-east-1" });

export const handler = async (event) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };

  if (event.requestContext?.http?.method === "OPTIONS") {
    return { statusCode: 200, headers, body: "" };
  }

  try {
    const { to, from, fromName, replyTo, subject, html, text } = JSON.parse(event.body);

    if (!to || !subject || (!html && !text)) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "Missing required fields: to, subject, html/text" }),
      };
    }

    const command = new SendEmailCommand({
      Destination: { ToAddresses: Array.isArray(to) ? to : [to] },
      Message: {
        Subject: { Data: subject, Charset: "UTF-8" },
        Body: html
          ? { Html: { Data: html, Charset: "UTF-8" } }
          : { Text: { Data: text, Charset: "UTF-8" } },
      },
      Source: `${fromName || "Trent Education Centre"} <${from || "noreply@trenteducation.co.uk"}>`,
      ...(replyTo && { ReplyToAddresses: [replyTo] }),
    });

    await ses.send(command);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true }),
    };
  } catch (err) {
    console.error("SES error:", err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
