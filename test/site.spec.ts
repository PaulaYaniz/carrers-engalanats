// Tests de la web de només lectura - Carrers Engalanats

import { describe, it, expect } from 'vitest';
import { SELF } from 'cloudflare:test';

const BASE = 'https://example.com';

describe('Pàgines públiques', () => {
  it('la pàgina d\'inici està en valencià i anuncia que la votació ha finalitzat', async () => {
    const res = await SELF.fetch(`${BASE}/`);
    expect(res.status).toBe(200);
    const html = await res.text();
    expect(html).toContain('lang="ca-ES-valencia"');
    expect(html).toContain('La votació ha finalitzat');
    expect(html).toContain('C/ Fossar');
    expect(html).not.toContain('<form');
    expect(html).not.toContain('type="email"');
  });

  it('la pàgina de resultats mostra la classificació final', async () => {
    const res = await SELF.fetch(`${BASE}/resultats`);
    expect(res.status).toBe(200);
    const html = await res.text();
    expect(html).toContain('Resultats definitius');
    expect(html).toContain('1.075');
    expect(html).toContain('42,4 %');
    expect(html.indexOf('C/ Fossar')).toBeLessThan(html.indexOf('C/ Travesia Sant Roc'));
  });

  it('no publica cap correu electrònic', async () => {
    for (const path of ['/', '/resultats', '/api/resultats', '/api/carrers']) {
      const body = await (await SELF.fetch(`${BASE}${path}`)).text();
      expect(body).not.toMatch(/[\w.+-]+@[\w-]+\.[\w.]+/);
    }
  });

  it('envia capçaleres de seguretat', async () => {
    const res = await SELF.fetch(`${BASE}/resultats`);
    expect(res.headers.get('Content-Security-Policy')).toContain("frame-ancestors 'none'");
    expect(res.headers.get('X-Content-Type-Options')).toBe('nosniff');
  });
});

describe('API de resultats', () => {
  it('retorna els totals per carrer', async () => {
    const res = await SELF.fetch(`${BASE}/api/resultats`);
    expect(res.status).toBe(200);
    const data = await res.json<any>();
    expect(data.total_vots).toBe(1075);
    expect(data.resultats).toHaveLength(6);
    expect(data.resultats[0]).toMatchObject({ posicio: 1, carrer: 'C/ Fossar', vots: 456 });
    const suma = data.resultats.reduce((s: number, r: any) => s + r.vots, 0);
    expect(suma).toBe(1075);
  });
});

describe('Protecció contra modificacions', () => {
  const intents: Array<[string, string]> = [
    ['POST', '/api/vot'],
    ['POST', '/api/resultats'],
    ['PUT', '/api/resultats'],
    ['PATCH', '/api/resultats'],
    ['DELETE', '/api/resultats'],
    ['POST', '/api/admin/login'],
    ['DELETE', '/api/admin/reset'],
    ['POST', '/api/admin/export'],
  ];

  for (const [method, path] of intents) {
    it(`rebutja ${method} ${path}`, async () => {
      const res = await SELF.fetch(`${BASE}${path}`, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ street_id: 3, email: 'atac@example.com' }),
      });
      expect(res.status).toBe(405);
    });
  }

  it('les antigues rutes d\'administració ja no existeixen', async () => {
    for (const path of ['/api/admin/dashboard', '/api/admin/resultats']) {
      const res = await SELF.fetch(`${BASE}${path}`);
      expect(res.status).toBe(404);
    }
  });

  it('els resultats no canvien després d\'intentar votar', async () => {
    const abans = await (await SELF.fetch(`${BASE}/api/resultats`)).json<any>();
    await SELF.fetch(`${BASE}/api/vot`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ street_id: 3, email: 'atac@example.com' }),
    });
    const despres = await (await SELF.fetch(`${BASE}/api/resultats`)).json<any>();
    expect(despres.resultats).toEqual(abans.resultats);
  });
});
