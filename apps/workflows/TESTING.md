# Guía de Pruebas - Endpoints de Workflows

Esta guía te ayudará a probar los endpoints de workflows usando `curl` o herramientas similares.

## Prerequisitos

1. **API corriendo**: Asegúrate de que el servicio API esté desplegado y accesible
2. **Base de datos**: Las migraciones deben estar ejecutadas
3. **Usuario creado**: Necesitas tener un usuario registrado
4. **Acceso a dependencias privadas**: Para compilar o ejecutar los servicios (`api`, `workers`, `ui`) fuera del monorepo, exporta un token de acceso a GitHub Packages:
   ```bash
   export NODE_AUTH_TOKEN="ghp_..."
   npm config set @dbp:registry https://npm.pkg.github.com
   ```
   También puedes ejecutar el workflow `Publish Workflows Shared Package` en GitHub Actions para generar una nueva versión del paquete `@dbp/workflows-shared` antes de los despliegues.

## Build Docker (API / Workers / UI)

Los Dockerfiles de `apps/workflows` ahora copian el workspace completo (`pnpm-workspace.yaml`, `apps/workflows/shared`, etc.) para que `pnpm` resuelva `@dbp/workflows-shared` sin buscar en GitHub Packages. Para construir las imágenes:

1. **Desde la raíz del repositorio**, valida que Docker esté corriendo y ejecuta:
   ```bash
   docker build -f apps/workflows/api/Dockerfile -t workflows-api:local .
   docker build -f apps/workflows/workers/Dockerfile -t workflows-workers:local .
   docker build -f apps/workflows/ui/Dockerfile -t workflows-ui:local .
   ```
2. Cada build usa `pnpm --filter` para instalar solo los paquetes necesarios y empaqueta artefactos productivos (`deploy` en API/Workers y `dist` en UI).
3. Si Docker se ejecuta en Railway u otro servicio CI/CD, asegúrate de que el contexto de build sea la **raíz del repo** para que el workspace quede disponible.
4. Solo necesitas definir `NODE_AUTH_TOKEN` si decides consumir `@dbp/workflows-shared` publicado en GitHub Packages; el flujo por defecto usa la copia local.

Guarda los logs de cada build y adjunta evidencias en `apps/workflows/PROGRESS.md` cuando toques producción.

## Paso 1: Autenticarse

Primero, necesitas obtener un token JWT:

```bash
# Registro de usuario (solo la primera vez)
curl -X POST https://workflows-api-production.up.railway.app/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'

# Login
curl -X POST https://workflows-api-production.up.railway.app/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

**Respuesta esperada:**
```json
{
  "user": {
    "id": "uuid",
    "email": "test@example.com",
    "role": "viewer",
    "createdAt": "2025-11-11T...",
    "updatedAt": "2025-11-11T..."
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresIn": 86400
}
```

**Guarda el token** para usarlo en los siguientes requests:
```bash
export TOKEN="tu-token-aqui"
```

## Paso 2: Crear un Workflow

**Nota**: Requiere rol `editor` o `admin`. Si tu usuario es `viewer`, necesitarás actualizar el rol en la base de datos o crear un nuevo usuario con rol `editor`.

```bash
curl -X POST https://workflows-api-production.up.railway.app/api/v1/workflows \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "name": "Workflow de Prueba",
    "description": "Un workflow simple para probar",
    "entityType": "Lead",
    "triggerType": "created",
    "definition": {
      "nodes": [
        {
          "id": "trigger-1",
          "type": "trigger",
          "data": {
            "entityType": "Lead",
            "event": "created"
          },
          "position": { "x": 100, "y": 100 }
        },
        {
          "id": "action-1",
          "type": "action",
          "data": {
            "actionType": "sendEmail",
            "to": "admin@example.com",
            "subject": "Nuevo Lead creado"
          },
          "position": { "x": 300, "y": 100 }
        }
      ],
      "edges": [
        {
          "id": "edge-1",
          "source": "trigger-1",
          "target": "action-1"
        }
      ]
    }
  }'
