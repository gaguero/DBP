import dotenv from 'dotenv';
import { Worker, type Job } from 'bullmq';
import {
  getRedisConnection,
  getWorkflowExecuteQueue,
  shutdownQueueResources,
  WORKFLOW_EXECUTE_QUEUE,
  WORKFLOW_SCHEDULE_QUEUE,
  WORKFLOW_WEBHOOKS_QUEUE,
  type WorkflowExecutionJobData,
  type WorkflowExecutionJobResult,
  type WorkflowDefinition,
  type WorkflowNode,
  type WorkflowEdge,
  EspoClient,
  decrypt,
} from '@dbp/workflows-shared';
import { pool } from './utils/db.js';
import type { PoolClient } from 'pg';

dotenv.config();

const redis = getRedisConnection();
const workflowExecuteQueue = getWorkflowExecuteQueue();

interface ExecutionRow {
  id: string;
  workflow_id: string;
  integration_account_id: string;
  target_entity_type: string;
  target_entity_id: string;
  status: string;
  current_node_id: string | null;
  input_data: unknown;
  definition_json: unknown;
  api_key_encrypted: string;
  base_url: string;
  integration_active: boolean;
  retry_count: number;
}

interface ExecutionContext {
  executionId: string;
  workflowId: string;
  definition: WorkflowDefinition;
  nodeMap: Map<string, WorkflowNode>;
  edgesMap: Map<string, WorkflowEdge[]>;
  espoClient: EspoClient;
  targetEntityType: string;
  targetEntityId: string;
  entitySnapshot: Record<string, unknown> | null;
  inputData: Record<string, unknown>;
  actionResults: Array<Record<string, unknown>>;
  currentNodeId: string | null;
  workflowName: string;
  client: PoolClient;
}

const SYSTEM_NODE_ID = '__system__';

function calculateDelayMs(node: WorkflowNode): number {
  const durationRaw = Number((node.data as Record<string, unknown>)?.duration ?? 1);
  const duration = Number.isFinite(durationRaw) && durationRaw > 0 ? durationRaw : 1;
  const unit = ((node.data as Record<string, unknown>)?.unit as string | undefined) ?? 'minutes';

  const unitMap: Record<string, number> = {
    minutes: 60 * 1000,
    hours: 60 * 60 * 1000,
    days: 24 * 60 * 60 * 1000,
  };

  return duration * (unitMap[unit] ?? unitMap.minutes);
}

async function logExecutionEvent(
  executionId: string,
  nodeId: string,
  actionType: string,
  status: 'success' | 'error' | 'skipped',
  message: string,
  payload?: Record<string, unknown>
): Promise<void> {
  await pool.query(
    `INSERT INTO workflow_logs (execution_id, node_id, action_type, status, message, payload_json)
     VALUES ($1, $2, $3, $4, $5, $6)`,
    [
      executionId,
      nodeId,
      actionType,
      status,
      message || null,
      payload ? JSON.stringify(payload) : null,
    ],
  );
}

function parseWorkflowDefinition(definition: unknown): WorkflowDefinition {
  if (!definition) {
    throw new Error('Workflow definition is empty');
  }

  if (typeof definition === 'string') {
    return JSON.parse(definition) as WorkflowDefinition;
  }

  return definition as WorkflowDefinition;
}

function parseInputData(input: unknown): Record<string, unknown> {
  if (!input) {
    return {};
  }

  if (typeof input === 'string') {
    try {
      return JSON.parse(input) as Record<string, unknown>;
    } catch (error) {
      console.warn('⚠️  Failed to parse input_data JSON, returning empty object');
      return {};
    }
  }

  return input as Record<string, unknown>;
}

async function scheduleDelayedContinuation(
  context: ExecutionContext,
  job: Job<WorkflowExecutionJobData, WorkflowExecutionJobResult>,
  delayMs: number,
  resumeNodeId: string,
): Promise<void> {
  const resumeAt = new Date(Date.now() + delayMs);

  await context.client.query(
    `UPDATE workflow_executions
     SET status = 'scheduled',
         scheduled_at = $2,
         current_node_id = $3,
         updated_at = CURRENT_TIMESTAMP
     WHERE id = $1`,
    [context.executionId, resumeAt.toISOString(), resumeNodeId],
  );

  await workflowExecuteQueue.add(
    'run-workflow',
    {
      ...job.data,
    },
    {
      delay: delayMs,
      attempts: job.opts.attempts,
      backoff: job.opts.backoff,
    },
  );
}

