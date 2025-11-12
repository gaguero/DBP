import jwt from 'jsonwebtoken';
import type { JWTPayload } from '../types/auth.js';

const JWT_SECRET = process.env.JWT_SECRET || 'change-me-in-production';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '24h';

export function generateToken(payload: Omit<JWTPayload, 'iat' | 'exp'>): string {
  return jwt.sign(
    {
      userId: payload.userId,
      email: payload.email,
      role: payload.role,
    },
    JWT_SECRET,
    {
      expiresIn: JWT_EXPIRES_IN,
    }
  );
}

export function verifyToken(token: string): JWTPayload {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded as JWTPayload;
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
}

export function getExpiresInSeconds(): number {
  // Parse JWT_EXPIRES_IN (e.g., "24h" -> 86400)
  const match = JWT_EXPIRES_IN.match(/^(\d+)([smhd])$/);
  if (!match) return 86400; // Default 24 hours
  
  const [, value, unit] = match;
  const multipliers: Record<string, number> = {
    s: 1,
    m: 60,
    h: 3600,
    d: 86400,
  };
  
  return parseInt(value, 10) * (multipliers[unit] || 86400);
}

