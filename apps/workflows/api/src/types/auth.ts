// Tipos de autenticación (local para evitar problemas de resolución de módulos)
export interface JWTPayload {
  userId: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
  iat?: number;
  exp?: number;
}

export interface User {
  id: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
  createdAt: string;
  updatedAt: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  expiresIn: number;
}

