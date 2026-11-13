// Pàgina de resultats - Carrers Engalanats
// Resultats definitius renderitzats al servidor a partir de dades estàtiques.

import { CLASSIFICACIO, PERIODE_VOTACIO, TOTAL_VOTS } from '../data/resultats';
import { escapeHtml, formatNumero, formatPercentatge, ordinal, renderLayout } from './layout';

const CSS = `
    .page-title { font-size: 2rem; font-weight: 700; letter-spacing: -0.025em; margin-bottom: 0.25rem; }
    .page-subtitle { color: var(--color-gray-500); margin-bottom: 2rem; }
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
    }
    .stat-card { background: white; border: 1px solid var(--color-gray-200); border-radius: 0.75rem; padding: 1.5rem; }
    .stat-label {
      font-size: 0.75rem; font-weight: 600; color: var(--color-gray-500);
      text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.5rem;
    }
    .stat-value { font-size: 2.5rem; font-weight: 700; font-family: var(--font-mono); line-height: 1; }
    .stat-value.text { font-size: 1.5rem; font-family: var(--font-base); line-height: 1.2; }
    .section-header {
      display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem;
      margin-bottom: 1.5rem; padding-bottom: 1rem; border-bottom: 1px solid var(--color-gray-200);
    }
    .section-title { font-size: 1.5rem; font-weight: 600; }
    .section-meta { font-size: 0.75rem; color: var(--color-gray-500); font-family: var(--font-mono); }
    .results-list { list-style: none; display: grid; gap: 1rem; }
    .result-item {
      display: grid;
      grid-template-columns: 96px 1fr;
      gap: 1.25rem;
      align-items: center;
      padding: 1rem;
      border: 1px solid var(--color-gray-200);
      border-radius: 0.5rem;
    }
    .result-item.rank-1 {
      border: 2px solid var(--color-primary);
      background: linear-gradient(to right, rgba(37, 99, 235, 0.04), transparent);
    }
    .thumb { width: 96px; height: 96px; object-fit: cover; border-radius: 0.5rem; background: var(--color-gray-100); display: block; }
    .result-top { display: flex; align-items: baseline; gap: 0.75rem; flex-wrap: wrap; margin-bottom: 0.25rem; }
    .rank-badge {
      display: inline-block; min-width: 2.25rem; padding: 0 0.4rem; height: 2rem; line-height: 2rem;
      background: var(--color-gray-100); border-radius: 0.375rem; text-align: center;
      font-weight: 700; font-family: var(--font-mono); color: var(--color-gray-700); font-size: 0.875rem;
    }
    .rank-1 .rank-badge { background: var(--color-primary); color: white; }
    .winner-tag {
      font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;
      color: var(--color-primary); font-family: var(--font-mono);
    }
    .street-name { font-size: 1.125rem; font-weight: 600; }
    .vote-stats { display: flex; gap: 1.5rem; font-size: 0.875rem; color: var(--color-gray-600); font-family: var(--font-mono); margin-bottom: 0.5rem; }
    .vote-count { font-weight: 600; color: var(--color-gray-900); }
    .progress-bar { height: 0.75rem; background: var(--color-gray-100); border-radius: 0.375rem; overflow: hidden; }
    .progress-fill { height: 100%; background: var(--color-gray-400); }
    .rank-1 .progress-fill { background: linear-gradient(90deg, var(--color-primary), var(--color-secondary)); }
    .privacy { font-size: 0.8rem; color: var(--color-gray-500); margin-top: 1.5rem; }
    .actions { text-align: center; }
    @media (max-width: 600px) {
      .result-item { grid-template-columns: 64px 1fr; gap: 0.75rem; }
      .thumb { width: 64px; height: 64px; }
      .vote-stats { flex-direction: column; gap: 0.1rem; }
      .page-title { font-size: 1.5rem; }
    }
`;

export function renderResultsPage(): Response {
  const guanyador = CLASSIFICACIO[0];

  const files = CLASSIFICACIO.map((r) => `
        <li class="result-item rank-${r.posicio}">
          <img class="thumb" src="${escapeHtml(r.carrer.imatge)}" alt="" loading="lazy">
          <div>
            <div class="result-top">
              <span class="rank-badge">${ordinal(r.posicio)}</span>
              <h3 class="street-name">${escapeHtml(r.carrer.nom)}</h3>
              ${r.posicio === 1 ? '<span class="winner-tag">Guanyador</span>' : ''}
            </div>
            <div class="vote-stats">
              <span>Vots: <span class="vote-count">${formatNumero(r.vots)}</span></span>
              <span>Percentatge: <span class="vote-count">${formatPercentatge(r.percentatge)}</span></span>
            </div>
            <div class="progress-bar" role="img" aria-label="${escapeHtml(formatPercentatge(r.percentatge))} dels vots">
              <div class="progress-fill" style="width: ${r.percentatge}%"></div>
            </div>
          </div>
        </li>`).join('');

  const body = `
    <h1 class="page-title">Resultats definitius</h1>
    <p class="page-subtitle">Votació popular realitzada ${escapeHtml(PERIODE_VOTACIO)}.</p>

    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-label">Vots totals</div>
        <div class="stat-value">${formatNumero(TOTAL_VOTS)}</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Carrer guanyador</div>
        <div class="stat-value text">${escapeHtml(guanyador.carrer.nom)}</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Carrers participants</div>
        <div class="stat-value">${CLASSIFICACIO.length}</div>
      </div>
    </div>

    <section class="card" aria-labelledby="classificacio-title">
      <div class="section-header">
        <h2 class="section-title" id="classificacio-title">Classificació final</h2>
        <span class="section-meta">Un vot per persona</span>
      </div>
      <ol class="results-list">${files}
      </ol>
      <p class="privacy">
        Per a protegir la privacitat de les persones participants, només es publiquen
        els recomptes totals per carrer. No es mostra cap dada personal.
      </p>
    </section>

    <div class="actions">
      <a href="/" class="btn btn-secondary">Torna a l'inici</a>
    </div>`;

  return renderLayout({
    title: 'Resultats · Carrers Engalanats del Raval d\'Elx',
    description: 'Resultats definitius del concurs de Carrers Engalanats del Raval d\'Elx.',
    badge: 'Resultats definitius',
    css: CSS,
    body,
  });
}
