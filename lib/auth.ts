// Client-side API wrapper for authentication
// NO password generation logic here - everything happens server-side

/**
 * Verifies password via API and returns access token
 */
export async function verifyPasswordAPI(password: string): Promise<{
  success: boolean;
  token?: string;
  error?: string;
}> {
  try {
    const response = await fetch('/api/verify-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password }),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.error || 'Fehler bei der Authentifizierung',
      };
    }

    return {
      success: true,
      token: data.token,
    };
  } catch (error) {
    return {
      success: false,
      error: 'Netzwerkfehler. Bitte versuchen Sie es erneut.',
    };
  }
}

/**
 * Retrieves CV PDF using valid access token
 */
export async function getCVPDF(token: string): Promise<Blob | null> {
  try {
    const response = await fetch('/api/get-cv', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('PDF fetch error:', errorData.error);
      return null;
    }

    return await response.blob();
  } catch (error) {
    console.error('Network error fetching PDF:', error);
    return null;
  }
}

/**
 * Helper function to generate download URL from PDF blob
 */
export function generatePDFDownloadURL(blob: Blob, filename?: string): string {
  return URL.createObjectURL(blob);
}

/**
 * Helper function to revoke PDF blob URL (cleanup)
 */
export function revokePDFURL(url: string): void {
  URL.revokeObjectURL(url);
}
