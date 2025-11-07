/**
 * Script to create the Users table in DynamoDB
 * 
 * Usage:
 * 1. Make sure you have AWS credentials configured
 * 2. Run: node scripts/create-dynamodb-table.js
 */

const { DynamoDBClient, CreateTableCommand, DescribeTableCommand } = require('@aws-sdk/client-dynamodb');

const client = new DynamoDBClient({
  region: process.env.AWS_REGION || 'ap-south-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },
});

const TABLE_NAME = process.env.DYNAMO_DB_TABLE || 'Users';

async function tableExists() {
  try {
    const command = new DescribeTableCommand({ TableName: TABLE_NAME });
    await client.send(command);
    return true;
  } catch (error) {
    if (error.name === 'ResourceNotFoundException') {
      return false;
    }
    throw error;
  }
}

async function createTable() {
  try {
    console.log(`Checking if table "${TABLE_NAME}" exists...`);
    
    if (await tableExists()) {
      console.log(`✅ Table "${TABLE_NAME}" already exists!`);
      return;
    }

    console.log(`Creating table "${TABLE_NAME}"...`);

    const command = new CreateTableCommand({
      TableName: TABLE_NAME,
      AttributeDefinitions: [
        {
          AttributeName: 'email',
          AttributeType: 'S',
        },
      ],
      KeySchema: [
        {
          AttributeName: 'email',
          KeyType: 'HASH',
        },
      ],
      BillingMode: 'PAY_PER_REQUEST',
    });

    const response = await client.send(command);
    console.log('✅ Table created successfully!');
    console.log('Table ARN:', response.TableDescription.TableArn);
    console.log('Table Status:', response.TableDescription.TableStatus);
    console.log('\nNote: It may take a few moments for the table to become ACTIVE.');
  } catch (error) {
    console.error('❌ Error creating table:', error.message);
    process.exit(1);
  }
}

// Load environment variables from .env.local if it exists
try {
  require('dotenv').config({ path: '.env.local' });
} catch (error) {
  console.log('Note: dotenv not installed, using environment variables directly');
}

createTable();
