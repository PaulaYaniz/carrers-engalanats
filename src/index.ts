// Entry point - Carrers Engalanats
// Web de només lectura: la votació està tancada i els resultats són estàtics.
// No hi ha cap ruta que accepte escriptures (POST, PUT, PATCH, DELETE).

import type { Env } from './types';
import { CARRERS } from './data/carrers';
import { CLASSIFICACIO, PERIODE_VOTACIO, TOTAL_VOTS } from './data/resultats';
import { renderHomePage } from './ui/home-page';
import { renderResultsPage } from './ui/results-page';
import { SECURITY_HEADERS } from './ui/layout';

function json(data: unknown): Response {
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
      'Access-Control-Allow-Origin': '*',
      ...SECURITY_HEADERS,
    },
  });
}

function text(body: string, status: number, extra: Record<string, string> = {}): Response {
  return new Response(body, {
    status,
    headers: { 'Content-Type': 'text/plain; charset=utf-8', ...SECURITY_HEADERS, ...extra },
  });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method !== 'GET' && request.method !== 'HEAD') {
      return text('Mètode no permés. Esta web és només de lectura.', 405, { Allow: 'GET, HEAD' });
    }

    const path = new URL(request.url).pathname.replace(/\/+$/, '') || '/';

    switch (path) {
      case '/':
        return renderHomePage();
      case '/resultats':
        return renderResultsPage();
      case '/api/resultats':
        return json({
          periode: PERIODE_VOTACIO,
          total_vots: TOTAL_VOTS,
          resultats: CLASSIFICACIO.map((r) => ({
            posicio: r.posicio,
            carrer: r.carrer.nom,
            vots: r.vots,
            percentatge: r.percentatge,
          })),
        });
      case '/api/carrers':
        return json({
          carrers: CARRERS.map(({ id, nom, imatge, descripcio }) => ({ id, nom, imatge, descripcio })),
        });
    }

    if (path.startsWith('/images/')) {
      return env.ASSETS.fetch(request);
    }

    return text('No s\'ha trobat la pàgina.', 404);
  },
};
