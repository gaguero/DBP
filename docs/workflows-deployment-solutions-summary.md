# Soluciones Implementadas para Deployment del Módulo Workflows

**Fecha:** Noviembre 10, 2025  
**Estado:** ✅ Soluciones implementadas y pusheadas

## 🔍 Problemas Identificados

### Problema 1: Archivos del Módulo No Se Copiaban
**Síntoma:** Los archivos del módulo Workflows no estaban presentes en `/persistent/custom` después del deployment.

**Causa:** El volumen persistente `/persistent` se monta en runtime, no durante el build de Docker. El Dockerfile eliminaba los archivos antes de que el volumen se montara.

**Solución Implementada:**
- ✅ Modificado `Dockerfile` para guardar el módulo en `/tmp/workflows-module` durante el build
- ✅ Modificado `docker-entrypoint.sh` para copiar el módulo desde `/tmp` a `/persistent/custom` cuando el contenedor se inicia
- ✅ El módulo se copia automáticamente en cada inicio del contenedor

### Problema 2: Errores 404 para Archivos JavaScript Transpilados
**Síntoma:** EspoCRM intentaba cargar `/client/lib/transpiled/src/controllers/workflow.js` y obtenía 404.

**Causa:** EspoCRM busca controladores JavaScript personalizados basándose en el nombre de la entidad, incluso cuando `clientDefs` especifica usar el controlador estándar.

**Solución Implementada:**
- ✅ Creados controladores JavaScript mínimos en `Resources/client/src/controllers/`:
  - `workflow.js` - Extiende `Controllers.Record`
  - `workflow-execution.js` - Extiende `Controllers.Record`
  - `workflow-log.js` - Extiende `Controllers.Record`
- ✅ Actualizados `clientDefs` para especificar explícitamente `"controller": "controllers/record"`

## 📋 Archivos Creados/Modificados

### Nuevos Archivos
1. `apps/espocrm/src/custom/Espo/Modules/Workflows/Resources/client/src/controllers/workflow.js`
2. `apps/espocrm/src/custom/Espo/Modules/Workflows/Resources/client/src/controllers/workflow-execution.js`
3. `apps/espocrm/src/custom/Espo/Modules/Workflows/Resources/client/src/controllers/workflow-log.js`

### Archivos Modificados
1. `apps/espocrm/Dockerfile` - Guarda módulo en `/tmp/workflows-module`
2. `apps/espocrm/docker-entrypoint.sh` - Copia módulo desde `/tmp` a `/persistent/custom`
3. `apps/espocrm/src/custom/Espo/Modules/Workflows/Resources/metadata/clientDefs/WorkflowExecution.json` - Agregado `"controller": "controllers/record"`
4. `apps/espocrm/src/custom/Espo/Modules/Workflows/Resources/metadata/clientDefs/WorkflowLog.json` - Agregado `"controller": "controllers/record"`

## ✅ Verificación Post-Deployment

Después de que Railway complete el nuevo deployment, verificar:

### 1. Verificar que los Archivos Están Presentes
```bash
railway ssh -- "ls -la /persistent/custom/Espo/Modules/Workflows/Controllers/"
railway ssh -- "ls -la /persistent/custom/Espo/Modules/Workflows/Resources/client/src/controllers/"
railway ssh -- "ls -la /persistent/custom/Espo/Modules/Workflows/Resources/client/modules/workflows/views/"
```

### 2. Verificar que el Entrypoint Copió el Módulo
Los logs deberían mostrar:
```
Copying Workflows module from build cache to persistent volume...
Workflows module copied successfully from build cache
```

### 3. Ejecutar Rebuild de EspoCRM
```bash
railway ssh -- "php /var/www/html/rebuild.php"
```

### 4. Verificar Archivos Transpilados (Después del Rebuild)
```bash
railway ssh -- "find /var/www/html/client/lib/transpiled -name '*workflow*' 2>/dev/null"
```

### 5. Probar en el Navegador
- Acceder a `#Workflow/list` - Debería cargar sin errores 404
- Verificar que los archivos JavaScript se cargan correctamente
- Verificar que las vistas se renderizan correctamente

## 🎯 Estado Actual

- ✅ Solución 1 implementada: Copia automática del módulo en entrypoint
- ✅ Solución 2 implementada: Controladores JavaScript creados
- ✅ Cambios pusheados a Railway
- ⏳ Esperando deployment de Railway
- ⏳ Pendiente: Verificación post-deployment
- ⏳ Pendiente: Rebuild de EspoCRM
- ⏳ Pendiente: Pruebas en navegador

## 📝 Notas Técnicas

### Estructura de Archivos del Cliente
```
Resources/client/
├── src/
│   └── controllers/          # Controladores JavaScript (nuevos)
│       ├── workflow.js
│       ├── workflow-execution.js
│       └── workflow-log.js
└── modules/
    └── workflows/            # Vistas y handlers (ya existían)
        ├── views/
        ├── handlers/
        └── res/
```

### Flujo de Deployment
1. **Build Time:**
   - `COPY src/` copia todo el código fuente incluyendo `custom/Espo/Modules/Workflows`
   - Dockerfile guarda el módulo en `/tmp/workflows-module` antes de eliminarlo
   - Se crean symlinks a `/persistent/custom`

2. **Runtime (Entrypoint):**
   - El volumen persistente se monta en `/persistent`
   - `docker-entrypoint.sh` copia el módulo desde `/tmp/workflows-module` a `/persistent/custom/Espo/Modules/`
   - Se establecen permisos correctos

3. **EspoCRM Rebuild:**
   - EspoCRM detecta el módulo en `/persistent/custom`
   - Transpila los archivos JavaScript del cliente
   - Genera archivos en `/var/www/html/client/lib/transpiled/`

## 🔄 Próximos Pasos

1. Esperar deployment de Railway (2-5 minutos)
2. Verificar que los archivos están presentes
3. Ejecutar rebuild de EspoCRM
4. Verificar archivos transpilados
5. Probar en el navegador

Si después del rebuild aún hay errores 404, puede ser que EspoCRM necesite una configuración adicional o que los archivos necesiten estar en una ubicación diferente.

