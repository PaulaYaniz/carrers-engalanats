// Handler de votació - Carrers Engalanats

import type { Env, VoteRequest } from '../types';
import { isValidEmail } from '../utils/validators';
import { submitVote } from '../services/vote-service';
import { checkRateLimit } from '../utils/rate-limiter';

export async function handleVote(request: Request, env: Env): Promise<Response> {
  // Rate limiting per IP
  const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
  if (!checkRateLimit(ip)) {
    return new Response(JSON.stringify({
      success: false,
      message: 'Massa peticions. Si us plau, espera un minut abans de tornar-ho a intentar.'
    }), {
      status: 429,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Parsejar el body
  let body: VoteRequest;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({
      success: false,
      message: 'Dades no vàlides. Si us plau, torna-ho a intentar.'
    }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Validar email
  if (!body.email || !isValidEmail(body.email)) {
    return new Response(JSON.stringify({
      success: false,
      message: 'Correu electrònic no vàlid. Si us plau, introdueix un email correcte.'
    }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Validar street_id
  if (!body.street_id || typeof body.street_id !== 'number') {
    return new Response(JSON.stringify({
      success: false,
      message: 'Si us plau, selecciona un carrer.'
    }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Submetre el vot
  const userAgent = request.headers.get('User-Agent');
  const result = await submitVote(env, body.street_id, body.email, ip, userAgent);

  const status = result.success ? 200 : 400;
  return new Response(JSON.stringify(result), {
    status,
    headers: { 'Content-Type': 'application/json' }
  });
}
