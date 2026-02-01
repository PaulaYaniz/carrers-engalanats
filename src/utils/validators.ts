// Validadors d'entrada per a Carrers Engalanats

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function normalizeEmail(email: string): string {
  return email.toLowerCase().trim();
}

export function isValidStreetId(streetId: number): boolean {
  return Number.isInteger(streetId) && streetId >= 1 && streetId <= 6;
}

export function sanitizeString(str: string): string {
  return str.replace(/[<>]/g, '');
}
