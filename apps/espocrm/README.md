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
- The container entrypoint automatically fixes ownership/permissions for `/persistent` on every boot, so the web installer can write configuration files without manual intervention.
- PHP runtime limits (`memory_limit`, `max_execution_time`, upload limits) are pre-tuned via `php.ini` for EspoCRM's recommended values.

## Useful Commands
- `docker compose run --rm espocrm php command.php rebuild` - rebuilds metadata and clears caches after installing extensions.
- `docker compose run --rm espocrm php clear_cache.php` - flushes runtime cache.
- `docker compose run --rm espocrm php command.php upgrade --package=/tmp/EspoCRM-upgrade.zip` - apply an upgrade archive.
