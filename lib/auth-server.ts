// Server-only authentication library
// This code NEVER runs in the browser - only on Vercel Edge Functions

const SECRET_SEED = process.env.CV_SECRET_SEED || 'CHANGE_THIS_SECRET_SEED_123456';
const SECRET_MASTER_KEY = process.env.CV_MASTER_KEY || 'CHANGE_THIS_MASTER_KEY_789';

/**
 * Generates the current valid password based on 4-day rotation
 */
export function getCurrentPassword(): string {
  const startDate = new Date('2025-01-01').getTime();
  const now = Date.now();
  const daysSinceStart = Math.floor((now - startDate) / (1000 * 60 * 60 * 24));

  // Password changes every 4 days
  const period = Math.floor(daysSinceStart / 4);

  const hash = simpleHash(SECRET_SEED + period);
  return generatePassword(hash);
}

/**
 * Verifies if the provided password matches the current valid password
 */
export function verifyPassword(input: string): boolean {
  return input.toUpperCase() === getCurrentPassword();
}

/**
 * Verifies the master key for admin access
 */
export function verifyMasterKey(key: string): boolean {
  return key === SECRET_MASTER_KEY;
}

/**
 * Returns upcoming passwords with validity periods
 * Only accessible with valid master key
 */
export function getUpcomingPasswords(masterKey: string): Array<{
  password: string;
  validFrom: string;
  validUntil: string;
}> | null {
  if (!verifyMasterKey(masterKey)) {
    return null;
  }

  const passwords = [];
  const startDate = new Date('2025-01-01').getTime();
  const now = Date.now();
  const daysSinceStart = Math.floor((now - startDate) / (1000 * 60 * 60 * 24));
  const currentPeriod = Math.floor(daysSinceStart / 4);

  // Generate next 10 passwords
  for (let i = 0; i < 10; i++) {
    const period = currentPeriod + i;
    const hash = simpleHash(SECRET_SEED + period);
    const password = generatePassword(hash);

    const validFromDays = period * 4;
    const validUntilDays = (period + 1) * 4;

    const validFrom = new Date(startDate + validFromDays * 24 * 60 * 60 * 1000);
    const validUntil = new Date(startDate + validUntilDays * 24 * 60 * 60 * 1000);

    passwords.push({
      password,
      validFrom: validFrom.toISOString().split('T')[0],
      validUntil: validUntil.toISOString().split('T')[0],
    });
  }

  return passwords;
}

/**
 * Simple hash function for password generation
 */
function simpleHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

/**
 * Generates a 6-character alphanumeric password from a hash
 */
function generatePassword(hash: number): string {
  // Use clear characters only (no confusing I/1, O/0, etc.)
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let password = '';
  let num = hash;

  for (let i = 0; i < 6; i++) {
    password += chars[num % chars.length];
    num = Math.floor(num / chars.length);
  }

  return password;
}
