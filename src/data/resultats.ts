// Resultats definitius de la votació - Carrers Engalanats
//
// Font: formulari "Concurs Carrers Engalanats (respuestas)".
// Generat amb scripts/aggregate-results.py: només es publiquen els recomptes
// totals per carrer. Cap correu electrònic ni marca temporal individual
// arriba a este fitxer.
//
// Els resultats estan fixats al codi: no hi ha cap ruta de la web que
// permeta modificar-los. Per a canviar-los cal editar este fitxer i tornar
// a publicar el Worker.

import { CARRERS, type Carrer } from './carrers';

export const PERIODE_VOTACIO = 'del 14 al 21 de juny de 2025';

// Vots vàlids per carrer (1.075 respostes, 0 correus duplicats).
const VOTS_PER_SLUG: Readonly<Record<string, number>> = Object.freeze({
  'fossar': 456,
  'travesia-sant-roc': 318,
  'joaquin-santo': 227,
  'filet-de-dins': 46,
  'porta-xiquica': 19,
  'venturo': 9,
});

export interface ResultatCarrer {
  posicio: number;
  carrer: Carrer;
  vots: number;
  percentatge: number;
}

export const TOTAL_VOTS = Object.values(VOTS_PER_SLUG).reduce((a, b) => a + b, 0);

export const CLASSIFICACIO: readonly ResultatCarrer[] = Object.freeze(
  [...CARRERS]
    .map((carrer) => ({ carrer, vots: VOTS_PER_SLUG[carrer.slug] ?? 0 }))
    .sort((a, b) => b.vots - a.vots || a.carrer.nom.localeCompare(b.carrer.nom, 'ca'))
    .map((r, i) => Object.freeze({
      posicio: i + 1,
      carrer: r.carrer,
      vots: r.vots,
      percentatge: TOTAL_VOTS > 0 ? Math.round((r.vots / TOTAL_VOTS) * 1000) / 10 : 0,
    })),
);
