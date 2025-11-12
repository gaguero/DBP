# Especificación Completa: Sistema de Workflows para EspoCRM
## Dolphin Blue Paradise - Análisis Exhaustivo

**Fecha:** Noviembre 2025  
**Objetivo:** Implementar sistema de workflows completo similar a HubSpot directamente en EspoCRM  
**Decisión de Interfaz:** React Flow embebido en EspoCRM (mejor UX)

---

## DECISIÓN: React Flow para Interfaz Gráfica

**Elegido:** React Flow embebido en EspoCRM

**Razones:**
- ✅ Interfaz moderna y familiar (similar a HubSpot)
- ✅ Mejor experiencia de usuario que builder nativo
- ✅ Más rápido de desarrollar
- ✅ Gran comunidad y documentación
- ✅ Fácil de mantener y extender

---

## PARTE 1: COMPONENTES DEL SISTEMA

### 1.1 Entidades del Sistema

#### Entidad: Workflow

**Campos Básicos:**
- `name` (varchar) - Nombre del workflow
- `description` (text) - Descripción del workflow
- `status` (enum) - draft, active, paused, archived
- `entityType` (enum) - Lead, Contact, Account, Opportunity, etc.
- `definition` (json) - Definición completa del workflow (nodes + edges)
- `triggerType` (enum) - Tipo de trigger principal
- `isActive` (bool) - Si está activo
- `createdAt`, `updatedAt` (datetime)
- `createdBy`, `modifiedBy` (link User)

**Relaciones:**
- `executions` (hasMany WorkflowExecution)
- `logs` (hasMany WorkflowLog)

#### Entidad: WorkflowExecution

**Campos:**
- `workflowId` (link Workflow)
- `targetEntityType` (varchar) - Lead, Contact, etc.
- `targetEntityId` (varchar) - ID del registro objetivo
- `status` (enum) - scheduled, running, completed, failed, cancelled
- `currentNodeId` (varchar) - Nodo actual en ejecución
- `inputData` (json) - Datos de entrada
- `outputData` (json) - Datos de salida
- `errorMessage` (text) - Si falló
- `scheduledAt` (datetime) - Cuándo se programó
- `startedAt` (datetime) - Cuándo empezó
- `completedAt` (datetime) - Cuándo terminó
- `retryCount` (int) - Intentos de retry

**Relaciones:**
- `workflow` (belongsTo Workflow)
- `logs` (hasMany WorkflowLog)

#### Entidad: WorkflowLog

**Campos:**
- `executionId` (link WorkflowExecution)
- `nodeId` (varchar) - Nodo ejecutado
- `action` (varchar) - Acción realizada
- `status` (enum) - success, error, skipped
- `message` (text) - Mensaje de log
- `data` (json) - Datos adicionales
- `executedAt` (datetime)

**Relaciones:**
- `execution` (belongsTo WorkflowExecution)

---

## PARTE 2: TRIGGERS (DISPARADORES)

### 2.1 Triggers Basados en Registros

#### Record Created
- **Descripción:** Se ejecuta cuando se crea un registro
- **Campos Disponibles:** Todos los campos del registro creado
- **Ejemplo:** "Cuando se crea un Lead"
- **Implementación:** Hook `afterSave` con `isNew = true`

#### Record Updated
- **Descripción:** Se ejecuta cuando se actualiza un registro
- **Campos Disponibles:** Campos nuevos y anteriores
- **Opciones:**
  - Ejecutar solo si cambian campos específicos
  - Ejecutar solo si cambia de un valor a otro específico
- **Ejemplo:** "Cuando Lead cambia de status 'New' a 'Qualified'"
- **Implementación:** Hook `afterSave` con `isNew = false`, comparar valores anteriores

#### Record Deleted
- **Descripción:** Se ejecuta cuando se elimina un registro
- **Ejemplo:** "Cuando se elimina un Contact"
- **Implementación:** Hook `afterRemove`

