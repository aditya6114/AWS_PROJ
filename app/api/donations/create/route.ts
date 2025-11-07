import { NextResponse } from 'next/server';
import { withAuth, AuthenticatedRequest } from '@/lib/middleware';
import axios from 'axios';

async function handler(req: AuthenticatedRequest) {
  try {
    const body = await req.json();
    const { donorName, foodType, quantity, city } = body;

    // Validate input
    if (!donorName || !foodType || !quantity || !city) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Forward to existing donation API
    const response = await axios.post(
      'https://4v4l0kxc90.execute-api.ap-south-1.amazonaws.com/donations',
      {
        donorName,
        foodType,
        quantity,
        city,
        donorEmail: req.user?.email, // Add donor email from JWT
      }
    );

    return NextResponse.json(response.data, { status: 201 });
  } catch (error: any) {
    console.error('Create donation error:', error);
    return NextResponse.json(
      { error: 'Failed to create donation', details: error.message },
      { status: 500 }
    );
  }
}

// Only donors can create donations
export const POST = withAuth(handler, ['donor']);
