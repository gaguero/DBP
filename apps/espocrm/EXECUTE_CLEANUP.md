# Instrucciones para Ejecutar Limpieza de Base de Datos

## Opción 1: Script PHP desde Railway (Recomendado)

### Usando Railway CLI:

```bash
# 1. Asegúrate de estar en el directorio del proyecto
cd apps/espocrm

# 2. Selecciona el servicio de EspoCRM en Railway
railway service espocrm

# 3. Copia el script al contenedor
cat cleanup-workflows.php | railway run sh -c "cat > /tmp/cleanup-workflows.php"

# 4. Ejecuta el script
railway run php /tmp/cleanup-workflows.php
```

### O usar el script helper:

```bash
# Desde la raíz del proyecto
bash apps/espocrm/cleanup-workflows-railway.sh
```

## Opción 2: Script SQL Directo en PostgreSQL

Si tienes acceso directo a la base de datos PostgreSQL:

```bash
# Conectar a PostgreSQL
psql -h $ESPOCRM_DB_HOST -U $ESPOCRM_DB_USER -d $ESPOCRM_DB_NAME

# Ejecutar el script
\i apps/espocrm/cleanup-workflows.sql
```

O desde Railway CLI:

```bash
# Conectar a PostgreSQL de Railway
railway connect postgres

# Luego ejecutar el contenido de cleanup-workflows.sql
```

## Opción 3: Desde Railway Dashboard

1. Ir a Railway Dashboard → Tu Proyecto → Servicio EspoCRM
2. Click en "Shell" o "View Logs"
3. Ejecutar:
```bash
php cleanup-workflows.php
```

## Verificación Después de la Limpieza

Después de ejecutar el script, verifica:

1. **Acceder a EspoCRM** y verificar que:
   - No aparece "Workflow" en el menú
   - No aparece en Administration > Extensions

2. **Verificar base de datos:**
```sql
SELECT COUNT(*) FROM config WHERE value::jsonb @> '"Workflow"';
SELECT COUNT(*) FROM preferences WHERE data::jsonb->'tabList' @> '"Workflow"';
SELECT COUNT(*) FROM scheduled_job WHERE job LIKE '%Workflow%';
```

Todos deberían retornar 0.

## Próximos Pasos

Después de la limpieza:
1. Limpiar cache: `php clear_cache.php`
2. Rebuild: `php rebuild.php --skip-db-check`
3. Instalar FreeWorkflows extension desde `packages/build/FreeWorkflows-1.0.0.zip`

