# System Patterns & Architecture

## EspoCRM Workflow System Architecture

### Overview
We are implementing a comprehensive workflow system directly within EspoCRM (similar to HubSpot workflows) as a custom extension. This is a native EspoCRM expansion, not a separate system.

**Decision:** React Flow embedded in EspoCRM for graphical interface (best UX)

**Status:** Specification complete, implementation planning in progress

---

## Architecture Components

### 1. Backend Entities (PHP/EspoCRM)

#### Workflow Entity
- Stores workflow definitions (name, description, status, entityType, triggerType)
- Contains `definition` (JSON) with complete workflow structure (nodes + edges)
- Relationships: hasMany WorkflowExecution, hasMany WorkflowLog

#### WorkflowExecution Entity
- Tracks individual workflow runs for specific records
- Fields: workflowId, targetEntityType, targetEntityId, status, currentNodeId
- Stores execution state: inputData, outputData, scheduledAt, startedAt, completedAt
- Supports retry logic with retryCount

#### WorkflowLog Entity
- Detailed logging for each node execution
- Fields: executionId, nodeId, action, status, message, data, executedAt
- Enables debugging and monitoring

### 2. Execution Engine

#### WorkflowEngine
- Parses workflow definition JSON
- Validates structure
- Builds execution graph
- Executes nodes in order
- Handles conditions, delays, loops, errors

#### WorkflowScheduler
- Programs future executions
- Handles delays (relative dates)
- Manages scheduled triggers (specific date/time)
- Handles recurring workflows (cron expressions)
- Integrates with EspoCRM JobScheduler

#### State Manager
- Maintains execution state
- Saves progress
- Enables pause/resume
- Handles retries

### 3. Trigger System

#### Record-Based Triggers
- **Record Created:** Hook `afterSave` with `isNew = true`
- **Record Updated:** Hook `afterSave` with `isNew = false`, compare previous values
- **Record Deleted:** Hook `afterRemove`
- **Property Changed:** Hook `afterSave` with specific field comparison

#### Behavior-Based Triggers
- **Form Submission:** Hook in LeadCapture or custom endpoint
- **Email Opened:** Hook in Email entity when marked as opened
- **Email Clicked:** Tracking system + hook when click registered
- **Email Bounced/Replied:** Hooks in Email entity
- **Page View/Website Visit:** GA4 integration + webhook

#### Time-Based Triggers
- **Specific Date/Time:** Scheduled Job with specific date
- **Relative Date:** WorkflowExecution with calculated scheduledAt
- **Recurring Schedule:** Scheduled Job with cron expression
- **Business Hours Only:** Validation in scheduled job

#### Enrollment-Based Triggers
- **Contact Enrolled:** Hook when WorkflowExecution created
- **Contact Unenrolled:** Hook when WorkflowExecution cancelled
- **Contact Re-enrolled:** Check for previous execution

### 4. Condition System

#### Operators
- **String:** equals, not_equals, contains, not_contains, starts_with, ends_with, is_empty, is_not_empty
- **Number:** equals, not_equals, greater_than, less_than, greater_than_or_equal, less_than_or_equal, between
- **Date:** equals, not_equals, before, after, between, is_empty, is_not_empty, days_ago, days_from_now
- **Boolean:** equals, is_true, is_false

#### Logic
- **AND Logic:** All conditions must be true
- **OR Logic:** At least one condition must be true
- **NOT Logic:** Condition must not be true
- **Nested Logic:** Combination of AND/OR/NOT

#### Special Conditions
- **List Membership:** in_list, not_in_list
- **Property Comparison:** Compare two properties
- **Has Related Record:** Check for related records
- **Custom Formula:** Formula-based conditions

### 5. Action System

#### Email Actions
- **Send Email:** From template, with personalization
- **Send Internal Notification:** To user
- **Delay Before Sending:** Wait before sending

#### Record Actions
- **Update Properties:** Update fields
- **Create Record:** Create new entity
- **Delete Record:** Delete entity
- **Copy Properties:** Copy between records

#### List Actions
- **Add to List:** Add to Target List
- **Remove from List:** Remove from Target List

#### Assignment Actions
- **Assign to Owner:** Specific user, round-robin, by property
- **Assign to Team:** Assign to team
- **Change Owner:** Change current owner

