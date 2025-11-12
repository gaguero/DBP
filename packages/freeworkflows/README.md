# FreeWorkflows Extension for EspoCRM

Free and open-source workflow automation system for EspoCRM with graphical interface (React Flow). Create powerful workflows with triggers, conditions, and actions without coding.

> **Nota importante:** A partir de noviembre 2025 la evolución del proyecto se continuará mediante una aplicación externa descrita en `../../docs/workflows-external-app-plan.md`. Esta extensión permanece estable para instalaciones existentes, pero nuevas funcionalidades se desarrollarán en el servicio externo.

## Version

**1.0.0** - Initial Release

## Requirements

- EspoCRM >= 9.2.0
- PHP >= 8.1.0
- Cron job must be configured and running

## Installation

### Via UI (Recommended)

1. Download the `FreeWorkflows-1.0.0.zip` file
2. Log in to EspoCRM as Administrator
3. Go to **Administration** > **Extensions**
4. Click **Upload Extension**
5. Select the ZIP file and click **Install**
6. Wait for the installation to complete
7. Clear cache: **Administration** > **Tools** > **Clear Cache**
8. Rebuild: **Administration** > **Tools** > **Rebuild**

### Via CLI

```bash
php bin/command extension/install /path/to/FreeWorkflows-1.0.0.zip --force
php bin/command rebuild
```

## Post-Installation Checklist

After installation, verify the following:

- [ ] Extension appears in **Administration** > **Extensions** as "Installed"
- [ ] "Workflows" tab appears in the navigation menu
- [ ] You can access **Workflows** list view (`#Workflow`)
- [ ] You can create a new Workflow
- [ ] Scheduled jobs are created:
  - [ ] Process Workflow Execution (runs every minute)
  - [ ] Process Scheduled Workflows (runs every 5 minutes)
  - [ ] Process Recurring Workflows (runs every 10 minutes)
- [ ] Check **Administration** > **Scheduled Jobs** to verify jobs are active

## Features

- **Graphical Workflow Editor**: Visual workflow builder using React Flow
- **Multiple Triggers**: Record created/updated/deleted, property changes, email events, scheduled triggers
- **Conditional Logic**: Build complex conditions to control workflow execution
- **Actions**: Create records, update records, send emails, and more
- **Execution Logging**: Track all workflow executions and debug issues
- **Scheduled Workflows**: Run workflows at specific times or on recurring schedules

## Usage

1. Navigate to **Workflows** from the main menu
2. Click **Create Workflow**
3. Configure the workflow:
   - Set name and description
   - Select entity type
   - Choose trigger type
   - Build workflow using the graphical editor
4. Activate the workflow
5. Monitor executions in **Workflow Logs**

## Troubleshooting

### Workflows not executing

1. Verify cron is running: **Administration** > **Scheduled Jobs** > Check if jobs are running
2. Check **Workflow Logs** for error messages
3. Verify workflow is **Active** (not Draft or Paused)
4. Check server logs: `data/logs/espo.log`

### Menu items not appearing

1. Clear cache: **Administration** > **Tools** > **Clear Cache**
2. Rebuild: **Administration** > **Tools** > **Rebuild**
3. Check user permissions for Workflow entity

### Scheduled jobs not created

1. Clear cache and rebuild
2. Check **Administration** > **Scheduled Jobs** manually
3. If missing, jobs will be created on next cron run

## Uninstallation

### Via UI

1. Go to **Administration** > **Extensions**
2. Find "FreeWorkflows" in the list
3. Click **Uninstall**
4. Confirm uninstallation

### Via CLI

```bash
php bin/command extension/uninstall FreeWorkflows
php bin/command rebuild
```

**Note**: After uninstallation, Workflow entities and their data remain in the database. Delete them manually if needed.

## Support

For issues, questions, or contributions, please visit:
- GitHub Repository: [Link to be added]
- EspoCRM Forum: [Link to be added]

## License

This extension is released under the same license as EspoCRM (GNU Affero General Public License v3).

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for version history.

