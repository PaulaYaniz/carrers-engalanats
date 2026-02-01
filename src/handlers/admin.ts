// Handler d'administració - Carrers Engalanats

import type { Env, AdminLoginRequest } from '../types';
import { createAdminSession, validateAdminToken, getAuthToken } from '../services/auth-service';

export async function handleAdminLogin(request: Request, env: Env): Promise<Response> {
  let body: AdminLoginRequest;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({
      success: false,
      message: 'Dades no vàlides.'
    }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  if (!body.password) {
    return new Response(JSON.stringify({
      success: false,
      message: 'Contrasenya requerida.'
    }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Verificar contrasenya
  if (body.password !== env.ADMIN_PASSWORD) {
    return new Response(JSON.stringify({
      success: false,
      message: 'Contrasenya incorrecta.'
    }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Crear sessió
  const token = await createAdminSession(env);

  return new Response(JSON.stringify({
    success: true,
    token,
    message: 'Login correcte.'
  }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}

export async function requireAuth(request: Request, env: Env): Promise<boolean> {
  const token = getAuthToken(request);
  if (!token) {
    return false;
  }
  return await validateAdminToken(env, token);
}

export async function handleAdminResults(env: Env): Promise<Response> {
  const results = await env.DB.prepare(`
    SELECT
      v.id,
      v.street_id,
      s.display_name,
      v.email_hash,
      v.ip_address,
      v.user_agent,
      v.voted_at
    FROM votes v
    JOIN streets s ON v.street_id = s.id
    ORDER BY v.voted_at DESC
    LIMIT 100
  `).all();

  return new Response(JSON.stringify({
    success: true,
    votes: results.results
  }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}

export async function handleAdminExport(env: Env): Promise<Response> {
  const results = await env.DB.prepare(`
    SELECT
      v.id,
      v.street_id,
      s.display_name,
      v.voted_at,
      v.ip_address
    FROM votes v
    JOIN streets s ON v.street_id = s.id
    ORDER BY v.voted_at DESC
  `).all();

  // Generar CSV
  const csv = [
    'ID,Carrer ID,Nom Carrer,Data/Hora,IP',
    ...results.results.map((row: any) =>
      `${row.id},${row.street_id},"${row.display_name}",${row.voted_at},${row.ip_address || ''}`
    )
  ].join('\n');

  return new Response(csv, {
    status: 200,
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': 'attachment; filename="vots-carrers-engalanats.csv"'
    }
  });
}

export async function handleAdminReset(env: Env): Promise<Response> {
  try {
    await env.DB.prepare('DELETE FROM votes').run();
    await env.DB.prepare('DELETE FROM email_votes').run();

    return new Response(JSON.stringify({
      success: true,
      message: 'Tots els vots han estat esborrats.'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error esborrant vots:', error);
    return new Response(JSON.stringify({
      success: false,
      message: 'Error esborrant els vots.'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
