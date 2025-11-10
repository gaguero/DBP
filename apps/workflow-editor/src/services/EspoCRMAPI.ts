/**
 * API service for communicating with EspoCRM
 */

import axios from 'axios';
import type { Workflow } from '../types';

export class EspoCRMAPI {
  private baseURL: string;
  private accessToken: string | null = null;

  constructor(baseURL: string = '') {
    // Get base URL from parent window if embedded in iframe
    if (window.parent !== window) {
      this.baseURL = window.parent.location.origin;
    } else {
      this.baseURL = baseURL || import.meta.env.VITE_ESPOCRM_URL || '';
    }
  }

  /**
   * Set access token for API authentication
   */
  setAccessToken(token: string): void {
    this.accessToken = token;
  }

  /**
   * Get access token from parent window (if embedded)
   */
  async getAccessTokenFromParent(): Promise<string | null> {
    return new Promise((resolve) => {
      // Request token from parent window via postMessage
      window.parent.postMessage({ type: 'REQUEST_TOKEN' }, '*');
      
      const handler = (event: MessageEvent) => {
        if (event.data.type === 'TOKEN_RESPONSE') {
          window.removeEventListener('message', handler);
          resolve(event.data.token);
        }
      };
      
      window.addEventListener('message', handler);
      
      // Timeout after 5 seconds
      setTimeout(() => {
        window.removeEventListener('message', handler);
        resolve(null);
      }, 5000);
    });
  }

  /**
   * Get headers for API requests
   */
  private async getHeaders(): Promise<Record<string, string>> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (!this.accessToken) {
      const token = await this.getAccessTokenFromParent();
      if (token) {
        this.accessToken = token;
      }
    }

    if (this.accessToken) {
      headers['X-Api-Token'] = this.accessToken;
    }

    return headers;
  }

  /**
   * Get workflow by ID
   */
  async getWorkflow(id: string): Promise<Workflow> {
    const headers = await this.getHeaders();
    const response = await axios.get(`${this.baseURL}/api/v1/Workflow/${id}`, { headers });
    return response.data;
  }

  /**
   * Create new workflow
   */
  async createWorkflow(workflow: Partial<Workflow>): Promise<Workflow> {
    const headers = await this.getHeaders();
    
    // Convert definition to JSON string if it's an object
    const workflowData = {
      ...workflow,
      definition: typeof workflow.definition === 'object'
        ? JSON.stringify(workflow.definition)
        : workflow.definition,
    };
    
    const response = await axios.post(`${this.baseURL}/api/v1/Workflow`, workflowData, { headers });
    return response.data;
  }

  /**
   * Update existing workflow
   */
  async updateWorkflow(id: string, workflow: Partial<Workflow>): Promise<Workflow> {
    const headers = await this.getHeaders();
    
    // Convert definition to JSON string if it's an object
    const workflowData = {
      ...workflow,
      definition: workflow.definition && typeof workflow.definition === 'object'
        ? JSON.stringify(workflow.definition)
        : workflow.definition,
    };
    
    const response = await axios.put(`${this.baseURL}/api/v1/Workflow/${id}`, workflowData, { headers });
    return response.data;
  }

  /**
   * Delete workflow
   */
  async deleteWorkflow(id: string): Promise<void> {
    const headers = await this.getHeaders();
    await axios.delete(`${this.baseURL}/api/v1/Workflow/${id}`, { headers });
  }

  /**
   * Get entity types list
   */
  async getEntityTypes(): Promise<string[]> {
    const headers = await this.getHeaders();
    const response = await axios.get(`${this.baseURL}/api/v1/Metadata`, { headers });
    return Object.keys(response.data.entityDefs || {});
  }

  /**
   * Get entity fields
   */
  async getEntityFields(entityType: string): Promise<Record<string, any>> {
    const headers = await this.getHeaders();
    const response = await axios.get(`${this.baseURL}/api/v1/Metadata`, { headers });
    return response.data.entityDefs[entityType]?.fields || {};
  }
}

export const api = new EspoCRMAPI();