function buildNodeMaps(definition: WorkflowDefinition): {
  nodeMap: Map<string, WorkflowNode>;
  edgesMap: Map<string, WorkflowEdge[]>;
} {
  const nodeMap = new Map<string, WorkflowNode>();
  const edgesMap = new Map<string, WorkflowEdge[]>();

  for (const node of definition.nodes) {
    nodeMap.set(node.id, node);
  }

  for (const edge of definition.edges) {
    if (!edgesMap.has(edge.source)) {
      edgesMap.set(edge.source, []);
    }
    edgesMap.get(edge.source)!.push(edge);
  }

  return { nodeMap, edgesMap };
}

function getNestedValue(source: Record<string, unknown> | null, path: string): unknown {
  if (!source) {
    return undefined;
  }

  return path.split('.').reduce<unknown>((value, key) => {
    if (value && typeof value === 'object' && key in value) {
      return (value as Record<string, unknown>)[key];
    }
    return undefined;
  }, source);
}

async function evaluateConditionNode(
  node: WorkflowNode,
  context: ExecutionContext
): Promise<boolean> {
  const field = (node.data?.field as string) || '';
  const operator = (node.data?.operator as string) || 'equals';
  const expectedValue = node.data?.value;

  if (!field) {
    throw new Error(`Condition node ${node.id} is missing "field" property`);
  }

  const entityValue =
    getNestedValue(context.entitySnapshot, field) ??
    getNestedValue(context.inputData, field);

  switch (operator) {
    case 'equals':
      return entityValue === expectedValue;
    case 'notEquals':
      return entityValue !== expectedValue;
    case 'contains':
      if (typeof entityValue === 'string' && typeof expectedValue === 'string') {
        return entityValue.includes(expectedValue);
      }
      return false;
    case 'greaterThan':
      if (typeof entityValue === 'number' && typeof expectedValue === 'number') {
        return entityValue > expectedValue;
      }
      return false;
    case 'lessThan':
      if (typeof entityValue === 'number' && typeof expectedValue === 'number') {
        return entityValue < expectedValue;
      }
      return false;
    default:
      throw new Error(`Unsupported operator "${operator}" in condition node ${node.id}`);
  }
}

async function handleActionNode(
  node: WorkflowNode,
  context: ExecutionContext
): Promise<Record<string, unknown>> {
  const actionType = node.data?.actionType as string | undefined;

  if (!actionType) {
    throw new Error(`Action node ${node.id} is missing "actionType"`);
  }

  switch (actionType) {
    case 'updateField': {
      const field = node.data?.field as string | undefined;
      const value = node.data?.value;
      if (!field) {
        throw new Error(`Action node ${node.id} is missing "field"`);
      }

      const entityType =
        (node.data?.entityType as string | undefined) ?? context.targetEntityType;
      const entityId =
        (node.data?.entityId as string | undefined) ?? context.targetEntityId;

      const result = await context.espoClient.updateField(entityType, entityId, field, value);
      if (context.entitySnapshot) {
        (context.entitySnapshot as Record<string, unknown>)[field] = value as unknown;
      }

      return {
        action: 'updateField',
        entityType,
        entityId,
        field,
        value,
        response: result,
      };
    }
    case 'sendEmail': {
      const to = node.data?.to as string | undefined;
      const subject = node.data?.subject as string | undefined;
      const body = (node.data?.body as string | undefined) ?? '';

      if (!to || !subject) {
        throw new Error(`Action node ${node.id} requires "to" and "subject"`);
      }

      const response = await context.espoClient.sendEmail(to, subject, body, {
        from: node.data?.from as string | undefined,
        cc: (node.data?.cc as string[] | undefined) ?? undefined,
        bcc: (node.data?.bcc as string[] | undefined) ?? undefined,
      });

      return {
        action: 'sendEmail',
        to,
        subject,
        response,
      };
    }
    case 'createTask': {
      const name =
        (node.data?.name as string | undefined) ??
        `Tarea generada por workflow ${context.workflowName}`;
      const assignedUserId = node.data?.assignedUserId as string | undefined;
      const dueDate = node.data?.dueDate as string | undefined;

      const response = await context.espoClient.createTask(name, assignedUserId, dueDate);

      return {
        action: 'createTask',
        name,
        assignedUserId,
        dueDate,
        response,
      };
    }
    default:
      throw new Error(`Unsupported action type "${actionType}" in node ${node.id}`);
  }
}

