import { Queue } from 'bullmq';
import Redis from 'ioredis';
import type { WorkflowExecutionJobData } from './executions.js';

export const WORKFLOW_EXECUTE_QUEUE = 'workflow-execute';
export const WORKFLOW_SCHEDULE_QUEUE = 'workflow-schedule';
export const WORKFLOW_WEBHOOKS_QUEUE = 'workflow-webhooks';

export const DEFAULT_JOB_OPTIONS = {
  removeOnComplete: { count: 100 },
  removeOnFail: { count: 50 },
  attempts: 3,
  backoff: {
    type: 'exponential' as const,
    delay: 5000,
  },
};

let redisConnection: Redis | null = null;
let workflowExecuteQueue: Queue<WorkflowExecutionJobData> | null = null;

export function getRedisConnection(url = process.env.REDIS_URL || 'redis://localhost:6379'): Redis {
  if (!redisConnection) {
    redisConnection = new Redis(url, {
      maxRetriesPerRequest: null,
    });
  }

  return redisConnection;
}

export function getWorkflowExecuteQueue(): Queue<WorkflowExecutionJobData> {
  if (!workflowExecuteQueue) {
    workflowExecuteQueue = new Queue<WorkflowExecutionJobData>(WORKFLOW_EXECUTE_QUEUE, {
      connection: getRedisConnection(),
      defaultJobOptions: DEFAULT_JOB_OPTIONS,
    });
  }

  return workflowExecuteQueue;
}

export async function shutdownQueueResources(): Promise<void> {
  if (workflowExecuteQueue) {
    await workflowExecuteQueue.close();
    workflowExecuteQueue = null;
  }

  if (redisConnection) {
    await redisConnection.quit();
    redisConnection = null;
  }
}


