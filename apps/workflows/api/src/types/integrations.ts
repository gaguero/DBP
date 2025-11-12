// Tipos para integraciones EspoCRM
export interface IntegrationAccount {
  id: string;
  name: string;
  baseUrl: string;
  authType: 'apiKey' | 'basic';
  username?: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateIntegrationRequest {
  name: string;
  baseUrl: string;
  authType: 'apiKey' | 'basic';
  username?: string;
  apiKey: string; // Se cifrará antes de guardar
}

export interface UpdateIntegrationRequest {
  name?: string;
  baseUrl?: string;
  authType?: 'apiKey' | 'basic';
  username?: string;
  apiKey?: string; // Se cifrará antes de guardar
  active?: boolean;
}

export interface TestConnectionResponse {
  success: boolean;
  message: string;
  details?: {
    version?: string;
    userId?: string;
    userName?: string;
  };
}

