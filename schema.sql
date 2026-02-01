-- Esquema de base de dades per a la plataforma de votació
-- Carrers Engalanats - Associació Veïnal Raval

-- Taula de carrers (dades estàtiques)
CREATE TABLE IF NOT EXISTS streets (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE,
  display_name TEXT NOT NULL,
  image_url TEXT NOT NULL,
  description TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- Taula de vots
CREATE TABLE IF NOT EXISTS votes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  street_id INTEGER NOT NULL,
  email_hash TEXT NOT NULL,
  ip_address TEXT,
  user_agent TEXT,
  voted_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (street_id) REFERENCES streets(id)
);

-- Tracking de duplicats per email
CREATE TABLE IF NOT EXISTS email_votes (
  email_hash TEXT PRIMARY KEY,
  voted_at TEXT DEFAULT CURRENT_TIMESTAMP,
  vote_id INTEGER NOT NULL,
  FOREIGN KEY (vote_id) REFERENCES votes(id)
);

-- Sessions d'admin
CREATE TABLE IF NOT EXISTS admin_sessions (
  token TEXT PRIMARY KEY,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  expires_at TEXT NOT NULL
);

-- Índexs per rendiment
CREATE INDEX IF NOT EXISTS idx_votes_street_id ON votes(street_id);
CREATE INDEX IF NOT EXISTS idx_votes_voted_at ON votes(voted_at);
CREATE INDEX IF NOT EXISTS idx_email_votes_hash ON email_votes(email_hash);
