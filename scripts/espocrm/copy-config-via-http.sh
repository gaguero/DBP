#!/bin/bash
# Script alternativo: Copia config.php usando un endpoint HTTP temporal
# Este método no requiere Railway CLI, pero requiere acceso temporal a la instancia original

set -euo pipefail

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}=== Script de Copia de Configuración vía HTTP ===${NC}"
echo ""

# Solicitar información
read -p "URL de la instancia ORIGINAL de EspoCRM (ej: https://espocrm-original.up.railway.app): " ORIGINAL_URL
read -p "Token de acceso temporal (genera uno con el script generate-temp-token.php): " ACCESS_TOKEN

# Limpiar URL (quitar trailing slash)
ORIGINAL_URL="${ORIGINAL_URL%/}"

echo ""
echo -e "${YELLOW}📥 Descargando config.php desde la instancia original...${NC}"

# Descargar config.php usando el endpoint temporal
TEMP_FILE=$(mktemp)
HTTP_CODE=$(curl -s -o "$TEMP_FILE" -w "%{http_code}" \
    -H "X-Access-Token: $ACCESS_TOKEN" \
    "${ORIGINAL_URL}/api/v1/temp-config-export" 2>&1) || {
    echo -e "${RED}❌ Error al descargar config.php${NC}"
    rm -f "$TEMP_FILE"
    exit 1
}

if [ "$HTTP_CODE" != "200" ]; then
    echo -e "${RED}❌ Error HTTP $HTTP_CODE al descargar config.php${NC}"
    echo "Respuesta del servidor:"
    cat "$TEMP_FILE"
    rm -f "$TEMP_FILE"
    exit 1
fi

if [ ! -s "$TEMP_FILE" ]; then
    echo -e "${RED}❌ El archivo descargado está vacío${NC}"
    rm -f "$TEMP_FILE"
    exit 1
fi

echo -e "${GREEN}✓ config.php descargado exitosamente${NC}"
echo ""

# Verificar formato
if ! grep -q "database" "$TEMP_FILE" 2>/dev/null; then
    echo -e "${YELLOW}⚠️  Advertencia: El archivo config.php no parece tener el formato esperado${NC}"
    read -p "¿Deseas continuar de todas formas? (y/n): " CONTINUE
    if [ "$CONTINUE" != "y" ] && [ "$CONTINUE" != "Y" ]; then
        rm -f "$TEMP_FILE"
        exit 1
    fi
fi

# Mostrar instrucciones para copiar manualmente
echo ""
echo -e "${YELLOW}📋 Archivo descargado en: $TEMP_FILE${NC}"
echo ""
echo "Para copiar este archivo a la nueva instancia, ejecuta en Railway:"
echo ""
echo "  railway run --service [NOMBRE_SERVICIO_NUEVO] -- sh -c 'cat > /persistent/data/config.php' < $TEMP_FILE"
echo ""
echo "O copia el contenido manualmente:"
echo ""
cat "$TEMP_FILE"
echo ""
read -p "¿Deseas eliminar el archivo temporal ahora? (y/n): " DELETE_TEMP
if [ "$DELETE_TEMP" = "y" ] || [ "$DELETE_TEMP" = "Y" ]; then
    rm -f "$TEMP_FILE"
    echo -e "${GREEN}✓ Archivo temporal eliminado${NC}"
else
    echo -e "${YELLOW}Archivo guardado en: $TEMP_FILE${NC}"
fi

echo ""
echo -e "${GREEN}✅ Proceso completado${NC}"
echo ""

