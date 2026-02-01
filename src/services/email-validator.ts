// Validació d'emails i detecció de duplicats amb hash SHA-256

import { normalizeEmail } from '../utils/validators';

export async function hashEmail(email: string): Promise<string> {
  const normalized = normalizeEmail(email);
  const encoder = new TextEncoder();
  const data = encoder.encode(normalized);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

export async function hasVotedBefore(db: D1Database, emailHash: string): Promise<boolean> {
  const result = await db.prepare(
    'SELECT email_hash FROM email_votes WHERE email_hash = ?'
  ).bind(emailHash).first<{ email_hash: string }>();

  return result !== null;
}
