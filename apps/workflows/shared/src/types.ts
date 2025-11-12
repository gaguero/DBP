// Tipos compartidos para workflows

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
  targetEntityType: string;
  targetEntityId: string;
  status: 'scheduled' | 'running' | 'completed' | 'failed' | 'cancelled';
  currentNodeId?: string;
  scheduledAt?: string;
  startedAt?: string;
  completedAt?: string;
  errorMessage?: string;
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

