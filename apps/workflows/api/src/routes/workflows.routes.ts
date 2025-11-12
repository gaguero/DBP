import { Router } from 'express';
import { z } from 'zod';
import {
  createWorkflow,
  getWorkflows,
  getWorkflowById,
  updateWorkflow,
  deleteWorkflow,
  executeWorkflow,
  WorkflowExecutionError,
} from '../services/workflows.service.js';
import { ExecuteWorkflowSchema } from '@dbp/workflows-shared';
import { authenticate, requireRole, type AuthRequest } from '../middleware/auth.js';

const router: Router = Router();

// Validation schemas
const workflowNodeSchema = z.object({
  id: z.string(),
  type: z.enum(['trigger', 'action', 'condition', 'delay', 'split', 'code']),
  data: z.record(z.unknown()),
  position: z.object({
    x: z.number(),
    y: z.number(),
  }),
});

const workflowEdgeSchema = z.object({
  id: z.string(),
  source: z.string(),
  target: z.string(),
  data: z.record(z.unknown()).optional(),
});

const workflowDefinitionSchema = z.object({
  nodes: z.array(workflowNodeSchema).min(1),
  edges: z.array(workflowEdgeSchema),
  settings: z
    .object({
      version: z.number(),
      createdBy: z.string().optional(),
      lastValidatedAt: z.string().optional(),
    })
    .optional(),
});

const createWorkflowSchema = z.object({
  name: z.string().min(1).max(255),
  description: z.string().optional(),
  entityType: z.string().min(1).max(100),
  triggerType: z.string().min(1).max(100),
  definition: workflowDefinitionSchema,
});

const updateWorkflowSchema = z.object({
  name: z.string().min(1).max(255).optional(),
  description: z.string().optional(),
  status: z.enum(['draft', 'active', 'paused']).optional(),
  entityType: z.string().min(1).max(100).optional(),
  triggerType: z.string().min(1).max(100).optional(),
  definition: workflowDefinitionSchema.optional(),
});

// All routes require authentication
router.use(authenticate);

// List all workflows
router.get('/', async (_req: AuthRequest, res) => {
  try {
    const workflows = await getWorkflows();
    res.json(workflows);
  } catch (error) {
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Failed to fetch workflows',
    });
  }
});

// Get single workflow
router.get('/:id', async (req: AuthRequest, res) => {
  try {
    const workflow = await getWorkflowById(req.params.id);
    if (!workflow) {
      res.status(404).json({ error: 'Workflow not found' });
      return;
    }
    res.json(workflow);
  } catch (error) {
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Failed to fetch workflow',
    });
  }
});

// Create workflow (requires editor or admin role)
router.post('/', requireRole('editor', 'admin'), async (req: AuthRequest, res) => {
  try {
    const data = createWorkflowSchema.parse(req.body);
    const workflow = await createWorkflow(data, req.user!.userId);
    res.status(201).json(workflow);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: 'Validation error', details: error.errors });
      return;
    }
    res.status(400).json({
      error: error instanceof Error ? error.message : 'Failed to create workflow',
    });
  }
});

// Update workflow (requires editor or admin role)
router.put('/:id', requireRole('editor', 'admin'), async (req: AuthRequest, res) => {
  try {
    const data = updateWorkflowSchema.parse(req.body);
    const workflow = await updateWorkflow(req.params.id, data, req.user!.userId);
    if (!workflow) {
      res.status(404).json({ error: 'Workflow not found' });
      return;
    }
    res.json(workflow);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: 'Validation error', details: error.errors });
      return;
    }
    res.status(400).json({
      error: error instanceof Error ? error.message : 'Failed to update workflow',
    });
  }
});

// Delete workflow (requires admin role)
router.delete('/:id', requireRole('admin'), async (req: AuthRequest, res) => {
  try {
    const deleted = await deleteWorkflow(req.params.id);
    if (!deleted) {
      res.status(404).json({ error: 'Workflow not found' });
      return;
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Failed to delete workflow',
    });
  }
});

// Execute workflow manually (requires editor or admin role)
router.post('/:id/execute', requireRole('editor', 'admin'), async (req: AuthRequest, res) => {
  try {
    const data = ExecuteWorkflowSchema.parse(req.body);
    const result = await executeWorkflow(req.params.id, data, req.user!.userId);
    res.status(202).json(result);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: 'Validation error', details: error.errors });
      return;
    }
    if (error instanceof WorkflowExecutionError) {
      res.status(error.statusCode).json({ error: error.message });
      return;
    }
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Failed to execute workflow',
    });
  }
});

export default router;