#### Task Actions
- **Create Task:** With due date, priority, status
- **Create Meeting:** With date/time
- **Create Call:** Call record

#### Workflow Actions
- **Enroll in Workflow:** Create new WorkflowExecution
- **Unenroll from Workflow:** Cancel WorkflowExecution
- **Stop Workflow:** Mark as cancelled
- **Wait for Condition:** Wait until condition met

#### Delay Actions
- **Wait/Delay:** Wait specific time (seconds, minutes, hours, days, weeks)
- **Wait Until Date:** Wait until specific date

#### Branching Actions
- **If/Then/Else:** Conditional execution
- **Switch/Case:** Value-based execution
- **Split Path:** Multiple parallel paths

#### Custom Code Actions
- **Execute JavaScript Code:** Sandboxed execution
- **Call External API:** HTTP requests
- **Send Webhook:** Webhook notifications

### 6. Frontend Interface (React Flow)

#### Components
- **Trigger Node** (green): Starting point
- **Action Node** (blue): Actions
- **Condition Node** (yellow): Conditions/If
- **Delay Node** (orange): Delays/Wait
- **Branch Node** (purple): Split paths
- **Code Node** (grey): Custom code

#### Features
- **Drag & Drop:** Add nodes from sidebar, move nodes, connect nodes
- **Zoom & Pan:** Canvas navigation
- **Undo/Redo:** Change history
- **Validation:** Real-time validation, errors, warnings, suggestions
- **Testing:** Test mode, step-by-step debugging, execution logs

#### Integration
- Embedded in EspoCRM via iframe
- Communicates with EspoCRM backend via API
- Saves workflow definitions as JSON

---

## Integration Points

### EspoCRM Hooks Integration
- **HookManager:** Processes hooks (beforeSave, afterSave, afterRemove)
- **Hook Registration:** Hooks in `custom/Espo/Custom/Hooks/{EntityType}/` or `application/Espo/Modules/{Module}/Hooks/{EntityType}/`
- **Hook Execution:** HookManager.process() called automatically by EspoCRM
- **Our Implementation:** Create hooks that check for active workflows and trigger WorkflowEngine

### EspoCRM Job System Integration
- **JobScheduler:** Creates scheduled jobs
- **JobManager:** Processes jobs from queue
- **Job Types:** Q0 (immediate), Q1 (every minute), E0 (email), etc.
- **Our Implementation:** Use JobScheduler for delayed workflows, JobManager for execution

### EspoCRM API Integration
- **EntityManager:** Create/update/delete entities
- **Email Service:** Send emails
- **TargetList Service:** Manage lists
- **User Service:** Assignment logic
- **Our Implementation:** Use these services for all workflow actions

---

## Data Flow

### Workflow Creation Flow
1. User creates workflow in React Flow interface
2. Frontend validates workflow definition
3. Frontend saves to EspoCRM via API (creates Workflow entity)
4. Backend validates and stores definition JSON

### Workflow Execution Flow
1. Trigger event occurs (e.g., Lead created)
2. HookManager processes hooks
3. Our hook checks for active workflows matching trigger
4. WorkflowEngine creates WorkflowExecution
5. WorkflowEngine parses definition and executes nodes
6. For delays, WorkflowScheduler creates scheduled job
7. JobManager processes scheduled jobs
8. WorkflowEngine continues execution
9. WorkflowLog records each step
10. WorkflowExecution marked as completed/failed

### Enrollment Flow
1. Trigger condition met
2. Check if already enrolled (existing WorkflowExecution)
3. If not enrolled, create WorkflowExecution
4. Start workflow execution
5. Track progress in WorkflowExecution

---

## Technical Challenges & Solutions

### Challenge 1: Frontend Integration
**Problem:** EspoCRM uses Backbone.js/RequireJS, we want React Flow
**Solution:** Embed React Flow app in iframe within EspoCRM custom module
- Modern UX with React Flow
- Leverages EspoCRM backend
- Minimal changes to EspoCRM core

### Challenge 2: Job Scheduling
**Problem:** Need to schedule workflows with delays
**Solution:** Use EspoCRM JobScheduler
- Create Job entities with scheduledAt
- JobManager processes jobs
- Supports cron expressions for recurring workflows

