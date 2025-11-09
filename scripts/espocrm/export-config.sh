#!/bin/bash
if [ -f /persistent/data/config.php ]; then
    cat /persistent/data/config.php
elif [ -f /var/www/html/data/config.php ]; then
    cat /var/www/html/data/config.php
else
    echo "Error: config.php no encontrado" >&2
    exit 1
fi

