# Plan de Corrección FreeWorkflows Extension

## Problemas Identificados

### 1. Estructura de Directorios Incorrecta
Los archivos del cliente (JS) están en `files/custom/Espo/Modules/Workflows/Resources/client/` cuando deberían estar en `files/client/custom/modules/workflows/`

### 2. Referencias de Vistas Incorrectas
Las referencias usan formato `Workflows:Views.Workflow.Record.List` cuando deberían usar `workflows:views/workflow/record/list`

### 3. Manifest.json Ambiguo
El manifest solo tiene un "copy" genérico que puede causar conflictos.

---

## Solución Paso a Paso

### Paso 1: Reestructurar Directorios
**Objetivo:** Separar archivos cliente de archivos backend/metadata

**Acciones:**
1. Crear nueva estructura: `files/client/custom/modules/workflows/`
2. Mover todos los archivos de:
   - `files/custom/Espo/Modules/Workflows/Resources/client/modules/workflows/` 
   - A: `files/client/custom/modules/workflows/`
3. Mantener en `files/custom/Espo/Modules/Workflows/Resources/`:
   - metadata/
   - i18n/
   - layouts/
   - module.json

### Paso 2: Actualizar Referencias en clientDefs
**Objetivo:** Corregir formato de referencias de vistas

**Archivos a modificar:**
- `metadata/clientDefs/Workflow.json`
- `metadata/clientDefs/WorkflowExecution.json`
- `metadata/clientDefs/WorkflowLog.json`

**Cambios:**
```json
// ANTES (incorrecto):
"views": {
    "list": "Workflows:Views.Workflow.Record.List",
    "detail": "Workflows:Views.Workflow.Record.Detail"
}

// DESPUÉS (correcto):
"views": {
    "list": "workflows:views/workflow/record/list",
    "detail": "workflows:views/workflow/record/detail"
}
```

### Paso 3: Actualizar Definiciones de Vistas en JS
**Objetivo:** Asegurar que Espo.define use rutas correctas

**Patrón correcto:**
```javascript
// Debe coincidir con la ruta del archivo relativa a src/
Espo.define('workflows:views/workflow/record/list', ...)
```

### Paso 4: Actualizar manifest.json
**Objetivo:** Definir copies explícitos

**Cambios:**
```json
{
  "copy": [
    {
      "from": "client",
      "to": "client"
    },
    {
      "from": "custom",
      "to": "custom"
    }
  ]
}
```

### Paso 5: Verificar Controllers y Handlers
**Objetivo:** Asegurar que todos los paths sean relativos a la nueva estructura

**Verificar:**
- Handlers en `src/handlers/`
- Controllers en `src/controllers/` (si existen)
- Templates en `res/templates/`

### Paso 6: Actualizar Scripts de Empaquetado
**Objetivo:** Asegurar que el script incluya la nueva estructura

**Modificar:** `package-extension.ps1` para copiar ambas estructuras correctamente.

### Paso 7: Testing Completo
**Objetivo:** Verificar que todo funciona

**Checklist:**
- [ ] La extensión se instala sin errores
- [ ] Las vistas cargan correctamente (no 404)
- [ ] Los handlers funcionan
- [ ] Las traducciones se muestran
- [ ] Los scheduled jobs se crean
- [ ] El menú aparece correctamente

---

## Archivos que Necesitan Cambios

### Alta Prioridad (Críticos):
1. **Estructura:** Mover `files/custom/.../Resources/client/` → `files/client/custom/modules/workflows/`
2. **clientDefs/Workflow.json** - Corregir referencias de vistas
3. **clientDefs/WorkflowExecution.json** - Corregir referencias de vistas
4. **clientDefs/WorkflowLog.json** - Corregir referencias de vistas
5. **manifest.json** - Actualizar copy

### Media Prioridad:
6. **Todos los archivos .js en views/** - Verificar Espo.define()
7. **package-extension.ps1** - Actualizar para nueva estructura

### Baja Prioridad (Verificación):
8. Handlers - Verificar paths
9. Controllers - Verificar paths
10. Templates - Verificar paths

---

## Estimación de Tiempo
- Reestructuración de archivos: 10 min
- Actualización de referencias: 15 min
- Testing y correcciones: 20 min
- **Total: ~45 minutos**

---

## Riesgos y Mitigación
- **Riesgo:** Perder archivos durante la reestructuración
  - **Mitigación:** Hacer backup antes de comenzar
- **Riesgo:** Referencias rotas después de cambios
  - **Mitigación:** Verificar cada archivo .js y clientDef sistemáticamente
- **Riesgo:** Empaquetado incorrecto
  - **Mitigación:** Probar el ZIP antes de instalar

---

## Próximo Paso Inmediato
1. Crear backup de `packages/freeworkflows/`
2. Comenzar reestructuración de directorios
3. Actualizar clientDefs
4. Reempaquetar y probar









