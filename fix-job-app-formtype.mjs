#!/usr/bin/env node
/**
 * Scans DynamoDB for all wp-job-* entries and fixes any whose formType
 * is NOT 'Job Application' (e.g. accidentally set to 'Application Form').
 *
 * Run: node /tmp/fix-job-app-formtype.mjs
 */

import {
  DynamoDBClient,
  ScanCommand,
  UpdateItemCommand,
} from '@aws-sdk/client-dynamodb';

const TABLE  = 'tec-form-submissions';
const client = new DynamoDBClient({ region: 'us-east-1' });

let lastKey   = undefined;
let fixed     = 0;
let alreadyOk = 0;
let total     = 0;

do {
  const params = {
    TableName:                 TABLE,
    FilterExpression:          'begins_with(id, :pfx)',
    ExpressionAttributeValues: { ':pfx': { S: 'wp-job-' } },
    Limit:                     500,
  };
  if (lastKey) params.ExclusiveStartKey = lastKey;

  const res = await client.send(new ScanCommand(params));
  lastKey = res.LastEvaluatedKey;

  for (const item of res.Items || []) {
    total++;
    const id       = item.id?.S;
    const formType = item.formType?.S;

    if (formType !== 'Job Application') {
      console.log(`⚠️  Fixing ${id}  (was: "${formType}")`);
      await client.send(new UpdateItemCommand({
        TableName:                 TABLE,
        Key:                       { id: { S: id } },
        UpdateExpression:          'SET #ft = :ft',
        ExpressionAttributeNames:  { '#ft': 'formType' },
        ExpressionAttributeValues: { ':ft': { S: 'Job Application' } },
      }));
      fixed++;
    } else {
      alreadyOk++;
    }
  }
} while (lastKey);

console.log(`\n── Done ─────────────────────────────`);
console.log(`Total wp-job-* entries found: ${total}`);
console.log(`Already correct:              ${alreadyOk}`);
console.log(`Fixed (formType updated):     ${fixed}`);
