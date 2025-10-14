# EspoCRM Service

This directory contains the EspoCRM source code (`./src`) together with container assets for local development and Railway deployment.

## Local Quickstart
- Copy `.env.example` to `.env` and adjust the values.
- Run `docker compose up --build` from this folder.
- Open `http://localhost:8080/install` to complete the installer. Use the same database credentials you defined in `.env`.
- All EspoCRM runtime data (`data/` and `custom/`) is stored under `/persistent`. The compose file mounts that directory into the `espocrm-storage` named volume so rebuilds keep your CRM state.

## Railway Deployment Notes
- Set the build context to `apps/espocrm` and point Railway to the provided `Dockerfile`.
- Attach a single persistent volume and mount it at `/persistent`. The container links EspoCRM's `data/` and `custom/` directories into that path, satisfying Railway's one-volume limit.
- Attach a managed PostgreSQL instance (PostgreSQL 16+ recommended) and map its connection details to the variables listed in `.env.example`.
- Minimum required variables:
  - `ESPOCRM_SITE_URL`
  - `ESPOCRM_DB_HOST`
  - `ESPOCRM_DB_PORT`
  - `ESPOCRM_DB_NAME`
  - `ESPOCRM_DB_USER`
  - `ESPOCRM_DB_PASSWORD`
  - `ESPOCRM_DB_DRIVER`
- Recommended additional variables:
  - `ESPOCRM_DEFAULT_LANGUAGE`
  - `ESPOCRM_TIMEZONE`
  - `ESPOCRM_SMTP_HOST`, `ESPOCRM_SMTP_PORT`, `ESPOCRM_SMTP_USER`, `ESPOCRM_SMTP_PASSWORD`, `ESPOCRM_SMTP_SECURITY`
- First-time setup can be automated with `php command.php install --db-driver=pdoPgsql ...` after the container starts, or completed through the browser installer.
- Backups: schedule exports of the PostgreSQL database and snapshot the `/persistent` directory stored in Railway volumes or object storage.
- The container entrypoint automatically fixes ownership/permissions for `/persistent` on every boot, registers the Espo cron job for the `www-data` user, and starts the cron daemon so scheduled jobs run without manual steps.
- PHP runtime limits (`memory_limit`, `max_execution_time`, upload limits) are pre-tuned via `php.ini` for EspoCRM's recommended values.

## Post-Install Checklist
- Complete the installer wizard and sign in with the admin user defined in `.env`/Railway secrets, then change the password.
- Confirm scheduled jobs are active under **Administration → Scheduled Jobs** (the entrypoint already installs the cron entry and starts the daemon).
- Configure SMTP under **Administration → Email → Outbound** so notifications and automations can send mail.
- Create an API User (or API Key) for the website integration and expose it to the web app via `ESPOCRM_API_KEY`. The public URL should be stored in `ESPOCRM_URL`.

## Integration Touchpoints
- **Website leads:** The Next.js app reads `ESPOCRM_URL` and `ESPOCRM_API_KEY` (see `apps/web/src/lib/env.ts`) to post inquiries to `/Lead`.
- **Automations:** Additional webhooks or n8n flows can call Espo's REST API using the same key; document any new endpoints before deploying.

## Useful Commands
- `docker compose run --rm espocrm php command.php rebuild` - rebuilds metadata and clears caches after installing extensions.
- `docker compose run --rm espocrm php clear_cache.php` - flushes runtime cache.
- `docker compose run --rm espocrm php command.php upgrade --package=/tmp/EspoCRM-upgrade.zip` - apply an upgrade archive.
