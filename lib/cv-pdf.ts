// Geschützter CV-PDF-Container
// Das PDF wird Base64-kodiert gespeichert und nur nach Passwort-Validierung freigegeben

import { verifyPassword } from './auth';

// WICHTIG: Ersetzen Sie diesen Platzhalter mit Ihrer echten PDF-Datei
// Konvertieren Sie Ihre PDF zu Base64: https://base64.guru/converter/encode/pdf
// Oder nutzen Sie: `base64 your-cv.pdf > cv-base64.txt` in Terminal
const CV_PDF_BASE64 = `
JVBERi0xLjQKJeLjz9MKNCAwIG9iago8PC9MZW5ndGggNSAwIFI+PgpzdHJlYW0KeJxdjz0OwjAMhfc5hQ8QKX
...
(Dies ist nur ein Platzhalter - ersetzen Sie dies mit Ihrer echten Base64-kodierten PDF)
`;

export function getCVPDF(password: string): Blob | null {
  // Validiere Passwort
  if (!verifyPassword(password)) {
    return null;
  }

  try {
    // Dekodiere Base64 zu Binary
    const binaryString = atob(CV_PDF_BASE64.trim());
    const bytes = new Uint8Array(binaryString.length);

    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    // Erstelle PDF Blob
    return new Blob([bytes], { type: 'application/pdf' });
  } catch (error) {
    console.error('Fehler beim Dekodieren der PDF:', error);
    return null;
  }
}

// Generiert einen temporären Download-Link für das PDF
export function generatePDFDownloadURL(pdfBlob: Blob, filename: string = 'CV_Alexander.pdf'): string {
  return URL.createObjectURL(pdfBlob);
}

// Bereinigt den temporären URL nach Download
export function revokePDFURL(url: string): void {
  URL.revokeObjectURL(url);
}