async function setExecutionCurrentNode(
  client: PoolClient,
  executionId: string,
  nodeId: string | null
): Promise<void> {
  await client.query(
    `UPDATE workflow_executions
     SET current_node_id = $2,
         updated_at = CURRENT_TIMESTAMP
     WHERE id = $1`,
    [executionId, nodeId],
  );
}

async function completeExecution(
  client: PoolClient,
  executionId: string,
  finalNodeId: string | null,
  actionResults: Array<Record<string, unknown>>
): Promise<void> {
  await client.query(
    `UPDATE workflow_executions
     SET status = 'completed',
         current_node_id = $2,
         output_data = $3,
         error_message = NULL,
         completed_at = CURRENT_TIMESTAMP,
         updated_at = CURRENT_TIMESTAMP
     WHERE id = $1`,
    [
      executionId,
      finalNodeId,
      actionResults.length > 0 ? JSON.stringify({ actions: actionResults }) : null,
    ],
  );
}

async function failExecution(
  client: PoolClient,
  executionId: string,
  nodeId: string | null,
  message: string
): Promise<void> {
  await client.query(
    `UPDATE workflow_executions
     SET status = 'failed',
         current_node_id = $2,
         error_message = $3,
         updated_at = CURRENT_TIMESTAMP
     WHERE id = $1`,
    [executionId, nodeId, message],
  );
}

async function processWorkflowDefinition(
  context: ExecutionContext,
  job: Job<WorkflowExecutionJobData, WorkflowExecutionJobResult>,
): Promise<{ finalNodeId: string | null; deferred: boolean }> {
  const visited = new Set<string>();
  const queue: string[] = [];
  const triggerNodes = context.definition.nodes.filter((node: WorkflowNode) => node.type === 'trigger');

  if (triggerNodes.length === 0) {
    throw new Error('Workflow definition does not contain any trigger node');
  }

  if (context.currentNodeId && context.nodeMap.has(context.currentNodeId)) {
    queue.push(context.currentNodeId);
  } else {
    for (const trigger of triggerNodes) {
      queue.push(trigger.id);
    }
  }

  let lastNodeId: string | null = null;
  let conditionResult = false;

  while (queue.length > 0) {
    const nodeId = queue.shift()!;
    if (visited.has(nodeId)) {
      continue;
    }

    const node = context.nodeMap.get(nodeId);
    if (!node) {
      await logExecutionEvent(
        context.executionId,
        nodeId,
        'unknown',
        'skipped',
        `Node ${nodeId} not found in workflow definition`,
      );
      continue;
    }

    visited.add(nodeId);
    context.currentNodeId = node.id;
    lastNodeId = node.id;

    await setExecutionCurrentNode(context.client, context.executionId, node.id);

    try {
      if (node.type === 'trigger') {
        await logExecutionEvent(
          context.executionId,
          node.id,
          node.type,
          'success',
          'Trigger processed (manual execution)',
        );
      } else if (node.type === 'action') {
        const result = await handleActionNode(node, context);
        context.actionResults.push({ nodeId: node.id, ...result });
        await logExecutionEvent(
          context.executionId,
          node.id,
          node.type,
          'success',
          `Action ${result.action as string} executed successfully`,
          result,
        );
      } else if (node.type === 'condition') {
        conditionResult = await evaluateConditionNode(node, context);
        await logExecutionEvent(
          context.executionId,
          node.id,
          node.type,
          'success',
          `Condition evaluated to ${conditionResult}`,
        );
      } else if (node.type === 'delay') {
        const delayMs = calculateDelayMs(node);
        const outgoingEdges = context.edgesMap.get(node.id) ?? [];

        if (outgoingEdges.length === 0) {
          await logExecutionEvent(
            context.executionId,
            node.id,
            node.type,
            'skipped',
            'Delay node without outgoing edges, skipping',
          );
          continue;
        }

        const resumeNodeId = outgoingEdges[0].target;

        await logExecutionEvent(
          context.executionId,
          node.id,
          node.type,
          'success',
          `Delay programado por ${Math.round(delayMs / 1000)} segundos`,
          {
            delayMs,
            resumeNodeId,
          },
        );

        await scheduleDelayedContinuation(context, job, delayMs, resumeNodeId);
        return { finalNodeId: node.id, deferred: true };
      } else if (node.type === 'split') {
        await logExecutionEvent(
          context.executionId,
          node.id,
          node.type,
          'success',
          'Split ejecutado: se procesarán todas las ramas',
        );
      } else if (node.type === 'code') {
        await logExecutionEvent(
          context.executionId,
          node.id,
          node.type,
          'skipped',
          'Nodo de código registrado (ejecución segura pendiente)',
        );
      } else {
        await logExecutionEvent(
          context.executionId,
          node.id,
          node.type,
          'skipped',
          `Unsupported node type "${node.type}"`,
        );
        continue;
      }
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Unknown error while processing node';

      await logExecutionEvent(
        context.executionId,
        node.id,
        node.type,
        'error',
        message,
      );
      throw new Error(message);
    }

    const outgoingEdges = context.edgesMap.get(node.id) ?? [];
    const edgesToFollow =
      node.type === 'condition'
        ? outgoingEdges.filter((edge) => {
            const conditionValue = edge.data?.condition;
            if (conditionValue === undefined) {
              return true;
            }
            if (typeof conditionValue === 'boolean') {
              return conditionValue === conditionResult;
            }
            if (typeof conditionValue === 'string') {
              const normalized = conditionValue.toLowerCase();
              if (normalized === 'true') {
                return conditionResult;
              }
              if (normalized === 'false') {
                return !conditionResult;
              }
            }
            return true;
          })
        : outgoingEdges;

    if (edgesToFollow.length === 0 && outgoingEdges.length > 0 && node.type === 'condition') {
      await logExecutionEvent(
        context.executionId,
        node.id,
        node.type,
        'skipped',
        `No outgoing edge matches condition result (${conditionResult})`,
      );
    }

    for (const edge of edgesToFollow) {
      if (!visited.has(edge.target)) {
        queue.push(edge.target);
      }
    }
  }

  return { finalNodeId: lastNodeId, deferred: false };
}

