import {
  type PaginatedResult,
  type WorkflowExecutionRecord,
  type WorkflowExecutionStatus,
  type WorkflowLogEntry,
} from '@dbp/workflows-shared';
import { pool } from '../utils/db.js';

export interface ExecutionQueryParams {
  page: number;
  limit: number;
  status?: WorkflowExecutionStatus;
  workflowId?: string;
  integrationAccountId?: string;
}

function toIsoString(value: unknown): string | null {
  if (!value) {
    return null;
  }

  if (value instanceof Date) {
    return value.toISOString();
  }

  const date = new Date(value as string);
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
}

function parseJsonField(value: unknown): Record<string, unknown> | null {
  if (value === null || value === undefined) {
    return null;
  }

  if (typeof value === 'string') {
    try {
      return JSON.parse(value) as Record<string, unknown>;
    } catch {
      return null;
    }
  }

  if (typeof value === 'object') {
    return value as Record<string, unknown>;
  }

  return null;
}

function mapExecutionRow(row: any): WorkflowExecutionRecord {
  return {
    id: row.id,
    workflowId: row.workflow_id,
    workflowName: row.workflow_name,
    integrationAccountId: row.integration_account_id,
    targetEntityType: row.target_entity_type,
    targetEntityId: row.target_entity_id,
    status: row.status,
    currentNodeId: row.current_node_id,
    inputData: parseJsonField(row.input_data),
    outputData: parseJsonField(row.output_data),
    errorMessage: row.error_message ?? null,
    scheduledAt: toIsoString(row.scheduled_at),
    startedAt: toIsoString(row.started_at),
    completedAt: toIsoString(row.completed_at),
    retryCount: typeof row.retry_count === 'number' ? row.retry_count : Number(row.retry_count ?? 0),
    createdAt: toIsoString(row.created_at) ?? new Date().toISOString(),
    updatedAt: toIsoString(row.updated_at) ?? new Date().toISOString(),
  };
}

function mapLogRow(row: any): WorkflowLogEntry {
  return {
    id: row.id,
    executionId: row.execution_id,
    nodeId: row.node_id,
    actionType: row.action_type,
    status: row.status,
    message: row.message ?? null,
    payload: parseJsonField(row.payload_json),
    occurredAt: toIsoString(row.occurred_at) ?? new Date().toISOString(),
  };
}

export async function listWorkflowExecutions(
  params: ExecutionQueryParams,
): Promise<PaginatedResult<WorkflowExecutionRecord>> {
  const { page, limit, status, workflowId, integrationAccountId } = params;

  const safeLimit = Math.min(Math.max(limit, 1), 100);
  const offset = (Math.max(page, 1) - 1) * safeLimit;

  const conditions: string[] = [];
  const values: unknown[] = [];
  let index = 1;

  if (status) {
    conditions.push(`we.status = $${index++}`);
    values.push(status);
  }

  if (workflowId) {
    conditions.push(`we.workflow_id = $${index++}`);
    values.push(workflowId);
  }

  if (integrationAccountId) {
    conditions.push(`we.integration_account_id = $${index++}`);
    values.push(integrationAccountId);
  }

  const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

  const executionsQuery = `
    SELECT
      we.id,
      we.workflow_id,
      w.name AS workflow_name,
      we.integration_account_id,
      we.target_entity_type,
      we.target_entity_id,
      we.status,
      we.current_node_id,
      we.input_data,
      we.output_data,
      we.error_message,
      we.scheduled_at,
      we.started_at,
      we.completed_at,
      we.retry_count,
      we.created_at,
      we.updated_at
    FROM workflow_executions we
    INNER JOIN workflows w ON w.id = we.workflow_id
    ${whereClause}
    ORDER BY we.created_at DESC
    LIMIT $${index} OFFSET $${index + 1};
  `;

  const executionsResult = await pool.query(executionsQuery, [...values, safeLimit, offset]);

  const countQuery = `
    SELECT COUNT(*)::int AS total
    FROM workflow_executions we
    ${whereClause};
  `;

  const countResult = await pool.query(countQuery, values);
  const total = countResult.rows[0]?.total ?? 0;

  const items = executionsResult.rows.map(mapExecutionRow);
  const hasNextPage = offset + items.length < total;

  return {
    items,
    total,
    page: Math.max(page, 1),
    pageSize: safeLimit,
    hasNextPage,
  };
}

export async function getWorkflowExecutionById(
  executionId: string,
): Promise<WorkflowExecutionRecord | null> {
  const result = await pool.query(
    `
      SELECT
        we.id,
        we.workflow_id,
        w.name AS workflow_name,
        we.integration_account_id,
        we.target_entity_type,
        we.target_entity_id,
        we.status,
        we.current_node_id,
        we.input_data,
        we.output_data,
        we.error_message,
        we.scheduled_at,
        we.started_at,
        we.completed_at,
        we.retry_count,
        we.created_at,
        we.updated_at
      FROM workflow_executions we
      INNER JOIN workflows w ON w.id = we.workflow_id
      WHERE we.id = $1
      LIMIT 1;
    `,
    [executionId],
  );

  if (result.rows.length === 0) {
    return null;
  }

  return mapExecutionRow(result.rows[0]);
}

export async function getWorkflowExecutionLogs(
  executionId: string,
): Promise<WorkflowLogEntry[]> {
  const result = await pool.query(
    `
      SELECT
        id,
        execution_id,
        node_id,
        action_type,
        status,
        message,
        payload_json,
        occurred_at
      FROM workflow_logs
      WHERE execution_id = $1
      ORDER BY occurred_at ASC;
    `,
    [executionId],
  );

  return result.rows.map(mapLogRow);
}


