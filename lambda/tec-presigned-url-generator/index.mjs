import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3 = new S3Client({ region: "us-east-1" });

export const handler = async (event) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };

  if (event.requestContext?.http?.method === "OPTIONS") {
    return { statusCode: 200, headers, body: "" };
  }

  const body = JSON.parse(event.body || "{}");

  // Generate view URL for existing file
  if (body.action === "get-view-url") {
    const command = new GetObjectCommand({
      Bucket: "tec-form-uploads",
      Key: body.fileKey,
    });
    const viewUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });
    return { statusCode: 200, headers, body: JSON.stringify({ viewUrl }) };
  }

  // Generate upload URL for new file
  const { fileName, fileType, folder } = body;
  const key = `${folder || "uploads"}/${Date.now()}-${fileName}`;
  const command = new PutObjectCommand({
    Bucket: "tec-form-uploads",
    Key: key,
    ContentType: fileType,
  });
  const uploadUrl = await getSignedUrl(s3, command, { expiresIn: 300 });

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({ uploadUrl, fileKey: key }),
  };
};
