# Guía: Automatizar Creación de Campos con Script PHP

## ✅ Campo Verificado

El campo `dripCampaignStatus` está creado correctamente como `cDripCampaignStatus` con todas las opciones correctas.

## 🔄 IMPORTANTE: Prefijo "c" en Campos Personalizados

EspoCRM agrega automáticamente el prefijo "c" a los nombres de campos personalizados:
- **Nombre que ingresas:** `dripCampaignStatus`
- **Nombre real en EspoCRM:** `cDripCampaignStatus`

**Todos los workflows, scripts y documentación deben usar `cDripCampaignStatus` (con prefijo "c").**

## 🚀 Método Recomendado: Script PHP en el Contenedor

He creado un script PHP que usa las clases internas de EspoCRM directamente.

### Paso 1: Copiar Script al Contenedor

```bash
# Desde tu máquina local
railway service espocrmDEV
railway run -- sh -c "cat > /tmp/create-fields-internal.php" < scripts/espocrm/create-fields-internal.php
```

### Paso 2: Ejecutar Script

```bash
railway run -- php /tmp/create-fields-internal.php
```

**O ejecutar directamente desde WSL:**

```bash
# En WSL
cd /mnt/c/Users/jovy2/Documents/VTF/DBPwix
railway service espocrmDEV
railway run -- php /tmp/create-fields-internal.php
```

## 📋 Alternativa: Crear Campos Manualmente (Más Rápido si el Script No Funciona)

Si el script PHP no funciona, puedes crear los campos manualmente siguiendo el mismo patrón que usaste para `dripCampaignStatus`:

1. **Administration → Entity Manager → Lead → Fields**
2. **Create Field**
3. Configurar cada campo según la lista en `docs/manual-configuration-instructions.md`

**Tiempo estimado:** ~15-20 minutos por campo × 28 campos = ~7-9 horas

## 🎯 Próximos Pasos Después de Crear Campos

1. **Configurar Layouts** - Arrastrar campos a secciones (15 min)
2. **Crear Workflows BPM** - 9 workflows para drip campaigns (2-3 horas)
3. **Editar Email Templates** - Copiar contenido HTML (1 hora)
4. **Configurar SMTP** - Servidor de correo (30 min)

