// Pàgina d'inici - Carrers Engalanats
// La votació està tancada: es mostren els carrers participants i l'enllaç als resultats.

import { CARRERS } from '../data/carrers';
import { CLASSIFICACIO, TOTAL_VOTS } from '../data/resultats';
import { escapeHtml, formatNumero, renderLayout } from './layout';

const CSS = `
    .hero { box-shadow: var(--shadow-sm); padding: 3rem; }
    .hero-title { font-size: 2rem; font-weight: 700; margin-bottom: 1rem; letter-spacing: -0.025em; }
    .hero-description { font-size: 1.125rem; color: var(--color-gray-600); max-width: 800px; line-height: 1.7; }
    .closed {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 1.5rem;
      border: 2px solid var(--color-primary);
      background: linear-gradient(to right, rgba(37, 99, 235, 0.04), white);
    }
    .closed-title { font-size: 1.25rem; font-weight: 600; margin-bottom: 0.25rem; }
    .closed-text { color: var(--color-gray-600); font-size: 0.95rem; }
    .info-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: 1.5rem;
      margin-bottom: 3rem;
    }
    .info-card { background: white; border: 1px solid var(--color-gray-200); border-radius: 0.75rem; padding: 1.5rem; }
    .info-card-header { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.75rem; }
    .info-card-icon {
      width: 2.5rem; height: 2.5rem;
      background: var(--color-gray-100);
      border-radius: 0.5rem;
      display: flex; align-items: center; justify-content: center;
      font-size: 1.25rem; color: var(--color-gray-700);
    }
    .info-card-title { font-size: 0.875rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; }
    .info-card-content { font-size: 0.875rem; color: var(--color-gray-600); }
    .section-header { display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem; }
    .section-title { font-size: 1.5rem; font-weight: 600; letter-spacing: -0.025em; }
    .section-count {
      font-size: 0.875rem; color: var(--color-gray-500); font-family: var(--font-mono);
      background: var(--color-gray-100); padding: 0.25rem 0.75rem; border-radius: 0.375rem;
    }
    .gallery {
      list-style: none;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
    }
    @media (max-width: 768px) { .gallery { grid-template-columns: 1fr; } .hero { padding: 1.5rem; } .hero-title { font-size: 1.5rem; } }
    .street-card { background: white; border: 1px solid var(--color-gray-200); border-radius: 0.75rem; overflow: hidden; }
    .street-image-container { position: relative; height: 260px; background: var(--color-gray-100); overflow: hidden; }
    .street-image { width: 100%; height: 100%; object-fit: cover; display: block; }
    .street-badge {
      position: absolute; top: 1rem; right: 1rem;
      background: rgba(255, 255, 255, 0.95);
      padding: 0.5rem 0.75rem; border-radius: 0.375rem;
      font-size: 0.75rem; font-weight: 600; color: var(--color-gray-700);
      font-family: var(--font-mono); box-shadow: var(--shadow-sm);
    }
    .street-info { padding: 1.5rem; }
    .street-name { font-size: 1.125rem; font-weight: 600; margin-bottom: 0.5rem; }
    .street-description { font-size: 0.875rem; color: var(--color-gray-600); }
`;

export function renderHomePage(): Response {
  const guanyador = CLASSIFICACIO[0];

  const galeria = CARRERS.map((carrer, i) => `
        <li class="street-card">
          <div class="street-image-container">
            <div class="street-badge">Carrer ${String(i + 1).padStart(2, '0')}</div>
            <img src="${escapeHtml(carrer.imatge)}" alt="Engalanament del ${escapeHtml(carrer.nom)}" class="street-image" loading="lazy">
          </div>
          <div class="street-info">
            <h3 class="street-name">${escapeHtml(carrer.nom)}</h3>
            <p class="street-description">${escapeHtml(carrer.descripcio)}</p>
          </div>
        </li>`).join('');

  const body = `
    <section class="card hero">
      <h1 class="hero-title">Concurs anual d'engalanament de carrers</h1>
      <p class="hero-description">
        Plataforma de votació veïnal de la XII edició de Carrers Engalanats. Este projecte,
        impulsat per l'Associació Veïnal del Raval l'any 2011, fomenta la participació del
        veïnat i celebra la tradició local amb els carrers engalanats durant les festes de Sant Joan.
      </p>
    </section>

    <section class="card closed" aria-labelledby="closed-title">
      <div>
        <h2 class="closed-title" id="closed-title">La votació ha finalitzat</h2>
        <p class="closed-text">
          Gràcies a les ${formatNumero(TOTAL_VOTS)} persones que hi heu participat.
          El carrer guanyador és el <strong>${escapeHtml(guanyador.carrer.nom)}</strong>.
        </p>
      </div>
      <a href="/resultats" class="btn btn-primary">Consulta els resultats</a>
    </section>

    <div class="info-grid">
      <div class="info-card">
        <div class="info-card-header">
          <div class="info-card-icon" aria-hidden="true">◆</div>
          <h2 class="info-card-title">Àmbit del projecte</h2>
        </div>
        <p class="info-card-content">
          Valoració de la qualitat artística, l'originalitat i la participació veïnal
          dels sis carrers participants del barri del Raval.
        </p>
      </div>
      <div class="info-card">
        <div class="info-card-header">
          <div class="info-card-icon" aria-hidden="true">◇</div>
          <h2 class="info-card-title">Criteris de valoració</h2>
        </div>
        <p class="info-card-content">
          Creativitat, ús de materials reciclats, qualitat del disseny i contribució
          a l'ambient del barri.
        </p>
      </div>
      <div class="info-card">
        <div class="info-card-header">
          <div class="info-card-icon" aria-hidden="true">◈</div>
          <h2 class="info-card-title">Recollida de dades</h2>
        </div>
        <p class="info-card-content">
          Un sol vot per persona, validat amb el correu electrònic per a garantir la
          integritat de les dades i evitar vots duplicats. Només es publiquen els totals.
        </p>
      </div>
      <div class="info-card">
        <div class="info-card-header">
          <div class="info-card-icon" aria-hidden="true">◉</div>
          <h2 class="info-card-title">Context històric</h2>
        </div>
        <p class="info-card-content">
          Tradició recuperada l'any 2011, que en 2025 celebra 12 anys de participació
          veïnal i de preservació cultural.
        </p>
      </div>
    </div>

    <section aria-labelledby="carrers-title">
      <div class="section-header">
        <h2 class="section-title" id="carrers-title">Carrers participants</h2>
        <span class="section-count">${CARRERS.length} participants</span>
      </div>
      <ul class="gallery">${galeria}
      </ul>
    </section>`;

  return renderLayout({
    title: 'Carrers Engalanats del Raval d\'Elx',
    description: 'Concurs de Carrers Engalanats del Raval d\'Elx: carrers participants i resultats de la votació.',
    badge: 'Votació tancada',
    css: CSS,
    body,
  });
}
