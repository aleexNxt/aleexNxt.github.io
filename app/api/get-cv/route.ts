import { NextRequest, NextResponse } from 'next/server';
import { verifyPassword } from '@/lib/auth-server';
import { promises as fs } from 'fs';
import path from 'path';

export const runtime = 'edge';

/**
 * API Route: CV PDF Delivery
 * Validates the access token and serves the PDF file
 */
export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json();

    if (!token || typeof token !== 'string') {
      return NextResponse.json(
        { error: 'Token erforderlich' },
        { status: 400 }
      );
    }

    // Decode and validate token
    let tokenData;
    try {
      tokenData = JSON.parse(Buffer.from(token, 'base64').toString());
    } catch {
      return NextResponse.json(
        { error: 'Ungültiger Token' },
        { status: 401 }
      );
    }

    // Check token age (max 1 hour)
    const tokenAge = Date.now() - tokenData.timestamp;
    const MAX_TOKEN_AGE = 60 * 60 * 1000; // 1 hour

    if (tokenAge > MAX_TOKEN_AGE) {
      return NextResponse.json(
        { error: 'Token abgelaufen. Bitte erneut authentifizieren.' },
        { status: 401 }
      );
    }

    // Re-validate password to ensure it's still valid
    if (!verifyPassword(tokenData.password)) {
      return NextResponse.json(
        { error: 'Ungültiger Token oder Passwort abgelaufen' },
        { status: 401 }
      );
    }

    // Load PDF from private directory
    const pdfPath = path.join(process.cwd(), 'private', 'cv.pdf');

    let pdfBuffer;
    try {
      pdfBuffer = await fs.readFile(pdfPath);
    } catch (error) {
      console.error('PDF not found:', error);
      return NextResponse.json(
        { error: 'CV-PDF nicht gefunden. Bitte kontaktieren Sie den Administrator.' },
        { status: 404 }
      );
    }

    // Return PDF with security headers
    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'inline; filename="Lebenslauf_Alexander.pdf"',
        'Cache-Control': 'no-store, no-cache, must-revalidate, private',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    });
  } catch (error) {
    console.error('CV delivery error:', error);
    return NextResponse.json(
      { error: 'Interner Serverfehler' },
      { status: 500 }
    );
  }
}
