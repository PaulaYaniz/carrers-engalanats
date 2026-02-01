// Autenticació admin - Carrers Engalanats

import type { Env } from '../types';

export async function generateToken(): Promise<string> {
  const randomBytes = new Uint8Array(32);
  crypto.getRandomValues(randomBytes);
  const token = Array.from(randomBytes)
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
  return token;
}

export async function createAdminSession(env: Env): Promise<string> {
  const token = await generateToken();
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hores

  await env.DB.prepare(
    'INSERT INTO admin_sessions (token, expires_at) VALUES (?, ?)'
  ).bind(token, expiresAt.toISOString()).run();

  return token;
}

export async function validateAdminToken(env: Env, token: string): Promise<boolean> {
  const session = await env.DB.prepare(
    'SELECT expires_at FROM admin_sessions WHERE token = ?'
  ).bind(token).first<{ expires_at: string }>();

  if (!session) {
    return false;
  }

  const expiresAt = new Date(session.expires_at);
  if (expiresAt < new Date()) {
    // Token expirat, eliminar
    await env.DB.prepare('DELETE FROM admin_sessions WHERE token = ?').bind(token).run();
    return false;
  }

  return true;
}

export function getAuthToken(request: Request): string | null {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  return authHeader.substring(7);
}
