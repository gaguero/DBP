import { Router } from 'express';
import { z } from 'zod';
import {
  ExecutionStatusSchema,
  type PaginatedResult,
  type WorkflowExecutionRecord,
  type WorkflowLogEntry,
} from '@dbp/workflows-shared';
import {
  listWorkflowExecutions,
  getWorkflowExecutionById,
  getWorkflowExecutionLogs,
  type ExecutionQueryParams,
} from '../services/executions.service.js';
import { authenticate, requireRole, type AuthRequest } from '../middleware/auth.js';

const router: Router = Router();

const listQuerySchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(20),
  status: ExecutionStatusSchema.optional(),
  workflowId: z.string().uuid().optional(),
  integrationAccountId: z.string().uuid().optional(),
});

router.use(authenticate);
router.use(requireRole('viewer', 'editor', 'admin'));

router.get('/', async (req: AuthRequest, res) => {
  try {
    const query = listQuerySchema.parse(req.query);
    const result: PaginatedResult<WorkflowExecutionRecord> = await listWorkflowExecutions(
      query as ExecutionQueryParams,
    );
    res.json(result);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: 'Validation error', details: error.errors });
      return;
    }

    res.status(500).json({
      error: error instanceof Error ? error.message : 'Failed to list workflow executions',
    });
  }
});

router.get('/:id', async (req: AuthRequest, res) => {
  try {
    const execution = await getWorkflowExecutionById(req.params.id);
    if (!execution) {
      res.status(404).json({ error: 'Execution not found' });
      return;
    }
    res.json(execution);
  } catch (error) {
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Failed to fetch workflow execution',
    });
  }
});

router.get('/:id/logs', async (req: AuthRequest, res) => {
  try {
    const logs: WorkflowLogEntry[] = await getWorkflowExecutionLogs(req.params.id);
    res.json(logs);
  } catch (error) {
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Failed to fetch execution logs',
    });
  }
});

export default router;