```

**Respuesta esperada:**
```json
{
  "id": "uuid-del-workflow",
  "name": "Workflow de Prueba",
  "description": "Un workflow simple para probar",
  "status": "draft",
  "entityType": "Lead",
  "triggerType": "created",
  "definition": {
    "nodes": [...],
    "edges": [...]
  },
  "createdBy": "uuid-del-usuario",
  "updatedBy": "uuid-del-usuario",
  "createdAt": "2025-11-11T...",
  "updatedAt": "2025-11-11T..."
}
```

**Guarda el ID del workflow:**
```bash
export WORKFLOW_ID="uuid-del-workflow"
```

## Paso 3: Listar Todos los Workflows

```bash
curl -X GET https://workflows-api-production.up.railway.app/api/v1/workflows \
  -H "Authorization: Bearer $TOKEN"
```

**Respuesta esperada:**
```json
[
  {
    "id": "uuid-del-workflow",
    "name": "Workflow de Prueba",
    "status": "draft",
    ...
  }
]
```

## Paso 4: Obtener un Workflow Específico

```bash
curl -X GET https://workflows-api-production.up.railway.app/api/v1/workflows/$WORKFLOW_ID \
  -H "Authorization: Bearer $TOKEN"
```

## Paso 5: Actualizar un Workflow

```bash
curl -X PUT https://workflows-api-production.up.railway.app/api/v1/workflows/$WORKFLOW_ID \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "name": "Workflow Actualizado",
    "status": "active",
    "description": "Descripción actualizada"
  }'
```

## Paso 6: Eliminar un Workflow

**Nota**: Requiere rol `admin`.

```bash
curl -X DELETE https://workflows-api-production.up.railway.app/api/v1/workflows/$WORKFLOW_ID \
  -H "Authorization: Bearer $TOKEN"
```

**Respuesta esperada:** Status 204 (No Content)

## Paso 7: Ejecutar un Workflow Manualmente

Antes de ejecutar necesitas una integración EspoCRM activa. Si aún no tienes una, crea una con `/api/v1/integrations` y guarda el `integrationAccountId`.

```bash
curl -X POST https://workflows-api-production.up.railway.app/api/v1/workflows/$WORKFLOW_ID/execute \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "integrationAccountId": "uuid-integracion",
    "targetEntityType": "Lead",
    "targetEntityId": "64f1d0c3aa9c39761d4d5c7a",
    "inputData": {
      "emailAddress": "lead@example.com",
      "status": "New"
    }
  }'
```

**Respuesta esperada:**
```json
{
  "executionId": "uuid-de-la-ejecucion",
  "status": "scheduled",
  "message": "Workflow execution scheduled"
}
```

Guarda el ID de la ejecución para los pasos siguientes:
```bash
export EXECUTION_ID="uuid-de-la-ejecucion"
```

## Paso 8: Listar Ejecuciones

```bash
curl -X GET "https://workflows-api-production.up.railway.app/api/v1/executions?limit=10&page=1" \
  -H "Authorization: Bearer $TOKEN"
```

**Respuesta esperada (resumen):**
```json
{
  "items": [
    {
      "id": "uuid-de-la-ejecucion",
      "workflowId": "uuid-del-workflow",
      "workflowName": "Workflow de Prueba",
      "status": "running",
      "targetEntityType": "Lead",
      "targetEntityId": "64f1d0c3aa9c39761d4d5c7a",
      "startedAt": "2025-11-12T...",
      "updatedAt": "2025-11-12T..."
    }
  ],
  "total": 1,
  "page": 1,
  "pageSize": 10,
  "hasNextPage": false
}
```

## Paso 9: Consultar Logs de una Ejecución

```bash
curl -X GET https://workflows-api-production.up.railway.app/api/v1/executions/$EXECUTION_ID/logs \
  -H "Authorization: Bearer $TOKEN"
```

**Respuesta esperada (ejemplo):**
```json
[
  {
    "id": "uuid-log-1",
    "executionId": "uuid-de-la-ejecucion",
    "nodeId": "trigger-1",
    "actionType": "trigger",
    "status": "success",
    "message": "Trigger processed (manual execution)",
    "occurredAt": "2025-11-12T..."
  },
  {
    "id": "uuid-log-2",
    "executionId": "uuid-de-la-ejecucion",
    "nodeId": "action-1",
    "actionType": "action",
    "status": "success",
    "message": "Action sendEmail executed successfully",
    "payload": {
      "action": "sendEmail",
      "to": "admin@example.com",
      "subject": "Nuevo Lead creado"
    },
    "occurredAt": "2025-11-12T..."
  }
]
```

## Pruebas UI (React Flow + Dashboard)

1. **Levantar la UI**
   ```bash
   pnpm --filter @dbp/workflows-ui dev
   ```
   Abrir `http://localhost:5173`, iniciar sesión con usuario creado (`/auth/login`).