#### Property Changed
- **Descripción:** Se ejecuta cuando cambia una propiedad específica
- **Campos:** Propiedad, valor anterior, valor nuevo
- **Ejemplo:** "Cuando Lead.status cambia"
- **Implementación:** Hook `afterSave` con comparación de campo específico

### 2.2 Triggers Basados en Comportamiento

#### Form Submission
- **Descripción:** Se ejecuta cuando se envía un formulario
- **Campos:** Datos del formulario, tipo de formulario
- **Ejemplo:** "Cuando se envía News and Offers Form"
- **Implementación:** Hook en LeadCapture o endpoint personalizado

#### Email Opened
- **Descripción:** Se ejecuta cuando se abre un email
- **Campos:** emailId, contactId, timestamp
- **Ejemplo:** "Cuando Lead abre Email 1"
- **Implementación:** Hook en Email entity cuando se marca como opened

#### Email Clicked
- **Descripción:** Se ejecuta cuando se hace click en un link del email
- **Campos:** emailId, linkUrl, contactId
- **Ejemplo:** "Cuando Lead hace click en CTA del email"
- **Implementación:** Tracking de clicks en emails, hook cuando se registra click

#### Email Bounced
- **Descripción:** Se ejecuta cuando un email rebota
- **Campos:** emailId, bounceType, bounceReason
- **Implementación:** Hook cuando email se marca como bounced

#### Email Replied
- **Descripción:** Se ejecuta cuando se responde un email
- **Campos:** emailId, replyText, contactId
- **Implementación:** Hook cuando se crea email reply

#### Page View
- **Descripción:** Se ejecuta cuando se visita una página
- **Campos:** pageUrl, pageTitle, timestamp
- **Ejemplo:** "Cuando Lead visita página Rooms"
- **Implementación:** Integración con GA4 o tracking personalizado

#### Website Visit
- **Descripción:** Se ejecuta cuando hay una visita al sitio
- **Campos:** visitCount, pagesViewed, timeOnSite
- **Implementación:** Integración con GA4

### 2.3 Triggers Basados en Tiempo

#### Specific Date/Time
- **Descripción:** Se ejecuta en una fecha/hora específica
- **Campos:** date, time, timezone
- **Ejemplo:** "El 1 de enero a las 9:00 AM"
- **Implementación:** Scheduled Job con fecha específica

#### Relative Date
- **Descripción:** Se ejecuta X días/horas después de un evento
- **Campos:** delayAmount, delayUnit (days/hours), referenceEvent
- **Ejemplo:** "3 días después de que Lead se crea"
- **Implementación:** Crear WorkflowExecution con scheduledAt calculado

#### Recurring Schedule
- **Descripción:** Se ejecuta periódicamente
- **Campos:** schedule (cron expression), timezone
- **Ejemplo:** "Cada lunes a las 9:00 AM"
- **Implementación:** Scheduled Job con cron expression

#### Business Hours Only
- **Descripción:** Se ejecuta solo en horario de negocio
- **Campos:** businessHours (configuración), timezone
- **Implementación:** Validar en scheduled job antes de ejecutar

### 2.4 Triggers Basados en Enrollment

#### Contact Enrolled
- **Descripción:** Se ejecuta cuando un contacto se inscribe en un workflow
- **Campos:** workflowId, contactId, enrollmentDate
- **Implementación:** Hook cuando se crea WorkflowExecution

#### Contact Unenrolled
- **Descripción:** Se ejecuta cuando un contacto sale de un workflow
- **Campos:** workflowId, contactId, unenrollmentDate, reason
- **Implementación:** Hook cuando WorkflowExecution se cancela

#### Contact Re-enrolled
- **Descripción:** Se ejecuta cuando un contacto se vuelve a inscribir
- **Campos:** workflowId, contactId, previousEnrollmentDate
- **Implementación:** Verificar si ya existía ejecución previa

---

