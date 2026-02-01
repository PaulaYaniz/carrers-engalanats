// Type definitions per a Carrers Engalanats

export interface Street {
  id: number;
  name: string;
  display_name: string;
  image_url: string;
  description: string | null;
  created_at: string;
}

export interface Vote {
  id: number;
  street_id: number;
  email_hash: string;
  ip_address: string | null;
  user_agent: string | null;
  voted_at: string;
}

export interface EmailVote {
  email_hash: string;
  voted_at: string;
  vote_id: number;
}

export interface AdminSession {
  token: string;
  created_at: string;
  expires_at: string;
}

export interface VoteRequest {
  street_id: number;
  email: string;
}

export interface VoteResponse {
  success: boolean;
  message: string;
  vote_id?: number;
}

export interface StreetResult {
  street_id: number;
  name: string;
  display_name: string;
  vote_count: number;
  percentage: number;
}

export interface ResultsResponse {
  total_votes: number;
  results: StreetResult[];
  last_updated: string;
}

export interface AdminLoginRequest {
  password: string;
}

export interface AdminLoginResponse {
  success: boolean;
  token?: string;
  message: string;
}

export interface Env {
  DB: D1Database;
  ASSETS: Fetcher;
  ADMIN_PASSWORD: string;
}

export interface RateLimitEntry {
  count: number;
  resetAt: number;
}
