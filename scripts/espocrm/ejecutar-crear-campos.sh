#!/bin/bash
# Script para ejecutar create-fields-internal.php en Railway
# Ejecutar desde WSL o Git Bash

set -e

echo "🚀 Ejecutando script de creación de campos personalizados..."
echo ""

# Seleccionar servicio
echo "📌 Seleccionando servicio espocrmDEV..."
railway service espocrmDEV

# Copiar script al contenedor
echo "📋 Copiando script al contenedor..."
cat scripts/espocrm/create-fields-internal.php | railway run -- sh -c 'cat > /tmp/create-fields-internal.php'

# Ejecutar script (usar ruta completa de PHP y cambiar al directorio de EspoCRM)
echo "⚙️  Ejecutando script..."
railway run -- sh -c 'cd /var/www/html && /usr/local/bin/php -f /tmp/create-fields-internal.php'

echo ""
echo "✅ Proceso completado!"

