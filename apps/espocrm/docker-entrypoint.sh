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

# Copy Workflows module from build to persistent volume if it exists in the build
# This ensures the module is always available even if the persistent volume already has content
if [ -d "/tmp/workflows-module/Workflows" ]; then
  # Source is in /tmp/workflows-module (saved during Docker build)
  SOURCE_DIR="/tmp/workflows-module/Workflows"
  echo "Copying Workflows module from build cache to persistent volume..."
  mkdir -p /persistent/custom/Espo/Modules
  # Remove existing and copy fresh to ensure we have the latest version
  rm -rf /persistent/custom/Espo/Modules/Workflows
  cp -a "$SOURCE_DIR" /persistent/custom/Espo/Modules/
  echo "Workflows module copied successfully from build cache"
elif [ -d "/var/www/html/application/Espo/Modules/Workflows" ]; then
  # Fallback: Source is in application/Espo/Modules/Workflows (from COPY src/)
  SOURCE_DIR="/var/www/html/application/Espo/Modules/Workflows"
  echo "Copying Workflows module from application directory to persistent volume..."
  mkdir -p /persistent/custom/Espo/Modules
  rm -rf /persistent/custom/Espo/Modules/Workflows
  cp -a "$SOURCE_DIR" /persistent/custom/Espo/Modules/
  echo "Workflows module copied successfully from application directory"
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

exec "$@"
