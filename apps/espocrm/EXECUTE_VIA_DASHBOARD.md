# Ejecutar Limpieza - Método Alternativo para PowerShell

## Problema
PowerShell intercepta comandos como `sh`, `bash`, `php` cuando se usan con Railway CLI.

## Solución: Usar Railway Dashboard

### Paso 1: Abrir Shell en Railway Dashboard

1. Ve a https://railway.app
2. Selecciona tu proyecto "DBP"
3. Selecciona el servicio **"espocrmDEV"**
4. Ve a la pestaña **"Deployments"**
5. Click en el deployment más reciente
6. Click en **"Shell"** o busca el botón de terminal

### Paso 2: Ejecutar Script en el Shell

Una vez en el shell del contenedor:

```bash
# 1. Navegar al directorio de EspoCRM
cd /var/www/html

# 2. Crear el script de limpieza
cat > /tmp/cleanup-workflows.php << 'EOFPHP'
[paste aquí el contenido completo de cleanup-workflows.php]
EOFPHP

# 3. Ejecutar el script
php /tmp/cleanup-workflows.php
```

### Paso 3: Verificar Resultados

El script mostrará:
- ✓ Elementos removidos de tabList
- ✓ Preferencias limpiadas
- ✓ Scheduled jobs eliminados
- ✓ Extensiones eliminadas
- ✓ Cache limpiado
- ✓ Metadata reconstruida

## Alternativa: Ejecutar SQL Directamente

Si prefieres ejecutar SQL directamente:

1. En Railway Dashboard → Tu Proyecto → Servicio PostgreSQL
2. Click en "Connect" o "Variables"
3. Copia la DATABASE_URL
4. Conecta con psql:
```bash
psql "postgresql://user:password@host:port/database"
```
5. Ejecuta el contenido de `cleanup-workflows.sql`

## Después de la Limpieza

1. Limpiar cache: `php clear_cache.php`
2. Rebuild: `php rebuild.php --skip-db-check`
3. Verificar que no aparece "Workflow" en el menú
4. Instalar FreeWorkflows extension