async function processExecutionJob(
  job: Job<WorkflowExecutionJobData, WorkflowExecutionJobResult>
): Promise<WorkflowExecutionJobResult> {
  const executionId = job.data.executionId;
  const client = await pool.connect();
  let context: ExecutionContext | null = null;

  try {
    await client.query('BEGIN');

    const executionResult = await client.query<ExecutionRow & {
      workflow_name: string;
      definition_json: unknown;
      input_data: unknown;
      api_key_encrypted: string;
      base_url: string;
      username: string | null;
      integration_active: boolean;
    }>(
      `SELECT
         we.id,
         we.workflow_id,
         we.integration_account_id,
         we.target_entity_type,
         we.target_entity_id,
         we.status,
         we.current_node_id,
         we.input_data,
         we.retry_count,
         w.name AS workflow_name,
         w.definition_json,
         ia.api_key_encrypted,
         ia.base_url,
         ia.username,
         ia.active AS integration_active
       FROM workflow_executions we
       INNER JOIN workflows w ON w.id = we.workflow_id
       INNER JOIN integration_accounts ia ON ia.id = we.integration_account_id
       WHERE we.id = $1
       FOR UPDATE`,
      [executionId],
    );

    if (executionResult.rows.length === 0) {
      throw new Error(`Workflow execution ${executionId} not found`);
    }

    const row = executionResult.rows[0];

    if (!row.integration_active) {
      throw new Error('Integration account is inactive');
    }

    if (row.status === 'cancelled') {
      await logExecutionEvent(
        executionId,
        SYSTEM_NODE_ID,
        'system',
        'skipped',
        'Execution was cancelled before processing',
      );
      await client.query('COMMIT');
      return {
        status: 'failed',
        errorMessage: 'Execution cancelled',
      };
    }

    await client.query(
      `UPDATE workflow_executions
       SET retry_count = $2
       WHERE id = $1`,
      [executionId, job.attemptsMade ?? 0],
    );

    await client.query(
      `UPDATE workflow_executions
       SET status = 'running',
           started_at = COALESCE(started_at, CURRENT_TIMESTAMP),
           scheduled_at = NULL,
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $1`,
      [executionId],
    );

    await client.query('COMMIT');

    const definition = parseWorkflowDefinition(row.definition_json);
    const inputData = parseInputData(row.input_data);
    const { nodeMap, edgesMap } = buildNodeMaps(definition);

    const apiKey = decrypt(row.api_key_encrypted);
    const espoClient = new EspoClient({
      baseUrl: row.base_url,
      apiKey,
      username: row.username,
    });

    let entitySnapshot: Record<string, unknown> | null = null;
    try {
      entitySnapshot = await espoClient.getEntity(row.target_entity_type, row.target_entity_id);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Failed to fetch entity from EspoCRM';
      await logExecutionEvent(
        executionId,
        SYSTEM_NODE_ID,
        'system',
        'error',
        message,
      );
      throw new Error(message);
    }

    context = {
      executionId,
      workflowId: row.workflow_id,
      definition,
      nodeMap,
      edgesMap,
      espoClient,
      targetEntityType: row.target_entity_type,
      targetEntityId: row.target_entity_id,
      entitySnapshot,
      inputData,
      actionResults: [],
      currentNodeId: row.current_node_id,
      workflowName: row.workflow_name,
      client,
    };

    const { finalNodeId, deferred } = await processWorkflowDefinition(context, job);

    if (!deferred) {
      await completeExecution(
        context.client,
        executionId,
        finalNodeId ?? context.currentNodeId,
        context.actionResults,
      );
    }

    return {
      status: 'completed',
      currentNodeId: finalNodeId ?? context.currentNodeId,
      outputData:
        !deferred && context.actionResults.length > 0 ? { actions: context.actionResults } : null,
    };
  } catch (error) {
    await client.query('ROLLBACK').catch(() => {});

    const message =
      error instanceof Error
        ? error.message
        : 'Unknown error executing workflow';

    const nodeId = context?.currentNodeId ?? SYSTEM_NODE_ID;

    const attemptsMade = job.attemptsMade ?? 0;
    const maxAttempts = job.opts.attempts ?? 1;
    const willRetry = attemptsMade < maxAttempts;

    if (willRetry) {
      await logExecutionEvent(
        executionId,
        nodeId,
        'system',
        'skipped',
        `Reintento programado (${attemptsMade + 1} de ${maxAttempts})`,
      );

      await setExecutionCurrentNode(client, executionId, nodeId);
      await client.query(
        `UPDATE workflow_executions
         SET status = 'scheduled',
             retry_count = $2,
             scheduled_at = CURRENT_TIMESTAMP,
             updated_at = CURRENT_TIMESTAMP
         WHERE id = $1`,
        [executionId, attemptsMade],
      );
    } else {
      await failExecution(client, executionId, nodeId, message);
    }

    throw error;
  } finally {
    client.release();
  }
}

