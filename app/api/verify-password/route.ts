import { NextRequest, NextResponse } from 'next/server';
import { verifyPassword } from '@/lib/auth-server';

export const runtime = 'edge';

/**
 * API Route: Password Verification
 * Validates the provided password and returns an access token if valid
 */
export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();

    if (!password || typeof password !== 'string') {
      return NextResponse.json(
        { error: 'Passwort erforderlich' },
        { status: 400 }
      );
    }

    const isValid = verifyPassword(password);

    if (!isValid) {
      return NextResponse.json(
        { error: 'Falsches Passwort. Das Passwort wechselt alle 4 Tage.' },
        { status: 401 }
      );
    }

    // Generate a time-limited access token
    const token = Buffer.from(
      JSON.stringify({
        timestamp: Date.now(),
        password: password.toUpperCase(),
      })
    ).toString('base64');

    return NextResponse.json({
      success: true,
      token,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Interner Serverfehler' },
      { status: 500 }
    );
  }
}
