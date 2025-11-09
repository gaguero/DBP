# Ideas para Automatizar la Creación de Campos en EspoCRM

## ✅ Campo Verificado

El campo `dripCampaignStatus` está creado correctamente como `cDripCampaignStatus` con todas las opciones separadas correctamente.

## 🔄 Actualización Necesaria: Prefijo "c"

EspoCRM agrega automáticamente el prefijo "c" a los nombres de campos personalizados. Por lo tanto:
- **Nombre ingresado:** `dripCampaignStatus`
- **Nombre real en EspoCRM:** `cDripCampaignStatus`

**IMPORTANTE:** Todos los scripts, workflows y documentación deben usar `cDripCampaignStatus` (con prefijo "c").

## 💡 Ideas para Automatizar la Creación de Campos

### Opción 1: Script PHP Ejecutado en el Contenedor (RECOMENDADO)

Crear un script PHP que use directamente las clases de EspoCRM:

**Ventajas:**
- Acceso directo a las clases internas de EspoCRM
- No requiere API REST
- Funciona con permisos del sistema

**Desventajas:**
- Requiere acceso al código fuente de EspoCRM
- Necesita ejecutarse dentro del contenedor

**Implementación:**
```bash
# Copiar script al contenedor
railway run -- sh -c "cat > /tmp/create-fields.php" < scripts/espocrm/create-fields-direct.php

# Ejecutar script
railway run -- php /tmp/create-fields.php
```

### Opción 2: Usar Autenticación por Sesión (Browser Automation)

Usar Playwright o Selenium para automatizar el navegador:

**Ventajas:**
- Funciona igual que hacerlo manualmente
- No requiere permisos especiales de API

**Desventajas:**
- Más lento
- Requiere mantener sesión activa
- Más complejo de mantener

### Opción 3: Crear Extensión de EspoCRM

Crear una extensión personalizada que defina los campos:

**Ventajas:**
- Forma "oficial" de EspoCRM
- Se puede versionar y distribuir
- Se instala fácilmente

**Desventajas:**
- Requiere crear estructura de extensión
- Más trabajo inicial

### Opción 4: Script de Importación Masiva (Si EspoCRM lo soporta)

Buscar si EspoCRM tiene funcionalidad de importación masiva de campos:

**Ventajas:**
- Si existe, sería la forma más simple

**Desventajas:**
- Puede que no exista esta funcionalidad

## 🎯 Recomendación: Opción 1 (Script PHP Directo)

Voy a crear un script PHP que se ejecute directamente en el contenedor usando las clases internas de EspoCRM. Este será el método más rápido y confiable.

## 📋 Próximos Pasos

1. ✅ Verificar campo creado manualmente
2. ⏳ Crear script PHP para automatizar los 28 campos restantes
3. ⏳ Actualizar toda la documentación para usar prefijo "c"
4. ⏳ Ejecutar script en Railway
5. ⏳ Verificar que todos los campos se crearon correctamente

