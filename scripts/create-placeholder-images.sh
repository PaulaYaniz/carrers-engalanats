#!/bin/bash

# Script per crear imatges placeholder per als carrers
# Crea imatges SVG que es poden convertir a JPG després

mkdir -p public/images/streets

# Colors per cada carrer (inspirats en Sant Joan)
declare -A colors=(
  ["travesia-sant-roc"]="#D32F2F"
  ["joaquin-santo"]="#F57C00"
  ["venturo"]="#FBC02D"
  ["fossar"]="#E91E63"
  ["porta-xiquica"]="#9C27B0"
  ["filet-de-dins"]="#00BCD4"
)

declare -A names=(
  ["travesia-sant-roc"]="C/ Travesia Sant Roc"
  ["joaquin-santo"]="C/ Joaquín Santo"
  ["venturo"]="C/ Venturo"
  ["fossar"]="C/ Fossar"
  ["porta-xiquica"]="C/ Porta Xiquica"
  ["filet-de-dins"]="C/ Filet de Dins"
)

# Crear SVG per cada carrer
for street in "${!colors[@]}"; do
  color="${colors[$street]}"
  name="${names[$street]}"

  cat > "public/images/streets/${street}.svg" << EOF
<svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
  <!-- Gradient background -->
  <defs>
    <linearGradient id="grad-${street}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${color};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${color};stop-opacity:0.7" />
    </linearGradient>
    <pattern id="pattern-${street}" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
      <circle cx="50" cy="50" r="40" fill="${color}" opacity="0.1"/>
    </pattern>
  </defs>

  <!-- Background -->
  <rect width="800" height="600" fill="url(#grad-${street})"/>
  <rect width="800" height="600" fill="url(#pattern-${street})"/>

  <!-- Decorative elements -->
  <circle cx="100" cy="100" r="80" fill="white" opacity="0.15"/>
  <circle cx="700" cy="500" r="100" fill="white" opacity="0.15"/>
  <circle cx="400" cy="300" r="150" fill="white" opacity="0.1"/>

  <!-- Icon -->
  <text x="400" y="250" font-family="Arial, sans-serif" font-size="120" fill="white" text-anchor="middle">🎨</text>

  <!-- Street name -->
  <text x="400" y="380" font-family="Arial, sans-serif" font-size="48" font-weight="bold" fill="white" text-anchor="middle">${name}</text>

  <!-- Subtitle -->
  <text x="400" y="430" font-family="Arial, sans-serif" font-size="24" fill="white" opacity="0.9" text-anchor="middle">Carrers Engalanats Sant Joan</text>

  <!-- Year -->
  <text x="400" y="520" font-family="Arial, sans-serif" font-size="32" fill="white" opacity="0.8" text-anchor="middle">2026</text>
</svg>
EOF

  echo "✅ Creat placeholder per ${name}"
done

echo ""
echo "🎨 Imatges placeholder creades a public/images/streets/"
echo ""
echo "Per convertir a JPG (requereix ImageMagick):"
echo "  brew install imagemagick  # si no el tens"
echo "  cd public/images/streets"
echo "  for f in *.svg; do convert \$f \${f%.svg}.jpg; done"
echo ""
echo "O simplement substitueix els SVG per les teves fotos reals en format JPG"
