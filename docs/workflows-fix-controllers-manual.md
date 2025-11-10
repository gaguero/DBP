# Comandos para Corregir Controladores de Workflow

## Paso 1: Conectarse a Railway SSH
```bash
railway ssh
```

## Paso 2: Una vez dentro de la sesión SSH, ejecuta estos comandos uno por uno:

### 2.1 Corregir Workflow.php
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

### 2.2 Corregir WorkflowExecution.php
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

### 2.3 Corregir WorkflowLog.php
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

### 2.4 Ajustar permisos
```bash
chown -R www-data:www-data /persistent/custom/Espo/Modules/Workflows/Controllers
chmod -R 775 /persistent/custom/Espo/Modules/Workflows/Controllers
```

### 2.5 Verificar que se corrigió
```bash
cat /persistent/custom/Espo/Modules/Workflows/Controllers/Workflow.php
```

**Deberías ver:**
```php
return $this->user->isAdmin();
```

**NO deberías ver:**
```php
return ->user->isAdmin();
```

### 2.6 Limpiar cache y rebuild
```bash
php /var/www/html/clear_cache.php
php /var/www/html/rebuild.php
```

## Paso 3: Verificar en EspoCRM

Después del rebuild:
1. Recarga la página de EspoCRM
2. Los errores 500 deberían desaparecer
3. Ve a Administration > Entity Manager
4. Las tres entidades (Workflow, WorkflowExecution, WorkflowLog) deberían aparecer con texto azul y ser clickeables