2. **Listado de Workflows**
   - Verificar carga inicial y botón **Actualizar**.
   - Crear nuevo workflow desde el modal y confirmar redirección al editor.

3. **Editor React Flow**
   - Agregar nodos (`Trigger`, `Acción`, `Condición`, `Delay`, `Split`, `Code`) y conectarlos.
   - Editar propiedades en el panel derecho y guardar cambios (`Guardar cambios`).
   - Intentar guardar sin nodo `trigger` para validar mensaje de error.

4. **Dashboard de Ejecuciones**
   - Ir a `/executions`, aplicar filtros de estado/IDs y paginar resultados.
   - Abrir una ejecución, revisar logs en orden cronológico y payloads JSON.
   - Ejecutar `POST /workflows/:id/execute` (API) y confirmar aparición en la lista tras refrescar.

5. **Sesión**
   - Probar botón **Cerrar sesión**, volver a iniciar sesión y confirmar persistencia vía localStorage.

## Casos de Error Comunes

### 1. Token inválido o expirado
```json
{
  "error": "Invalid or expired token"
}
```

### 2. Permisos insuficientes
```json
{
  "error": "Insufficient permissions"
}
```

### 3. Validación fallida
```json
{
  "error": "Validation error",
  "details": [
    {
      "path": ["definition", "nodes"],
      "message": "Expected array, received string"
    }
  ]
}
```

### 4. Workflow no encontrado
```json
{
  "error": "Workflow not found"
}
```

### 5. Definición inválida
```json
{
  "error": "Workflow must have at least one trigger node"
}
```

## Ejemplos de Definiciones Válidas

### Workflow Simple con Trigger y Acción
```json
{
  "nodes": [
    {
      "id": "trigger-1",
      "type": "trigger",
      "data": { "entityType": "Lead", "event": "created" },
      "position": { "x": 0, "y": 0 }
    },
    {
      "id": "action-1",
      "type": "action",
      "data": { "actionType": "updateField", "field": "status", "value": "qualified" },
      "position": { "x": 200, "y": 0 }
    }
  ],
  "edges": [
    {
      "id": "edge-1",
      "source": "trigger-1",
      "target": "action-1"
    }
  ]
}
```

### Workflow con Condición
```json
{
  "nodes": [
    {
      "id": "trigger-1",
      "type": "trigger",
      "data": { "entityType": "Opportunity", "event": "updated" },
      "position": { "x": 0, "y": 0 }
    },
    {
      "id": "condition-1",
      "type": "condition",
      "data": { "field": "stage", "operator": "equals", "value": "Closed Won" },
      "position": { "x": 200, "y": 0 }
    },
    {
      "id": "action-1",
      "type": "action",
      "data": { "actionType": "createTask", "name": "Follow up" },
      "position": { "x": 400, "y": -100 }
    },
    {
      "id": "action-2",
      "type": "action",
      "data": { "actionType": "sendEmail", "to": "sales@example.com" },
      "position": { "x": 400, "y": 100 }
    }
  ],
  "edges": [
    { "id": "edge-1", "source": "trigger-1", "target": "condition-1" },
    { "id": "edge-2", "source": "condition-1", "target": "action-1", "data": { "condition": "true" } },
    { "id": "edge-3", "source": "condition-1", "target": "action-2", "data": { "condition": "false" } }
  ]
}
```

## Script de Prueba Completo

Crea un archivo `test-workflows.sh`:

