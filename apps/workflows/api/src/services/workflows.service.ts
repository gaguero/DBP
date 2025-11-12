import { pool } from '../utils/db.js';
import type {
  Workflow,
  CreateWorkflowRequest,
  UpdateWorkflowRequest,
  WorkflowDefinition,
} from '../types/workflows.js';

// Basic validation for workflow definition
function validateWorkflowDefinition(definition: WorkflowDefinition): void {
  if (!definition.nodes || !Array.isArray(definition.nodes)) {
    throw new Error('Workflow definition must have a nodes array');
  }

  if (!definition.edges || !Array.isArray(definition.edges)) {
    throw new Error('Workflow definition must have an edges array');
  }

  if (definition.nodes.length === 0) {
    throw new Error('Workflow must have at least one node');
  }

  // Validate nodes
  const nodeIds = new Set<string>();
  for (const node of definition.nodes) {
    if (!node.id || typeof node.id !== 'string') {
      throw new Error('Each node must have a valid id');
    }
    if (nodeIds.has(node.id)) {
      throw new Error(`Duplicate node id: ${node.id}`);
    }
    nodeIds.add(node.id);

    if (!node.type || !['trigger', 'action', 'condition', 'delay', 'split', 'code'].includes(node.type)) {
      throw new Error(`Invalid node type: ${node.type}`);
    }

    if (!node.position || typeof node.position.x !== 'number' || typeof node.position.y !== 'number') {
      throw new Error(`Node ${node.id} must have valid position coordinates`);
    }
  }

  // Validate edges
  for (const edge of definition.edges) {
    if (!edge.id || typeof edge.id !== 'string') {
      throw new Error('Each edge must have a valid id');
    }
    if (!edge.source || !nodeIds.has(edge.source)) {
      throw new Error(`Edge ${edge.id} references invalid source node: ${edge.source}`);
    }
    if (!edge.target || !nodeIds.has(edge.target)) {
      throw new Error(`Edge ${edge.id} references invalid target node: ${edge.target}`);
    }
  }

  // Check for at least one trigger node
  const hasTrigger = definition.nodes.some((node) => node.type === 'trigger');
  if (!hasTrigger) {
    throw new Error('Workflow must have at least one trigger node');
  }
}

export async function createWorkflow(
  data: CreateWorkflowRequest,
  userId: string
): Promise<Workflow> {
  // Validate definition
  validateWorkflowDefinition(data.definition);

  const result = await pool.query(
    `INSERT INTO workflows (name, description, entity_type, trigger_type, definition_json, created_by, updated_by)
     VALUES ($1, $2, $3, $4, $5, $6, $6)
     RETURNING id, name, description, status, entity_type, trigger_type, definition_json, created_by, updated_by, created_at, updated_at`,
    [
      data.name,
      data.description || null,
      data.entityType,
      data.triggerType,
      JSON.stringify(data.definition),
      userId,
    ]
  );

  const row = result.rows[0];
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    status: row.status,
    entityType: row.entity_type,
    triggerType: row.trigger_type,
    definition: row.definition_json,
    createdBy: row.created_by,
    updatedBy: row.updated_by,
    createdAt: row.created_at.toISOString(),
    updatedAt: row.updated_at.toISOString(),
  };
}

export async function getWorkflows(): Promise<Workflow[]> {
  const result = await pool.query(
    `SELECT id, name, description, status, entity_type, trigger_type, definition_json, created_by, updated_by, created_at, updated_at
     FROM workflows
     ORDER BY created_at DESC`
  );

  return result.rows.map((row) => ({
    id: row.id,
    name: row.name,
    description: row.description,
    status: row.status,
    entityType: row.entity_type,
    triggerType: row.trigger_type,
    definition: row.definition_json,
    createdBy: row.created_by,
    updatedBy: row.updated_by,
    createdAt: row.created_at.toISOString(),
    updatedAt: row.updated_at.toISOString(),
  }));
}

export async function getWorkflowById(id: string): Promise<Workflow | null> {
  const result = await pool.query(
    `SELECT id, name, description, status, entity_type, trigger_type, definition_json, created_by, updated_by, created_at, updated_at
     FROM workflows
     WHERE id = $1`,
    [id]
  );

  if (result.rows.length === 0) {
    return null;
  }

  const row = result.rows[0];
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    status: row.status,
    entityType: row.entity_type,
    triggerType: row.trigger_type,
    definition: row.definition_json,
    createdBy: row.created_by,
    updatedBy: row.updated_by,
    createdAt: row.created_at.toISOString(),
    updatedAt: row.updated_at.toISOString(),
  };
}

export async function updateWorkflow(
  id: string,
  data: UpdateWorkflowRequest,
  userId: string
): Promise<Workflow | null> {
  // Validate definition if provided
  if (data.definition) {
    validateWorkflowDefinition(data.definition);
  }

  const updates: string[] = [];
  const values: unknown[] = [];
  let paramIndex = 1;

  if (data.name !== undefined) {
    updates.push(`name = $${paramIndex++}`);
    values.push(data.name);
  }
  if (data.description !== undefined) {
    updates.push(`description = $${paramIndex++}`);
    values.push(data.description);
  }
  if (data.status !== undefined) {
    updates.push(`status = $${paramIndex++}`);
    values.push(data.status);
  }
  if (data.entityType !== undefined) {
    updates.push(`entity_type = $${paramIndex++}`);
    values.push(data.entityType);
  }
  if (data.triggerType !== undefined) {
    updates.push(`trigger_type = $${paramIndex++}`);
    values.push(data.triggerType);
  }
  if (data.definition !== undefined) {
    updates.push(`definition_json = $${paramIndex++}`);
    values.push(JSON.stringify(data.definition));
  }

  if (updates.length === 0) {
    return getWorkflowById(id);
  }

  updates.push(`updated_by = $${paramIndex++}`);
  updates.push(`updated_at = CURRENT_TIMESTAMP`);
  values.push(userId);
  values.push(id);

  const result = await pool.query(
    `UPDATE workflows
     SET ${updates.join(', ')}
     WHERE id = $${paramIndex}
     RETURNING id, name, description, status, entity_type, trigger_type, definition_json, created_by, updated_by, created_at, updated_at`,
    values
  );

  if (result.rows.length === 0) {
    return null;
  }

  const row = result.rows[0];
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    status: row.status,
    entityType: row.entity_type,
    triggerType: row.trigger_type,
    definition: row.definition_json,
    createdBy: row.created_by,
    updatedBy: row.updated_by,
    createdAt: row.created_at.toISOString(),
    updatedAt: row.updated_at.toISOString(),
  };
}

export async function deleteWorkflow(id: string): Promise<boolean> {
  const result = await pool.query(
    'DELETE FROM workflows WHERE id = $1 RETURNING id',
    [id]
  );

  return result.rows.length > 0;
}

