# Technical Context

## Technology Stack

-### External Workflows App (2025-11-12)
- **Backend API:** Node.js 20 + Express, TypeScript, JWT (`jsonwebtoken`), bcrypt, Zod, Axios para EspoCRM.
- **Workers:** BullMQ + ioredis, colas `workflow-execute`, `workflow-schedule`, `workflow-webhooks`.
- **Shared:** Paquete `@dbp/workflows-shared` con tipos, colas BullMQ, cliente EspoCRM, cifrado AES-256-GCM y helpers de ejecución.
- **Frontend:** React 18, Vite, Tailwind CSS, editor React Flow, React Query, Zustand, React Router.
- **Infraestructura:** Railway (servicios separados por subcarpeta), Dockerfiles ajustados para build en contexto local, pnpm como package manager.
- **Base de datos:** PostgreSQL (migración `001_initial_schema.sql`) y cifrado AES-256-GCM para API keys.
- **Integración:** REST API + webhooks planificados; ejecución manual desde API/UI, `EspoClient` centralizado para acciones CRUD/email.
- **Estado:** CRUD + ejecución manual + logs disponibles; UI React Flow funcional (crear/editar/guardar workflows) y dashboard de ejecuciones (filtros + logs). Pendiente webhooks y pruebas E2E en Railway.
- **Backend API:** Node.js 20 + Express, TypeScript, JWT (`jsonwebtoken`), bcrypt, Zod, Axios para EspoCRM.
- **Workers:** BullMQ + ioredis, colas `workflow-execute`, `workflow-schedule`, `workflow-webhooks`.
- **Shared:** Paquete `@dbp/workflows-shared` con tipos, colas BullMQ, cliente EspoCRM, cifrado AES-256-GCM y esquemas de validación.
- **Frontend:** React 18, Vite, Tailwind CSS, futuro editor con React Flow.
- **Infraestructura:** Railway (servicios separados por subcarpeta), Dockerfiles ajustados para build en contexto local, pnpm como package manager.
- **Base de datos:** PostgreSQL (migración `001_initial_schema.sql`) y cifrado AES-256-GCM para API keys.
- **Integración:** Planificada vía REST API y webhooks de EspoCRM; cliente `EspoClient` consolidará operaciones CRUD y envío de correos.
- **Estado:** CRUD de workflows/integraciones y autenticación disponibles; ejecución manual + logs operativos (`POST /workflows/:id/execute`, worker con nodos básicos, endpoints `/executions`+`/logs`); UI React Flow y nodos avanzados pendientes (ver `apps/workflows/STATUS.md`).

> Las secciones posteriores conservan detalles del diseño previo basado en extensión nativa de EspoCRM y siguen como referencia histórica.

### Backend (EspoCRM)
- **Language:** PHP 8.1+
- **Framework:** EspoCRM 9.2+ (custom MVC framework)
- **Database:** PostgreSQL (via EspoCRM ORM)
- **Job System:** EspoCRM JobScheduler + JobManager
- **Hook System:** EspoCRM HookManager
- **API:** EspoCRM REST API

### Frontend (Workflow Editor)
- **Framework:** React 18+
- **Workflow Library:** React Flow
- **Build Tool:** Vite or Webpack
- **Integration:** Embedded in EspoCRM via iframe
- **Communication:** REST API to EspoCRM backend

### EspoCRM Frontend (Host)
- **Framework:** Backbone.js + RequireJS
- **UI Library:** Custom EspoCRM UI components
- **Integration Method:** Custom module with iframe

---

## EspoCRM Architecture Understanding

### Hook System
**Location:** `apps/espocrm/src/application/Espo/Core/HookManager.php`

**How it works:**
- Hooks are PHP classes in `Hooks/{EntityType}/` folders
- HookManager scans for hook classes automatically
- Hooks implement methods like `beforeSave()`, `afterSave()`, `afterRemove()`
- HookManager.process() is called by EspoCRM core when events occur
- Hooks can be entity-specific or common (applied to all entities)

