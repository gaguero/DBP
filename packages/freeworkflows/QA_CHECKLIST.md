# FreeWorkflows - QA Checklist

Use this checklist to verify the extension is working correctly after installation.

## Pre-Installation

- [ ] EspoCRM version >= 9.2.0
- [ ] PHP version >= 8.1.0
- [ ] Cron job is configured and running
- [ ] Backup of EspoCRM instance created

## Installation

- [ ] Extension ZIP file downloaded
- [ ] Installation via UI or CLI completed without errors
- [ ] No errors in server logs during installation

## Post-Installation Verification

### Extension Status
- [ ] Extension appears in **Administration** > **Extensions** as "Installed"
- [ ] Extension version shows as "1.0.0"
- [ ] Extension name shows as "FreeWorkflows"

### Navigation & UI
- [ ] "Workflows" tab appears in navigation menu
- [ ] Can navigate to Workflows list view (`#Workflow`)
- [ ] Workflows list view loads without errors
- [ ] Can create new Workflow
- [ ] Workflow detail view loads correctly
- [ ] Workflow editor (React Flow) loads and functions

### Scheduled Jobs
- [ ] **Process Workflow Execution** job exists and is Active
- [ ] **Process Scheduled Workflows** job exists and is Active
- [ ] **Process Recurring Workflows** job exists and is Active
- [ ] Jobs are running (check last run time)

### Entities & Permissions
- [ ] Workflow entity is accessible
- [ ] WorkflowExecution entity is accessible
- [ ] WorkflowLog entity is accessible
- [ ] Admin user has full access to all entities
- [ ] Regular users have appropriate permissions (if configured)

### Functionality Tests

#### Workflow Creation
- [ ] Can create a new workflow
- [ ] Can set workflow name and description
- [ ] Can select entity type
- [ ] Can select trigger type
- [ ] Can open workflow editor
- [ ] Can add nodes in editor
- [ ] Can connect nodes in editor
- [ ] Can save workflow

#### Workflow Execution
- [ ] Workflow executes when trigger condition is met
- [ ] Execution appears in WorkflowLog
- [ ] Execution status is correct (success/failed)
- [ ] Error messages appear in logs if execution fails

#### Scheduled Workflows
- [ ] Scheduled workflow executes at correct time
- [ ] Recurring workflow executes on schedule
- [ ] Workflow execution logs are created

### Performance & Stability
- [ ] No JavaScript errors in browser console
- [ ] No PHP errors in server logs
- [ ] Page load times are acceptable
- [ ] No memory leaks during extended use

### Uninstallation Test
- [ ] Can uninstall extension via UI
- [ ] Extension removed from Extensions list
- [ ] Workflows tab removed from navigation
- [ ] Scheduled jobs removed
- [ ] Cache cleared after uninstallation
- [ ] No errors during uninstallation

## Known Issues

None at this time.

## Notes

- Workflow entities remain in database after uninstallation (by design)
- Manual cleanup of entities may be required if needed
- Cron must be running for scheduled workflows to execute

