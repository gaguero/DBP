# Resumen: Actualización para Prefijo "c" y Automatización

## ✅ Campo Verificado

- **Campo:** `cDripCampaignStatus` ✅
- **Opciones:** Correctamente separadas (Completed y Opted Out) ✅

## 🔄 Actualización Necesaria: Prefijo "c"

EspoCRM agrega automáticamente el prefijo "c" a los nombres de campos personalizados. 

**IMPORTANTE:** Todos los workflows, scripts y referencias deben usar el nombre con prefijo "c".

### Campos que necesitan actualización:

- `dripCampaignStatus` → `cDripCampaignStatus` ✅ (ya creado)
- `dripCampaignType` → `cDripCampaignType`
- `dripCampaignStartDate` → `cDripCampaignStartDate`
- `leadScore` → `cLeadScore`
- etc.

## 🚀 Automatización: Script PHP para Railway

He creado `scripts/espocrm/create-fields-internal.php` que usa las clases internas de EspoCRM.

### Ejecutar desde WSL:

```bash
# 1. Abrir WSL (Ubuntu)
wsl

# 2. Navegar al proyecto
cd /mnt/c/Users/jovy2/Documents/VTF/DBPwix

# 3. Seleccionar servicio
railway service espocrmDEV

# 4. Copiar script al contenedor
cat scripts/espocrm/create-fields-internal.php | railway run -- sh -c "cat > /tmp/create-fields-internal.php"

# 5. Ejecutar script
railway run -- php /tmp/create-fields-internal.php
```

### Si el script no funciona:

Los campos deben crearse manualmente siguiendo el mismo patrón que `dripCampaignStatus`.

## 📋 Archivos que Necesitan Actualización

### Documentación (usar `cDripCampaignStatus`):
- `docs/manual-configuration-instructions.md` - Workflows BPM
- `docs/complete-implementation-guide.md` - Referencias a campos
- `docs/espocrm-drip-campaign-setup.md` - Configuración
- `docs/implementation-plan-drip-campaigns.md` - Plan de implementación

### Scripts (ya actualizados para usar prefijo automático):
- `scripts/espocrm/create-fields-internal.php` ✅
- Los scripts JavaScript no necesitan cambios (usan nombres sin prefijo, EspoCRM los agrega)

### Código de la API:
- `apps/web/src/app/api/lead/route.ts` - No necesita cambios (no menciona campos directamente)

## ⚠️ Nota Importante

Cuando crees workflows BPM en EspoCRM, debes usar los nombres con prefijo "c":
- En condiciones: `cDripCampaignStatus` (no `dripCampaignStatus`)
- En acciones: `cDripCampaignStatus` (no `dripCampaignStatus`)

## 🎯 Próximos Pasos

1. **Ejecutar script PHP** para crear los 28 campos restantes (desde WSL)
2. **O crear manualmente** si el script no funciona
3. **Actualizar workflows BPM** para usar nombres con prefijo "c"
4. **Continuar con configuración manual** (layouts, SMTP, etc.)

