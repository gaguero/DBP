# Comandos para Crear Archivos i18n en Railway SSH

**Problema:** Los archivos i18n están vacíos o mal formateados, causando errores 500 en `/api/v1/I18n`

## Comandos para Ejecutar en SSH

Ejecuta estos comandos en tu sesión SSH (`railway ssh`):

### 1. Crear i18n en_US/Workflow.json

```bash
cat > /persistent/custom/Espo/Modules/Workflows/Resources/i18n/en_US/Workflow.json << 'EOF'
{
  "labels": {
    "Create Workflow": "Create Workflow",
    "Workflows": "Workflows",
    "Workflow": "Workflow",
    "Workflow Execution": "Workflow Execution",
    "Workflow Executions": "Workflow Executions",
    "Workflow Log": "Workflow Log",
    "Workflow Logs": "Workflow Logs"
  },
  "fields": {
    "name": "Name",
    "description": "Description",
    "status": "Status",
    "entityType": "Entity Type",
    "triggerType": "Trigger Type",
    "definition": "Definition",
    "isActive": "Is Active"
  },
  "options": {
    "status": {
      "draft": "Draft",
      "active": "Active",
      "paused": "Paused",
      "archived": "Archived"
    },
    "triggerType": {
      "Record Created": "Record Created",
      "Record Updated": "Record Updated",
      "Record Deleted": "Record Deleted",
      "Property Changed": "Property Changed",
      "Form Submission": "Form Submission",
      "Email Opened": "Email Opened",
      "Email Clicked": "Email Clicked",
      "Specific Date/Time": "Specific Date/Time",
      "Relative Date": "Relative Date",
      "Recurring Schedule": "Recurring Schedule"
    }
  }
}
EOF
```

### 2. Crear i18n es_ES/Workflow.json

```bash
cat > /persistent/custom/Espo/Modules/Workflows/Resources/i18n/es_ES/Workflow.json << 'EOF'
{
  "labels": {
    "Create Workflow": "Crear Workflow",
    "Workflows": "Workflows",
    "Workflow": "Workflow",
    "Workflow Execution": "Ejecución de Workflow",
    "Workflow Executions": "Ejecuciones de Workflow",
    "Workflow Log": "Log de Workflow",
    "Workflow Logs": "Logs de Workflow"
  },
  "fields": {
    "name": "Nombre",
    "description": "Descripción",
    "status": "Estado",
    "entityType": "Tipo de Entidad",
    "triggerType": "Tipo de Trigger",
    "definition": "Definición",
    "isActive": "Está Activo"
  },
  "options": {
    "status": {
      "draft": "Borrador",
      "active": "Activo",
      "paused": "Pausado",
      "archived": "Archivado"
    },
    "triggerType": {
      "Record Created": "Registro Creado",
      "Record Updated": "Registro Actualizado",
      "Record Deleted": "Registro Eliminado",
      "Property Changed": "Propiedad Cambiada",
      "Form Submission": "Envío de Formulario",
      "Email Opened": "Email Abierto",
      "Email Clicked": "Email Clicked",
      "Specific Date/Time": "Fecha/Hora Específica",
      "Relative Date": "Fecha Relativa",
      "Recurring Schedule": "Programación Recurrente"
    }
  }
}
EOF
```

### 3. Ajustar Permisos

```bash
chown -R www-data:www-data /persistent/custom/Espo/Modules/Workflows
chmod -R 775 /persistent/custom/Espo/Modules/Workflows
```

### 4. Limpiar Cache de EspoCRM

```bash
php /var/www/html/clear_cache.php
```

### 5. Intentar Rebuild Nuevamente

```bash
php /var/www/html/rebuild.php
```

### 6. Verificar que los Archivos Están Correctos

```bash
cat /persistent/custom/Espo/Modules/Workflows/Resources/i18n/en_US/Workflow.json
cat /persistent/custom/Espo/Modules/Workflows/Resources/i18n/es_ES/Workflow.json
```

## Nota sobre el Error de PostgreSQL

Si el rebuild sigue fallando con error de PostgreSQL, puedes:

1. **Verificar en la UI de EspoCRM** si el módulo aparece (a veces funciona aunque el rebuild falle)
2. **Esperar unos minutos** y reintentar el rebuild (puede ser un problema temporal de conexión)
3. **Verificar variables de entorno** en Railway Dashboard

El módulo debería funcionar una vez que los archivos i18n estén correctos, incluso si el rebuild falla temporalmente.