## PARTE 3: CONDICIONES

### 3.1 Operadores de Comparación

#### String Operators:
- `equals` - Igual a
- `not_equals` - No igual a
- `contains` - Contiene
- `not_contains` - No contiene
- `starts_with` - Empieza con
- `ends_with` - Termina con
- `is_empty` - Está vacío
- `is_not_empty` - No está vacío

#### Number Operators:
- `equals` - Igual a
- `not_equals` - No igual a
- `greater_than` - Mayor que
- `less_than` - Menor que
- `greater_than_or_equal` - Mayor o igual que
- `less_than_or_equal` - Menor o igual que
- `between` - Entre dos valores

#### Date Operators:
- `equals` - Igual a
- `not_equals` - No igual a
- `before` - Antes de
- `after` - Después de
- `between` - Entre dos fechas
- `is_empty` - Está vacío
- `is_not_empty` - No está vacío
- `days_ago` - Hace X días
- `days_from_now` - En X días

#### Boolean Operators:
- `equals` - Igual a (true/false)
- `is_true` - Es verdadero
- `is_false` - Es falso

### 3.2 Lógica Booleana

#### AND Logic
- Todas las condiciones deben cumplirse
- Ejemplo: "formSource equals 'News and Offers' AND hasResponded equals false"

#### OR Logic
- Al menos una condición debe cumplirse
- Ejemplo: "emailOpened equals true OR emailClicked equals true"

#### NOT Logic
- La condición NO debe cumplirse
- Ejemplo: "NOT status equals 'Converted'"

#### Nested Logic
- Combinación de AND/OR/NOT
- Ejemplo: "(A AND B) OR (C AND D)"

### 3.3 Condiciones Especiales

#### List Membership
- Verificar si está en una lista
- Operadores: `in_list`, `not_in_list`
- Ejemplo: "Contact está en Target List 'News and Offers Active'"

#### Property Comparison
- Comparar dos propiedades
- Ejemplo: "arrivalDate is before departureDate"

#### Has Related Record
- Verificar si tiene registro relacionado
- Ejemplo: "Lead tiene Opportunity relacionada"

#### Custom Formula
- Condición basada en fórmula personalizada
- Ejemplo: "leadScore > 100 AND websiteVisits > 5"

---

## PARTE 4: ACCIONES (ACTIONS)

### 4.1 Acciones de Email

#### Send Email
- **Descripción:** Enviar email desde template
- **Campos:**
  - `templateId` (link EmailTemplate)
  - `to` (email address o campo del registro)
  - `from` (email address o usuario asignado)
  - `cc`, `bcc` (opcional)
  - `subject` (opcional, puede usar template)
  - `body` (opcional, puede usar template)
  - `attachments` (opcional)
- **Personalización:** Placeholders como {{lead.name}}, {{lead.email}}
- **Implementación:** Usar Email Service de EspoCRM

#### Send Internal Notification
- **Descripción:** Enviar notificación interna a usuario
- **Campos:**
  - `userId` (link User)
  - `message` (text)
  - `type` (enum) - info, warning, error
- **Implementación:** Usar Notification Service de EspoCRM

#### Delay Before Sending
- **Descripción:** Esperar antes de enviar email
- **Campos:**
  - `delayAmount` (int)
  - `delayUnit` (enum) - minutes, hours, days
  - `businessHoursOnly` (bool)
- **Implementación:** Crear WorkflowExecution programado

### 4.2 Acciones de Registros

#### Update Properties
- **Descripción:** Actualizar campos de un registro
- **Campos:**
  - `entityType` (varchar)
  - `entityId` (varchar o campo)
  - `properties` (json) - Campos a actualizar
- **Ejemplo:** Actualizar `leadScore`, `dripCampaignStatus`
- **Implementación:** Usar EntityManager de EspoCRM

#### Create Record
- **Descripción:** Crear nuevo registro
- **Campos:**
  - `entityType` (varchar)
  - `properties` (json) - Campos del nuevo registro
