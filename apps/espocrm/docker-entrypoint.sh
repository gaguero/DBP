#!/bin/bash
set -euo pipefail

mkdir -p /persistent/data /persistent/custom

# Recreate symlinks if the mounted volume replaced them.
if [ ! -L /var/www/html/data ]; then
  rm -rf /var/www/html/data
  ln -s /persistent/data /var/www/html/data
fi

if [ ! -L /var/www/html/custom ]; then
  rm -rf /var/www/html/custom
  ln -s /persistent/custom /var/www/html/custom
fi

copy_workflows_module() {
  local source_dir="$1"
  echo "Syncing Workflows module from ${source_dir} to persistent volume..."
  mkdir -p /persistent/custom/Espo/Modules
  rsync -a --delete "${source_dir}/" /persistent/custom/Espo/Modules/Workflows/
  echo "Workflows module synced successfully from ${source_dir}"
}

# Copy Workflows module from build cache or application directory to persistent volume
if [ -d "/tmp/workflows-module/Workflows" ]; then
  copy_workflows_module "/tmp/workflows-module/Workflows"
elif [ -d "/var/www/html/application/Espo/Modules/Workflows" ]; then
  copy_workflows_module "/var/www/html/application/Espo/Modules/Workflows"
fi

chown -R www-data:www-data /persistent
find /persistent -type d -exec chmod 775 {} \;
find /persistent -type f -exec chmod 664 {} \;

# Ensure cron job is configured for EspoCRM.
CRON_CMD="* * * * * cd /var/www/html && php -f cron.php > /dev/null 2>&1"
crontab -u www-data -l 2>/dev/null | grep -F "$CRON_CMD" >/dev/null || \
  (crontab -u www-data -l 2>/dev/null; echo "$CRON_CMD") | crontab -u www-data -

# Start cron daemon in background so scheduled jobs run.
service cron start

# Clear cache and rebuild EspoCRM metadata so the latest module is always active
rm -rf /var/www/html/cache/*
php /var/www/html/clear_cache.php || echo "clear_cache.php failed; continuing"
php /var/www/html/rebuild.php --skip-db-check || echo "rebuild.php failed; continuing"

exec "$@"