```bash
#!/bin/bash

API_URL="https://workflows-api-production.up.railway.app"
EMAIL="test@example.com"
PASSWORD="password123"
INTEGRATION_ID="${INTEGRATION_ID:-}"

echo "1. Registrando usuario..."
REGISTER_RESPONSE=$(curl -s -X POST "$API_URL/api/v1/auth/register" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$EMAIL\",\"password\":\"$PASSWORD\"}")

echo "$REGISTER_RESPONSE" | jq '.'

echo -e "\n2. Haciendo login..."
LOGIN_RESPONSE=$(curl -s -X POST "$API_URL/api/v1/auth/login" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$EMAIL\",\"password\":\"$PASSWORD\"}")

TOKEN=$(echo "$LOGIN_RESPONSE" | jq -r '.token')
echo "Token obtenido: ${TOKEN:0:20}..."

echo -e "\n3. Creando workflow..."
CREATE_RESPONSE=$(curl -s -X POST "$API_URL/api/v1/workflows" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "name": "Test Workflow",
    "entityType": "Lead",
    "triggerType": "created",
    "definition": {
      "nodes": [
        {
          "id": "trigger-1",
          "type": "trigger",
          "data": {},
          "position": {"x": 0, "y": 0}
        }
      ],
      "edges": []
    }
  }')

WORKFLOW_ID=$(echo "$CREATE_RESPONSE" | jq -r '.id')
echo "Workflow creado: $WORKFLOW_ID"

echo -e "\n4. Listando workflows..."
curl -s -X GET "$API_URL/api/v1/workflows" \
  -H "Authorization: Bearer $TOKEN" | jq '.'

echo -e "\n5. Obteniendo workflow específico..."
curl -s -X GET "$API_URL/api/v1/workflows/$WORKFLOW_ID" \
  -H "Authorization: Bearer $TOKEN" | jq '.'

if [ -n "$INTEGRATION_ID" ]; then
  echo -e "\n6. Ejecutando workflow manualmente..."
  EXECUTE_RESPONSE=$(curl -s -X POST "$API_URL/api/v1/workflows/$WORKFLOW_ID/execute" \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $TOKEN" \
    -d "{
      \"integrationAccountId\": \"$INTEGRATION_ID\",
      \"targetEntityType\": \"Lead\",
      \"targetEntityId\": \"64f1d0c3aa9c39761d4d5c7a\",
      \"inputData\": {
        \"emailAddress\": \"lead@example.com\",
        \"status\": \"New\"
      }
    }")

  echo "$EXECUTE_RESPONSE" | jq '.'
  EXECUTION_ID=$(echo "$EXECUTE_RESPONSE" | jq -r '.executionId')

  if [ "$EXECUTION_ID" != "null" ]; then
    echo -e "\n7. Listando ejecuciones..."
    curl -s -X GET "$API_URL/api/v1/executions?limit=5&page=1" \
      -H "Authorization: Bearer $TOKEN" | jq '.'

    echo -e "\n8. Consultando logs de la ejecución..."
    curl -s -X GET "$API_URL/api/v1/executions/$EXECUTION_ID/logs" \
      -H "Authorization: Bearer $TOKEN" | jq '.'
  else
    echo "No se pudo obtener EXECUTION_ID. Revisa la respuesta anterior."
  fi
else
  echo -e "\n[Info] Define INTEGRATION_ID=<uuid> para probar la ejecución manual."
fi
```

Ejecuta con:
```bash
chmod +x test-workflows.sh
./test-workflows.sh
```

## Resultados Recientes (12/11/2025)
- Script de PowerShell ejecutado en Windows 10 apuntando a `http://localhost:3000`.
- Health check y login fallaron porque no había instancia local de la API levantada.
- Próximo paso: repetir ejecución usando la URL pública de Railway, por ejemplo:
  ```powershell
  .\test-endpoints.ps1 -ApiUrl "https://workflows-api-production.up.railway.app"
  ```
- Registrar respuestas completas y adjuntar evidencias en `apps/workflows/PROGRESS.md`.
- Agendar prueba adicional para validar `/workflows/:id/execute`, `/executions` y `/executions/:id/logs` una vez desplegados API y workers en Railway.

## Notas Importantes

1. **Roles**: Los usuarios nuevos tienen rol `viewer` por defecto. Para crear/editar workflows necesitas rol `editor` o `admin`.

2. **Actualizar rol de usuario** (directamente en la base de datos):
   ```sql
   UPDATE users SET role = 'editor' WHERE email = 'test@example.com';
   ```

3. **URLs**: Reemplaza `https://workflows-api-production.up.railway.app` con tu URL real de Railway.

4. **Herramientas alternativas**:
   - **Postman**: Importa los requests desde esta documentación
   - **Insomnia**: Similar a Postman
   - **httpie**: `http POST $API_URL/api/v1/auth/login email=test@example.com password=password123`