- **Ejemplo:** Crear Task cuando Lead se crea
- **Implementación:** Usar EntityManager de EspoCRM

#### Delete Record
- **Descripción:** Eliminar registro
- **Campos:**
  - `entityType` (varchar)
  - `entityId` (varchar o campo)
- **Implementación:** Usar EntityManager de EspoCRM

#### Copy Properties
- **Descripción:** Copiar propiedades entre registros
- **Campos:**
  - `sourceEntityType`, `sourceEntityId`
  - `targetEntityType`, `targetEntityId`
  - `properties` (array) - Campos a copiar
- **Implementación:** Leer de source, escribir en target

### 4.3 Acciones de Listas

#### Add to List
- **Descripción:** Agregar a Target List
- **Campos:**
  - `listId` (link TargetList)
  - `entityType` (varchar)
  - `entityId` (varchar o campo)
- **Implementación:** Usar TargetList Service de EspoCRM

#### Remove from List
- **Descripción:** Remover de Target List
- **Campos:** Igual que Add to List
- **Implementación:** Usar TargetList Service de EspoCRM

#### Check List Membership
- **Descripción:** Verificar membresía en lista
- **Uso:** Usado en condiciones
- **Implementación:** Query a TargetList entity

### 4.4 Acciones de Asignación

#### Assign to Owner
- **Descripción:** Asignar registro a usuario
- **Campos:**
  - `userId` (link User o campo)
  - `assignmentLogic` (enum) - specific_user, round_robin, by_property
- **Ejemplo:** Asignar Lead a agente basado en preferredLanguage
- **Implementación:** Actualizar assignedUserId en registro

#### Assign to Team
- **Descripción:** Asignar registro a equipo
- **Campos:**
  - `teamId` (link Team)
- **Implementación:** Actualizar teamsIds en registro

#### Change Owner
- **Descripción:** Cambiar propietario actual
- **Campos:** Igual que Assign to Owner
- **Implementación:** Actualizar assignedUserId

### 4.5 Acciones de Tareas

#### Create Task
- **Descripción:** Crear tarea
- **Campos:**
  - `name` (varchar)
  - `description` (text)
  - `assignedUserId` (link User)
  - `dueDate` (datetime o relativo)
  - `priority` (enum) - Low, Normal, High
  - `status` (enum) - Not Started, In Progress, Completed
- **Implementación:** Crear Task entity

#### Create Meeting
- **Descripción:** Crear reunión
- **Campos:** Similares a Task + fecha/hora
- **Implementación:** Crear Meeting entity

#### Create Call
- **Descripción:** Crear llamada
- **Campos:** Similares a Task
- **Implementación:** Crear Call entity

### 4.6 Acciones de Workflow

#### Enroll in Workflow
- **Descripción:** Inscribir en otro workflow
- **Campos:**
  - `workflowId` (link Workflow)
  - `entityType`, `entityId`
- **Implementación:** Crear nueva WorkflowExecution

#### Unenroll from Workflow
- **Descripción:** Desinscribir de workflow
- **Campos:** Igual que Enroll
- **Implementación:** Cancelar WorkflowExecution activa

#### Stop Workflow
- **Descripción:** Detener ejecución del workflow actual
- **Campos:** Opcional `reason` (text)
- **Implementación:** Marcar WorkflowExecution como cancelled

#### Wait for Condition
- **Descripción:** Esperar hasta que se cumpla condición
- **Campos:**
  - `condition` (json) - Condición a esperar
  - `timeout` (datetime) - Tiempo máximo de espera
- **Implementación:** Crear WorkflowExecution programada que verifica condición periódicamente

### 4.7 Acciones de Delay

#### Wait/Delay
- **Descripción:** Esperar tiempo específico
- **Campos:**
  - `delayAmount` (int)
  - `delayUnit` (enum) - seconds, minutes, hours, days, weeks
  - `businessHoursOnly` (bool)
