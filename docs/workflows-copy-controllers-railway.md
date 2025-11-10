# Script para Copiar Controladores a Railway

Ejecuta estos comandos en SSH (`railway ssh`):

## 1. Crear Directorio

```bash
mkdir -p /persistent/custom/Espo/Modules/Workflows/Controllers
```

## 2. Crear Workflow.php

```bash
cat > /persistent/custom/Espo/Modules/Workflows/Controllers/Workflow.php << 'EOF'
<?php
namespace Espo\Modules\Workflows\Controllers;

use Espo\Core\Controllers\Record;

class Workflow extends Record
{
    protected function checkAccess(): bool
    {
        return $this->user->isAdmin();
    }
}
EOF
```

## 3. Crear WorkflowExecution.php

```bash
cat > /persistent/custom/Espo/Modules/Workflows/Controllers/WorkflowExecution.php << 'EOF'
<?php
namespace Espo\Modules\Workflows\Controllers;

use Espo\Core\Controllers\Record;

class WorkflowExecution extends Record
{
    protected function checkAccess(): bool
    {
        return $this->user->isAdmin();
    }
}
EOF
```

## 4. Crear WorkflowLog.php

```bash
cat > /persistent/custom/Espo/Modules/Workflows/Controllers/WorkflowLog.php << 'EOF'
<?php
namespace Espo\Modules\Workflows\Controllers;

use Espo\Core\Controllers\Record;

class WorkflowLog extends Record
{
    protected function checkAccess(): bool
    {
        return $this->user->isAdmin();
    }
}
EOF
```

## 5. Ajustar Permisos

```bash
chown -R www-data:www-data /persistent/custom/Espo/Modules/Workflows/Controllers
chmod -R 775 /persistent/custom/Espo/Modules/Workflows/Controllers
```

## 6. Verificar Archivos

```bash
ls -la /persistent/custom/Espo/Modules/Workflows/Controllers/
```

## 7. Limpiar Cache y Rebuild

```bash
php /var/www/html/clear_cache.php
php /var/www/html/rebuild.php
```

## 8. Verificar en EspoCRM

Después del rebuild, recarga la página del Entity Manager. Las tres entidades deberían aparecer con texto azul y ser clickeables.

