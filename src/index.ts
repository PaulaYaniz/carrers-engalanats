// Entry point - Carrers Engalanats
// Plataforma de votació per al concurs de decoració de carrers de Sant Joan

import type { Env } from './types';
import { handleVote } from './handlers/vote';
import { handleResults, handleStreets } from './handlers/results';
import { handleAdminLogin, handleAdminResults, handleAdminExport, handleAdminReset, requireAuth } from './handlers/admin';
import { renderVotingPage } from './ui/voting-page';
import { renderResultsPage } from './ui/results-page';
import { renderAdminPage } from './ui/admin-page';

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;

    // CORS headers per API endpoints
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };

    // Handle OPTIONS requests (CORS preflight)
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    try {
      // Rutes públiques
      if (path === '/' && request.method === 'GET') {
        return renderVotingPage(env);
      }

      if (path === '/resultats' && request.method === 'GET') {
        return renderResultsPage(env);
      }

      // API públiques
      if (path === '/api/vot' && request.method === 'POST') {
        const response = await handleVote(request, env);
        Object.entries(corsHeaders).forEach(([key, value]) => {
          response.headers.set(key, value);
        });
        return response;
      }

      if (path === '/api/resultats' && request.method === 'GET') {
        const response = await handleResults(env);
        Object.entries(corsHeaders).forEach(([key, value]) => {
          response.headers.set(key, value);
        });
        return response;
      }

      if (path === '/api/carrers' && request.method === 'GET') {
        const response = await handleStreets(env);
        Object.entries(corsHeaders).forEach(([key, value]) => {
          response.headers.set(key, value);
        });
        return response;
      }

      // Admin login (no requereix auth)
      if (path === '/api/admin/login' && request.method === 'POST') {
        return await handleAdminLogin(request, env);
      }

      // Admin dashboard
      if (path === '/api/admin/dashboard' && request.method === 'GET') {
        const isAuth = await requireAuth(request, env);
        if (!isAuth) {
          return new Response('Unauthorized', { status: 401 });
        }
        return renderAdminPage(env);
      }

      // Admin API endpoints (amb autenticació)
      if (path.startsWith('/api/admin/')) {
        const isAuth = await requireAuth(request, env);
        if (!isAuth) {
          return new Response(JSON.stringify({
            success: false,
            message: 'No autoritzat. Si us plau, inicia sessió.'
          }), {
            status: 401,
            headers: { 'Content-Type': 'application/json' }
          });
        }

        if (path === '/api/admin/resultats' && request.method === 'GET') {
          return await handleAdminResults(env);
        }

        if (path === '/api/admin/export' && request.method === 'POST') {
          return await handleAdminExport(env);
        }

        if (path === '/api/admin/reset' && request.method === 'DELETE') {
          return await handleAdminReset(env);
        }
      }

      // Servir assets estàtics (imatges)
      if (path.startsWith('/images/')) {
        return env.ASSETS.fetch(request);
      }

      // 404
      return new Response('No trobat', { status: 404 });

    } catch (error) {
      console.error('Error:', error);
      return new Response('Error intern del servidor', { status: 500 });
    }
  },
};
