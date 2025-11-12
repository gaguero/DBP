#!/bin/bash
# Script helper para ejecutar limpieza de Workflows desde Railway
# Uso: bash cleanup-workflows-railway.sh

echo "=========================================="
echo "Limpieza de Workflows - EspoCRM"
echo "=========================================="
echo ""

# Verificar si Railway CLI está disponible
if ! command -v railway &> /dev/null; then
    echo "❌ Railway CLI no está instalado."
    echo "Instálalo con: npm install -g @railway/cli"
    exit 1
fi

echo "1. Verificando conexión a Railway..."
railway whoami > /dev/null 2>&1
if [ $? -ne 0 ]; then
    echo "   ⚠️ No estás autenticado en Railway"
    echo "   Ejecutando: railway login"
    railway login
fi

echo "   ✓ Conectado a Railway"
echo ""

echo "2. Selecciona el servicio de EspoCRM cuando se te solicite:"
echo "   (Presiona Enter para continuar)"
read

echo ""
echo "3. Copiando script de limpieza al contenedor..."
cat apps/espocrm/cleanup-workflows.php | railway run sh -c "cat > /tmp/cleanup-workflows.php"

if [ $? -ne 0 ]; then
    echo "   ❌ Error al copiar el script"
    exit 1
fi

echo "   ✓ Script copiado"
echo ""

echo "4. Ejecutando limpieza..."
echo "   (Esto puede tomar unos minutos)"
echo ""
railway run php /tmp/cleanup-workflows.php

if [ $? -eq 0 ]; then
    echo ""
    echo "=========================================="
    echo "✓ Limpieza completada exitosamente"
    echo "=========================================="
    echo ""
    echo "Nota: Si existen tablas workflow, workflow_execution o workflow_log,"
    echo "ejecuta el script SQL cleanup-workflows.sql directamente en PostgreSQL."
else
    echo ""
    echo "❌ Error durante la limpieza"
    exit 1
fi

