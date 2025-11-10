# Script de Verificación - Módulo Workflows en EspoCRM

## Verificación Paso a Paso

### 1. Verificar que el módulo está instalado

**En EspoCRM UI:**
1. Ir a **Administration** → **Extensions**
2. Verificar que aparece "Workflows" en la lista de módulos
3. Verificar que el estado es "Installed"

**Via SSH (Railway):**
```bash
# Verificar que los archivos existen
ls -la /persistent/custom/Espo/Modules/Workflows/
ls -la /var/www/html/custom/Espo/Modules/Workflows/

# Verificar manifest.json
cat /persistent/custom/Espo/Modules/Workflows/manifest.json
```

### 2. Verificar que las entidades aparecen

**En EspoCRM UI:**
1. Ir a **Administration** → **Entity Manager**
2. Buscar "Workflow" en la lista
3. Verificar que aparecen:
   - ✅ Workflow
   - ✅ WorkflowExecution
   - ✅ WorkflowLog

**Verificar que son clickables:**
- Click en "Workflow" → Debe abrir la lista de workflows
- Click en "WorkflowExecution" → Debe abrir la lista de ejecuciones
- Click en "WorkflowLog" → Debe abrir la lista de logs

### 3. Verificar que se puede crear un Workflow

**En EspoCRM UI:**
1. Ir a **Workflows** (desde el menú principal)
2. Click en **Create Workflow**
3. Verificar que se abre el editor (iframe con React Flow)
4. Verificar que aparece:
   - ✅ Panel lateral con nodos (NodePalette)
   - ✅ Canvas principal
   - ✅ Panel de propiedades a la derecha

### 4. Verificar funcionalidad del editor

**Crear un workflow simple:**
1. Arrastrar un nodo "Trigger" al canvas
2. Click en el nodo trigger
3. En el panel de propiedades:
   - Seleccionar "Trigger Type": "Record Created"
   - Seleccionar "Entity Type": "Lead"
4. Arrastrar un nodo "Action" al canvas
5. Conectar el trigger al action (arrastrar desde el trigger al action)
6. Click en el nodo action
7. En el panel de propiedades:
   - Seleccionar "Action Type": "Update Record"
   - Seleccionar "Entity Type": "Lead"
8. Click en **Save** (botón en la esquina superior izquierda)
9. Verificar que aparece mensaje "Saved!"

### 5. Verificar que el workflow se guardó

**En EspoCRM UI:**
1. Después de guardar, verificar que:
   - El workflow aparece en la lista de workflows
   - El workflow tiene nombre "New Workflow"
   - El workflow tiene status "Draft"
   - El workflow tiene entityType "Lead"
   - El workflow tiene triggerType "Record Created"

**Via API:**
```bash
# Obtener token de API (desde EspoCRM UI → My Account → API)
curl -X GET "https://your-espocrm-url.com/api/v1/Workflow" \
  -H "X-Api-Token: YOUR_API_TOKEN"
```

### 6. Verificar vista de lista

**En EspoCRM UI:**
1. Ir a **Workflows** → Lista
2. Verificar que aparecen columnas:
   - ✅ Name
   - ✅ Status (con badges de color)
   - ✅ Entity Type
   - ✅ Trigger Type
   - ✅ Active (checkbox)
   - ✅ Modified (fecha)
3. Verificar row actions:
   - ✅ Toggle Active/Pause
   - ✅ Edit (abre editor)

### 7. Verificar vista de detalle

**En EspoCRM UI:**
1. Click en un workflow de la lista
2. Verificar que aparece:
   - ✅ Información del workflow
   - ✅ Panel de Statistics (abajo)
   - ✅ Panel de Recent Logs (abajo)
3. Verificar acciones:
   - ✅ Edit (abre editor)
   - ✅ Activate
   - ✅ Pause
   - ✅ Duplicate

### 8. Verificar API Endpoint de Statistics

**Via API:**
```bash
# Obtener ID del workflow primero
WORKFLOW_ID="your-workflow-id"

# Llamar endpoint de statistics
curl -X GET "https://your-espocrm-url.com/api/v1/Workflow/${WORKFLOW_ID}/statistics" \
  -H "X-Api-Token: YOUR_API_TOKEN"
```

**Respuesta esperada:**
```json
{
  "totalExecutions": 0,
  "successfulExecutions": 0,
  "failedExecutions": 0,
  "lastExecutionAt": null
}
```

### 9. Verificar que se puede editar workflow existente

**En EspoCRM UI:**
1. Click en un workflow de la lista
2. Click en **Edit** (o row action "Edit")
3. Verificar que:
   - Se abre el editor con el workflow cargado
   - Los nodos aparecen en el canvas
   - Las conexiones aparecen
   - Se puede modificar y guardar

### 10. Verificar validación

**En el editor:**
1. Crear un workflow sin trigger node
2. Verificar que aparece error: "Workflow must have at least one trigger node"
3. Crear un trigger node pero sin configurar triggerType
4. Verificar que aparece warning
5. Conectar un nodo a sí mismo
6. Verificar que aparece error

## Checklist de Verificación

- [ ] Módulo aparece en Extensions
- [ ] Entidades aparecen en Entity Manager
- [ ] Entidades son clickables
- [ ] Se puede crear workflow desde UI
- [ ] Editor se abre correctamente
- [ ] Se pueden arrastrar nodos
- [ ] Se pueden configurar propiedades
- [ ] Se pueden conectar nodos
- [ ] Se puede guardar workflow
- [ ] Workflow aparece en lista
- [ ] Vista de lista muestra columnas correctas
- [ ] Vista de detalle muestra información
- [ ] Panel de statistics funciona
- [ ] API endpoint de statistics funciona
- [ ] Se puede editar workflow existente
- [ ] Validación muestra errores/warnings

## Problemas Comunes y Soluciones

### Problema: Módulo no aparece en Extensions
**Solución:**
```bash
# Ejecutar rebuild
php /var/www/html/rebuild.php

# Limpiar cache
php /var/www/html/clear_cache.php
```

### Problema: Entidades no son clickables
**Solución:**
- Verificar que los controllers existen en `/persistent/custom/Espo/Modules/Workflows/Controllers/`
- Verificar permisos de archivos: `chmod 644 *.php`

### Problema: Editor no se abre
**Solución:**
- Verificar que el workflow-editor está construido y desplegado
- Verificar que el iframe apunta a la URL correcta
- Verificar consola del navegador para errores JavaScript

### Problema: No se puede guardar
**Solución:**
- Verificar que el API token está configurado
- Verificar consola del navegador para errores de API
- Verificar logs de EspoCRM: `/var/www/html/data/logs/`

## Comandos Útiles para Debugging

```bash
# Ver logs de EspoCRM
tail -f /var/www/html/data/logs/espo-*.log

# Verificar permisos
ls -la /persistent/custom/Espo/Modules/Workflows/

# Verificar que los archivos están en el lugar correcto
find /persistent/custom -name "Workflow.php" -type f
find /var/www/html/custom -name "Workflow.php" -type f

# Verificar configuración de PHP
php -v
php -m | grep -i json

# Verificar que EspoCRM puede cargar el módulo
php -r "require '/var/www/html/bootstrap.php'; \$app = new Espo\Core\Application(); \$fileManager = new Espo\Core\Utils\File\Manager(); \$modules = \$fileManager->getDirList('custom/Espo/Modules'); print_r(\$modules);"
```

