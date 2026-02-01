// Handler de resultats - Carrers Engalanats

import type { Env } from '../types';
import { getResults } from '../services/vote-service';

export async function handleResults(env: Env): Promise<Response> {
  try {
    const results = await getResults(env);
    return new Response(JSON.stringify(results), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=30' // Caché de 30 segons
      }
    });
  } catch (error) {
    console.error('Error obtenint resultats:', error);
    return new Response(JSON.stringify({
      success: false,
      message: 'Error obtenint els resultats.'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function handleStreets(env: Env): Promise<Response> {
  try {
    const result = await env.DB.prepare(
      'SELECT id, name, display_name, image_url, description FROM streets ORDER BY id'
    ).all();

    return new Response(JSON.stringify({
      success: true,
      streets: result.results
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=3600' // Caché d'1 hora (dades estàtiques)
      }
    });
  } catch (error) {
    console.error('Error obtenint carrers:', error);
    return new Response(JSON.stringify({
      success: false,
      message: 'Error obtenint els carrers.'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
