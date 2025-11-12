# Resumen: Limpieza Completa y Reinstalación de EspoCRM

## ✅ Tareas Completadas

### 1. Scripts de Limpieza Creados
- ✅ `cleanup-workflows.sql` - Script SQL para limpiar base de datos
- ✅ `cleanup-workflows.php` - Script PHP para limpiar desde EspoCRM CLI
- ✅ `BACKUP_CONFIG.md` - Documentación de backup y configuración

### 2. Código Fuente Eliminado
- ✅ Eliminado `apps/espocrm/src/` (código anterior con posibles referencias a Workflows)

### 3. Versión Limpia Obtenida
- ✅ Clonado EspoCRM desde repositorio oficial (github.com/espocrm/espocrm)
- ✅ Versión: master branch (más reciente)
- ✅ Código colocado en `apps/espocrm/src/`

### 4. Configuración Docker Verificada
- ✅ `Dockerfile` - Compatible con nueva versión
- ✅ `docker-entrypoint.sh` - Configuración correcta
- ✅ `docker-compose.yml` - Configuración correcta
- ✅ `php.ini` - Configuración PHP correcta

### 5. Verificación de Limpieza
- ✅ No se encontraron referencias a "Workflows" en el código nuevo
- ✅ El directorio `workflows/` encontrado contiene solo archivos de GitHub Actions (CI/CD), no código del módulo

## 📋 Próximos Pasos

### 1. Ejecutar Limpieza de Base de Datos

**Opción A: Desde Railway (Recomendado)**
```bash
# Conectar a Railway y ejecutar script SQL
railway connect postgres
# Luego ejecutar: \i cleanup-workflows.sql
```

**Opción B: Desde EspoCRM CLI**
```bash
# En el contenedor de EspoCRM
php cleanup-workflows.php
```

### 2. Rebuild y Verificación
Después de limpiar la base de datos:
1. Limpiar cache: `php clear_cache.php`
2. Rebuild: `php rebuild.php`
3. Verificar que no aparece "Workflow" en el menú

### 3. Instalar FreeWorkflows Extension
Una vez que EspoCRM esté limpio:
1. Subir `packages/build/FreeWorkflows-1.0.0.zip` desde la UI
2. O instalar via CLI: `php bin/command extension/install FreeWorkflows-1.0.0.zip --force`
3. Verificar que aparece correctamente en el menú

## ⚠️ Notas Importantes

- El código fuente de EspoCRM ha sido completamente reemplazado
- Los datos en la base de datos se conservan (excepto tablas Workflow que se eliminarán con el script SQL)
- La configuración Docker se mantiene intacta
- El volumen persistente `/persistent` conserva `data/` y `custom/`
- Las extensiones deberán reinstalarse después de la actualización

## 🔍 Verificación Final

Para verificar que todo está limpio:

```bash
# Verificar que no hay referencias a Workflows en el código
grep -r "Workflows" apps/espocrm/src/ --exclude-dir=vendor --exclude-dir=workflows

# Verificar estructura del código nuevo
ls -la apps/espocrm/src/ | head -20
```

## 📝 Archivos Creados

- `apps/espocrm/cleanup-workflows.sql` - Script SQL de limpieza
- `apps/espocrm/cleanup-workflows.php` - Script PHP de limpieza
- `apps/espocrm/BACKUP_CONFIG.md` - Documentación de backup

## ✨ Estado Final

EspoCRM está ahora con código fuente limpio desde el repositorio oficial. 
La extensión FreeWorkflows está lista para instalarse como extensión oficial.