### Challenge 3: State Management
**Problem:** Need to track workflow execution state
**Solution:** WorkflowExecution entity
- Stores current node, input/output data
- Enables pause/resume
- Supports retries

### Challenge 4: Performance
**Problem:** Many workflows executing simultaneously
**Solution:** 
- Queue system (use EspoCRM job queues)
- Batch processing for bulk operations
- Caching workflow definitions
- Rate limiting

### Challenge 5: Error Handling
**Problem:** Workflows can fail at any step
**Solution:**
- Try-catch around each node execution
- Log errors to WorkflowLog
- Retry logic with exponential backoff
- Manual intervention for failed workflows

---

## File Structure

```
apps/espocrm/
├── custom/
│   └── Espo/
│       └── Modules/
│           └── Workflows/
│               ├── Resources/
│               │   ├── metadata/
│               │   │   ├── entityDefs/
│               │   │   │   ├── Workflow.json
│               │   │   │   ├── WorkflowExecution.json
│               │   │   │   └── WorkflowLog.json
│               │   │   ├── clientDefs/
│               │   │   │   └── Workflow.json
│               │   │   └── scopes/
│               │   │       ├── Workflow.json
│               │   │       ├── WorkflowExecution.json
│               │   │       └── WorkflowLog.json
│               │   └── i18n/
│               ├── Hooks/
│               │   ├── Common/
│               │   │   └── WorkflowTrigger.php
│               │   └── Lead/
│               │       └── TriggerWorkflows.php
│               ├── Jobs/
│               │   └── ProcessWorkflowExecution.php
│               ├── Services/
│               │   ├── WorkflowEngine.php
│               │   ├── WorkflowParser.php
│               │   ├── WorkflowScheduler.php
│               │   └── WorkflowActions/
│               │       ├── SendEmail.php
│               │       ├── UpdateRecord.php
│               │       └── ...
│               ├── Controllers/
│               │   └── Workflow.php
│               └── client/
│                   └── modules/
│                       └── workflows/
│                           ├── views/
│                           │   └── workflow-editor/
│                           │       └── workflow-editor.js
│                           └── workflows.html (iframe container)
```

---

## Key Implementation Files

### Backend
- `Hooks/Common/WorkflowTrigger.php`: Main hook that triggers workflows
- `Services/WorkflowEngine.php`: Core execution engine
- `Services/WorkflowParser.php`: Parses workflow definition JSON
- `Services/WorkflowScheduler.php`: Handles scheduling
- `Jobs/ProcessWorkflowExecution.php`: Job that executes workflows

### Frontend
- `client/modules/workflows/workflows.html`: Main page with iframe
- `client/modules/workflows/views/workflow-editor/workflow-editor.js`: Backbone view wrapper
- React Flow app (separate app embedded in iframe)

---

## Next Steps

1. ✅ Complete specification (done)
2. ✅ **Create detailed implementation plan (done)**
3. ⏳ Set up development environment (Phase 1)
4. ⏳ Create entity definitions (Phase 2)
5. ⏳ Implement WorkflowEngine core (Phase 2)
6. ⏳ Implement hooks integration (Phase 3)
7. ⏳ Implement job scheduling (Phase 2)
8. ⏳ Build React Flow frontend (Phase 4)
9. ⏳ Integrate frontend with EspoCRM (Phase 5)
10. ⏳ Testing and refinement (Phase 6)

## Implementation Plan Summary

**Status:** Plan approved and ready for implementation  
**Timeline:** 12-16 weeks (3-4 months)  
**Documentation:** `docs/workflows-implementation-plan.md`

**Phases:**
1. **Phase 1:** Setup y Preparación (1 semana)
2. **Phase 2:** Backend Core - Entidades y Motor (4-5 semanas)
3. **Phase 3:** Triggers y Acciones (3-4 semanas)
4. **Phase 4:** Frontend React Flow (3-4 semanas)
5. **Phase 5:** Integración y Refinamiento (1-2 semanas)
6. **Phase 6:** Testing, Documentación y Deployment (1 semana)

---

**Last Updated:** November 2025  
**Status:** Implementation plan complete, ready to start Phase 1