**Our Implementation:**
```php
// custom/Espo/Custom/Hooks/Lead/TriggerWorkflows.php
namespace Espo\Custom\Hooks\Lead;

class TriggerWorkflows
{
    public function afterSave(Entity $entity, array $options): void
    {
        if ($entity->isNew()) {
            // Trigger workflows for "Record Created"
            $this->workflowEngine->trigger('Record Created', $entity);
        } else {
            // Trigger workflows for "Record Updated"
            $this->workflowEngine->trigger('Record Updated', $entity);
        }
    }
}
```

### Job System
**Location:** `apps/espocrm/src/application/Espo/Core/Job/`

**Key Files:**
- `JobScheduler.php`: Creates scheduled jobs
- `JobManager.php`: Processes jobs from queue
- `JobRunner.php`: Executes individual jobs
- `QueueProcessor.php`: Processes job queues

**How it works:**
- Jobs are PHP classes implementing `Job` or `JobDataLess` interface
- JobScheduler creates Job entities in database with `scheduledAt` timestamp
- JobManager.process() runs periodically (via cron or daemon)
- JobManager picks pending jobs and executes them
- Jobs can be in different queues (Q0, Q1, E0, etc.)

**Our Implementation:**
```php
// custom/Espo/Custom/Jobs/ProcessWorkflowExecution.php
namespace Espo\Custom\Jobs;

class ProcessWorkflowExecution implements Job
{
    public function run(Data $data): void
    {
        $executionId = $data->get('executionId');
        $execution = $this->entityManager->getEntity('WorkflowExecution', $executionId);
        
        $this->workflowEngine->execute($execution);
    }
}

// Scheduling a workflow execution:
$this->jobScheduler->setJobName('ProcessWorkflowExecution');
$this->jobScheduler->setData(['executionId' => $execution->getId()]);
$this->jobScheduler->setScheduledAt($scheduledDate);
$this->jobScheduler->schedule();
```

### Entity System
**Location:** `apps/espocrm/src/application/Espo/Core/ORM/`

**How it works:**
- Entities are defined in `metadata/entityDefs/{EntityType}.json`
- EntityManager handles CRUD operations
- Entities have fields, relationships, validation rules
- Custom entities can be created via metadata files

**Our Implementation:**
- Create `metadata/entityDefs/Workflow.json`
- Create `metadata/entityDefs/WorkflowExecution.json`
- Create `metadata/entityDefs/WorkflowLog.json`
- Define fields, relationships, validation

### API System
**Location:** `apps/espocrm/src/application/Espo/Core/Api/`

**How it works:**
- REST API endpoints automatically generated from Controllers
- Controllers handle HTTP requests
- Services contain business logic
- Repositories handle database queries

**Our Implementation:**
- Create `Controllers/Workflow.php` for workflow CRUD
- Create `Services/Workflow.php` for business logic
- API endpoints: GET/POST/PUT/DELETE `/api/v1/Workflow`

---

## React Flow Integration

### Architecture
- React Flow app runs in separate build (Vite/Webpack)
- App is embedded in EspoCRM via iframe
- Communication via postMessage API
- EspoCRM provides authentication context

### Communication Protocol
```javascript
// EspoCRM → React Flow (iframe)
window.postMessage({
    type: 'LOAD_WORKFLOW',
    workflowId: '123',
    definition: {...}
}, '*');

// React Flow → EspoCRM (parent)
window.parent.postMessage({
    type: 'SAVE_WORKFLOW',
    workflowId: '123',
    definition: {...}
}, '*');
```

### Workflow Definition Format
```json
{
  "nodes": [
    {
      "id": "trigger-1",
      "type": "trigger",
      "data": {
        "triggerType": "Record Created",
        "entityType": "Lead"
      },
      "position": { "x": 100, "y": 100 }
    },
    {
      "id": "action-1",
      "type": "action",
      "data": {
        "actionType": "Send Email",
        "templateId": "123",
        "to": "{{emailAddress}}"
      },
      "position": { "x": 300, "y": 100 }
    }
  ],
  "edges": [
    {
      "id": "e1",
      "source": "trigger-1",
      "target": "action-1"
    }
  ]
}
```

---

## Database Schema

### Workflow Table
```sql
CREATE TABLE workflow (
    id VARCHAR(24) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50), -- draft, active, paused, archived
    entity_type VARCHAR(100), -- Lead, Contact, etc.
    trigger_type VARCHAR(100), -- Record Created, etc.
    definition JSONB, -- Complete workflow definition
    is_active BOOLEAN DEFAULT false,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    created_by_id VARCHAR(24),
    modified_by_id VARCHAR(24)
);
```

