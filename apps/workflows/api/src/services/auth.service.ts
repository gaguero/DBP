import bcrypt from 'bcrypt';
import { pool } from '../utils/db.js';
import { generateToken, getExpiresInSeconds } from '../utils/jwt.js';
import type { User, RegisterRequest, LoginRequest, AuthResponse } from '../types/auth.js';

const SALT_ROUNDS = 10;

export async function registerUser(data: RegisterRequest): Promise<AuthResponse> {
  // Check if user exists
  const existingUser = await pool.query(
    'SELECT id FROM users WHERE email = $1',
    [data.email.toLowerCase()]
  );
  
  if (existingUser.rows.length > 0) {
    throw new Error('User with this email already exists');
  }
  
  // Hash password
  const passwordHash = await bcrypt.hash(data.password, SALT_ROUNDS);
  
  // Create user
  const result = await pool.query(
    `INSERT INTO users (email, password_hash, role)
     VALUES ($1, $2, 'viewer')
     RETURNING id, email, role, created_at, updated_at`,
    [data.email.toLowerCase(), passwordHash]
  );
  
  const userRow = result.rows[0];
  const user: User = {
    id: userRow.id,
    email: userRow.email,
    role: userRow.role,
    createdAt: userRow.created_at.toISOString(),
    updatedAt: userRow.updated_at.toISOString(),
  };
  
  // Generate token
  const token = generateToken({
    userId: user.id,
    email: user.email,
    role: user.role,
  });
  
  return {
    user,
    token,
    expiresIn: getExpiresInSeconds(),
  };
}

export async function loginUser(data: LoginRequest): Promise<AuthResponse> {
  // Find user
  const result = await pool.query(
    'SELECT id, email, password_hash, role, created_at, updated_at FROM users WHERE email = $1',
    [data.email.toLowerCase()]
  );
  
  if (result.rows.length === 0) {
    throw new Error('Invalid email or password');
  }
  
  const userRow = result.rows[0];
  
  // Verify password
  const isValid = await bcrypt.compare(data.password, userRow.password_hash);
  if (!isValid) {
    throw new Error('Invalid email or password');
  }
  
  const user: User = {
    id: userRow.id,
    email: userRow.email,
    role: userRow.role,
    createdAt: userRow.created_at.toISOString(),
    updatedAt: userRow.updated_at.toISOString(),
  };
  
  // Generate token
  const token = generateToken({
    userId: user.id,
    email: user.email,
    role: user.role,
  });
  
  return {
    user,
    token,
    expiresIn: getExpiresInSeconds(),
  };
}

export async function getUserById(userId: string): Promise<User | null> {
  const result = await pool.query(
    'SELECT id, email, role, created_at, updated_at FROM users WHERE id = $1',
    [userId]
  );
  
  if (result.rows.length === 0) {
    return null;
  }
  
  const userRow = result.rows[0];
  return {
    id: userRow.id,
    email: userRow.email,
    role: userRow.role,
    createdAt: userRow.created_at.toISOString(),
    updatedAt: userRow.updated_at.toISOString(),
  };
}

