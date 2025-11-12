# 🚀 MÉTODO MÁS SIMPLE: Copiar Archivo con Railway CLI

## Paso 1: Conectar y Copiar el Archivo

Desde Git Bash, ejecuta estos comandos **uno por uno**:

```bash
# 1. Navegar al directorio
cd /c/Users/jovy2/Documents/VTF/DBPwix/apps/espocrm

# 2. Seleccionar el servicio (si no está seleccionado)
railway service espocrmDEV

# 3. Copiar el archivo PHP al contenedor usando Railway CLI
cat cleanup-workflows.php | railway run bash -c "cat > /tmp/cleanup-workflows.php"

# 4. Ejecutar el script
railway run php /tmp/cleanup-workflows.php
```

## Paso 2: Si el método anterior no funciona

Usa Railway SSH pero copia el archivo de una vez:

```bash
# 1. Conectar al shell
railway ssh --project=23b47b3d-1a45-4427-b436-f7df29b01260 --environment=3e530fa9-2f90-443c-8527-2a558242a2f6 --service=de2b02e2-6eca-4e39-a5b1-f49ce59c9956

# 2. Una vez dentro, ejecuta ESTO COMPLETO (copia TODO el bloque):
bash -c 'cat > /tmp/cleanup-workflows.php' << 'EOFPHP'
<?php
require_once '/var/www/html/bootstrap.php';
use Espo\Core\Application;
use Espo\Core\Utils\Config;
use Espo\Core\Utils\Config\ConfigWriter;
use Espo\Core\Utils\Log;
use Espo\Core\Utils\Cache\ClearCache;
use Espo\Core\Utils\Rebuild\RebuildManager;
use Espo\Core\InjectableFactory;
use Espo\ORM\EntityManager;
echo "========================================\n";
echo "Limpieza Completa de Referencias Workflows\n";
echo "========================================\n\n";
try {
    $app = new Application();
    $container = $app->getContainer();
    $log = $container->get('log');
    $config = $container->getByClass(Config::class);
    $configWriter = $container->getByClass(InjectableFactory::class)->create(ConfigWriter::class);
    $entityManager = $container->getByClass(EntityManager::class);
    echo "1. Limpiando configuración global...\n";
    $tabList = $config->get('tabList') ?? [];
    $originalCount = count($tabList);
    $tabList = array_values(array_filter($tabList, function($item) {
        if (is_string($item)) {
            return $item !== 'Workflow';
        }
        if (is_object($item) && isset($item->text)) {
            return $item->text !== 'Workflow';
        }
        return true;
    }));
    $removedCount = $originalCount - count($tabList);
    if ($removedCount > 0) {
        $configWriter->set('tabList', $tabList);
        echo "   ✓ Removido 'Workflow' de tabList global ({$removedCount} elemento(s))\n";
    } else {
        echo "   ✓ tabList ya está limpio\n";
    }
    $quickCreateList = $config->get('quickCreateList') ?? [];
    $originalQuickCount = count($quickCreateList);
    $quickCreateList = array_values(array_filter($quickCreateList, fn($item) => $item !== 'Workflow'));
    $removedQuickCount = $originalQuickCount - count($quickCreateList);
    if ($removedQuickCount > 0) {
        $configWriter->set('quickCreateList', $quickCreateList);
        echo "   ✓ Removido 'Workflow' de quickCreateList global ({$removedQuickCount} elemento(s))\n";
    } else {
        echo "   ✓ quickCreateList ya está limpio\n";
    }
    $configWriter->save();
    echo "   ✓ Configuración global guardada\n\n";
    echo "2. Limpiando preferencias de usuarios...\n";
    $users = $entityManager->getRDBRepository('User')->find();
    $cleanedUsers = 0;
    foreach ($users as $user) {
        $preferences = $entityManager->getEntity('Preferences', $user->getId());
        if ($preferences && $preferences->get('tabList')) {
            $userTabList = $preferences->get('tabList');
            if (is_array($userTabList) && in_array('Workflow', $userTabList)) {
                $userTabList = array_values(array_filter($userTabList, fn($item) => $item !== 'Workflow'));
                $preferences->set('tabList', $userTabList);
                $entityManager->saveEntity($preferences);
                $cleanedUsers++;
            }
        }
    }
    echo "   ✓ Limpiadas preferencias de {$cleanedUsers} usuario(s)\n\n";
    echo "3. Eliminando scheduled jobs relacionados...\n";
    $jobs = ['ProcessWorkflowExecution', 'ProcessScheduledWorkflow', 'ProcessRecurringWorkflow'];
    $deletedJobs = 0;
    foreach ($jobs as $jobName) {
        $job = $entityManager->getRDBRepository('ScheduledJob')
            ->where(['job' => $jobName])
            ->findOne();
        if ($job) {
            $entityManager->removeEntity($job);
            $deletedJobs++;
            echo "   ✓ Eliminado scheduled job: {$jobName}\n";
        }
    }
    if ($deletedJobs === 0) {
        echo "   ✓ No se encontraron scheduled jobs para eliminar\n";
    }
    echo "\n";
    echo "4. Eliminando extensiones relacionadas...\n";
    $extensions = $entityManager->getRDBRepository('Extension')
        ->where([
            'name' => ['Workflows', 'FreeWorkflows']
        ])
        ->find();
    $deletedExtensions = 0;
    foreach ($extensions as $extension) {
        $entityManager->removeEntity($extension);
        $deletedExtensions++;
        echo "   ✓ Eliminada extensión: {$extension->get('name')}\n";
    }
    if ($deletedExtensions === 0) {
        echo "   ✓ No se encontraron extensiones para eliminar\n";
    }
    echo "\n";
    echo "5. Limpiando cache...\n";
    $cacheClearer = $container->getByClass(ClearCache::class);
    $cacheClearer->clearAll();
    echo "   ✓ Cache limpiado\n\n";
    echo "6. Reconstruyendo metadata...\n";
    $rebuildManager = $container->getByClass(RebuildManager::class);
    $rebuildManager->rebuild(false);
    echo "   ✓ Metadata reconstruida\n\n";
    echo "========================================\n";
    echo "✓ Limpieza completada exitosamente\n";
    echo "========================================\n";
    echo "\nNota: Las tablas workflow, workflow_execution y workflow_log\n";
    echo "deben eliminarse manualmente desde la base de datos si existen.\n";
    echo "Ejecuta el script SQL cleanup-workflows.sql para eliminarlas.\n";
} catch (\Throwable $e) {
    echo "\n❌ ERROR: " . $e->getMessage() . "\n";
    echo "Stack trace:\n" . $e->getTraceAsString() . "\n";
    exit(1);
}
EOFPHP

# 3. Ejecutar el script
php /tmp/cleanup-workflows.php
```

