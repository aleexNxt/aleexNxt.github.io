// Utility für passwortgeschützten Zugriff
// Das Passwort wechselt alle 4 Tage

const SECRET_SEED = 'portfolio-cv-2025'; // Ändern Sie diesen Seed für Sicherheit

export function getCurrentPassword(): string {
  // Berechne die Anzahl der Tage seit einem festen Datum
  const startDate = new Date('2025-01-01').getTime();
  const now = Date.now();
  const daysSinceStart = Math.floor((now - startDate) / (1000 * 60 * 60 * 24));

  // Alle 4 Tage wechseln
  const period = Math.floor(daysSinceStart / 4);

  // Einfacher Hash-Algorithmus
  const hash = simpleHash(SECRET_SEED + period);

  // Generiere ein 6-stelliges Passwort aus dem Hash
  return generatePassword(hash);
}

function simpleHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

function generatePassword(hash: number): string {
  // Generiere ein 6-stelliges alphanumerisches Passwort
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Ohne verwirrende Zeichen
  let password = '';
  let num = hash;

  for (let i = 0; i < 6; i++) {
    password += chars[num % chars.length];
    num = Math.floor(num / chars.length);
  }

  return password;
}

export function verifyPassword(input: string): boolean {
  return input.toUpperCase() === getCurrentPassword();
}

// Für Entwicklung/Debug - zeigt aktuelles Passwort in der Konsole
export function logCurrentPassword() {
  if (process.env.NODE_ENV === 'development') {
    console.log('Current CV Password:', getCurrentPassword());
  }
}
