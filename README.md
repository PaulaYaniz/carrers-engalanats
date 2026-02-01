# 🔥 Carrers Engalanats del Raval d'Elx

Plataforma de votació digital professional per al XII Concurs de Carrers Engalanats de les Festes de Sant Joan, organitzat per l'Associació Veïnal del Raval d'Elx.

**Tradició des de 2011** · XII Edició 2026 · Una tradició que ens uneix

## 🏗️ Stack Tecnològic

- **Frontend:** HTML/CSS/JavaScript (Catalan)
- **Backend:** TypeScript + Cloudflare Workers
- **Base de dades:** D1 (SQLite a l'edge)
- **Testing:** Vitest amb @cloudflare/vitest-pool-workers
- **Desplegament:** Wrangler CLI

## ✨ Funcionalitats

### Core
- ✅ Votació pública amb validació d'email
- ✅ Detecció de vots duplicats amb hash SHA-256
- ✅ Galeria responsive dels 6 carrers participants
- ✅ Pàgina de resultats en temps real amb animacions
- ✅ Panel d'administració protegit
- ✅ Exportació de dades a CSV
- ✅ Rate limiting (10 peticions/minut per IP)
- ✅ Accessibilitat WCAG AA
- ✅ Interfície 100% en català

### Disseny Professional (v2.0)
- 🎨 **Disseny artístic i modern** amb tipografia professional
- 🔥 **Colors de Sant Joan** (vermell, taronja, groc)
- 📖 **Context històric** de la tradició del Raval (des de 2011)
- 🏆 **Animacions sofisticades** (hover, pulse, shimmer)
- 📱 **Totalment responsive** amb transicions suaus
- 🎯 **Hero sections** amb informació contextual
- 🌟 **Secció educativa** sobre creativitat, sostenibilitat i comunitat

## 🚀 Inici Ràpid

### 1. Instal·lar dependències

```bash
npm install
```

### 2. Configurar la base de dades local

Les taules ja estan creades. Verifica que existeixen:

```bash
npx wrangler d1 execute votacio-db --local --command "SELECT COUNT(*) FROM streets"
```

### 3. Afegir imatges dels carrers

Afegeix imatges dels 6 carrers a `public/images/streets/`:

- `travesia-sant-roc.jpg`
- `joaquin-santo.jpg`
- `venturo.jpg`
- `fossar.jpg`
- `porta-xiquica.jpg`
- `filet-de-dins.jpg`

### 4. Executar en mode desenvolupament

```bash
npm run dev
```

El servidor estarà disponible a `http://localhost:8787`

## 🧪 Tests

Executar tots els tests:

```bash
npm test
```

Tests disponibles:
- ✅ Validació d'emails i hash SHA-256
- ✅ Submissió de vots i detecció de duplicats
- ✅ API de resultats
- ✅ Autenticació admin

## 📚 API Endpoints

### Públics

- `GET /` - Pàgina principal de votació
- `GET /resultats` - Pàgina de resultats públics
- `POST /api/vot` - Enviar vot
  ```json
  {
    "street_id": 1,
    "email": "email@exemple.com"
  }
  ```
- `GET /api/carrers` - Llistat de tots els carrers
- `GET /api/resultats` - Recompte de vots (amb caché 30s)

### Admin (requereixen autenticació)

- `POST /api/admin/login` - Login admin
  ```json
  {
    "password": "contrasenya-admin"
  }
  ```
- `GET /api/admin/dashboard` - Dashboard HTML
- `GET /api/admin/resultats` - Resultats detallats
- `POST /api/admin/export` - Exportar vots a CSV
- `DELETE /api/admin/reset` - Esborrar tots els vots

## 🔐 Configurar Contrasenya Admin

Abans de desplegar a producció, configura la contrasenya d'admin:

```bash
npx wrangler secret put ADMIN_PASSWORD
# Introdueix una contrasenya forta quan se't demani
```

## 🌐 Desplegament a Producció

### 1. Crear la base de dades remota

```bash
npx wrangler d1 execute votacio-db --remote --file=./schema.sql
npx wrangler d1 execute votacio-db --remote --file=./seed.sql
```

### 2. Desplegar el worker

```bash
npm run deploy
```

El projecte estarà disponible a la URL proporcionada per Cloudflare (ex: `https://carrers-engalanats.your-subdomain.workers.dev`).

### 3. Verificar el desplegament

```bash
curl https://carrers-engalanats.your-subdomain.workers.dev/api/carrers
```

## 📊 Estructura del Projecte

```
carrers-engalanats/
├── src/
│   ├── index.ts              # Router principal
│   ├── types.ts              # Definicions TypeScript
│   ├── handlers/             # Gestors d'endpoints
│   │   ├── vote.ts
│   │   ├── results.ts
│   │   └── admin.ts
│   ├── services/             # Lògica de negoci
│   │   ├── email-validator.ts
│   │   ├── vote-service.ts
│   │   └── auth-service.ts
│   ├── ui/                   # Templates HTML
│   │   ├── voting-page.ts
│   │   ├── results-page.ts
│   │   └── admin-page.ts
│   └── utils/                # Utilitats
│       ├── validators.ts
│       └── rate-limiter.ts
├── public/                   # Assets estàtics
│   └── images/streets/
├── test/                     # Tests
├── schema.sql                # Esquema de BD
├── seed.sql                  # Dades inicials
├── wrangler.jsonc            # Configuració Cloudflare
└── package.json
```

## 🔒 Seguretat

- **SQL Injection:** Totes les queries usen statements parametritzats
- **XSS:** Tots els inputs d'usuari s'escapen al HTML
- **Rate Limiting:** 10 peticions/minut per IP
- **Privacitat:** Emails hasheats amb SHA-256 (no es guarden en text pla)
- **Auth Admin:** Password fort via secrets, tokens amb expiració 24h

## 🎯 Optimitzacions

- **Caché:** API de resultats amb TTL de 30s
- **Índexs DB:** Tots els FKs i columnes consultades
- **CDN:** Cloudflare cacheja automàticament els assets
- **Edge Computing:** Worker desplegat globalment

## 📖 Ús

### Per a votants

1. Visita la pàgina principal
2. Revisa la galeria de carrers decorats
3. Selecciona el teu carrer favorit
4. Introdueix el teu email
5. Envia el vot

### Per a administradors

1. Visita `/api/admin/dashboard`
2. Introdueix la contrasenya d'admin
3. Revisa estadístiques i vots
4. Exporta dades a CSV si cal
5. Gestiona els vots

## 🐛 Solució de Problemes

### Error: "database not found"

Assegura't que has executat les migracions:

```bash
npx wrangler d1 execute votacio-db --local --file=./schema.sql
npx wrangler d1 execute votacio-db --local --file=./seed.sql
```

### Les imatges no es carreguen

Verifica que les imatges existeixen a `public/images/streets/` amb els noms correctes.

### Tests fallen

Regenera els tipus de Cloudflare:

```bash
npm run cf-typegen
```

## 📝 Llicència

Projecte creat per l'Associació Veïnal Raval.

## 🤝 Contribucions

Per reportar errors o suggerir millores, contacta amb l'Associació Veïnal Raval.

---

**Nota:** Aquest projecte pot escalar a 10.000+ usuaris sense modificacions gràcies a l'arquitectura serverless de Cloudflare Workers.