## Alternativa: Ejecutar SQL Directamente

Si prefieres ejecutar solo el SQL (más rápido):

```bash
# Conectar a PostgreSQL
railway connect postgres

# Luego ejecuta:
DROP TABLE IF EXISTS workflow_log CASCADE;
DROP TABLE IF EXISTS workflow_execution CASCADE;
DROP TABLE IF EXISTS workflow CASCADE;
DELETE FROM scheduled_job WHERE job IN ('ProcessWorkflowExecution', 'ProcessScheduledWorkflow', 'ProcessRecurringWorkflow');
UPDATE config SET value = (SELECT jsonb_agg(elem) FROM jsonb_array_elements(value::jsonb) elem WHERE elem::text != '"Workflow"') WHERE name = 'tabList' AND value::jsonb @> '"Workflow"';
UPDATE config SET value = (SELECT jsonb_agg(elem) FROM jsonb_array_elements(value::jsonb) elem WHERE elem::text != '"Workflow"') WHERE name = 'quickCreateList' AND value::jsonb @> '"Workflow"';
UPDATE preferences SET data = jsonb_set(data::jsonb, '{tabList}', (SELECT jsonb_agg(elem) FROM jsonb_array_elements(data->'tabList') elem WHERE elem::text != '"Workflow"'))::text WHERE data::jsonb ? 'tabList' AND data::jsonb->'tabList' @> '"Workflow"';
DELETE FROM extension WHERE name IN ('Workflows', 'FreeWorkflows');
DELETE FROM cache WHERE name LIKE '%workflow%' OR name LIKE '%Workflow%';
```

