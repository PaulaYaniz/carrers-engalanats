#!/bin/bash

# Script de configuració local per Carrers Engalanats
# Executar amb: bash scripts/setup-local.sh

set -e

echo "🎉 Configurant Carrers Engalanats..."

# 1. Instal·lar dependències
echo "📦 Instal·lant dependències..."
npm install

# 2. Generar tipus TypeScript
echo "🔧 Generant tipus de TypeScript..."
npm run cf-typegen

# 3. Verificar que la BD local existeix
echo "🗄️ Verificant base de dades local..."
if npx wrangler d1 execute votacio-db --local --command "SELECT COUNT(*) FROM streets" > /dev/null 2>&1; then
  echo "✅ Base de dades ja existeix"
else
  echo "⚠️ Base de dades no trobada. Creant-la..."
  npx wrangler d1 execute votacio-db --local --file=./schema.sql
  npx wrangler d1 execute votacio-db --local --file=./seed.sql
  echo "✅ Base de dades creada"
fi

# 4. Verificar imatges
echo "🖼️ Verificant imatges..."
if [ -f "public/images/streets/travesia-sant-roc.jpg" ]; then
  echo "✅ Imatges trobades"
else
  echo "⚠️ Imatges no trobades a public/images/streets/"
  echo "   Afegeix les imatges dels 6 carrers abans de continuar"
fi

# 5. Tests
echo "🧪 Executant tests..."
npm test

echo ""
echo "✅ Configuració completada!"
echo ""
echo "Per iniciar el servidor de desenvolupament:"
echo "  npm run dev"
echo ""
echo "El servidor estarà disponible a http://localhost:8787"