- **Ejemplo:** Esperar 3 días antes de enviar siguiente email
- **Implementación:** Crear WorkflowExecution con scheduledAt calculado

#### Wait Until Date
- **Descripción:** Esperar hasta fecha específica
- **Campos:**
  - `targetDate` (datetime o campo)
  - `timezone` (varchar)
- **Implementación:** Crear WorkflowExecution con scheduledAt = targetDate

### 4.8 Acciones de Branching

#### If/Then/Else
- **Descripción:** Ejecutar acciones condicionalmente
- **Campos:**
  - `condition` (json) - Condición a evaluar
  - `thenActions` (array) - Acciones si se cumple
  - `elseActions` (array) - Acciones si no se cumple
- **Implementación:** Evaluar condición, ejecutar path correspondiente

#### Switch/Case
- **Descripción:** Ejecutar acciones basadas en valor
- **Campos:**
  - `property` (varchar) - Campo a evaluar
  - `cases` (json) - Array de casos y acciones
- **Implementación:** Evaluar valor, ejecutar caso correspondiente

#### Split Path
- **Descripción:** Dividir workflow en múltiples paths
- **Campos:**
  - `paths` (array) - Array de paths con condiciones
- **Implementación:** Evaluar todas las condiciones, ejecutar paths que se cumplan

### 4.9 Acciones de Código Personalizado

#### Execute JavaScript Code
- **Descripción:** Ejecutar código JavaScript personalizado
- **Campos:**
  - `code` (text) - Código JavaScript
  - `timeout` (int) - Tiempo máximo de ejecución
- **Acceso a:**
  - Variables del workflow
  - API de EspoCRM
  - Funciones helper
- **Implementación:** Ejecutar código en sandbox seguro

#### Call External API
- **Descripción:** Llamar API externa
- **Campos:**
  - `url` (varchar)
  - `method` (enum) - GET, POST, PUT, DELETE
  - `headers` (json)
  - `body` (json)
  - `timeout` (int)
- **Implementación:** HTTP request usando Guzzle o similar

#### Send Webhook
- **Descripción:** Enviar webhook
- **Campos:**
  - `url` (varchar)
  - `method` (enum) - POST, PUT
  - `headers` (json)
  - `body` (json)
- **Implementación:** HTTP POST request

---

## PARTE 5: INTERFAZ GRÁFICA (REACT FLOW)

### 5.1 Componentes Visuales

#### Nodos:
- **Trigger Node** (verde) - Punto de inicio
- **Action Node** (azul) - Acciones
- **Condition Node** (amarillo) - Condiciones/If
- **Delay Node** (naranja) - Delays/Wait
- **Branch Node** (morado) - Split paths
- **Code Node** (gris) - Código personalizado

#### Conexiones:
- Líneas entre nodos
- Flechas indicando flujo
- Etiquetas en conexiones (opcional)

#### Panel Lateral:
- Lista de nodos disponibles
- Drag & drop para agregar nodos
- Búsqueda de nodos

#### Panel de Propiedades:
- Configuración del nodo seleccionado
- Campos editables
- Validación en tiempo real
- Preview de valores

### 5.2 Funcionalidades del Editor

#### Drag & Drop:
- Arrastrar nodos desde panel lateral
- Mover nodos en el canvas
- Conectar nodos arrastrando desde handles

#### Zoom & Pan:
- Zoom in/out
- Pan del canvas
- Fit to screen
- Mini-map (opcional)

#### Undo/Redo:
- Historial de cambios
- Deshacer/Rehacer acciones

#### Validation:
- Validación en tiempo real
- Errores visuales
- Warnings
- Sugerencias

#### Testing:
- Modo de prueba
- Ejecutar workflow con datos de prueba
- Ver logs de ejecución
- Step-by-step debugging

---

## PARTE 6: MOTOR DE EJECUCIÓN

### 6.1 Workflow Engine

