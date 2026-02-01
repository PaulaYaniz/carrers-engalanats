#!/bin/bash

# Script de desplegament a producció per Carrers Engalanats
# Executar amb: bash scripts/deploy-production.sh

set -e

echo "🚀 Desplegant Carrers Engalanats a producció..."

# 1. Verificar que estem al directori correcte
if [ ! -f "wrangler.jsonc" ]; then
  echo "❌ Error: No estàs al directori del projecte"
  exit 1
fi

# 2. Executar tests
echo "🧪 Executant tests..."
npm test || {
  echo "❌ Tests fallats. Corregeix els errors abans de desplegar."
  exit 1
}

# 3. Verificar imatges
echo "🖼️ Verificant imatges..."
MISSING_IMAGES=0
for img in travesia-sant-roc joaquin-santo venturo fossar porta-xiquica filet-de-dins; do
  if [ ! -f "public/images/streets/${img}.jpg" ]; then
    echo "⚠️ Imatge no trobada: ${img}.jpg"
    MISSING_IMAGES=1
  fi
done

if [ $MISSING_IMAGES -eq 1 ]; then
  echo "❌ Falten imatges. Afegeix-les abans de desplegar."
  exit 1
fi

# 4. Verificar ADMIN_PASSWORD
echo "🔐 Verificant ADMIN_PASSWORD..."
echo "Assegura't que has configurat la contrasenya d'admin:"
echo "  npx wrangler secret put ADMIN_PASSWORD"
read -p "Has configurat ADMIN_PASSWORD? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
  echo "Configura'l primer i torna a executar aquest script"
  exit 1
fi

# 5. Crear/verificar BD remota
echo "🗄️ Configurant base de dades remota..."
read -p "Vols executar les migracions de BD? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
  echo "Executant schema.sql..."
  npx wrangler d1 execute votacio-db --remote --file=./schema.sql
  echo "Executant seed.sql..."
  npx wrangler d1 execute votacio-db --remote --file=./seed.sql
  echo "✅ Base de dades configurada"
fi

# 6. Build i deploy
echo "📦 Desplegant..."
npm run deploy

echo ""
echo "✅ Desplegament completat!"
echo ""
echo "Verifica el desplegament:"
echo "  curl https://carrers-engalanats.your-subdomain.workers.dev/api/carrers"
echo ""
echo "Monitoritza logs en temps real:"
echo "  npx wrangler tail"
