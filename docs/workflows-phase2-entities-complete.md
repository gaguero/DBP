# Fase 2.1 Completada - Definiciones de Entidades

**Fecha:** Noviembre 9, 2025  
**Estado:** ✅ COMPLETADA

## ✅ Entidades Creadas

### 1. Workflow Entity
**Archivo:** `Resources/metadata/entityDefs/Workflow.json`

**Campos:**
- `name` (varchar, required) - Nombre del workflow
- `description` (text) - Descripción
- `status` (enum: draft, active, paused, archived) - Estado del workflow
- `entityType` (enum: Lead, Contact, Account, etc.) - Tipo de entidad objetivo
- `triggerType` (enum) - Tipo de trigger principal
- `definition` (jsonObject) - Definición completa del workflow (nodes + edges)
- `isActive` (bool) - Si está activo
- Campos estándar: createdAt, modifiedAt, createdBy, modifiedBy

**Relaciones:**
- `executions` (hasMany WorkflowExecution)
- `logs` (hasMany WorkflowLog)

**Índices:**
- `statusEntityType` - Para búsquedas por estado y tipo de entidad
- `triggerType` - Para búsquedas por tipo de trigger

### 2. WorkflowExecution Entity
**Archivo:** `Resources/metadata/entityDefs/WorkflowExecution.json`

**Campos:**
- `workflow` (link, required) - Workflow relacionado
- `targetEntityType` (varchar, required) - Tipo de entidad objetivo
- `targetEntityId` (varchar, required) - ID del registro objetivo
- `status` (enum: scheduled, running, completed, failed, cancelled) - Estado de ejecución
- `currentNodeId` (varchar) - Nodo actual en ejecución
- `inputData` (jsonObject) - Datos de entrada
- `outputData` (jsonObject) - Datos de salida
- `errorMessage` (text) - Mensaje de error si falló
- `scheduledAt` (datetime) - Cuándo se programó
- `startedAt` (datetime) - Cuándo empezó
- `completedAt` (datetime) - Cuándo terminó
- `retryCount` (int) - Intentos de retry

**Relaciones:**
- `workflow` (belongsTo Workflow)
- `logs` (hasMany WorkflowLog)

**Índices:**
- `workflowStatus` - Para búsquedas por workflow y estado
- `targetEntity` - Para búsquedas por entidad objetivo
- `scheduledAt` - Para búsquedas de ejecuciones programadas

### 3. WorkflowLog Entity
**Archivo:** `Resources/metadata/entityDefs/WorkflowLog.json`

**Campos:**
- `execution` (link, required) - Ejecución relacionada
- `workflow` (link, required) - Workflow relacionado
- `nodeId` (varchar, required) - ID del nodo ejecutado
- `action` (varchar, required) - Acción realizada
- `status` (enum: success, error, skipped) - Estado del log
- `message` (text) - Mensaje de log
- `data` (jsonObject) - Datos adicionales
- `executedAt` (datetime, required) - Cuándo se ejecutó

**Relaciones:**
- `execution` (belongsTo WorkflowExecution)
- `workflow` (belongsTo Workflow)

**Índices:**
- `executionNode` - Para búsquedas por ejecución y nodo
- `workflowExecution` - Para búsquedas por workflow y ejecución
- `executedAt` - Para búsquedas por fecha de ejecución

## ✅ Archivos de Scope Creados

- `Resources/metadata/scopes/Workflow.json` - Workflow es customizable
- `Resources/metadata/scopes/WorkflowExecution.json` - No customizable
- `Resources/metadata/scopes/WorkflowLog.json` - No customizable

## ✅ Archivos ClientDefs Creados

- `Resources/metadata/clientDefs/Workflow.json` - Views y relationship panels
- `Resources/metadata/clientDefs/WorkflowExecution.json` - Views y relationship panels
- `Resources/metadata/clientDefs/WorkflowLog.json` - Views básicos

## ✅ Archivos i18n Actualizados

- `Resources/i18n/en_US/Workflow.json` - Todas las traducciones en inglés
- `Resources/i18n/es_ES/Workflow.json` - Todas las traducciones en español

## Próximos Pasos

**Fase 2.2: Crear Clases PHP de Entidades**
- Crear clases Entity para Workflow, WorkflowExecution, WorkflowLog
- Crear clases Repository si es necesario
- Crear clases Service básicas

**Fase 2.3: Implementar WorkflowEngine Core**
- Crear clase WorkflowEngine
- Implementar sistema de ejecución básico
- Implementar sistema de triggers básico

