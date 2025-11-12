# Instrucciones de Limpieza y Reinstalación - EspoCRM

## ✅ Estado Actual

- ✅ Código fuente de EspoCRM reemplazado con versión limpia desde GitHub oficial
- ✅ Scripts de limpieza creados y listos para ejecutar
- ✅ Configuración Docker verificada y compatible

## 🧹 Paso 1: Limpiar Base de Datos

### Opción A: Script SQL (Recomendado para limpieza completa)

**Desde Railway CLI o servidor con acceso a PostgreSQL:**

```bash
# Conectar a la base de datos
psql -h $ESPOCRM_DB_HOST -U $ESPOCRM_DB_USER -d $ESPOCRM_DB_NAME

# Ejecutar script
\i apps/espocrm/cleanup-workflows.sql
```

O copiar y pegar el contenido de `apps/espocrm/cleanup-workflows.sql` directamente en psql.

### Opción B: Script PHP (Desde EspoCRM)

**Si EspoCRM está funcionando:**

```bash
# Desde el contenedor o servidor donde está EspoCRM
cd /var/www/html
php cleanup-workflows.php
```

O si está en Railway:
```bash
railway run php cleanup-workflows.php
```

## 🔄 Paso 2: Rebuild EspoCRM

Después de limpiar la base de datos:

```bash
# Limpiar cache
php clear_cache.php

# Rebuild metadata
php rebuild.php --skip-db-check
```

O desde Railway:
```bash
railway run php clear_cache.php
railway run php rebuild.php --skip-db-check
```

## ✅ Paso 3: Verificar Limpieza

1. **Acceder a EspoCRM** y verificar que:
   - No aparece "Workflow" en el menú de navegación
   - No aparece en Administration > Extensions
   - No hay errores en los logs

2. **Verificar base de datos:**
```sql
-- Verificar que no quedan referencias
SELECT COUNT(*) FROM config WHERE value::jsonb @> '"Workflow"';
SELECT COUNT(*) FROM preferences WHERE data::jsonb->'tabList' @> '"Workflow"';
SELECT COUNT(*) FROM scheduled_job WHERE job LIKE '%Workflow%';
```

## 📦 Paso 4: Instalar FreeWorkflows Extension

Una vez verificado que todo está limpio:

1. **Subir extensión desde UI:**
   - Ir a Administration > Extensions
   - Click en "Upload Extension"
   - Seleccionar `packages/build/FreeWorkflows-1.0.0.zip`
   - Click en "Install"

2. **O instalar via CLI:**
```bash
php bin/command extension/install /path/to/FreeWorkflows-1.0.0.zip --force
```

3. **Después de instalar:**
   - Limpiar cache: `php clear_cache.php`
   - Rebuild: `php rebuild.php`
   - Verificar que aparece "Workflows" en el menú

## 📝 Archivos de Limpieza Creados

- `apps/espocrm/cleanup-workflows.sql` - Script SQL completo
- `apps/espocrm/cleanup-workflows.php` - Script PHP para CLI
- `apps/espocrm/BACKUP_CONFIG.md` - Documentación de backup
- `apps/espocrm/CLEANUP_SUMMARY.md` - Este resumen

## ⚠️ Importante

- **Backup:** Asegúrate de tener backup de la base de datos antes de ejecutar los scripts de limpieza
- **Datos:** Los datos de CRM (Leads, Contacts, etc.) se conservan, solo se eliminan tablas y referencias a Workflows
- **Extensiones:** Otras extensiones instaladas deberían seguir funcionando, pero verifica después del rebuild

## 🎯 Resultado Esperado

Después de completar todos los pasos:
- ✅ EspoCRM con código fuente limpio y actualizado
- ✅ Base de datos sin referencias a Workflows antiguos
- ✅ FreeWorkflows instalado como extensión oficial
- ✅ Menú de navegación funcionando correctamente

