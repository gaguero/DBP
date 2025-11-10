# Fix: Dockerfile Deployment Issue - Módulo Workflows

**Fecha:** Noviembre 10, 2025  
**Problema:** Los archivos del módulo Workflows no se estaban copiando a `/persistent/custom` en Railway

## 🔍 Problema Identificado

### Síntomas
1. Los archivos del cliente JavaScript no existían en Railway
2. El controlador `Workflow.php` no existía en `/persistent/custom`
3. Los logs mostraban errores de parseo al intentar cargar el controlador
4. La página de workflows no cargaba (404 en recursos JavaScript)

### Causa Raíz
El Dockerfile tenía esta lógica en la línea 47:
```dockerfile
if [ -z "$(ls -A /persistent/custom)" ]; then cp -a custom/. /persistent/custom/; fi
```

Esto significa que **solo copia `custom/` a `/persistent/custom` si está vacío**. Como `/persistent/custom` ya tenía contenido de deployments anteriores, el nuevo módulo Workflows nunca se copiaba.

## ✅ Solución Implementada

### Cambio en Dockerfile
Se modificó el Dockerfile para que **siempre copie el módulo Workflows**, incluso si `/persistent/custom` ya tiene contenido:

```dockerfile
RUN set -eux; \
    mkdir -p /persistent/data /persistent/custom; \
    if [ -z "$(ls -A /persistent/data)" ]; then cp -a data/. /persistent/data/; fi; \
    if [ -z "$(ls -A /persistent/custom)" ]; then cp -a custom/. /persistent/custom/; fi; \
    mkdir -p /persistent/custom/Espo/Modules; \
    if [ -d "custom/Espo/Modules/Workflows" ]; then cp -a custom/Espo/Modules/Workflows /persistent/custom/Espo/Modules/; fi; \
    rm -rf data custom; \
    ln -s /persistent/data data; \
    ln -s /persistent/custom custom
```

### Archivos que ahora se copiarán correctamente
- ✅ Controllers (Workflow.php, WorkflowExecution.php, WorkflowLog.php)
- ✅ Services (WorkflowEngine, WorkflowParser, ConditionEvaluator, etc.)
- ✅ Hooks (WorkflowTrigger, WorkflowEmailTrigger, etc.)
- ✅ Jobs (ProcessWorkflowExecution, ProcessScheduledWorkflow, etc.)
- ✅ **Resources/client/** (Todas las vistas JavaScript, templates, CSS)
- ✅ Resources/metadata (entityDefs, clientDefs, scopes)
- ✅ Resources/i18n (Traducciones)

## 📋 Próximos Pasos

### 1. Esperar el Deployment de Railway
Railway debería detectar el push y hacer un nuevo deployment automáticamente. Esto puede tomar 2-5 minutos.

### 2. Verificar el Deployment
Una vez que Railway complete el deployment, verificar que los archivos están presentes:

```bash
railway ssh --project=23b47b3d-1a45-4427-b436-f7df29b01260 --environment=3e530fa9-2f90-443c-8527-2a558242a2f6 --service=de2b02e2-6eca-4e39-a5b1-f49ce59c9956

# Verificar que el módulo existe
ls -la /persistent/custom/Espo/Modules/Workflows/

# Verificar Controllers
ls -la /persistent/custom/Espo/Modules/Workflows/Controllers/

# Verificar archivos del cliente
ls -la /persistent/custom/Espo/Modules/Workflows/Resources/client/modules/workflows/views/

# Verificar que el controlador no tiene errores de sintaxis
php -l /persistent/custom/Espo/Modules/Workflows/Controllers/Workflow.php
```

### 3. Ejecutar Rebuild de EspoCRM
Después de verificar que los archivos están presentes, ejecutar rebuild:

```bash
php /var/www/html/rebuild.php
```

### 4. Verificar en la Interfaz Web
1. Acceder a EspoCRM
2. Ir a Entity Manager → Verificar que Workflow, WorkflowExecution, WorkflowLog aparecen
3. Intentar acceder a `#Workflow/list` → Debería cargar la lista de workflows
4. Intentar crear un nuevo workflow → Debería abrir el editor de React Flow

## 🎯 Estado Actual

- ✅ Dockerfile modificado y pusheado
- ⏳ Esperando deployment de Railway
- ⏳ Pendiente: Verificación post-deployment
- ⏳ Pendiente: Rebuild de EspoCRM
- ⏳ Pendiente: Pruebas en la interfaz web

## 📝 Notas Técnicas

- El módulo se copiará en cada deployment, sobrescribiendo cualquier versión anterior
- Esto asegura que siempre tengamos la versión más reciente del código
- Si se necesitan cambios personalizados en producción, deberían hacerse en el código fuente y pushearse, no directamente en Railway

