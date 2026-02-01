// Tests de validació d'emails - Carrers Engalanats

import { describe, it, expect } from 'vitest';
import { isValidEmail, normalizeEmail } from '../src/utils/validators';
import { hashEmail } from '../src/services/email-validator';

describe('Email Validation', () => {
  it('should validate correct emails', () => {
    expect(isValidEmail('test@example.com')).toBe(true);
    expect(isValidEmail('user.name@domain.co.uk')).toBe(true);
    expect(isValidEmail('user+tag@example.com')).toBe(true);
  });

  it('should reject invalid emails', () => {
    expect(isValidEmail('invalid')).toBe(false);
    expect(isValidEmail('invalid@')).toBe(false);
    expect(isValidEmail('@invalid.com')).toBe(false);
    expect(isValidEmail('invalid@domain')).toBe(false);
    expect(isValidEmail('')).toBe(false);
  });

  it('should normalize emails', () => {
    expect(normalizeEmail('TEST@EXAMPLE.COM')).toBe('test@example.com');
    expect(normalizeEmail('  user@domain.com  ')).toBe('user@domain.com');
    expect(normalizeEmail('  USER@DOMAIN.COM  ')).toBe('user@domain.com');
  });

  it('should generate consistent hashes for same email', async () => {
    const email1 = 'test@example.com';
    const email2 = 'TEST@EXAMPLE.COM';
    const email3 = '  test@example.com  ';

    const hash1 = await hashEmail(email1);
    const hash2 = await hashEmail(email2);
    const hash3 = await hashEmail(email3);

    expect(hash1).toBe(hash2);
    expect(hash1).toBe(hash3);
    expect(hash1).toHaveLength(64); // SHA-256 produces 64 hex characters
  });

  it('should generate different hashes for different emails', async () => {
    const hash1 = await hashEmail('test1@example.com');
    const hash2 = await hashEmail('test2@example.com');

    expect(hash1).not.toBe(hash2);
  });
});
