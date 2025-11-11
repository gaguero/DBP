import express, { Request, Response } from 'express';
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

// Middleware
app.use(express.json());

// Health check con verificación de DB
app.get('/health', async (req: Request, res: Response) => {
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

// API Routes (placeholder - se implementarán en siguientes fases)
app.get('/api/v1', (req: Request, res: Response) => {
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
