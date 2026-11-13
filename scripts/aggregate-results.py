#!/usr/bin/env python3
"""Compta els vots del formulari de Google i imprimeix NOMÉS els totals per carrer.

Ús:  python3 -I scripts/aggregate-results.py "Concurs Carrers Engalanats (respuestas).xlsx"

El fitxer .xlsx conté correus electrònics de les persones votants: no el pugeu
mai al repositori (està inclòs a .gitignore). Este script no imprimeix cap
correu; només els recomptes, que són els que es copien a src/data/resultats.ts.
Si un mateix correu ha votat més d'una vegada, només compta el primer vot.
"""
import collections
import sys

import openpyxl

SLUGS = {
    'C/ Travesia Sant Roc': 'travesia-sant-roc',
    'C/ Joaquín Santo': 'joaquin-santo',
    'C/ Venturo': 'venturo',
    'C/ Fossar': 'fossar',
    'C/ Porta Xiquica Sant Joan': 'porta-xiquica',
    'C/ Filet de Dins': 'filet-de-dins',
}


def main(path: str) -> None:
    ws = openpyxl.load_workbook(path, read_only=True, data_only=True).active
    rows = [r for r in ws.iter_rows(min_row=2, values_only=True) if r and any(r)]
    rows.sort(key=lambda r: r[0])

    seen, counts, duplicates = set(), collections.Counter(), 0
    for timestamp, email, street, *_ in rows:
        key = (email or '').strip().lower()
        if not key or key in seen:
            duplicates += 1
            continue
        seen.add(key)
        if street not in SLUGS:
            sys.exit(f'Carrer desconegut al formulari: {street!r}')
        counts[SLUGS[street]] += 1

    print(f'Respostes: {len(rows)}  ·  vàlides: {sum(counts.values())}  ·  descartades: {duplicates}')
    print(f'Període: {rows[0][0]:%Y-%m-%d} - {rows[-1][0]:%Y-%m-%d}')
    for slug, n in counts.most_common():
        print(f"  '{slug}': {n},")


if __name__ == '__main__':
    main(sys.argv[1])
