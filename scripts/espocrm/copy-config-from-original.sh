#!/bin/bash
# Script para copiar config.php desde la instancia original de EspoCRM a la nueva instancia
# Este script debe ejecutarse en la nueva instancia usando Railway CLI

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
    echo "Instala Railway CLI con: npm install -g @railway/cli"
    echo "O descarga desde: https://docs.railway.app/develop/cli"
    exit 1
fi

# Verificar que estamos autenticados
if ! railway whoami &> /dev/null; then
    echo -e "${YELLOW}⚠️  No estás autenticado en Railway CLI${NC}"
    echo "Ejecuta: railway login"
    exit 1
fi

echo -e "${GREEN}✓ Railway CLI está instalado y autenticado${NC}"
echo ""

# Solicitar información del usuario
read -p "Nombre del servicio de EspoCRM ORIGINAL en Railway: " ORIGINAL_SERVICE
read -p "Nombre del servicio de EspoCRM NUEVO en Railway: " NEW_SERVICE
read -p "Nombre del proyecto en Railway (opcional, presiona Enter para usar el actual): " PROJECT_NAME

# Construir comando de Railway
RAILWAY_CMD="railway"
if [ -n "$PROJECT_NAME" ]; then
    RAILWAY_CMD="$RAILWAY_CMD --project $PROJECT_NAME"
fi

echo ""
echo -e "${YELLOW}📋 Información ingresada:${NC}"
echo "  Servicio Original: $ORIGINAL_SERVICE"
echo "  Servicio Nuevo: $NEW_SERVICE"
echo ""

# Paso 1: Exportar config.php desde la instancia original
echo -e "${YELLOW}Paso 1: Exportando config.php desde la instancia original...${NC}"
TEMP_FILE=$(mktemp)
railway run --service "$ORIGINAL_SERVICE" cat /persistent/data/config.php > "$TEMP_FILE" 2>&1 || {
    echo -e "${RED}❌ Error al exportar config.php desde la instancia original${NC}"
    echo "Verifica que:"
    echo "  1. El nombre del servicio sea correcto"
    echo "  2. El servicio esté corriendo"
    echo "  3. El archivo /persistent/data/config.php exista"
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
    read -p "¿Deseas continuar de todas formas? (y/n): " CONTINUE
    if [ "$CONTINUE" != "y" ] && [ "$CONTINUE" != "Y" ]; then
        rm -f "$TEMP_FILE"
        exit 1
    fi
fi

# Paso 3: Crear directorio en la nueva instancia si no existe
echo -e "${YELLOW}Paso 2: Creando directorio en la nueva instancia...${NC}"
railway run --service "$NEW_SERVICE" mkdir -p /persistent/data 2>&1 || {
    echo -e "${YELLOW}⚠️  No se pudo crear el directorio (puede que ya exista)${NC}"
}

# Paso 4: Copiar config.php a la nueva instancia
echo -e "${YELLOW}Paso 3: Copiando config.php a la nueva instancia...${NC}"
railway run --service "$NEW_SERVICE" -- sh -c "cat > /persistent/data/config.php" < "$TEMP_FILE" 2>&1 || {
    echo -e "${RED}❌ Error al copiar config.php a la nueva instancia${NC}"
    rm -f "$TEMP_FILE"
    exit 1
}

echo -e "${GREEN}✓ config.php copiado exitosamente${NC}"
echo ""

# Paso 5: Ajustar permisos
echo -e "${YELLOW}Paso 4: Ajustando permisos...${NC}"
railway run --service "$NEW_SERVICE" chown www-data:www-data /persistent/data/config.php 2>&1 || {
    echo -e "${YELLOW}⚠️  No se pudieron ajustar los permisos (puede que se ajusten automáticamente)${NC}"
}

railway run --service "$NEW_SERVICE" chmod 664 /persistent/data/config.php 2>&1 || {
    echo -e "${YELLOW}⚠️  No se pudieron ajustar los permisos (puede que se ajusten automáticamente)${NC}"
}

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
echo -e "${YELLOW}⚠️  IMPORTANTE:${NC}"
echo "  - Ambas instancias ahora comparten la misma base de datos"
echo "  - Los cambios en una instancia se reflejarán en la otra"
echo "  - Usa esto solo para pruebas/desarrollo"
echo ""