const executeWorker = new Worker<WorkflowExecutionJobData, WorkflowExecutionJobResult>(
  WORKFLOW_EXECUTE_QUEUE,
  async (job) => {
    console.log(`[Worker] Processing workflow execution: ${job.id}`);
    return processExecutionJob(job);
  },
  {
    connection: redis,
    concurrency: 5,
  },
);

const scheduleWorker = new Worker(
  WORKFLOW_SCHEDULE_QUEUE,
  async (job) => {
    console.log(`[Worker] Processing scheduled workflow: ${job.id}`);
    return { status: 'scheduled' };
  },
  {
    connection: redis,
    concurrency: 2,
  },
);

const webhookWorker = new Worker(
  WORKFLOW_WEBHOOKS_QUEUE,
  async (job) => {
    console.log(`[Worker] Processing webhook event: ${job.id}`);
    return { status: 'processed' };
  },
  {
    connection: redis,
    concurrency: 10,
  },
);

console.log('🚀 Workflow Workers started');
console.log('📋 Queues: workflow-execute, workflow-schedule, workflow-webhooks');

const gracefulShutdown = async () => {
  console.log('Shutting down workers...');
  await executeWorker.close();
  await scheduleWorker.close();
  await webhookWorker.close();
  await shutdownQueueResources();
};

process.on('SIGTERM', async () => {
  await gracefulShutdown();
  process.exit(0);
});

process.on('SIGINT', async () => {
  await gracefulShutdown();
  process.exit(0);
});

