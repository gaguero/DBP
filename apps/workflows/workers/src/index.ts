import { Worker } from 'bullmq';
import Redis from 'ioredis';
import dotenv from 'dotenv';

dotenv.config();

const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

// Queue: workflow:execute
const executeWorker = new Worker(
  'workflow:execute',
  async (job) => {
    console.log(`[Worker] Processing workflow execution: ${job.id}`);
    // TODO: Implementar lógica de ejecución en Fase 2
    return { status: 'completed', nodeId: job.data.nodeId };
  },
  {
    connection: redis,
    concurrency: 5,
    removeOnComplete: { count: 100 },
    removeOnFail: { count: 50 }
  }
);

// Queue: workflow:schedule
const scheduleWorker = new Worker(
  'workflow:schedule',
  async (job) => {
    console.log(`[Worker] Processing scheduled workflow: ${job.id}`);
    // TODO: Implementar lógica de programación en Fase 2
    return { status: 'scheduled' };
  },
  {
    connection: redis,
    concurrency: 2
  }
);

// Queue: workflow:webhooks
const webhookWorker = new Worker(
  'workflow:webhooks',
  async (job) => {
    console.log(`[Worker] Processing webhook event: ${job.id}`);
    // TODO: Implementar procesamiento de webhooks en Fase 2
    return { status: 'processed' };
  },
  {
    connection: redis,
    concurrency: 10
  }
);

console.log('🚀 Workflow Workers started');
console.log('📋 Queues: workflow:execute, workflow:schedule, workflow:webhooks');

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('Shutting down workers...');
  await executeWorker.close();
  await scheduleWorker.close();
  await webhookWorker.close();
  await redis.quit();
  process.exit(0);
});

