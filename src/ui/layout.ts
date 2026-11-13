// Plantilla comuna - Carrers Engalanats

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Format numèric valencià: 1.075 · 42,4 %
export function formatNumero(n: number): string {
  return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

export function formatPercentatge(p: number): string {
  return `${p.toFixed(1).replace('.', ',')} %`;
}

// Ordinals en valencià: 1r, 2n, 3r, 4t, 5é...
export function ordinal(n: number): string {
  if (n === 1 || n === 3) return `${n}r`;
  if (n === 2) return `${n}n`;
  if (n === 4) return `${n}t`;
  return `${n}é`;
}

export const SECURITY_HEADERS: Record<string, string> = {
  'Content-Security-Policy': [
    "default-src 'none'",
    "img-src 'self'",
    "style-src 'unsafe-inline' https://fonts.googleapis.com",
    'font-src https://fonts.gstatic.com',
    "base-uri 'none'",
    "form-action 'none'",
    "frame-ancestors 'none'",
  ].join('; '),
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
};

const CSS = `
    :root {
      --color-primary: #2563eb;
      --color-secondary: #1e40af;
      --color-success: #10b981;
      --color-gray-50: #f8fafc;
      --color-gray-100: #f1f5f9;
      --color-gray-200: #e2e8f0;
      --color-gray-300: #cbd5e1;
      --color-gray-400: #94a3b8;
      --color-gray-500: #64748b;
      --color-gray-600: #475569;
      --color-gray-700: #334155;
      --color-gray-900: #0f172a;
      --font-base: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      --font-mono: 'JetBrains Mono', monospace;
      --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
      --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
      --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
    }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: var(--font-base);
      line-height: 1.6;
      color: var(--color-gray-900);
      background: var(--color-gray-50);
      -webkit-font-smoothing: antialiased;
    }
    a { color: inherit; }
    .header {
      background: white;
      border-bottom: 1px solid var(--color-gray-200);
      padding: 1.5rem 2rem;
      position: sticky;
      top: 0;
      z-index: 100;
      box-shadow: var(--shadow-sm);
    }
    .header-content {
      max-width: 1400px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 1rem;
    }
    .header-left { display: flex; flex-direction: column; gap: 0.25rem; }
    .header-title { font-size: 1.25rem; font-weight: 600; letter-spacing: -0.025em; text-decoration: none; }
    .header-subtitle { font-size: 0.875rem; color: var(--color-gray-500); font-family: var(--font-mono); }
    .header-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.375rem 0.75rem;
      background: var(--color-gray-100);
      color: var(--color-gray-700);
      border-radius: 0.375rem;
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      font-family: var(--font-mono);
    }
    .container { max-width: 1400px; margin: 0 auto; padding: 3rem 2rem; }
    .card {
      background: white;
      border: 1px solid var(--color-gray-200);
      border-radius: 0.75rem;
      padding: 2rem;
      margin-bottom: 2rem;
    }
    .btn {
      display: inline-block;
      padding: 0.75rem 1.5rem;
      font-size: 0.875rem;
      font-weight: 600;
      text-decoration: none;
      border-radius: 0.5rem;
      transition: all 0.2s;
    }
    .btn-primary { background: var(--color-primary); color: white; }
    .btn-primary:hover { background: var(--color-secondary); box-shadow: var(--shadow-md); }
    .btn-secondary { background: white; color: var(--color-gray-700); border: 1px solid var(--color-gray-300); }
    .btn-secondary:hover { background: var(--color-gray-50); }
    .btn:focus-visible { outline: 2px solid var(--color-primary); outline-offset: 2px; }
    .footer {
      text-align: center;
      padding: 2rem;
      margin-top: 1rem;
      border-top: 1px solid var(--color-gray-200);
      font-size: 0.75rem;
      color: var(--color-gray-500);
    }
    @media (max-width: 768px) {
      .header { padding: 1rem; }
      .container { padding: 1.5rem 1rem; }
      .card { padding: 1.25rem; }
    }
    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
    }
`;

export interface LayoutOptions {
  title: string;
  description: string;
  badge: string;
  css: string;
  body: string;
}

export function renderLayout(opts: LayoutOptions): Response {
  const html = `<!DOCTYPE html>
<html lang="ca-ES-valencia">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="${escapeHtml(opts.description)}">
  <title>${escapeHtml(opts.title)}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
  <style>${CSS}${opts.css}</style>
</head>
<body>
  <header class="header">
    <div class="header-content">
      <div class="header-left">
        <a href="/" class="header-title">Carrers Engalanats del Raval d'Elx</a>
        <div class="header-subtitle">XII Edició · Sant Joan 2025</div>
      </div>
      <div class="header-badge">${escapeHtml(opts.badge)}</div>
    </div>
  </header>

  <main class="container">
${opts.body}
  </main>

  <footer class="footer">
    Associació Veïnal del Raval d'Elx · XII Concurs de Carrers Engalanats · Sant Joan 2025
  </footer>
</body>
</html>`;

  return new Response(html, {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'public, max-age=300',
      ...SECURITY_HEADERS,
    },
  });
}
