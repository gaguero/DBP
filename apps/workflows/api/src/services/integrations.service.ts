import { pool } from '../utils/db.js';
import axios, { type AxiosError } from 'axios';
import { encrypt, decrypt } from '@dbp/workflows-shared';
import type {
  IntegrationAccount,
  CreateIntegrationRequest,
  UpdateIntegrationRequest,
  TestConnectionResponse,
} from '../types/integrations.js';

export async function createIntegration(
  data: CreateIntegrationRequest,
  _userId: string
): Promise<IntegrationAccount> {
  // Encrypt API key
  const encryptedApiKey = encrypt(data.apiKey);

  const result = await pool.query(
    `INSERT INTO integration_accounts (name, base_url, auth_type, username, api_key_encrypted)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING id, name, base_url, auth_type, username, active, created_at, updated_at`,
    [
      data.name,
      data.baseUrl,
      data.authType,
      data.username || null,
      encryptedApiKey,
    ]
  );

  const row = result.rows[0];
  return {
    id: row.id,
    name: row.name,
    baseUrl: row.base_url,
    authType: row.auth_type,
    username: row.username,
    active: row.active,
    createdAt: row.created_at.toISOString(),
    updatedAt: row.updated_at.toISOString(),
  };
}

export async function getIntegrations(): Promise<IntegrationAccount[]> {
  const result = await pool.query(
    `SELECT id, name, base_url, auth_type, username, active, created_at, updated_at
     FROM integration_accounts
     ORDER BY created_at DESC`
  );

  return result.rows.map((row) => ({
    id: row.id,
    name: row.name,
    baseUrl: row.base_url,
    authType: row.auth_type,
    username: row.username,
    active: row.active,
    createdAt: row.created_at.toISOString(),
    updatedAt: row.updated_at.toISOString(),
  }));
}

export async function getIntegrationById(id: string): Promise<IntegrationAccount | null> {
  const result = await pool.query(
    `SELECT id, name, base_url, auth_type, username, active, created_at, updated_at
     FROM integration_accounts
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
    baseUrl: row.base_url,
    authType: row.auth_type,
    username: row.username,
    active: row.active,
    createdAt: row.created_at.toISOString(),
    updatedAt: row.updated_at.toISOString(),
  };
}

export async function updateIntegration(
  id: string,
  data: UpdateIntegrationRequest
): Promise<IntegrationAccount | null> {
  const updates: string[] = [];
  const values: unknown[] = [];
  let paramIndex = 1;

  if (data.name !== undefined) {
    updates.push(`name = $${paramIndex++}`);
    values.push(data.name);
  }
  if (data.baseUrl !== undefined) {
    updates.push(`base_url = $${paramIndex++}`);
    values.push(data.baseUrl);
  }
  if (data.authType !== undefined) {
    updates.push(`auth_type = $${paramIndex++}`);
    values.push(data.authType);
  }
  if (data.username !== undefined) {
    updates.push(`username = $${paramIndex++}`);
    values.push(data.username);
  }
  if (data.apiKey !== undefined) {
    updates.push(`api_key_encrypted = $${paramIndex++}`);
    values.push(encrypt(data.apiKey));
  }
  if (data.active !== undefined) {
    updates.push(`active = $${paramIndex++}`);
    values.push(data.active);
  }

  if (updates.length === 0) {
    return getIntegrationById(id);
  }

  updates.push(`updated_at = CURRENT_TIMESTAMP`);
  values.push(id);

  const result = await pool.query(
    `UPDATE integration_accounts
     SET ${updates.join(', ')}
     WHERE id = $${paramIndex}
     RETURNING id, name, base_url, auth_type, username, active, created_at, updated_at`,
    values
  );

  if (result.rows.length === 0) {
    return null;
  }

  const row = result.rows[0];
  return {
    id: row.id,
    name: row.name,
    baseUrl: row.base_url,
    authType: row.auth_type,
    username: row.username,
    active: row.active,
    createdAt: row.created_at.toISOString(),
    updatedAt: row.updated_at.toISOString(),
  };
}

export async function deleteIntegration(id: string): Promise<boolean> {
  const result = await pool.query(
    'DELETE FROM integration_accounts WHERE id = $1 RETURNING id',
    [id]
  );

  return result.rows.length > 0;
}

export async function getIntegrationApiKey(id: string): Promise<string | null> {
  const result = await pool.query(
    'SELECT api_key_encrypted FROM integration_accounts WHERE id = $1',
    [id]
  );

  if (result.rows.length === 0) {
    return null;
  }

  try {
    return decrypt(result.rows[0].api_key_encrypted);
  } catch (error) {
    throw new Error('Failed to decrypt API key');
  }
}

export async function testConnection(id: string): Promise<TestConnectionResponse> {
  const integration = await getIntegrationById(id);
  if (!integration) {
    return {
      success: false,
      message: 'Integration not found',
    };
  }

  if (!integration.active) {
    return {
      success: false,
      message: 'Integration is not active',
    };
  }

  const apiKey = await getIntegrationApiKey(id);
  if (!apiKey) {
    return {
      success: false,
      message: 'Failed to retrieve API key',
    };
  }

  try {
    // Test connection to EspoCRM API
    const baseUrl = integration.baseUrl.replace(/\/$/, ''); // Remove trailing slash
    const authHeader =
      integration.authType === 'apiKey'
        ? `Bearer ${apiKey}`
        : `Basic ${Buffer.from(`${integration.username || ''}:${apiKey}`).toString('base64')}`;

    const response = await axios.get(`${baseUrl}/api/v1/User`, {
      headers: {
        Authorization: authHeader,
        'Content-Type': 'application/json',
      },
      timeout: 10000, // 10 seconds timeout
    });

    // Get current user info
    const userResponse = await response.data;
    const currentUser = Array.isArray(userResponse?.list) ? userResponse.list[0] : userResponse;

    return {
      success: true,
      message: 'Connection successful',
      details: {
        userId: currentUser?.id,
        userName: currentUser?.name || currentUser?.userName,
      },
    };
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      return {
        success: false,
        message: `EspoCRM API error: ${axiosError.response.status} ${axiosError.response.statusText}`,
      };
    } else if (axiosError.request) {
      return {
        success: false,
        message: 'Unable to reach EspoCRM server. Check the base URL.',
      };
    } else {
      return {
        success: false,
        message: axiosError.message || 'Unknown error occurred',
      };
    }
  }
}

