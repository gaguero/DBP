#!/bin/bash
# Script para corregir los controladores de Workflow

# Corregir Workflow.php
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

# Corregir WorkflowExecution.php
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

# Corregir WorkflowLog.php
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

# Ajustar permisos
chown -R www-data:www-data /persistent/custom/Espo/Modules/Workflows/Controllers
chmod -R 775 /persistent/custom/Espo/Modules/Workflows/Controllers

echo "Controladores corregidos exitosamente"

