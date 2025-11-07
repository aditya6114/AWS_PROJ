import { NextResponse } from 'next/server';
import { withAuth, AuthenticatedRequest } from '@/lib/middleware';
import axios from 'axios';

async function handler(req: AuthenticatedRequest) {
  try {
    // Forward to existing donation API
    const response = await axios.get(
      'https://4v4l0kxc90.execute-api.ap-south-1.amazonaws.com/donations'
    );

    const data = typeof response.data === 'string' 
      ? JSON.parse(response.data) 
      : response.data;

    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    console.error('List donations error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch donations', details: error.message },
      { status: 500 }
    );
  }
}

// Only receivers can list donations
export const GET = withAuth(handler, ['receiver']);
