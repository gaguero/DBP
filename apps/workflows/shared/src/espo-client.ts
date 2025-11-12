import axios, { type AxiosInstance } from 'axios';

export interface EspoClientConfig {
  baseUrl: string;
  apiKey: string;
  username?: string | null;
  timeoutMs?: number;
}

export class EspoClient {
  private client: AxiosInstance;
  private baseUrl: string;

  constructor(config: EspoClientConfig) {
    this.baseUrl = config.baseUrl.replace(/\/$/, '');

    this.client = axios.create({
      baseURL: `${this.baseUrl}/api/v1`,
      headers: {
        'X-Api-Key': config.apiKey,
        'Content-Type': 'application/json',
      },
      timeout: config.timeoutMs ?? 30000,
    });
  }

  async getEntity(entityType: string, entityId: string): Promise<Record<string, unknown>> {
    const response = await this.client.get(`/${entityType}/${entityId}`);
    return response.data;
  }

  async updateEntity(entityType: string, entityId: string, payload: Record<string, unknown>): Promise<Record<string, unknown>> {
    const response = await this.client.put(`/${entityType}/${entityId}`, payload);
    return response.data;
  }

  async updateField(
    entityType: string,
    entityId: string,
    field: string,
    value: unknown
  ): Promise<Record<string, unknown>> {
    return this.updateEntity(entityType, entityId, { [field]: value });
  }

  async createEntity(entityType: string, data: Record<string, unknown>): Promise<Record<string, unknown>> {
    const response = await this.client.post(`/${entityType}`, data);
    return response.data;
  }

  async sendEmail(
    to: string,
    subject: string,
    body: string,
    options?: {
      from?: string;
      cc?: string[];
      bcc?: string[];
      attachments?: Array<{ name: string; contents: string }>;
    }
  ): Promise<Record<string, unknown>> {
    const emailData: Record<string, unknown> = {
      to,
      subject,
      body,
    };

    if (options?.from) emailData.from = options.from;
    if (options?.cc) emailData.cc = options.cc.join(',');
    if (options?.bcc) emailData.bcc = options.bcc.join(',');
    if (options?.attachments) emailData.attachments = options.attachments;

    const response = await this.client.post('/Email', emailData);
    return response.data;
  }

  async addToTargetList(targetListId: string, entityType: string, entityId: string): Promise<void> {
    await this.client.post('/TargetListMember', {
      targetListId,
      entityType,
      entityId,
    });
  }

  async createTask(name: string, assignedUserId?: string, dueDate?: string): Promise<Record<string, unknown>> {
    const taskData: Record<string, unknown> = {
      name,
    };

    if (assignedUserId) taskData.assignedUserId = assignedUserId;
    if (dueDate) taskData.dateEnd = dueDate;

    const response = await this.client.post('/Task', taskData);
    return response.data;
  }
}


