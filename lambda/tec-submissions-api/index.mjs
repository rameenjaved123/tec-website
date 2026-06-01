import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, ScanCommand, PutCommand, UpdateCommand, DeleteCommand } from '@aws-sdk/lib-dynamodb';

const client = DynamoDBDocumentClient.from(new DynamoDBClient({ region: 'us-east-1' }));
const TABLE = 'tec-form-submissions';

const FORM_GROUP_MAP = {
  'New Starter Form':              'new-starter-form',
  'Partnerships & Collaborations': 'partnerships',
  'Application Form':              'application-form',
  'Job Application':               'job-application',
  'English & IELTS Application':   'english-ielts',
  'Enquiry Form':                  'enquiry-form',
  'Enrolment Form':                'enrolment-form',
  'International Application':     'international-application',
  'Complaint':                     'complaint',
};

const CORS = {
  'Access-Control-Allow-Origin':  '*',
  'Access-Control-Allow-Headers': 'Content-Type,Authorization',
  'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
};

function respond(statusCode, body) {
  return {
    statusCode,
    headers: { 'Content-Type': 'application/json', ...CORS },
    body: JSON.stringify(body),
  };
}

function getGroupsFromEvent(event) {
  const claims = event.requestContext?.authorizer?.jwt?.claims
              ?? event.requestContext?.authorizer?.claims
              ?? {};
  const raw = claims['cognito:groups'];
  if (!raw) return [];
  if (Array.isArray(raw)) return raw;
  // HTTP API JWT sends groups as "[group1 group2]" — space separated
  return raw.replace(/[\[\]]/g, '').trim().split(/[\s,]+/).filter(Boolean);
}

function getAllowedFormTypes(groups) {
  if (groups.includes('admin')) return null;
  const allowed = [];
  for (const [formName, groupName] of Object.entries(FORM_GROUP_MAP)) {
    if (groups.includes(groupName)) allowed.push(formName);
  }
  return allowed;
}

export const handler = async (event) => {
  const path   = event.path || event.rawPath || '/';
  const method = (event.httpMethod || event.requestContext?.http?.method || 'GET').toUpperCase();

  if (method === 'OPTIONS') {
    return { statusCode: 200, headers: CORS, body: '' };
  }

  // ── /save-submission — PUBLIC ──────────────────────────────────
  if (path.endsWith('/save-submission')) {
    try {
      const body = JSON.parse(event.body || '{}');
      if (!body.id) return respond(400, { error: 'Missing id' });
      await client.send(new PutCommand({ TableName: TABLE, Item: body }));
      return respond(200, { ok: true });
    } catch (err) {
      console.error('save-submission error:', err);
      return respond(500, { error: 'Failed to save' });
    }
  }

  // ── Auth check ─────────────────────────────────────────────────
  const groups       = getGroupsFromEvent(event);
  const allowedTypes = getAllowedFormTypes(groups);

  if (groups.length === 0) {
    return respond(403, { error: 'No groups assigned. Contact your administrator.' });
  }

  // ── /get-submissions ───────────────────────────────────────────
  if (path.endsWith('/get-submissions')) {
    try {
      const qs    = event.queryStringParameters || {};
      const limit = parseInt(qs.limit, 10) || 500;

      const params = { TableName: TABLE, Limit: limit };

      if (qs.startKey) {
        try { params.ExclusiveStartKey = JSON.parse(decodeURIComponent(qs.startKey)); } catch {}
      }

      if (allowedTypes !== null) {
        if (allowedTypes.length === 0) {
          return respond(200, { items: [], nextKey: null });
        }
        const exprValues = {};
        const conditions = allowedTypes.map((type, i) => {
          exprValues[`:t${i}`] = type;
          return `formType = :t${i}`;
        });
        params.FilterExpression = conditions.join(' OR ');
        params.ExpressionAttributeValues = exprValues;
      }

      const result  = await client.send(new ScanCommand(params));
      const nextKey = result.LastEvaluatedKey
        ? encodeURIComponent(JSON.stringify(result.LastEvaluatedKey))
        : null;

      return respond(200, { items: result.Items || [], nextKey });
    } catch (err) {
      console.error('get-submissions error:', err);
      return respond(500, { error: err.message });
    }
  }

  // ── /update-submission ─────────────────────────────────────────
  if (path.endsWith('/update-submission')) {
    try {
      const body = JSON.parse(event.body || '{}');
      if (!body.id) return respond(400, { error: 'Missing id' });

      if (allowedTypes !== null && body.formType && !allowedTypes.includes(body.formType)) {
        return respond(403, { error: 'Not authorised to update this form type' });
      }

      if (Object.keys(body).length === 2 && body.id && body.status) {
        await client.send(new UpdateCommand({
          TableName: TABLE,
          Key: { id: body.id },
          UpdateExpression: 'SET #s = :s',
          ExpressionAttributeNames: { '#s': 'status' },
          ExpressionAttributeValues: { ':s': body.status },
        }));
      } else {
        await client.send(new PutCommand({ TableName: TABLE, Item: body }));
      }

      return respond(200, { ok: true });
    } catch (err) {
      console.error('update-submission error:', err);
      return respond(500, { error: err.message });
    }
  }

  // ── /delete-submission — admin only ───────────────────────────
  if (path.endsWith('/delete-submission')) {
    try {
      if (allowedTypes !== null) {
        return respond(403, { error: 'Only admins can delete submissions' });
      }
      const body = JSON.parse(event.body || '{}');
      if (!body.id) return respond(400, { error: 'Missing id' });
      await client.send(new DeleteCommand({ TableName: TABLE, Key: { id: body.id } }));
      return respond(200, { ok: true });
    } catch (err) {
      console.error('delete-submission error:', err);
      return respond(500, { error: err.message });
    }
  }

  return respond(404, { error: 'Not found' });
};
