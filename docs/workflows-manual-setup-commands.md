# Comandos para Crear Módulo Workflows Manualmente en Railway

**Problema:** PowerShell está interfiriendo con los comandos de creación de archivos.  
**Solución:** Ejecutar estos comandos manualmente en una sesión SSH interactiva.

## Pasos para Ejecutar

### 1. Conectarse a Railway SSH
```bash
railway ssh
```

### 2. Crear los archivos JSON correctamente

Una vez dentro de la sesión SSH, ejecuta estos comandos uno por uno:

#### Crear manifest.json
```bash
cat > /persistent/custom/Espo/Modules/Workflows/manifest.json << 'EOF'
{
  "name": "Workflows",
  "version": "1.0.0",
  "description": "Custom workflow system for EspoCRM with graphical interface",
  "author": "Dolphin Blue Paradise",
  "acceptableVersions": [
    ">=9.2.0"
  ],
  "php": [
    ">=8.1.0"
  ],
  "skipBackup": false
}
EOF
```

#### Crear module.json
```bash
cat > /persistent/custom/Espo/Modules/Workflows/Resources/module.json << 'EOF'
{
  "order": 30,
  "description": "Custom workflow system with React Flow graphical interface"
}
EOF
```

#### Crear i18n en_US/Workflow.json
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

#### Crear i18n es_ES/Workflow.json
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

### 4. Verificar que los archivos se crearon correctamente
```bash
ls -la /persistent/custom/Espo/Modules/Workflows/
cat /persistent/custom/Espo/Modules/Workflows/manifest.json
cat /persistent/custom/Espo/Modules/Workflows/Resources/module.json
```

### 5. Ejecutar Rebuild de EspoCRM
```bash
php /var/www/html/rebuild.php
```

### 6. Verificar que el módulo se registró
Después del rebuild, deberías poder ver el módulo "Workflows" en:
- EspoCRM UI → Administration → Extensions

## Nota

Si los archivos ya existen pero están vacíos, puedes eliminarlos primero:
```bash
rm /persistent/custom/Espo/Modules/Workflows/manifest.json
rm /persistent/custom/Espo/Modules/Workflows/Resources/module.json
```

Luego crea los archivos nuevamente con los comandos de arriba.

