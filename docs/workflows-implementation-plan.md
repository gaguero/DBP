# Plan de Implementación Detallado: Sistema de Workflows para EspoCRM
## Dolphin Blue Paradise - Custom Workflow System

**Fecha de Creación:** Noviembre 2025  
**Versión:** 1.0  
**Estado:** Listo para Implementación

---

## TABLA DE CONTENIDOS

1. [Resumen Ejecutivo](#resumen-ejecutivo)
2. [Fases de Implementación](#fases-de-implementación)
3. [Arquitectura Técnica Detallada](#arquitectura-técnica-detallada)
4. [Orden de Implementación Recomendado](#orden-de-implementación-recomendado)
5. [Riesgos y Consideraciones](#riesgos-y-consideraciones)
6. [Testing y Validación](#testing-y-validación)
7. [Documentación Necesaria](#documentación-necesaria)

---

## RESUMEN EJECUTIVO

### Qué Vamos a Construir

Un sistema completo de workflows personalizado para EspoCRM que permite crear, gestionar y ejecutar workflows complejos con una interfaz gráfica moderna (React Flow), similar a HubSpot. El sistema incluye:

- **Backend PHP:** Motor de ejecución, sistema de triggers, acciones, condiciones, y programación
- **Frontend React Flow:** Editor visual con drag & drop para crear workflows gráficamente
- **Integración Nativa:** Totalmente integrado con EspoCRM usando hooks, jobs, y API nativos
- **Funcionalidades Completas:** Todos los triggers, condiciones, acciones, delays, y branching especificados

### Por Qué es Importante

- **Ahorro de Costos:** EspoCRM Advanced Pack cuesta $10,680-38,400/año. Esta solución es propia y sin costo recurrente
- **Control Total:** Solución personalizada adaptada a las necesidades específicas de Dolphin Blue Paradise
- **Escalabilidad:** Sistema diseñado para crecer con el negocio
- **Mejor UX:** Interfaz moderna con React Flow vs builder nativo de EspoCRM

### Tiempo Estimado Total

**Total:** 12-16 semanas (3-4 meses) de desarrollo a tiempo completo

**Desglose:**
- Fase 1 (Setup): 1 semana
- Fase 2 (Backend Core): 4-5 semanas
- Fase 3 (Triggers & Actions): 3-4 semanas
- Fase 4 (Frontend): 3-4 semanas
- Fase 5 (Integración): 1-2 semanas
- Fase 6 (Testing & Refinamiento): 1 semana

### Dependencias Críticas

1. **EspoCRM 9.2+** instalado y funcionando en Railway
2. **PostgreSQL** como base de datos
3. **Acceso SSH** a instancia de Railway para desarrollo
4. **Node.js 18+** para desarrollo del frontend React Flow
5. **PHP 8.1+** para desarrollo del backend
6. **Git** y acceso al repositorio del proyecto

---

## FASES DE IMPLEMENTACIÓN

### FASE 1: SETUP Y PREPARACIÓN DEL ENTORNO

**Objetivo:** Configurar el entorno de desarrollo y estructura base del módulo

**Tiempo Estimado:** 1 semana (5 días hábiles)

**Tareas Específicas:**

#### 1.1 Preparar Estructura del Módulo EspoCRM
- [ ] Crear directorio base: `apps/espocrm/custom/Espo/Modules/Workflows/`
- [ ] Crear estructura de carpetas completa:
  ```
  Workflows/
  ├── Resources/
  │   ├── metadata/
  │   │   ├── entityDefs/
  │   │   ├── clientDefs/
  │   │   └── scopes/
  │   └── i18n/
  ├── Hooks/
  ├── Jobs/
  ├── Services/
  │   └── WorkflowActions/
  ├── Controllers/
  └── client/
      └── modules/
          └── workflows/
  ```
- [ ] Crear archivo `manifest.json` del módulo con metadata básica
- [ ] Crear archivo `composer.json` si es necesario para dependencias PHP

#### 1.2 Configurar Entorno de Desarrollo
- [ ] Configurar acceso SSH a Railway para EspoCRM
- [ ] Verificar versión de PHP (debe ser 8.1+)
- [ ] Verificar versión de EspoCRM (debe ser 9.2+)
- [ ] Configurar permisos de escritura en directorio `custom/`
- [ ] Probar que cambios en `custom/` se reflejan sin rebuild completo

#### 1.3 Configurar Frontend React Flow (Proyecto Separado)
- [ ] Crear nuevo proyecto React con Vite: `apps/workflow-editor/`
- [ ] Instalar dependencias:
  ```bash
  npm install reactflow
  npm install @reactflow/core @reactflow/controls @reactflow/background
  npm install axios  # Para comunicación con API
  npm install -D @types/react @types/react-dom typescript
  ```
- [ ] Configurar TypeScript con config estricto
- [ ] Configurar build para producción (output a directorio estático)
- [ ] Configurar proxy para desarrollo (conectar a EspoCRM local)

#### 1.4 Configurar Base de Datos (Preparación)
- [ ] Conectar a PostgreSQL de Railway
- [ ] Verificar que podemos crear tablas manualmente
- [ ] Documentar credenciales de conexión (en variables de entorno)

**Entregables:**
- ✅ Estructura de carpetas creada
- ✅ Módulo básico registrado en EspoCRM
- ✅ Proyecto React Flow inicializado
- ✅ Documentación de setup completada

**Criterios de Éxito:**
- Módulo aparece en lista de módulos de EspoCRM (aunque vacío)
- React Flow app compila sin errores
- Podemos hacer cambios y verlos reflejados

**Dependencias:** Ninguna

---

### FASE 2: BACKEND CORE - ENTIDADES Y MOTOR DE EJECUCIÓN

**Objetivo:** Crear las entidades base y el motor de ejecución de workflows

**Tiempo Estimado:** 4-5 semanas (20-25 días hábiles)

**Tareas Específicas:**

#### 2.1 Crear Entidad Workflow
- [ ] Crear `Resources/metadata/entityDefs/Workflow.json` con:
  - Campos básicos: name, description, status, entityType, triggerType, isActive
  - Campo `definition` (JSON) para almacenar workflow completo
  - Campos de auditoría: createdAt, updatedAt, createdBy, modifiedBy
  - Relaciones: hasMany WorkflowExecution, hasMany WorkflowLog
- [ ] Crear `Resources/metadata/scopes/Workflow.json` con:
  - Permisos de lectura/escritura
  - Campos disponibles para búsqueda
  - Vistas por defecto
- [ ] Crear `Resources/metadata/clientDefs/Workflow.json` con:
  - Configuración de cliente (si es necesario)
- [ ] Ejecutar rebuild de EspoCRM: `php rebuild.php`
- [ ] Verificar que entidad aparece en Entity Manager
- [ ] Crear registro de prueba manualmente desde UI

**Archivo de Ejemplo: `Resources/metadata/entityDefs/Workflow.json`**
```json
{
  "fields": {
    "name": {
      "type": "varchar",
      "required": true,
      "maxLength": 255
    },
    "description": {
      "type": "text"
    },
    "status": {
      "type": "enum",
      "options": ["draft", "active", "paused", "archived"],
      "default": "draft"
    },
    "entityType": {
      "type": "enum",
      "options": ["Lead", "Contact", "Account", "Opportunity"],
      "required": true
    },
    "triggerType": {
      "type": "enum",
      "options": ["Record Created", "Record Updated", "Record Deleted", "Property Changed", "Form Submission", "Email Opened", "Email Clicked", "Specific Date/Time", "Relative Date", "Recurring Schedule"],
      "required": true
    },
    "definition": {
      "type": "jsonObject",
      "required": true
    },
    "isActive": {
      "type": "bool",
      "default": false
    }
  },
  "links": {
    "executions": {
      "type": "hasMany",
      "entity": "WorkflowExecution",
      "foreign": "workflow"
    },
    "logs": {
      "type": "hasMany",
      "entity": "WorkflowLog",
      "foreign": "workflow"
    }
  }
}
```

#### 2.2 Crear Entidad WorkflowExecution
- [ ] Crear `Resources/metadata/entityDefs/WorkflowExecution.json` con:
  - workflowId (link a Workflow)
  - targetEntityType, targetEntityId
  - status (enum: scheduled, running, completed, failed, cancelled)
  - currentNodeId (varchar)
  - inputData, outputData (JSON)
  - errorMessage (text)
  - scheduledAt, startedAt, completedAt (datetime)
  - retryCount (int, default 0)
- [ ] Crear metadata de scope y clientDefs
- [ ] Ejecutar rebuild
- [ ] Verificar entidad creada

#### 2.3 Crear Entidad WorkflowLog
- [ ] Crear `Resources/metadata/entityDefs/WorkflowLog.json` con:
  - executionId (link a WorkflowExecution)
  - nodeId (varchar)
  - action (varchar)
  - status (enum: success, error, skipped)
  - message (text)
  - data (JSON)
  - executedAt (datetime)
- [ ] Crear metadata de scope y clientDefs
- [ ] Ejecutar rebuild
- [ ] Verificar entidad creada

#### 2.4 Crear WorkflowParser Service
- [ ] Crear `Services/WorkflowParser.php`
- [ ] Implementar método `parse(string $definitionJson): WorkflowDefinition`
- [ ] Validar estructura JSON:
  - Debe tener `nodes` (array)
  - Debe tener `edges` (array)
  - Debe tener al menos un nodo trigger
  - Nodos deben tener IDs únicos
  - Edges deben conectar nodos válidos
- [ ] Construir grafo de ejecución (mapa de nodos y sus conexiones)
- [ ] Validar que no hay ciclos infinitos (opcional pero recomendado)
- [ ] Crear tests unitarios básicos

**Código de Ejemplo: `Services/WorkflowParser.php`**
```php
<?php
namespace Espo\Modules\Workflows\Services;

use Espo\Core\Services\Base;
use Espo\ORM\EntityManager;
use stdClass;

class WorkflowParser extends Base
{
    public function parse(string $definitionJson): WorkflowDefinition
    {
        $definition = json_decode($definitionJson, true);
        
        if (json_last_error() !== JSON_ERROR_NONE) {
            throw new \Exception("Invalid JSON: " . json_last_error_msg());
        }
        
        // Validar estructura
        $this->validateStructure($definition);
        
        // Construir grafo
        $graph = $this->buildGraph($definition);
        
        return new WorkflowDefinition($definition, $graph);
    }
    
    private function validateStructure(array $definition): void
    {
        if (!isset($definition['nodes']) || !is_array($definition['nodes'])) {
            throw new \Exception("Workflow must have 'nodes' array");
        }
        
        if (!isset($definition['edges']) || !is_array($definition['edges'])) {
            throw new \Exception("Workflow must have 'edges' array");
        }
        
        // Validar que hay al menos un trigger
        $hasTrigger = false;
        foreach ($definition['nodes'] as $node) {
            if ($node['type'] === 'trigger') {
                $hasTrigger = true;
                break;
            }
        }
        
        if (!$hasTrigger) {
            throw new \Exception("Workflow must have at least one trigger node");
        }
        
        // Validar IDs únicos
        $nodeIds = [];
        foreach ($definition['nodes'] as $node) {
            if (isset($nodeIds[$node['id']])) {
                throw new \Exception("Duplicate node ID: " . $node['id']);
            }
            $nodeIds[$node['id']] = true;
        }
    }
    
    private function buildGraph(array $definition): array
    {
        $graph = [];
        
        // Inicializar grafo
        foreach ($definition['nodes'] as $node) {
            $graph[$node['id']] = [
                'node' => $node,
                'outgoing' => [],
                'incoming' => []
            ];
        }
        
        // Construir conexiones
        foreach ($definition['edges'] as $edge) {
            $sourceId = $edge['source'];
            $targetId = $edge['target'];
            
            if (!isset($graph[$sourceId]) || !isset($graph[$targetId])) {
                throw new \Exception("Edge references invalid node");
            }
            
            $graph[$sourceId]['outgoing'][] = $targetId;
            $graph[$targetId]['incoming'][] = $sourceId;
        }
        
        return $graph;
    }
}
```

#### 2.5 Crear WorkflowEngine Service (Core)
- [ ] Crear `Services/WorkflowEngine.php`
- [ ] Implementar método `execute(WorkflowExecution $execution): void`
- [ ] Lógica de ejecución:
  1. Cargar workflow definition desde Workflow entity
  2. Parsear con WorkflowParser
  3. Obtener nodo actual desde execution.currentNodeId
  4. Si es null, empezar desde trigger
  5. Ejecutar nodo actual
  6. Determinar siguiente nodo(s) según edges
  7. Si hay delay, programar con WorkflowScheduler
  8. Si no hay delay, continuar ejecución
  9. Actualizar execution con nuevo currentNodeId
  10. Si es nodo final, marcar execution como completed
- [ ] Manejar errores: try-catch alrededor de cada ejecución de nodo
- [ ] Logging: crear WorkflowLog entry para cada nodo ejecutado
- [ ] Crear tests unitarios

#### 2.6 Crear WorkflowScheduler Service
- [ ] Crear `Services/WorkflowScheduler.php`
- [ ] Implementar método `schedule(WorkflowExecution $execution, DateTime $scheduledAt): void`
- [ ] Usar EspoCRM JobScheduler:
  ```php
  $this->jobScheduler->setJobName('ProcessWorkflowExecution');
  $this->jobScheduler->setData(['executionId' => $execution->getId()]);
  $this->jobScheduler->setScheduledAt($scheduledAt);
  $this->jobScheduler->schedule();
  ```
- [ ] Implementar método `scheduleRelative(WorkflowExecution $execution, int $amount, string $unit): void`
  - Calcular fecha futura basada en amount + unit (days, hours, etc.)
  - Llamar a schedule() con fecha calculada
- [ ] Implementar método `scheduleRecurring(Workflow $workflow, string $cronExpression): void`
  - Crear job recurrente usando cron expression
- [ ] Crear tests unitarios

#### 2.7 Crear Job ProcessWorkflowExecution
- [ ] Crear `Jobs/ProcessWorkflowExecution.php`
- [ ] Implementar interface `Job` de EspoCRM
- [ ] En método `run()`:
  1. Obtener executionId de data
  2. Cargar WorkflowExecution entity
  3. Verificar que status es 'scheduled'
  4. Cambiar status a 'running'
  5. Llamar a WorkflowEngine.execute()
  6. Manejar errores y actualizar status
- [ ] Registrar job en EspoCRM (verificar que se ejecuta)

**Entregables:**
- ✅ 3 entidades creadas y funcionando
- ✅ WorkflowParser validando y parseando workflows
- ✅ WorkflowEngine ejecutando workflows básicos
- ✅ WorkflowScheduler programando ejecuciones
- ✅ Job procesando workflows programados

**Criterios de Éxito:**
- Podemos crear Workflow entity desde UI
- Podemos crear WorkflowExecution manualmente
- WorkflowEngine puede ejecutar un workflow simple (trigger → action)
- WorkflowScheduler programa jobs correctamente
- Jobs se ejecutan y procesan workflows

**Dependencias:** Fase 1 completada

---

### FASE 3: TRIGGERS Y ACCIONES

**Objetivo:** Implementar todos los triggers y acciones especificados

**Tiempo Estimado:** 3-4 semanas (15-20 días hábiles)

**Tareas Específicas:**

#### 3.1 Implementar Triggers Basados en Registros
- [ ] Crear `Hooks/Common/WorkflowTrigger.php`
- [ ] Implementar método `afterSave(Entity $entity, array $options): void`
  - Verificar si es nuevo registro (isNew)
  - Buscar workflows activos con trigger "Record Created" o "Record Updated"
  - Filtrar por entityType
  - Para cada workflow encontrado:
    - Crear WorkflowExecution
    - Establecer targetEntityType e targetEntityId
    - Llamar a WorkflowEngine.execute()
- [ ] Implementar método `afterRemove(Entity $entity, array $options): void`
  - Similar pero para trigger "Record Deleted"
- [ ] Implementar detección de "Property Changed":
  - Comparar valores anteriores con nuevos
  - Si campo específico cambió, buscar workflows con trigger "Property Changed"
- [ ] Registrar hooks en EspoCRM (crear hooks específicos por entidad si es necesario)
- [ ] Crear tests: crear Lead, verificar que workflow se ejecuta

**Código de Ejemplo: `Hooks/Common/WorkflowTrigger.php`**
```php
<?php
namespace Espo\Modules\Workflows\Hooks\Common;

use Espo\Core\HookManager;
use Espo\ORM\Entity;
use Espo\ORM\EntityManager;
use Espo\Modules\Workflows\Services\WorkflowEngine;

class WorkflowTrigger implements \Espo\Core\Hook\Hook
{
    private EntityManager $entityManager;
    private WorkflowEngine $workflowEngine;
    
    public function __construct(EntityManager $entityManager, WorkflowEngine $workflowEngine)
    {
        $this->entityManager = $entityManager;
        $this->workflowEngine = $workflowEngine;
    }
    
    public function afterSave(Entity $entity, array $options): void
    {
        $entityType = $entity->getEntityType();
        $isNew = $entity->isNew();
        
        // Determinar trigger type
        $triggerType = $isNew ? 'Record Created' : 'Record Updated';
        
        // Buscar workflows activos
        $workflows = $this->entityManager
            ->getRDBRepository('Workflow')
            ->where([
                'isActive' => true,
                'status' => 'active',
                'entityType' => $entityType,
                'triggerType' => $triggerType
            ])
            ->find();
        
        foreach ($workflows as $workflow) {
            // Verificar condiciones del trigger (si las hay)
            if ($this->shouldTrigger($workflow, $entity)) {
                $this->createExecution($workflow, $entity);
            }
        }
    }
    
    private function shouldTrigger($workflow, Entity $entity): bool
    {
        // Aquí validar condiciones específicas del trigger
        // Por ejemplo, si trigger tiene condición de campo específico
        return true; // Por ahora, siempre true
    }
    
    private function createExecution($workflow, Entity $entity): void
    {
        $execution = $this->entityManager->getNewEntity('WorkflowExecution');
        $execution->set('workflowId', $workflow->getId());
        $execution->set('targetEntityType', $entity->getEntityType());
        $execution->set('targetEntityId', $entity->getId());
        $execution->set('status', 'running');
        $execution->set('inputData', [
            'entity' => $entity->toArray()
        ]);
        
        $this->entityManager->saveEntity($execution);
        
        // Ejecutar workflow
        $this->workflowEngine->execute($execution);
    }
}
```

#### 3.2 Implementar Triggers Basados en Comportamiento
- [ ] Crear hooks para Form Submission:
  - Hook en endpoint de formularios o LeadCapture
  - Trigger workflow cuando se envía formulario específico
- [ ] Crear hooks para Email events:
  - Hook en Email entity cuando se marca como opened
  - Hook cuando se registra click en email
  - Hook cuando email rebota o se responde
- [ ] Crear integración para Page View/Website Visit:
  - Endpoint webhook que recibe eventos de GA4
  - Buscar Lead por email
  - Actualizar campos de tracking
  - Trigger workflows si es necesario
- [ ] Crear tests para cada tipo de trigger

#### 3.3 Implementar Triggers Basados en Tiempo
- [ ] Crear sistema para Specific Date/Time:
  - Workflow con trigger "Specific Date/Time"
  - Al activar workflow, crear job programado para fecha específica
- [ ] Crear sistema para Relative Date:
  - Ya implementado en WorkflowScheduler
  - Verificar que funciona correctamente
- [ ] Crear sistema para Recurring Schedule:
  - Parsear cron expression
  - Crear job recurrente
  - Verificar ejecución periódica
- [ ] Implementar Business Hours Only:
  - Configurar horario de negocio (9 AM - 5 PM, lunes-viernes)
  - Validar en scheduled job antes de ejecutar
  - Si fuera de horario, reprogramar para siguiente hora de negocio

#### 3.4 Implementar Sistema de Condiciones
- [ ] Crear `Services/ConditionEvaluator.php`
- [ ] Implementar evaluación de operadores string:
  - equals, not_equals, contains, not_contains, starts_with, ends_with, is_empty, is_not_empty
- [ ] Implementar evaluación de operadores number:
  - equals, not_equals, greater_than, less_than, greater_than_or_equal, less_than_or_equal, between
- [ ] Implementar evaluación de operadores date:
  - equals, not_equals, before, after, between, is_empty, is_not_empty, days_ago, days_from_now
- [ ] Implementar evaluación de operadores boolean:
  - equals, is_true, is_false
- [ ] Implementar lógica booleana:
  - AND: todas las condiciones deben ser true
  - OR: al menos una debe ser true
  - NOT: condición debe ser false
  - Nested: combinación de AND/OR/NOT
- [ ] Implementar condiciones especiales:
  - List Membership: verificar si está en Target List
  - Property Comparison: comparar dos propiedades
  - Has Related Record: verificar relaciones
  - Custom Formula: evaluar fórmula (opcional, avanzado)
- [ ] Integrar ConditionEvaluator en WorkflowEngine para nodos de condición
- [ ] Crear tests exhaustivos para cada operador y lógica

#### 3.5 Implementar Acciones de Email
- [ ] Crear `Services/WorkflowActions/SendEmail.php`
- [ ] Implementar envío de email desde template:
  - Cargar EmailTemplate por ID
  - Reemplazar placeholders ({{lead.name}}, etc.)
  - Usar EspoCRM Email Service para enviar
  - Registrar email enviado en WorkflowLog
- [ ] Implementar envío de notificación interna:
  - Crear `Services/WorkflowActions/SendNotification.php`
  - Usar EspoCRM Notification Service
- [ ] Implementar delay antes de enviar:
  - Usar WorkflowScheduler para programar envío futuro
- [ ] Crear tests: enviar email, verificar que llega, verificar placeholders

#### 3.6 Implementar Acciones de Registros
- [ ] Crear `Services/WorkflowActions/UpdateRecord.php`
  - Actualizar campos de registro usando EntityManager
  - Soportar placeholders en valores
  - Validar que campos existen antes de actualizar
- [ ] Crear `Services/WorkflowActions/CreateRecord.php`
  - Crear nuevo registro de cualquier entidad
  - Mapear campos desde workflow definition
- [ ] Crear `Services/WorkflowActions/DeleteRecord.php`
  - Eliminar registro (con validación de permisos)
- [ ] Crear `Services/WorkflowActions/CopyProperties.php`
  - Copiar campos entre registros
- [ ] Crear tests para cada acción

#### 3.7 Implementar Acciones de Listas
- [ ] Crear `Services/WorkflowActions/AddToList.php`
  - Usar EspoCRM TargetList Service
  - Agregar registro a Target List
- [ ] Crear `Services/WorkflowActions/RemoveFromList.php`
  - Remover registro de Target List
- [ ] Crear tests

#### 3.8 Implementar Acciones de Asignación
- [ ] Crear `Services/WorkflowActions/AssignToOwner.php`
  - Asignar registro a usuario específico
  - Implementar lógica round-robin
  - Implementar asignación por propiedad (ej: preferredLanguage)
- [ ] Crear `Services/WorkflowActions/AssignToTeam.php`
  - Asignar registro a equipo
- [ ] Crear tests

#### 3.9 Implementar Acciones de Tareas
- [ ] Crear `Services/WorkflowActions/CreateTask.php`
  - Crear Task entity
  - Configurar nombre, descripción, assignedUser, dueDate, priority
- [ ] Crear `Services/WorkflowActions/CreateMeeting.php`
  - Similar a CreateTask pero para Meeting
- [ ] Crear `Services/WorkflowActions/CreateCall.php`
  - Similar pero para Call
- [ ] Crear tests

#### 3.10 Implementar Acciones de Workflow
- [ ] Crear `Services/WorkflowActions/EnrollInWorkflow.php`
  - Crear nueva WorkflowExecution para otro workflow
- [ ] Crear `Services/WorkflowActions/UnenrollFromWorkflow.php`
  - Cancelar WorkflowExecution activa
- [ ] Crear `Services/WorkflowActions/StopWorkflow.php`
  - Marcar WorkflowExecution actual como cancelled
- [ ] Crear `Services/WorkflowActions/WaitForCondition.php`
  - Crear WorkflowExecution programada que verifica condición periódicamente
  - Si condición se cumple, continuar ejecución
  - Si timeout, cancelar
- [ ] Crear tests

#### 3.11 Implementar Acciones de Delay
- [ ] Ya implementado en WorkflowScheduler
- [ ] Verificar que funciona correctamente
- [ ] Implementar Business Hours Only para delays
- [ ] Crear tests

#### 3.12 Implementar Acciones de Branching
- [ ] Modificar WorkflowEngine para manejar nodos de condición:
  - Si nodo es tipo "condition", evaluar condición
  - Si true, seguir edge "true"
  - Si false, seguir edge "false"
- [ ] Implementar Switch/Case:
  - Evaluar valor de propiedad
  - Seguir edge correspondiente al caso
- [ ] Implementar Split Path:
  - Evaluar todas las condiciones de paths
  - Ejecutar todos los paths que se cumplan (paralelo)
- [ ] Crear tests exhaustivos

#### 3.13 Implementar Acciones de Código Personalizado (Opcional, Fase Avanzada)
- [ ] Crear `Services/WorkflowActions/ExecuteCode.php`
  - Sandbox para ejecutar JavaScript
  - Limitar acceso a APIs
  - Timeout para código largo
  - Validar seguridad (prevenir code injection)
- [ ] Crear `Services/WorkflowActions/CallExternalAPI.php`
  - HTTP requests usando Guzzle
  - Configurar headers, body, timeout
- [ ] Crear `Services/WorkflowActions/SendWebhook.php`
  - Enviar webhook POST
- [ ] **Nota:** Estas acciones son avanzadas y pueden dejarse para fase futura

**Entregables:**
- ✅ Todos los triggers implementados y funcionando
- ✅ Todas las acciones básicas implementadas
- ✅ Sistema de condiciones completo
- ✅ Tests para cada trigger y acción

**Criterios de Éxito:**
- Crear Lead → workflow se ejecuta automáticamente
- Workflow puede enviar email
- Workflow puede actualizar campos
- Workflow puede agregar a lista
- Condiciones funcionan correctamente
- Delays se programan y ejecutan correctamente

**Dependencias:** Fase 2 completada

---

### FASE 4: FRONTEND REACT FLOW

**Objetivo:** Construir interfaz gráfica completa para crear y editar workflows

**Tiempo Estimado:** 3-4 semanas (15-20 días hábiles)

**Tareas Específicas:**

#### 4.1 Setup Base de React Flow
- [ ] Configurar proyecto React con Vite
- [ ] Instalar React Flow y dependencias
- [ ] Configurar TypeScript con tipos estrictos
- [ ] Crear estructura de componentes:
  ```
  src/
  ├── components/
  │   ├── nodes/
  │   ├── edges/
  │   ├── panels/
  │   └── controls/
  ├── hooks/
  ├── services/
  ├── types/
  └── utils/
  ```
- [ ] Configurar routing básico (si es necesario)
- [ ] Configurar comunicación con API de EspoCRM

#### 4.2 Crear Componentes de Nodos
- [ ] Crear `components/nodes/TriggerNode.tsx`
  - Nodo verde con icono de trigger
  - Mostrar tipo de trigger
  - Panel de configuración al hacer click
- [ ] Crear `components/nodes/ActionNode.tsx`
  - Nodo azul con icono de acción
  - Mostrar tipo de acción
  - Panel de configuración
- [ ] Crear `components/nodes/ConditionNode.tsx`
  - Nodo amarillo con icono de condición
  - Mostrar condición
  - Dos handles de salida (true/false)
- [ ] Crear `components/nodes/DelayNode.tsx`
  - Nodo naranja con icono de reloj
  - Mostrar duración del delay
- [ ] Crear `components/nodes/BranchNode.tsx`
  - Nodo morado con icono de branching
- [ ] Crear `components/nodes/CodeNode.tsx`
  - Nodo gris con icono de código
- [ ] Registrar todos los tipos de nodos en React Flow:
  ```typescript
  const nodeTypes = {
    trigger: TriggerNode,
    action: ActionNode,
    condition: ConditionNode,
    delay: DelayNode,
    branch: BranchNode,
    code: CodeNode,
  };
  ```

#### 4.3 Crear Panel Lateral (Sidebar)
- [ ] Crear `components/panels/NodePalette.tsx`
- [ ] Lista de nodos disponibles agrupados por categoría:
  - Triggers
  - Actions (Email, Record, List, Assignment, Task, Workflow, Delay, Branching, Code)
  - Conditions
- [ ] Drag & drop desde palette al canvas
- [ ] Búsqueda/filtro de nodos
- [ ] Iconos y descripciones para cada nodo

#### 4.4 Crear Panel de Propiedades
- [ ] Crear `components/panels/PropertiesPanel.tsx`
- [ ] Mostrar configuración del nodo seleccionado
- [ ] Formularios dinámicos según tipo de nodo:
  - Trigger: selector de tipo, entityType, condiciones
  - Action: selector de tipo, campos específicos de acción
  - Condition: operador, campo, valor, lógica
  - Delay: cantidad, unidad, business hours only
- [ ] Validación en tiempo real
- [ ] Preview de valores con placeholders
- [ ] Guardar cambios automáticamente en workflow definition

#### 4.5 Implementar Canvas Principal
- [ ] Crear `components/WorkflowCanvas.tsx`
- [ ] Configurar ReactFlow con:
  - nodeTypes personalizados
  - edgeTypes (si es necesario personalizar)
  - Controls (zoom, pan, fit view)
  - Background (grid)
  - MiniMap (opcional)
- [ ] Implementar drag & drop desde palette
- [ ] Implementar conexión de nodos (arrastrar desde handle)
- [ ] Implementar movimiento de nodos
- [ ] Implementar eliminación de nodos y edges
- [ ] Implementar zoom y pan

#### 4.6 Implementar Validación en Tiempo Real
- [ ] Crear `utils/validation.ts`
- [ ] Validar que hay al menos un trigger
- [ ] Validar que todos los nodos están conectados
- [ ] Validar que condiciones tienen dos salidas (true/false)
- [ ] Validar que delays tienen configuración válida
- [ ] Validar que acciones tienen campos requeridos
- [ ] Mostrar errores visuales en nodos inválidos
- [ ] Mostrar warnings para mejores prácticas

#### 4.7 Implementar Guardar/Cargar
- [ ] Crear `services/api.ts` para comunicación con EspoCRM
- [ ] Implementar `loadWorkflow(workflowId: string): Promise<WorkflowDefinition>`
  - GET `/api/v1/Workflow/{id}`
  - Parsear definition JSON
  - Convertir a formato React Flow
- [ ] Implementar `saveWorkflow(workflow: Workflow): Promise<void>`
  - Validar workflow antes de guardar
  - Convertir de formato React Flow a JSON
  - PUT `/api/v1/Workflow/{id}` o POST para crear nuevo
- [ ] Implementar autoguardado (opcional, cada X segundos)
- [ ] Mostrar estado de guardado (guardando, guardado, error)

#### 4.8 Implementar Undo/Redo
- [ ] Crear `hooks/useUndoRedo.ts`
- [ ] Mantener historial de cambios
- [ ] Implementar deshacer (Ctrl+Z)
- [ ] Implementar rehacer (Ctrl+Y)
- [ ] Limitar tamaño del historial (ej: últimos 50 cambios)
- [ ] Botones de UI para undo/redo

#### 4.9 Implementar Modo de Prueba
- [ ] Crear `components/TestMode.tsx`
- [ ] Botón para activar modo de prueba
- [ ] Panel para ingresar datos de prueba (ej: Lead de prueba)
- [ ] Ejecutar workflow con datos de prueba
- [ ] Mostrar logs de ejecución en tiempo real
- [ ] Mostrar qué nodos se ejecutaron y en qué orden
- [ ] Mostrar resultados de cada acción
- [ ] Permitir step-by-step debugging

#### 4.10 Integrar con EspoCRM (Iframe)
- [ ] Crear página en EspoCRM: `client/modules/workflows/views/workflow-editor/workflow-editor.js`
- [ ] Crear vista Backbone que contiene iframe:
  ```javascript
  Espo.define('Workflows:Views.WorkflowEditor', 'View', function (Dep) {
      return Dep.extend({
          template: 'workflows:workflow-editor',
          setup: function () {
              this.workflowId = this.options.id;
          },
          afterRender: function () {
              var iframe = this.$el.find('iframe')[0];
              iframe.src = '/workflow-editor/index.html?workflowId=' + this.workflowId;
              
              // Escuchar mensajes del iframe
              window.addEventListener('message', function(event) {
                  if (event.data.type === 'SAVE_WORKFLOW') {
                      // Guardar workflow via API
                  }
              });
          }
      });
  });
  ```
- [ ] Crear template HTML con iframe
- [ ] Configurar postMessage API para comunicación:
  - EspoCRM → React Flow: cargar workflow, datos de usuario
  - React Flow → EspoCRM: guardar workflow, obtener datos
- [ ] Manejar autenticación (pasar token o usar cookies)

#### 4.11 Crear Página de Lista de Workflows
- [ ] Crear vista en EspoCRM para listar workflows
- [ ] Mostrar: nombre, estado, entityType, triggerType, última modificación
- [ ] Botones: crear nuevo, editar, activar/pausar, eliminar
- [ ] Filtros: por estado, entityType, triggerType
- [ ] Búsqueda por nombre

#### 4.12 Crear Página de Detalle de Workflow
- [ ] Mostrar información del workflow
- [ ] Botón para abrir editor
- [ ] Mostrar estadísticas: ejecuciones, éxito/fallo, últimos ejecutados
- [ ] Mostrar logs recientes
- [ ] Botones: activar/pausar, duplicar, eliminar

**Entregables:**
- ✅ Editor React Flow completamente funcional
- ✅ Todos los tipos de nodos implementados
- ✅ Panel de propiedades funcional
- ✅ Validación en tiempo real
- ✅ Guardar/cargar workflows
- ✅ Integración con EspoCRM via iframe
- ✅ Modo de prueba funcionando

**Criterios de Éxito:**
- Podemos crear workflow desde cero en el editor
- Podemos arrastrar nodos y conectarlos
- Podemos configurar propiedades de cada nodo
- Podemos guardar workflow y se persiste en EspoCRM
- Podemos cargar workflow existente y editarlo
- Validación muestra errores claros
- Modo de prueba ejecuta workflow y muestra logs

**Dependencias:** Fase 2 y 3 completadas (al menos parcialmente para probar)

---

### FASE 5: INTEGRACIÓN Y REFINAMIENTO

**Objetivo:** Integrar completamente frontend y backend, y refinar funcionalidades

**Tiempo Estimado:** 1-2 semanas (5-10 días hábiles)

**Tareas Específicas:**

#### 5.1 Integración Completa Frontend-Backend
- [ ] Verificar que todos los triggers funcionan desde frontend
- [ ] Verificar que todas las acciones se pueden configurar desde frontend
- [ ] Verificar que condiciones se evalúan correctamente
- [ ] Verificar que delays se programan correctamente
- [ ] Verificar que branching funciona correctamente
- [ ] Probar workflow completo end-to-end desde creación hasta ejecución

#### 5.2 Implementar Enrollment Management
- [ ] Crear sistema para verificar si contacto ya está inscrito
- [ ] Prevenir inscripciones duplicadas (opcional: permitir re-inscripción)
- [ ] Crear UI para ver workflows activos de un contacto
- [ ] Crear UI para desinscribir manualmente
- [ ] Implementar lógica de re-enrollment (resetear estado)

#### 5.3 Mejorar Logging y Monitoring
- [ ] Crear dashboard de estadísticas de workflows:
  - Workflows activos
  - Ejecuciones hoy/semana/mes
  - Tasa de éxito/fallo
  - Tiempo promedio de ejecución
- [ ] Crear vista de logs detallados
- [ ] Implementar filtros en logs (por workflow, por status, por fecha)
- [ ] Implementar búsqueda en logs
- [ ] Crear alertas para workflows que fallan frecuentemente

#### 5.4 Optimizar Performance
- [ ] Implementar caché de workflow definitions (evitar parsear JSON repetidamente)
- [ ] Optimizar queries de base de datos (índices en campos frecuentemente consultados)
- [ ] Implementar batch processing para workflows que procesan muchos registros
- [ ] Implementar rate limiting para prevenir sobrecarga
- [ ] Optimizar frontend (lazy loading, code splitting)

#### 5.5 Mejorar Manejo de Errores
- [ ] Mejorar mensajes de error (más descriptivos)
- [ ] Implementar retry automático con exponential backoff
- [ ] Crear UI para ver workflows fallidos y reintentar manualmente
- [ ] Implementar notificaciones cuando workflow falla críticamente
- [ ] Crear logs de errores más detallados

#### 5.6 Testing End-to-End
- [ ] Crear suite de tests end-to-end:
  - Crear workflow desde UI
  - Activar workflow
  - Trigger workflow (crear Lead)
  - Verificar que se ejecuta correctamente
  - Verificar que acciones se ejecutan
  - Verificar logs
- [ ] Probar workflows complejos:
  - Múltiples condiciones
  - Delays
  - Branching
  - Múltiples acciones
- [ ] Probar edge cases:
  - Workflow con errores
  - Workflow con delays largos
  - Workflow con muchas acciones
  - Workflow cancelado a mitad de ejecución

**Entregables:**
- ✅ Sistema completamente integrado
- ✅ Enrollment management funcionando
- ✅ Dashboard de estadísticas
- ✅ Performance optimizado
- ✅ Manejo de errores mejorado
- ✅ Tests end-to-end pasando

**Criterios de Éxito:**
- Workflow completo funciona de principio a fin
- Performance es aceptable (< 1 segundo para workflows simples)
- Errores se manejan gracefully
- Dashboard muestra información útil
- Tests end-to-end pasan

**Dependencias:** Fases 2, 3, y 4 completadas

---

### FASE 6: TESTING, DOCUMENTACIÓN Y DEPLOYMENT

**Objetivo:** Asegurar calidad, documentar, y desplegar a producción

**Tiempo Estimado:** 1 semana (5 días hábiles)

**Tareas Específicas:**

#### 6.1 Testing Exhaustivo
- [ ] Crear tests unitarios para todos los services
- [ ] Crear tests de integración para triggers
- [ ] Crear tests de integración para acciones
- [ ] Crear tests E2E para flujos completos
- [ ] Probar en diferentes navegadores (Chrome, Firefox, Safari)
- [ ] Probar en diferentes dispositivos (desktop, tablet)
- [ ] Probar con diferentes volúmenes de datos
- [ ] Probar con workflows muy complejos (stress testing)

#### 6.2 Documentación Técnica
- [ ] Documentar arquitectura del sistema
- [ ] Documentar API endpoints
- [ ] Documentar estructura de datos (Workflow definition format)
- [ ] Documentar cómo agregar nuevos triggers
- [ ] Documentar cómo agregar nuevas acciones
- [ ] Documentar cómo extender el sistema
- [ ] Crear diagramas de flujo de ejecución

#### 6.3 Documentación de Usuario
- [ ] Crear guía de usuario para crear workflows
- [ ] Crear guía de usuario para cada tipo de trigger
- [ ] Crear guía de usuario para cada tipo de acción
- [ ] Crear guía de usuario para condiciones
- [ ] Crear guía de usuario para delays y branching
- [ ] Crear guía de troubleshooting
- [ ] Crear videos tutoriales (opcional pero recomendado)

#### 6.4 Preparar Deployment
- [ ] Crear script de instalación/migración
- [ ] Verificar que todas las dependencias están documentadas
- [ ] Crear checklist de deployment
- [ ] Probar deployment en ambiente de staging
- [ ] Crear plan de rollback
- [ ] Documentar variables de entorno necesarias

#### 6.5 Deployment a Producción
- [ ] Backup de base de datos antes de deployment
- [ ] Deploy backend (subir archivos a Railway)
- [ ] Ejecutar migraciones de base de datos
- [ ] Deploy frontend (build y subir archivos estáticos)
- [ ] Verificar que módulo se carga correctamente
- [ ] Verificar que entidades se crean correctamente
- [ ] Probar workflow básico en producción
- [ ] Monitorear logs por errores

#### 6.6 Post-Deployment
- [ ] Crear workflows de ejemplo para el equipo
- [ ] Entrenar al equipo en uso del sistema
- [ ] Monitorear sistema por primera semana
- [ ] Recopilar feedback del equipo
- [ ] Crear backlog de mejoras futuras

**Entregables:**
- ✅ Tests completos pasando
- ✅ Documentación técnica completa
- ✅ Documentación de usuario completa
- ✅ Sistema desplegado en producción
- ✅ Equipo entrenado

**Criterios de Éxito:**
- Todos los tests pasan
- Documentación es clara y completa
- Deployment exitoso sin errores
- Equipo puede usar el sistema efectivamente

**Dependencias:** Todas las fases anteriores completadas

---

## ARQUITECTURA TÉCNICA DETALLADA

### Estructura de Carpetas Completa

```
apps/
├── espocrm/
│   └── custom/
│       └── Espo/
│           └── Modules/
│               └── Workflows/
│                   ├── Resources/
│                   │   ├── metadata/
│                   │   │   ├── entityDefs/
│                   │   │   │   ├── Workflow.json
│                   │   │   │   ├── WorkflowExecution.json
│                   │   │   │   └── WorkflowLog.json
│                   │   │   ├── clientDefs/
│                   │   │   │   └── Workflow.json
│                   │   │   └── scopes/
│                   │   │       ├── Workflow.json
│                   │   │       ├── WorkflowExecution.json
│                   │   │       └── WorkflowLog.json
│                   │   └── i18n/
│                   │       ├── en_US/
│                   │       │   └── Workflow.json
│                   │       └── es_ES/
│                   │           └── Workflow.json
│                   ├── Hooks/
│                   │   ├── Common/
│                   │   │   └── WorkflowTrigger.php
│                   │   ├── Lead/
│                   │   │   └── TriggerWorkflows.php
│                   │   └── Contact/
│                   │       └── TriggerWorkflows.php
│                   ├── Jobs/
│                   │   └── ProcessWorkflowExecution.php
│                   ├── Services/
│                   │   ├── WorkflowEngine.php
│                   │   ├── WorkflowParser.php
│                   │   ├── WorkflowScheduler.php
│                   │   ├── ConditionEvaluator.php
│                   │   └── WorkflowActions/
│                   │       ├── SendEmail.php
│                   │       ├── UpdateRecord.php
│                   │       ├── CreateRecord.php
│                   │       ├── DeleteRecord.php
│                   │       ├── CopyProperties.php
│                   │       ├── AddToList.php
│                   │       ├── RemoveFromList.php
│                   │       ├── AssignToOwner.php
│                   │       ├── AssignToTeam.php
│                   │       ├── CreateTask.php
│                   │       ├── CreateMeeting.php
│                   │       ├── CreateCall.php
│                   │       ├── EnrollInWorkflow.php
│                   │       ├── UnenrollFromWorkflow.php
│                   │       ├── StopWorkflow.php
│                   │       └── WaitForCondition.php
│                   ├── Controllers/
│                   │   └── Workflow.php
│                   └── client/
│                       └── modules/
│                           └── workflows/
│                               ├── views/
│                               │   ├── workflow-list/
│                               │   │   └── workflow-list.js
│                               │   ├── workflow-detail/
│                               │   │   └── workflow-detail.js
│                               │   └── workflow-editor/
│                               │       └── workflow-editor.js
│                               └── templates/
│                                   ├── workflow-list.tpl
│                                   ├── workflow-detail.tpl
│                                   └── workflow-editor.tpl
│
└── workflow-editor/          # React Flow App (separado)
    ├── src/
    │   ├── components/
    │   │   ├── nodes/
    │   │   │   ├── TriggerNode.tsx
    │   │   │   ├── ActionNode.tsx
    │   │   │   ├── ConditionNode.tsx
    │   │   │   ├── DelayNode.tsx
    │   │   │   ├── BranchNode.tsx
    │   │   │   └── CodeNode.tsx
    │   │   ├── panels/
    │   │   │   ├── NodePalette.tsx
    │   │   │   └── PropertiesPanel.tsx
    │   │   └── WorkflowCanvas.tsx
    │   ├── hooks/
    │   │   └── useUndoRedo.ts
    │   ├── services/
    │   │   └── api.ts
    │   ├── types/
    │   │   └── workflow.ts
    │   ├── utils/
    │   │   └── validation.ts
    │   └── App.tsx
    ├── public/
    │   └── index.html
    ├── package.json
    ├── tsconfig.json
    └── vite.config.ts
```

### Componentes Backend (PHP)

#### WorkflowEngine (Core)
- **Responsabilidad:** Ejecutar workflows
- **Métodos principales:**
  - `execute(WorkflowExecution $execution): void` - Ejecutar workflow
  - `executeNode(Node $node, Entity $targetEntity): void` - Ejecutar nodo individual
  - `getNextNodes(string $nodeId, array $graph): array` - Obtener siguientes nodos
- **Dependencias:** WorkflowParser, ConditionEvaluator, WorkflowActions

#### WorkflowParser
- **Responsabilidad:** Parsear y validar workflow definitions
- **Métodos principales:**
  - `parse(string $json): WorkflowDefinition` - Parsear JSON
  - `validateStructure(array $definition): void` - Validar estructura
  - `buildGraph(array $definition): array` - Construir grafo

#### WorkflowScheduler
- **Responsabilidad:** Programar ejecuciones futuras
- **Métodos principales:**
  - `schedule(WorkflowExecution $execution, DateTime $date): void`
  - `scheduleRelative(WorkflowExecution $execution, int $amount, string $unit): void`
  - `scheduleRecurring(Workflow $workflow, string $cron): void`

#### ConditionEvaluator
- **Responsabilidad:** Evaluar condiciones
- **Métodos principales:**
  - `evaluate(array $condition, Entity $entity): bool` - Evaluar condición individual
  - `evaluateGroup(array $conditions, string $logic, Entity $entity): bool` - Evaluar grupo con lógica

### Componentes Frontend (React)

#### WorkflowCanvas
- **Responsabilidad:** Canvas principal de React Flow
- **Props:** workflowId, onSave, onLoad
- **Estado:** nodes, edges, selectedNode

#### NodePalette
- **Responsabilidad:** Lista de nodos disponibles para drag & drop
- **Props:** onNodeDragStart
- **Estado:** filteredNodes, searchQuery

#### PropertiesPanel
- **Responsabilidad:** Configurar nodo seleccionado
- **Props:** selectedNode, onChange
- **Estado:** formData, validationErrors

### Flujo de Datos

#### Creación de Workflow
1. Usuario crea workflow en React Flow
2. Frontend valida workflow
3. Frontend convierte a JSON format
4. Frontend envía POST/PUT a `/api/v1/Workflow`
5. Backend valida y guarda en base de datos
6. Backend retorna workflow creado

#### Ejecución de Workflow
1. Evento trigger ocurre (ej: Lead creado)
2. HookManager procesa hooks
3. WorkflowTrigger hook busca workflows activos
4. Para cada workflow encontrado:
   - Crea WorkflowExecution
   - Llama WorkflowEngine.execute()
5. WorkflowEngine:
   - Carga workflow definition
   - Parsea con WorkflowParser
   - Ejecuta nodos en orden
   - Para delays, programa con WorkflowScheduler
   - Crea WorkflowLog entries
6. Si hay delay, JobManager ejecuta job más tarde
7. WorkflowEngine continúa ejecución

### Integraciones con EspoCRM

#### Hook System
- Hooks en `Hooks/Common/WorkflowTrigger.php`
- Se registran automáticamente por HookManager
- Se ejecutan en `afterSave`, `afterRemove`, etc.

#### Job System
- Job `ProcessWorkflowExecution` implementa interface `Job`
- Se programa con JobScheduler
- Se ejecuta por JobManager

#### API System
- Controller `Workflow.php` extiende `Espo\Core\Controllers\Record`
- Endpoints automáticos: GET, POST, PUT, DELETE `/api/v1/Workflow`
- Service `Workflow.php` contiene lógica de negocio

---

## ORDEN DE IMPLEMENTACIÓN RECOMENDADO

### Secuencia Crítica

1. **Fase 1 (Setup)** → **Fase 2 (Backend Core)** → **Fase 3 (Triggers & Actions)** → **Fase 4 (Frontend)** → **Fase 5 (Integración)** → **Fase 6 (Testing)**

### Justificación del Orden

1. **Setup primero:** Necesitamos estructura antes de construir
2. **Backend Core antes de Triggers/Actions:** El motor debe existir antes de usarlo
3. **Triggers/Actions antes de Frontend:** Podemos probar backend manualmente antes de construir UI
4. **Frontend después:** UI depende de backend funcionando
5. **Integración después:** Refinar después de tener ambas partes
6. **Testing al final:** Testing completo requiere sistema completo

### Puntos de Validación

#### Después de Fase 1
- [ ] Módulo aparece en EspoCRM
- [ ] React Flow compila

#### Después de Fase 2
- [ ] Podemos crear Workflow entity manualmente
- [ ] WorkflowEngine ejecuta workflow simple
- [ ] WorkflowScheduler programa jobs

#### Después de Fase 3
- [ ] Crear Lead → workflow se ejecuta
- [ ] Workflow puede enviar email
- [ ] Workflow puede actualizar campos

#### Después de Fase 4
- [ ] Podemos crear workflow desde UI
- [ ] Podemos guardar y cargar workflows
- [ ] Validación funciona

#### Después de Fase 5
- [ ] Workflow completo funciona end-to-end
- [ ] Performance es aceptable

#### Después de Fase 6
- [ ] Todos los tests pasan
- [ ] Sistema en producción funcionando

### Desarrollo Paralelo Posible

- **Fase 2 y 4 pueden empezar en paralelo parcialmente:**
  - Backend puede desarrollarse mientras frontend se estructura
  - Frontend puede usar mocks mientras backend se completa
- **Fase 3 puede desarrollarse en paralelo con partes de Fase 4:**
  - Mientras se implementan triggers, se pueden crear componentes de UI

---

## RIESGOS Y CONSIDERACIONES

### Riesgos Técnicos Identificados

#### 1. Complejidad de Integración con EspoCRM
**Riesgo:** Alto  
**Descripción:** EspoCRM tiene arquitectura propia que puede ser compleja de entender  
**Mitigación:**
- Estudiar documentación de EspoCRM exhaustivamente
- Crear módulos pequeños de prueba primero
- Consultar comunidad de EspoCRM si es necesario
- Tener acceso a código fuente de EspoCRM para referencia

#### 2. Performance con Muchos Workflows
**Riesgo:** Medio  
**Descripción:** Si hay muchos workflows activos, puede afectar performance  
**Mitigación:**
- Implementar caché de workflow definitions
- Optimizar queries de base de datos (índices)
- Implementar rate limiting
- Usar queues para procesamiento asíncrono
- Monitorear performance desde el inicio

#### 3. Manejo de Errores en Workflows Complejos
**Riesgo:** Medio  
**Descripción:** Workflows complejos pueden fallar en cualquier punto  
**Mitigación:**
- Implementar logging detallado desde el inicio
- Try-catch alrededor de cada ejecución de nodo
- Retry logic con exponential backoff
- UI para ver y manejar workflows fallidos
- Tests exhaustivos para edge cases

#### 4. Seguridad en Código Personalizado
**Riesgo:** Alto (si se implementa)  
**Descripción:** Permitir ejecutar código JavaScript puede ser riesgo de seguridad  
**Mitigación:**
- Sandbox estricto para código
- Limitar acceso a APIs
- Timeout para código largo
- Validar y sanitizar inputs
- Considerar no implementar en primera versión

#### 5. Compatibilidad con Actualizaciones de EspoCRM
**Riesgo:** Medio  
**Descripción:** Actualizaciones de EspoCRM pueden romper nuestro módulo  
**Mitigación:**
- Seguir best practices de EspoCRM
- No modificar core de EspoCRM
- Usar APIs públicas de EspoCRM
- Probar con cada actualización
- Mantener código actualizado

### Consideraciones de Diseño

#### 1. Escalabilidad
- Diseñar para manejar cientos de workflows
- Diseñar para manejar miles de ejecuciones por día
- Considerar sharding si es necesario en el futuro

#### 2. Mantenibilidad
- Código bien documentado
- Tests completos
- Estructura clara y organizada
- Separación de responsabilidades

#### 3. Usabilidad
- UI intuitiva y fácil de usar
- Validación clara de errores
- Documentación de usuario completa
- Tutoriales y ejemplos

#### 4. Extensibilidad
- Fácil agregar nuevos triggers
- Fácil agregar nuevas acciones
- Arquitectura modular
- APIs bien definidas

### Alternativas si Algo Falla

#### Si Backend es Muy Complejo
- **Alternativa:** Implementar funcionalidades básicas primero, agregar avanzadas después
- **Plan B:** Usar sistema de workflows más simple inicialmente

#### Si Frontend es Muy Complejo
- **Alternativa:** Empezar con UI más simple (formularios), agregar React Flow después
- **Plan B:** Usar builder nativo de EspoCRM inicialmente

#### Si Performance es Problema
- **Alternativa:** Optimizar queries y agregar caché
- **Plan B:** Limitar número de workflows activos simultáneos

#### Si Integración con EspoCRM es Muy Difícil
- **Alternativa:** Consultar documentación y comunidad más
- **Plan B:** Considerar sistema externo con API (menos integrado)

---

## TESTING Y VALIDACIÓN

### Estrategia de Testing

#### 1. Tests Unitarios
- **Qué probar:** Services individuales (WorkflowParser, ConditionEvaluator, Actions)
- **Herramientas:** PHPUnit para PHP, Jest/Vitest para React
- **Cobertura objetivo:** > 80%

#### 2. Tests de Integración
- **Qué probar:** Integración entre componentes (WorkflowEngine + Actions, Hooks + Engine)
- **Herramientas:** PHPUnit con base de datos de prueba
- **Cobertura objetivo:** Flujos críticos 100%

#### 3. Tests End-to-End
- **Qué probar:** Flujos completos (crear workflow → activar → trigger → ejecutar → verificar)
- **Herramientas:** Playwright o Cypress para frontend, PHPUnit para backend
- **Cobertura objetivo:** Casos de uso principales 100%

### Casos de Prueba Críticos

#### Backend

1. **Workflow Simple (Trigger → Action)**
   - Crear workflow con trigger "Record Created" y action "Send Email"
   - Crear Lead
   - Verificar que email se envía

2. **Workflow con Condición**
   - Crear workflow con condición (ej: si email contiene "@gmail.com")
   - Crear Lead que cumple condición
   - Crear Lead que no cumple condición
   - Verificar que solo se ejecuta para Lead que cumple

3. **Workflow con Delay**
   - Crear workflow con delay de 1 minuto
   - Trigger workflow
   - Verificar que se programa correctamente
   - Esperar 1 minuto
   - Verificar que se ejecuta después del delay

4. **Workflow con Branching**
   - Crear workflow con condición que divide en dos paths
   - Verificar que ambos paths se ejecutan correctamente según condición

5. **Workflow con Múltiples Acciones**
   - Crear workflow con varias acciones secuenciales
   - Verificar que todas se ejecutan en orden correcto

6. **Workflow con Error**
   - Crear workflow que falla en alguna acción
   - Verificar que error se registra en logs
   - Verificar que workflow se marca como failed
   - Verificar que se puede reintentar

#### Frontend

1. **Crear Workflow**
   - Abrir editor
   - Arrastrar trigger al canvas
   - Arrastrar action al canvas
   - Conectar trigger a action
   - Configurar propiedades
   - Guardar
   - Verificar que se guarda correctamente

2. **Cargar Workflow Existente**
   - Abrir workflow existente
   - Verificar que se carga correctamente
   - Verificar que nodos y conexiones se muestran correctamente

3. **Validación**
   - Crear workflow sin trigger
   - Verificar que muestra error
   - Agregar trigger
   - Verificar que error desaparece

4. **Modo de Prueba**
   - Activar modo de prueba
   - Ingresar datos de prueba
   - Ejecutar workflow
   - Verificar que se muestran logs
   - Verificar que se muestran resultados

### Criterios de Aceptación

#### Funcionalidad
- [ ] Todos los triggers especificados funcionan
- [ ] Todas las acciones especificadas funcionan
- [ ] Todas las condiciones funcionan
- [ ] Delays funcionan correctamente
- [ ] Branching funciona correctamente
- [ ] Workflows complejos funcionan

#### Performance
- [ ] Workflow simple se ejecuta en < 1 segundo
- [ ] Workflow con 10 acciones se ejecuta en < 5 segundos
- [ ] UI responde en < 100ms para acciones del usuario
- [ ] Carga de workflow desde UI en < 2 segundos

#### Usabilidad
- [ ] Usuario puede crear workflow básico en < 5 minutos
- [ ] Errores son claros y accionables
- [ ] UI es intuitiva sin documentación
- [ ] Validación previene errores comunes

#### Calidad
- [ ] Código tiene > 80% cobertura de tests
- [ ] No hay errores críticos en producción
- [ ] Documentación está completa
- [ ] Código sigue estándares de EspoCRM

---

## DOCUMENTACIÓN NECESARIA

### Documentación Técnica

#### 1. Arquitectura del Sistema
- **Archivo:** `docs/workflows-architecture.md`
- **Contenido:**
  - Diagrama de arquitectura
  - Flujo de datos
  - Componentes principales
  - Integraciones con EspoCRM

#### 2. API Reference
- **Archivo:** `docs/workflows-api.md`
- **Contenido:**
  - Endpoints disponibles
  - Request/response formats
  - Ejemplos de uso
  - Autenticación

#### 3. Workflow Definition Format
- **Archivo:** `docs/workflow-definition-format.md`
- **Contenido:**
  - Estructura JSON completa
  - Tipos de nodos
  - Tipos de edges
  - Ejemplos

#### 4. Guía de Extensión
- **Archivo:** `docs/extending-workflows.md`
- **Contenido:**
  - Cómo agregar nuevo trigger
  - Cómo agregar nueva acción
  - Cómo agregar nuevo tipo de condición
  - Best practices

#### 5. Guía de Deployment
- **Archivo:** `docs/workflows-deployment.md`
- **Contenido:**
  - Requisitos del sistema
  - Pasos de instalación
  - Configuración
  - Troubleshooting común

### Documentación de Usuario

#### 1. Guía de Inicio Rápido
- **Archivo:** `docs/user-guide-quick-start.md`
- **Contenido:**
  - Cómo crear primer workflow
  - Ejemplo paso a paso
  - Conceptos básicos

#### 2. Guía Completa de Usuario
- **Archivo:** `docs/user-guide-complete.md`
- **Contenido:**
  - Todos los triggers explicados
  - Todas las acciones explicadas
  - Todas las condiciones explicadas
  - Ejemplos para cada funcionalidad

#### 3. Guía de Troubleshooting
- **Archivo:** `docs/user-guide-troubleshooting.md`
- **Contenido:**
  - Problemas comunes
  - Cómo ver logs
  - Cómo reportar bugs
  - FAQs

#### 4. Videos Tutoriales (Opcional pero Recomendado)
- Crear workflow básico (5 min)
- Usar condiciones (5 min)
- Usar delays (5 min)
- Modo de prueba (5 min)

### Documentación de Desarrollo

#### 1. Setup de Desarrollo
- **Archivo:** `docs/development-setup.md`
- **Contenido:**
  - Cómo configurar entorno local
  - Cómo ejecutar tests
  - Cómo hacer debug
  - Estructura del código

#### 2. Guía de Contribución
- **Archivo:** `docs/contributing.md`
- **Contenido:**
  - Estándares de código
  - Proceso de pull request
  - Cómo escribir tests
  - Cómo documentar cambios

---

## CONCLUSIÓN

Este plan de implementación detallado proporciona una hoja de ruta completa para construir el sistema de workflows personalizado para EspoCRM. El plan está dividido en 6 fases lógicas, cada una con tareas específicas, entregables claros, y criterios de éxito.

**Próximos Pasos Inmediatos:**
1. Revisar y aprobar este plan
2. Configurar entorno de desarrollo (Fase 1)
3. Comenzar implementación de Backend Core (Fase 2)

**Notas Importantes:**
- Este es un proyecto complejo que requiere conocimiento de PHP, EspoCRM, React, y TypeScript
- Se recomienda desarrollo iterativo: implementar funcionalidades básicas primero, luego agregar avanzadas
- Testing continuo es crítico para asegurar calidad
- Documentación debe mantenerse actualizada durante desarrollo

**Soporte:**
Para preguntas durante implementación, consultar:
- Documentación de EspoCRM: https://docs.espocrm.com/
- Documentación de React Flow: https://reactflow.dev/
- Especificación completa: `docs/workflows-complete-specification.md`
- Contexto técnico: `memory/tech_context.md`

---

**Última Actualización:** Noviembre 2025  
**Versión del Plan:** 1.0  
**Estado:** Listo para Implementación

