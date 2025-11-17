import { NextRequest, NextResponse } from 'next/server';
import { getUpcomingPasswords } from '@/lib/auth-server';

export const runtime = 'nodejs';

/**
 * API Route: Admin Password Retrieval
 * Returns upcoming passwords for users with valid master key
 */
export async function POST(request: NextRequest) {
  try {
    const { masterKey } = await request.json();

    if (!masterKey || typeof masterKey !== 'string') {
      return NextResponse.json(
        { error: 'Master-Key erforderlich' },
        { status: 400 }
      );
    }

    const passwords = getUpcomingPasswords(masterKey);

    if (!passwords) {
      return NextResponse.json(
        { error: 'Ungültiger Master-Key' },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      passwords,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Interner Serverfehler' },
      { status: 500 }
    );
  }
}
