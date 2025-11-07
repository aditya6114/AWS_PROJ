import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { dynamoDb, USERS_TABLE } from '@/lib/dynamodb';
import { signToken } from '@/lib/jwt';
import { GetCommand } from '@aws-sdk/lib-dynamodb';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Get user from DynamoDB
    const getCommand = new GetCommand({
      TableName: USERS_TABLE,
      Key: { email },
    });

    const result = await dynamoDb.send(getCommand);
    const user = result.Item;

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = signToken({ email: user.email, role: user.role });

    return NextResponse.json({
      message: 'Login successful',
      token,
      user: {
        email: user.email,
        name: user.name,
        role: user.role,
      },
    }, { status: 200 });

  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}
