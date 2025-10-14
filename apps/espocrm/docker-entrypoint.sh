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
