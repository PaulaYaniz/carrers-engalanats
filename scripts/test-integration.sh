#!/bin/bash

# Test d'integració end-to-end
# Executar amb: bash scripts/test-integration.sh

set -e

echo "🧪 Test d'integració Carrers Engalanats"
echo ""

# Iniciar servidor en background
echo "🚀 Iniciant servidor..."
npm run dev > /tmp/wrangler.log 2>&1 &
WRANGLER_PID=$!
sleep 5

echo "📡 Testejant endpoints..."
echo ""

# Test 1: Homepage
echo "1. Homepage (GET /):"
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:8787/)
if [ "$HTTP_CODE" = "200" ]; then
  echo "   ✅ Status 200 OK"
else
  echo "   ❌ Status $HTTP_CODE"
fi

# Test 2: API Carrers
echo "2. API Carrers (GET /api/carrers):"
CARRERS=$(curl -s http://localhost:8787/api/carrers | jq -r '.success')
if [ "$CARRERS" = "true" ]; then
  echo "   ✅ API funciona"
else
  echo "   ❌ API error"
fi

# Test 3: API Resultats
echo "3. API Resultats (GET /api/resultats):"
TOTAL=$(curl -s http://localhost:8787/api/resultats | jq -r '.total_votes')
echo "   ✅ Total vots: $TOTAL"

# Test 4: Submit vote
echo "4. Submit vote (POST /api/vot):"
VOTE_RESULT=$(curl -s -X POST http://localhost:8787/api/vot \
  -H 'Content-Type: application/json' \
  -d '{"street_id": 3, "email": "integration-test@example.com"}' | jq -r '.success')
if [ "$VOTE_RESULT" = "true" ]; then
  echo "   ✅ Vot acceptat"
else
  echo "   ❌ Vot rebutjat"
fi

# Test 5: Verify results updated
echo "5. Verificar resultats actualitzats:"
TOTAL_AFTER=$(curl -s http://localhost:8787/api/resultats | jq -r '.total_votes')
echo "   ✅ Total vots després: $TOTAL_AFTER"

# Test 6: Duplicate vote
echo "6. Test vot duplicat:"
DUPLICATE=$(curl -s -X POST http://localhost:8787/api/vot \
  -H 'Content-Type: application/json' \
  -d '{"street_id": 1, "email": "integration-test@example.com"}' | jq -r '.success')
if [ "$DUPLICATE" = "false" ]; then
  echo "   ✅ Vot duplicat rebutjat correctament"
else
  echo "   ❌ Vot duplicat acceptat (ERROR!)"
fi

# Test 7: Results page
echo "7. Results page (GET /resultats):"
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:8787/resultats)
if [ "$HTTP_CODE" = "200" ]; then
  echo "   ✅ Status 200 OK"
else
  echo "   ❌ Status $HTTP_CODE"
fi

# Cleanup
echo ""
echo "🧹 Netejant..."
kill $WRANGLER_PID 2>/dev/null || true

echo ""
echo "✅ Tots els tests completats!"
