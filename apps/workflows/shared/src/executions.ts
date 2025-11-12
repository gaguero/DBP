import { z } from 'zod';

export const ExecutionStatusSchema = z.enum([
  'scheduled',
  'running',
  'completed',
  'failed',
  'cancelled',
]);

export type WorkflowExecutionStatus = z.infer<typeof ExecutionStatusSchema>;

export const ExecuteWorkflowSchema = z.object({
  integrationAccountId: z.string().uuid(),
  targetEntityType: z.string().min(1).max(100),
  targetEntityId: z.string().min(1).max(255),
  inputData: z.record(z.unknown()).optional(),
});

export type ExecuteWorkflowInput = z.infer<typeof ExecuteWorkflowSchema>;

export interface ExecuteWorkflowResponsePayload {
  executionId: string;
  status: WorkflowExecutionStatus;
  message: string;
}

export interface WorkflowExecutionJobData {
  executionId: string;
  workflowId: string;
  integrationAccountId: string;
  targetEntityType: string;
  targetEntityId: string;
  initiatedBy: string;
  inputData?: Record<string, unknown> | null;
}

export interface WorkflowExecutionJobResult {
  status: 'completed' | 'failed';
  currentNodeId?: string | null;
  outputData?: Record<string, unknown> | null;
  errorMessage?: string | null;
}

export interface WorkflowExecutionRecord {
  id: string;
  workflowId: string;
  workflowName: string;
  integrationAccountId: string;
  targetEntityType: string;
  targetEntityId: string;
  status: WorkflowExecutionStatus;
  currentNodeId: string | null;
  inputData: Record<string, unknown> | null;
  outputData: Record<string, unknown> | null;
  errorMessage: string | null;
  scheduledAt: string | null;
  startedAt: string | null;
  completedAt: string | null;
  retryCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface WorkflowLogEntry {
  id: string;
  executionId: string;
  nodeId: string;
  actionType: string;
  status: 'success' | 'error' | 'skipped';
  message: string | null;
  payload: Record<string, unknown> | null;
  occurredAt: string;
}

export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasNextPage: boolean;
}

