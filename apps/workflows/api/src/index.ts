import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { pool } from './utils/db.js';
import authRoutes from './routes/auth.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true,
}));
app.use(express.json());

// Health check con verificación de DB
app.get('/health', async (_req: Request, res: Response) => {
  try {
    await pool.query('SELECT 1');
    res.json({ 
      status: 'ok', 
      timestamp: new Date().toISOString(),
      service: 'workflows-api',
      database: 'connected'
    });
  } catch (error) {
    res.status(503).json({
      status: 'error',
      service: 'workflows-api',
      database: 'disconnected',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// API Routes
app.get('/api/v1', (_req: Request, res: Response) => {
  res.json({ 
    message: 'Workflows API v1',
    version: '0.1.0',
    endpoints: {
      auth: '/api/v1/auth',
      integrations: '/api/v1/integrations',
      workflows: '/api/v1/workflows',
      executions: '/api/v1/executions',
      webhooks: '/api/v1/webhooks',
      metadata: '/api/v1/metadata'
    }
  });
});

// Auth routes
app.use('/api/v1/auth', authRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Workflows API running on port ${PORT}`);
  console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🗄️  Database: ${process.env.DATABASE_URL ? 'configured' : 'not configured'}`);
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('Shutting down...');
  await pool.end();
  process.exit(0);
});
