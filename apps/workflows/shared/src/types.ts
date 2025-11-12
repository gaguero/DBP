// Tipos compartidos para workflows
import type { WorkflowExecutionStatus } from './executions';

export interface WorkflowNode {
  id: string;
  type: 'trigger' | 'action' | 'condition' | 'delay' | 'split' | 'code';
  data: Record<string, unknown>;
  position: { x: number; y: number };
}

export interface WorkflowEdge {
  id: string;
  source: string;
  target: string;
  data?: Record<string, unknown>;
}

export interface WorkflowDefinition {
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
  settings?: {
    version: number;
    createdBy?: string;
    lastValidatedAt?: string;
  };
}

export interface Workflow {
  id: string;
  name: string;
  description?: string;
  status: 'draft' | 'active' | 'paused';
  entityType: string;
  triggerType: string;
  definition: WorkflowDefinition;
  createdAt: string;
  updatedAt: string;
}

export interface WorkflowExecution {
  id: string;
  workflowId: string;
  workflowName?: string;
  integrationAccountId?: string;
  targetEntityType: string;
  targetEntityId: string;
  status: WorkflowExecutionStatus;
  currentNodeId?: string | null;
  inputData?: Record<string, unknown> | null;
  outputData?: Record<string, unknown> | null;
  errorMessage?: string | null;
  scheduledAt?: string | null;
  startedAt?: string | null;
  completedAt?: string | null;
  retryCount?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface IntegrationAccount {
  id: string;
  name: string;
  baseUrl: string;
  authType: 'apiKey' | 'basic';
  active: boolean;
}

// Tipos de autenticación
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

export interface JWTPayload {
  userId: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
  iat?: number;
  exp?: number;
}

