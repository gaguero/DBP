#!/bin/bash
# Script para copiar config.php usando Railway CLI de Windows desde WSL

set -e

echo "=== Copiando config.php entre instancias ==="
echo ""

# Usar Railway CLI de Windows
RAILWAY_CMD="/mnt/c/Users/jovy2/AppData/Roaming/npm/railway"

# Verificar que Railway CLI existe
if [ ! -f "$RAILWAY_CMD" ]; then
    echo "❌ Railway CLI no encontrado en: $RAILWAY_CMD"
    exit 1
fi

# Navegar al directorio del proyecto
cd /mnt/c/Users/jovy2/Documents/VTF/DBPwix

# Paso 1: Seleccionar servicio original
echo "Paso 1: Seleccionando servicio original (espocrm)..."
$RAILWAY_CMD service espocrm

# Paso 2: Exportar config.php
echo "Paso 2: Exportando config.php..."
$RAILWAY_CMD run sh -c "cat /persistent/data/config.php" > /tmp/config-temp.php

if [ ! -s /tmp/config-temp.php ]; then
    echo "❌ Error: El archivo exportado está vacío"
    exit 1
fi

echo "✓ config.php exportado exitosamente"
echo ""

# Paso 3: Verificar contenido
if ! grep -q "database" /tmp/config-temp.php 2>/dev/null; then
    echo "⚠️  Advertencia: El archivo no parece tener el formato esperado"
fi

# Paso 4: Cambiar al servicio nuevo
echo "Paso 3: Cambiando al servicio nuevo (espocrmDEV)..."
$RAILWAY_CMD service espocrmDEV

# Paso 5: Crear directorio si no existe
echo "Paso 4: Creando directorio..."
$RAILWAY_CMD run sh -c "mkdir -p /persistent/data" 2>&1 || true

# Paso 6: Copiar config.php a la nueva instancia
echo "Paso 5: Copiando config.php a la nueva instancia..."
cat /tmp/config-temp.php | $RAILWAY_CMD run sh -c "cat > /persistent/data/config.php"

if [ $? -ne 0 ]; then
    echo "❌ Error al copiar config.php"
    rm -f /tmp/config-temp.php
    exit 1
fi

echo "✓ config.php copiado exitosamente"
echo ""

# Paso 7: Ajustar permisos
echo "Paso 6: Ajustando permisos..."
$RAILWAY_CMD run sh -c "chown www-data:www-data /persistent/data/config.php" 2>&1 || true
$RAILWAY_CMD run sh -c "chmod 664 /persistent/data/config.php" 2>&1 || true

# Limpiar archivo temporal
rm -f /tmp/config-temp.php

echo ""
echo "✅ ¡Proceso completado exitosamente!"
echo ""
echo "Próximos pasos:"
echo "  1. Reinicia la nueva instancia de EspoCRM en Railway"
echo "  2. Accede a la URL de la nueva instancia"
echo "  3. Deberías ver el login de EspoCRM en lugar de la pantalla de instalación"
echo ""

