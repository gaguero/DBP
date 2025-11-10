# Instrucciones: Ejecutar Script PHP para Crear Campos Restantes

## ✅ Campo Verificado

- `cDripCampaignStatus` creado correctamente ✅
- Opciones separadas correctamente ✅

## 🚀 Ejecutar Script desde WSL

### Paso 1: Abrir WSL

Abre Ubuntu (WSL) desde el menú de inicio de Windows.

### Paso 2: Navegar al Proyecto

```bash
cd /mnt/c/Users/jovy2/Documents/VTF/DBPwix
```

### Paso 3: Seleccionar Servicio en Railway

```bash
railway service espocrmDEV
```

### Paso 4: Copiar Script al Contenedor

```bash
cat scripts/espocrm/create-fields-internal.php | railway run -- sh -c "cat > /tmp/create-fields-internal.php"
```

### Paso 5: Ejecutar Script

```bash
railway run -- php /tmp/create-fields-internal.php
```

### Paso 6: Verificar Resultados

El script mostrará:
- ✅ Campos creados exitosamente
- ⏭️ Campos que ya existían
- ❌ Errores (si los hay)

## 📋 Si el Script No Funciona

Si el script PHP no funciona, puedes crear los campos manualmente:

1. Login a EspoCRM DEV: https://espocrm-dev-production.up.railway.app
2. Administration → Entity Manager → Lead → Fields
3. Create Field
4. Seguir el mismo patrón que usaste para `dripCampaignStatus`

**Lista completa de campos:** Ver `docs/manual-configuration-instructions.md` - Sección 1

## 🔄 Actualización: Prefijo "c"

**IMPORTANTE:** Todos los campos personalizados tienen prefijo "c" en EspoCRM:
- `dripCampaignStatus` → `cDripCampaignStatus` ✅
- `dripCampaignType` → `cDripCampaignType`
- `formSource` → `cFormSource`
- `leadScore` → `cLeadScore`
- etc.

**Cuando crees workflows BPM, usa los nombres con prefijo "c".**

## 📝 Archivos Actualizados

- ✅ `apps/web/src/app/api/lead/route.ts` - Actualizado para usar `cFormSource` y `cFormSubmissionDate`
- ✅ `scripts/espocrm/create-fields-internal.php` - Script PHP listo
- ⏳ Documentación de workflows - Necesita actualización manual cuando crees los workflows