#### Parser:
- Parsear definición JSON
- Validar estructura
- Construir grafo de ejecución

#### Executor:
- Ejecutar nodos en orden
- Manejar condiciones
- Manejar delays
- Manejar loops
- Manejar errores

#### Scheduler:
- Programar ejecuciones futuras
- Manejar delays
- Manejar scheduled triggers
- Manejar recurring workflows

#### State Manager:
- Mantener estado de ejecución
- Guardar progreso
- Permitir pausa/resume
- Manejar retries

### 6.2 Integración con EspoCRM

#### Hooks Integration:
- Integrar con hooks de EspoCRM
- Trigger workflows desde hooks
- Ejemplo: Hook `afterSave` en Lead

#### API Integration:
- Usar API de EspoCRM para acciones
- Crear/actualizar registros
- Enviar emails
- Gestionar listas

#### Job Queue:
- Usar sistema de jobs de EspoCRM
- Ejecutar workflows programados
- Manejar cola de ejecuciones

---

## PARTE 7: FUNCIONALIDADES ADICIONALES

### 7.1 Enrollment Management

#### Enrollment:
- Inscribir contactos en workflows
- Verificar si ya está inscrito
- Prevenir inscripciones duplicadas

#### Unenrollment:
- Desinscribir contactos
- Razones de desinscripción
- Automático vs manual

#### Re-enrollment:
- Permitir re-inscripción
- Resetear estado del workflow
- Opciones de re-inscripción

### 7.2 Logging & Monitoring

#### Execution Logs:
- Log de cada ejecución
- Log de cada nodo ejecutado
- Errores y warnings
- Tiempo de ejecución

#### Analytics:
- Estadísticas de workflows
- Tasa de éxito/fallo
- Tiempo promedio de ejecución
- Contactos inscritos/completados

#### Debugging:
- Modo debug
- Step-by-step execution
- Variable inspection
- Breakpoints

### 7.3 Performance & Optimization

#### Caching:
- Cachear definiciones de workflows
- Cachear resultados de condiciones
- Cachear datos de registros

#### Batch Processing:
- Procesar múltiples contactos
- Optimizar queries
- Reducir carga en base de datos

#### Rate Limiting:
- Limitar ejecuciones por minuto
- Prevenir sobrecarga
- Queue management

---

## RESUMEN: TODO LO QUE DEBEMOS IMPLEMENTAR

### Backend (PHP):
1. ✅ Entidades: Workflow, WorkflowExecution, WorkflowLog
2. ✅ Motor de ejecución: WorkflowEngine, WorkflowParser, WorkflowScheduler
3. ✅ Hooks: Integración con hooks de EspoCRM
4. ✅ Jobs: Procesamiento de workflows programados
5. ✅ API: Endpoints para gestión de workflows
6. ✅ Acciones: Implementar todas las acciones listadas
7. ✅ Condiciones: Implementar todos los operadores y lógica

### Frontend (React Flow):
1. ✅ Editor visual: Canvas con drag & drop
2. ✅ Nodos: Todos los tipos de nodos
3. ✅ Panel lateral: Lista de nodos disponibles
4. ✅ Panel de propiedades: Configuración de nodos
5. ✅ Validación: Validación en tiempo real
6. ✅ Testing: Modo de prueba y debugging
7. ✅ Guardar/Cargar: Persistencia de workflows

### Integración:
1. ✅ Hooks: Integrar con sistema de hooks de EspoCRM
2. ✅ API: Usar API de EspoCRM para todas las acciones
3. ✅ Jobs: Usar sistema de jobs para workflows programados
4. ✅ Database: Tablas para workflows y ejecuciones

---

## PRÓXIMOS PASOS

1. ✅ Guardar esta especificación
2. ⏳ Investigar intensamente en codebase y documentación
3. ⏳ Identificar retos e implementaciones adicionales
4. ⏳ Crear plan de implementación detallado





