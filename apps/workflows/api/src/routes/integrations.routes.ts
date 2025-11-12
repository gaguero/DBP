import { Router } from 'express';
import { z } from 'zod';
import {
  createIntegration,
  getIntegrations,
  getIntegrationById,
  updateIntegration,
  deleteIntegration,
  testConnection,
} from '../services/integrations.service.js';
import { authenticate, requireRole, type AuthRequest } from '../middleware/auth.js';

const router: Router = Router();

// Validation schemas
const createIntegrationSchema = z.object({
  name: z.string().min(1).max(255),
  baseUrl: z.string().url().max(500),
  authType: z.enum(['apiKey', 'basic']),
  username: z.string().optional(),
  apiKey: z.string().min(1),
});

const updateIntegrationSchema = z.object({
  name: z.string().min(1).max(255).optional(),
  baseUrl: z.string().url().max(500).optional(),
  authType: z.enum(['apiKey', 'basic']).optional(),
  username: z.string().optional(),
  apiKey: z.string().min(1).optional(),
  active: z.boolean().optional(),
});

// All routes require authentication
router.use(authenticate);

// List all integrations
router.get('/', async (req: AuthRequest, res) => {
  try {
    const integrations = await getIntegrations();
    res.json(integrations);
  } catch (error) {
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Failed to fetch integrations',
    });
  }
});

// Get single integration
router.get('/:id', async (req: AuthRequest, res) => {
  try {
    const integration = await getIntegrationById(req.params.id);
    if (!integration) {
      res.status(404).json({ error: 'Integration not found' });
      return;
    }
    res.json(integration);
  } catch (error) {
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Failed to fetch integration',
    });
  }
});

// Create integration (requires editor or admin role)
router.post('/', requireRole('editor', 'admin'), async (req: AuthRequest, res) => {
  try {
    const data = createIntegrationSchema.parse(req.body);
    const integration = await createIntegration(data, req.user!.userId);
    res.status(201).json(integration);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: 'Validation error', details: error.errors });
      return;
    }
    res.status(400).json({
      error: error instanceof Error ? error.message : 'Failed to create integration',
    });
  }
});

// Update integration (requires editor or admin role)
router.put('/:id', requireRole('editor', 'admin'), async (req: AuthRequest, res) => {
  try {
    const data = updateIntegrationSchema.parse(req.body);
    const integration = await updateIntegration(req.params.id, data);
    if (!integration) {
      res.status(404).json({ error: 'Integration not found' });
      return;
    }
    res.json(integration);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: 'Validation error', details: error.errors });
      return;
    }
    res.status(400).json({
      error: error instanceof Error ? error.message : 'Failed to update integration',
    });
  }
});

// Delete integration (requires admin role)
router.delete('/:id', requireRole('admin'), async (req: AuthRequest, res) => {
  try {
    const deleted = await deleteIntegration(req.params.id);
    if (!deleted) {
      res.status(404).json({ error: 'Integration not found' });
      return;
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Failed to delete integration',
    });
  }
});

// Test connection (requires editor or admin role)
router.post('/:id/test', requireRole('editor', 'admin'), async (req: AuthRequest, res) => {
  try {
    const result = await testConnection(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Failed to test connection',
    });
  }
});

export default router;

