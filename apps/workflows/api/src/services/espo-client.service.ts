import { decrypt, EspoClient } from '@dbp/workflows-shared';
import { pool } from '../utils/db.js';

// Factory para crear cliente EspoCRM desde ID de integración
export async function createEspoClient(integrationAccountId: string): Promise<EspoClient> {
  const result = await pool.query(
    `SELECT id, name, base_url, auth_type, username, api_key_encrypted, active
     FROM integration_accounts
     WHERE id = $1 AND active = true`,
    [integrationAccountId]
  );

  if (result.rows.length === 0) {
    throw new Error(`Integration account ${integrationAccountId} not found or inactive`);
  }

  const row = result.rows[0];
  const apiKey = decrypt(row.api_key_encrypted);

  return new EspoClient({
    baseUrl: row.base_url,
    apiKey,
    username: row.username,
  });
}
