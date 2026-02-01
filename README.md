# Carrers Engalanats del Raval d'Elx

Professional digital voting platform for the XII Street Decoration Competition of Sant Joan Festivities, organized by Associació Veïnal del Raval d'Elx.

<img width="1139" height="810" alt="avraval" src="https://github.com/user-attachments/assets/e62135c1-f114-40c7-b849-636f53951603" />


## Tech Stack

- **Frontend:** HTML/CSS/JavaScript (Catalan)
- **Backend:** TypeScript + Cloudflare Workers
- **Database:** D1 (SQLite at the edge)
- **Testing:** Vitest with @cloudflare/vitest-pool-workers
- **Deployment:** Wrangler CLI

## Features

### Core
- Public voting with email validation
- Duplicate vote detection with SHA-256 hashing
- Responsive gallery of 6 participating streets
- Real-time results page with animations
- Protected administration panel
- CSV data export
- Rate limiting (10 requests/minute per IP)
- WCAG AA accessibility
- 100% Catalan interface

### Professional Design
- Modern artistic design with professional typography
- Sant Joan colors (red, orange, yellow)
- Sophisticated animations (hover, pulse, shimmer)
- Fully responsive with smooth transitions
- Hero sections with contextual information
- Educational section on creativity, sustainability and community

## Quick Start

### 1. Install dependencies

```bash
npm install
```

### 2. Configure local database

Tables are already created. Verify they exist:

```bash
npx wrangler d1 execute votacio-db --local --command "SELECT COUNT(*) FROM streets"
```

### 3. Add street images

Add images of the 6 streets to `public/images/streets/`:

- `travesia-sant-roc.jpg`
- `joaquin-santo.jpg`
- `venturo.jpg`
- `fossar.jpg`
- `porta-xiquica.jpg`
- `filet-de-dins.jpg`

### 4. Run in development mode

```bash
npm run dev
```

Server will be available at `http://localhost:8787`

## Tests

Run all tests:

```bash
npm test
```

Available tests:
- Email validation and SHA-256 hashing
- Vote submission and duplicate detection
- Results API
- Admin authentication

## API Endpoints

### Public

- `GET /` - Main voting page
- `GET /resultats` - Public results page
- `POST /api/vot` - Submit vote
  ```json
  {
    "street_id": 1,
    "email": "email@example.com"
  }
  ```
- `GET /api/carrers` - List all streets
- `GET /api/resultats` - Vote count (with 30s cache)

### Admin (requires authentication)

- `POST /api/admin/login` - Admin login
  ```json
  {
    "password": "admin-password"
  }
  ```
- `GET /api/admin/dashboard` - HTML dashboard
- `GET /api/admin/resultats` - Detailed results
- `POST /api/admin/export` - Export votes to CSV
- `DELETE /api/admin/reset` - Delete all votes

## Configure Admin Password

Before deploying to production, configure admin password:

```bash
npx wrangler secret put ADMIN_PASSWORD
# Enter a strong password when prompted
```

## Production Deployment

### 1. Create remote database

```bash
npx wrangler d1 execute votacio-db --remote --file=./schema.sql
npx wrangler d1 execute votacio-db --remote --file=./seed.sql
```

### 2. Deploy worker

```bash
npm run deploy
```

Project will be available at the URL provided by Cloudflare (e.g., `https://carrers-engalanats.your-subdomain.workers.dev`).

### 3. Verify deployment

```bash
curl https://carrers-engalanats.your-subdomain.workers.dev/api/carrers
```

## Project Structure

```
carrers-engalanats/
├── src/
│   ├── index.ts              # Main router
│   ├── types.ts              # TypeScript definitions
│   ├── handlers/             # Endpoint handlers
│   │   ├── vote.ts
│   │   ├── results.ts
│   │   └── admin.ts
│   ├── services/             # Business logic
│   │   ├── email-validator.ts
│   │   ├── vote-service.ts
│   │   └── auth-service.ts
│   ├── ui/                   # HTML templates
│   │   ├── voting-page.ts
│   │   ├── results-page.ts
│   │   └── admin-page.ts
│   └── utils/                # Utilities
│       ├── validators.ts
│       └── rate-limiter.ts
├── public/                   # Static assets
│   └── images/streets/
├── test/                     # Tests
├── schema.sql                # Database schema
├── seed.sql                  # Initial data
├── wrangler.jsonc            # Cloudflare configuration
└── package.json
```

## Security

- **SQL Injection:** All queries use parameterized statements
- **XSS:** All user inputs are escaped in HTML
- **Rate Limiting:** 10 requests/minute per IP
- **Privacy:** Emails hashed with SHA-256 (not stored in plain text)
- **Admin Auth:** Strong password via secrets, tokens with 24h expiration

## Optimizations

- **Cache:** Results API with 30s TTL
- **DB Indexes:** All FKs and queried columns indexed
- **CDN:** Cloudflare automatically caches assets
- **Edge Computing:** Worker deployed globally

## Usage

### For voters

1. Visit main page
2. Review gallery of decorated streets
3. Select your favorite street
4. Enter your email
5. Submit vote

### For administrators

1. Visit `/api/admin/dashboard`
2. Enter admin password
3. Review statistics and votes
4. Export data to CSV if needed
5. Manage votes

## Troubleshooting

### Error: "database not found"

Make sure you have run the migrations:

```bash
npx wrangler d1 execute votacio-db --local --file=./schema.sql
npx wrangler d1 execute votacio-db --local --file=./seed.sql
```

### Images not loading

Verify that images exist at `public/images/streets/` with correct names.

### Tests failing

Regenerate Cloudflare types:

```bash
npm run cf-typegen
```

## License

Project created by Associació Veïnal Raval.

## Contributions

To report errors or suggest improvements, contact Associació Veïnal Raval.

---

**Note:** This project can scale to 10,000+ users without modifications thanks to Cloudflare Workers serverless architecture.
