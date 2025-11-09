#!/bin/bash
# Script para copiar config.php desde la instancia original de EspoCRM a la nueva instancia
# Uso: bash copy-config.sh [SERVICIO_ORIGINAL] [SERVICIO_NUEVO] [PROYECTO_OPCIONAL]

set -euo pipefail

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}=== Script de Copia de Configuración de EspoCRM ===${NC}"
echo ""

# Verificar que Railway CLI está instalado
if ! command -v railway &> /dev/null; then
    echo -e "${RED}❌ Railway CLI no está instalado.${NC}"
    exit 1
fi

# Obtener parámetros
ORIGINAL_SERVICE="${1:-}"
NEW_SERVICE="${2:-}"
PROJECT_NAME="${3:-}"

# Si no se proporcionaron parámetros, solicitar interactivamente
if [ -z "$ORIGINAL_SERVICE" ]; then
    read -p "Nombre del servicio de EspoCRM ORIGINAL en Railway: " ORIGINAL_SERVICE
fi

if [ -z "$NEW_SERVICE" ]; then
    read -p "Nombre del servicio de EspoCRM NUEVO en Railway: " NEW_SERVICE
fi

if [ -z "$PROJECT_NAME" ]; then
    read -p "Nombre del proyecto en Railway (opcional, presiona Enter para omitir): " PROJECT_NAME
fi

# Construir comando de Railway
RAILWAY_CMD="railway"
if [ -n "$PROJECT_NAME" ]; then
    RAILWAY_CMD="$RAILWAY_CMD --project $PROJECT_NAME"
fi

echo ""
echo -e "${YELLOW}📋 Información:${NC}"
echo "  Servicio Original: $ORIGINAL_SERVICE"
echo "  Servicio Nuevo: $NEW_SERVICE"
[ -n "$PROJECT_NAME" ] && echo "  Proyecto: $PROJECT_NAME"
echo ""

# Vincular proyecto si se especificó
if [ -n "$PROJECT_NAME" ]; then
    echo -e "${YELLOW}Vinculando proyecto: $PROJECT_NAME${NC}"
    railway link -p "$PROJECT_NAME" 2>&1 || {
        echo -e "${YELLOW}⚠️  No se pudo vincular proyecto (puede que ya esté vinculado)${NC}"
    }
fi

# Paso 1: Exportar config.php desde la instancia original
echo -e "${YELLOW}Paso 1: Exportando config.php desde la instancia original...${NC}"
TEMP_FILE=$(mktemp 2>/dev/null || echo "/tmp/config-espocrm-$$.php")

railway run -s "$ORIGINAL_SERVICE" cat /persistent/data/config.php > "$TEMP_FILE" 2>&1 || {
    echo -e "${RED}❌ Error al exportar config.php desde la instancia original${NC}"
    echo "Verifica que:"
    echo "  1. Estás autenticado: railway login"
    echo "  2. El proyecto está vinculado: railway link -p $PROJECT_NAME"
    echo "  3. El nombre del servicio sea correcto: $ORIGINAL_SERVICE"
    rm -f "$TEMP_FILE"
    exit 1
}

if [ ! -s "$TEMP_FILE" ]; then
    echo -e "${RED}❌ El archivo exportado está vacío${NC}"
    rm -f "$TEMP_FILE"
    exit 1
fi

echo -e "${GREEN}✓ config.php exportado exitosamente${NC}"
echo ""

# Paso 2: Verificar que el archivo tiene contenido válido
if ! grep -q "database" "$TEMP_FILE" 2>/dev/null; then
    echo -e "${YELLOW}⚠️  Advertencia: El archivo config.php no parece tener el formato esperado${NC}"
    echo "Continuando de todas formas..."
fi

# Paso 3: Crear directorio en la nueva instancia si no existe
echo -e "${YELLOW}Paso 2: Creando directorio en la nueva instancia...${NC}"
railway run -s "$NEW_SERVICE" mkdir -p /persistent/data 2>&1 || true

# Paso 4: Copiar config.php a la nueva instancia
echo -e "${YELLOW}Paso 3: Copiando config.php a la nueva instancia...${NC}"
railway run -s "$NEW_SERVICE" -- sh -c "cat > /persistent/data/config.php" < "$TEMP_FILE" 2>&1 || {
    echo -e "${RED}❌ Error al copiar config.php a la nueva instancia${NC}"
    rm -f "$TEMP_FILE"
    exit 1
}

echo -e "${GREEN}✓ config.php copiado exitosamente${NC}"
echo ""

# Paso 5: Ajustar permisos
echo -e "${YELLOW}Paso 4: Ajustando permisos...${NC}"
railway run -s "$NEW_SERVICE" chown www-data:www-data /persistent/data/config.php 2>&1 || true
railway run -s "$NEW_SERVICE" chmod 664 /persistent/data/config.php 2>&1 || true

# Limpiar archivo temporal
rm -f "$TEMP_FILE"

echo ""
echo -e "${GREEN}✅ ¡Proceso completado exitosamente!${NC}"
echo ""
echo "Próximos pasos:"
echo "  1. Reinicia la nueva instancia de EspoCRM en Railway"
echo "  2. Accede a la URL de la nueva instancia"
echo "  3. Deberías ver el login de EspoCRM en lugar de la pantalla de instalación"
echo ""

