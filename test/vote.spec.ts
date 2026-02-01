// Tests de votació - Carrers Engalanats

import { describe, it, expect, beforeAll } from 'vitest';
import { env, SELF } from 'cloudflare:test';

describe('Vote API', () => {
  beforeAll(async () => {
    // Setup: crear taules i seed data
    await env.DB.batch([
      env.DB.prepare(`CREATE TABLE IF NOT EXISTS streets (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE,
        display_name TEXT NOT NULL,
        image_url TEXT NOT NULL,
        description TEXT,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
      )`),
      env.DB.prepare(`CREATE TABLE IF NOT EXISTS votes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        street_id INTEGER NOT NULL,
        email_hash TEXT NOT NULL,
        ip_address TEXT,
        user_agent TEXT,
        voted_at TEXT DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (street_id) REFERENCES streets(id)
      )`),
      env.DB.prepare(`CREATE TABLE IF NOT EXISTS email_votes (
        email_hash TEXT PRIMARY KEY,
        voted_at TEXT DEFAULT CURRENT_TIMESTAMP,
        vote_id INTEGER NOT NULL,
        FOREIGN KEY (vote_id) REFERENCES votes(id)
      )`),
      env.DB.prepare(`INSERT OR IGNORE INTO streets (name, display_name, image_url) VALUES
        ('travesia-sant-roc', 'C/ Travesia Sant Roc', '/images/streets/travesia-sant-roc.jpg')`),
      env.DB.prepare(`INSERT OR IGNORE INTO streets (name, display_name, image_url) VALUES
        ('joaquin-santo', 'C/ Joaquín Santo', '/images/streets/joaquin-santo.jpg')`),
      env.DB.prepare(`INSERT OR IGNORE INTO streets (name, display_name, image_url) VALUES
        ('venturo', 'C/ Venturo', '/images/streets/venturo.jpg')`)
    ]);
  });

  it('should return voting page on GET /', async () => {
    const response = await SELF.fetch('https://example.com/');
    expect(response.status).toBe(200);
    const html = await response.text();
    expect(html).toContain('Carrers Engalanats');
  });

  it('should accept valid vote', async () => {
    const response = await SELF.fetch('https://example.com/api/vot', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        street_id: 1,
        email: 'test@example.com'
      })
    });

    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data.success).toBe(true);
    expect(data.message).toContain('correctament');
  });

  it('should reject duplicate vote', async () => {
    const email = 'duplicate@example.com';

    // Primer vot
    const response1 = await SELF.fetch('https://example.com/api/vot', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        street_id: 1,
        email
      })
    });

    expect(response1.status).toBe(200);
    const data1 = await response1.json();
    expect(data1.success).toBe(true);

    // Segon vot (ha de fallar)
    const response2 = await SELF.fetch('https://example.com/api/vot', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        street_id: 2,
        email
      })
    });

    expect(response2.status).toBe(400);
    const data2 = await response2.json();
    expect(data2.success).toBe(false);
    expect(data2.message).toContain('Ja has votat');
  });

  it('should reject invalid email', async () => {
    const response = await SELF.fetch('https://example.com/api/vot', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        street_id: 1,
        email: 'invalid-email'
      })
    });

    expect(response.status).toBe(400);
    const data = await response.json();
    expect(data.success).toBe(false);
    expect(data.message).toContain('no vàlid');
  });

  it('should reject invalid street_id', async () => {
    const response = await SELF.fetch('https://example.com/api/vot', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        street_id: 999,
        email: 'test999@example.com'
      })
    });

    expect(response.status).toBe(400);
    const data = await response.json();
    expect(data.success).toBe(false);
  });

  it('should return results', async () => {
    const response = await SELF.fetch('https://example.com/api/resultats');
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data).toHaveProperty('total_votes');
    expect(data).toHaveProperty('results');
    expect(Array.isArray(data.results)).toBe(true);
  });

  it('should return streets list', async () => {
    const response = await SELF.fetch('https://example.com/api/carrers');
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data.success).toBe(true);
    expect(Array.isArray(data.streets)).toBe(true);
    expect(data.streets.length).toBeGreaterThan(0);
  });
});
