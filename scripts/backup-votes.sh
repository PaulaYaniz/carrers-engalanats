#!/bin/bash

# Script de backup dels vots
# Executar amb: bash scripts/backup-votes.sh

set -e

BACKUP_DIR="backups"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="${BACKUP_DIR}/votes_${TIMESTAMP}.csv"

echo "💾 Fent backup dels vots..."

# Crear directori de backups si no existeix
mkdir -p "$BACKUP_DIR"

# Exportar vots de la BD remota
echo "Exportant vots de la base de dades remota..."
npx wrangler d1 execute votacio-db --remote --command "
  SELECT
    v.id,
    s.display_name as carrer,
    v.voted_at as data_hora,
    v.ip_address as ip
  FROM votes v
  JOIN streets s ON v.street_id = s.id
  ORDER BY v.voted_at DESC
" --json > "${BACKUP_FILE}.json"

echo "✅ Backup guardat a: ${BACKUP_FILE}.json"

# També obtenir estadístiques
STATS_FILE="${BACKUP_DIR}/stats_${TIMESTAMP}.txt"
npx wrangler d1 execute votacio-db --remote --command "
  SELECT
    s.display_name as carrer,
    COUNT(v.id) as num_vots
  FROM streets s
  LEFT JOIN votes v ON s.id = v.street_id
  GROUP BY s.id
  ORDER BY num_vots DESC
" > "$STATS_FILE"

echo "✅ Estadístiques guardades a: ${STATS_FILE}"

# Mostrar resum
echo ""
echo "📊 Resum del backup:"
TOTAL_VOTES=$(npx wrangler d1 execute votacio-db --remote --command "SELECT COUNT(*) as total FROM votes" --json | grep -o '"total":[0-9]*' | cut -d':' -f2)
echo "Total de vots: ${TOTAL_VOTES}"
echo ""
echo "Backups disponibles:"
ls -lh "$BACKUP_DIR"
