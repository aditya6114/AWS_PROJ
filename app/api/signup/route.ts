import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { dynamoDb, USERS_TABLE } from '@/lib/dynamodb';
import { signToken } from '@/lib/jwt';
import { PutCommand, GetCommand } from '@aws-sdk/lib-dynamodb';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, password, role } = body;

    // Validate input
    if (!name || !email || !password || !role) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    if (role !== 'donor' && role !== 'receiver') {
      return NextResponse.json(
        { error: 'Role must be either "donor" or "receiver"' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const getCommand = new GetCommand({
      TableName: USERS_TABLE,
      Key: { email },
    });

    const existingUser = await dynamoDb.send(getCommand);
    if (existingUser.Item) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      );
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Store user in DynamoDB
    const putCommand = new PutCommand({
      TableName: USERS_TABLE,
      Item: {
        email,
        name,
        passwordHash,
        role,
        createdAt: new Date().toISOString(),
      },
    });

    await dynamoDb.send(putCommand);

    // Generate JWT token
    const token = signToken({ email, role });

    return NextResponse.json({
      message: 'User created successfully',
      token,
      user: { email, name, role },
    }, { status: 201 });

  } catch (error: any) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}