### WorkflowExecution Table
```sql
CREATE TABLE workflow_execution (
    id VARCHAR(24) PRIMARY KEY,
    workflow_id VARCHAR(24) REFERENCES workflow(id),
    target_entity_type VARCHAR(100),
    target_entity_id VARCHAR(24),
    status VARCHAR(50), -- scheduled, running, completed, failed, cancelled
    current_node_id VARCHAR(100),
    input_data JSONB,
    output_data JSONB,
    error_message TEXT,
    scheduled_at TIMESTAMP,
    started_at TIMESTAMP,
    completed_at TIMESTAMP,
    retry_count INT DEFAULT 0,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);
```

### WorkflowLog Table
```sql
CREATE TABLE workflow_log (
    id VARCHAR(24) PRIMARY KEY,
    execution_id VARCHAR(24) REFERENCES workflow_execution(id),
    node_id VARCHAR(100),
    action VARCHAR(255),
    status VARCHAR(50), -- success, error, skipped
    message TEXT,
    data JSONB,
    executed_at TIMESTAMP
);
```

---

## Key Technical Decisions

### 1. React Flow vs Native Builder
**Decision:** React Flow embedded in iframe
**Reason:** Better UX, faster development, modern interface

### 2. JSON Storage vs Separate Tables
**Decision:** JSON storage for workflow definition
**Reason:** Flexible, easy to version, matches React Flow format

### 3. Job System vs Custom Scheduler
**Decision:** Use EspoCRM JobScheduler
**Reason:** Native integration, reliable, already tested

### 4. Hook System vs Event Listeners
**Decision:** Use EspoCRM HookManager
**Reason:** Native integration, automatic discovery, proper ordering

### 5. Separate Module vs Core Modification
**Decision:** Custom EspoCRM module
**Reason:** Maintainable, upgradeable, follows EspoCRM best practices

---

## Development Workflow

### 1. Backend Development
1. Create entity definitions in `metadata/entityDefs/`
2. Create PHP entity classes (if needed)
3. Create Services for business logic
4. Create Hooks for triggers
5. Create Jobs for scheduled execution
6. Create Controllers for API
7. Test via EspoCRM API

### 2. Frontend Development
1. Create React Flow app (separate project)
2. Build workflow editor UI
3. Implement save/load via API
4. Test in isolation
5. Integrate with EspoCRM via iframe
6. Test full integration

### 3. Integration Testing
1. Create test workflows
2. Trigger test events
3. Verify execution
4. Check logs
5. Verify actions executed correctly

---

## Performance Considerations

### Caching
- Cache workflow definitions (avoid parsing JSON repeatedly)
- Cache entity metadata
- Cache condition evaluation results

### Batch Processing
- Process multiple executions in batch
- Optimize database queries
- Use database transactions

### Rate Limiting
- Limit workflows per entity per time period
- Queue management for high-volume scenarios
- Priority queues for important workflows

### Monitoring
- Track execution times
- Monitor queue sizes
- Alert on failures
- Performance metrics

---

## Security Considerations

### Authentication
- Use EspoCRM authentication for API calls
- Validate user permissions for workflow operations
- Check entity access rights before executing actions

### Input Validation
- Validate workflow definitions
- Sanitize user inputs
- Prevent code injection in custom code actions

### Sandboxing
- Sandbox JavaScript code execution
- Limit API access in custom code
- Timeout for long-running code

---

## Documentation References

### EspoCRM Documentation
- Hooks: https://docs.espocrm.com/development/hooks/
- Jobs: https://docs.espocrm.com/development/jobs/
- Entities: https://docs.espocrm.com/development/metadata/
- API: https://docs.espocrm.com/development/api/

### React Flow Documentation
- https://reactflow.dev/
- https://reactflow.dev/learn/

### Project Documentation
- `docs/workflows-complete-specification.md`: Complete specification
- `docs/workflows-free-alternatives-research.md`: Initial research
- `docs/CREAR-WORKFLOWS-BPM.md`: Manual BPM workflow guide (for reference)

---

**Last Updated:** November 2025  
**Status:** Technical research complete, ready for implementation





