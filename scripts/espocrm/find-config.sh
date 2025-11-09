#!/bin/bash
find /persistent /var/www/html -name "config.php" 2>/dev/null | head -1 | xargs cat 2>/dev/null || echo "No encontrado"

