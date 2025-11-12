# 🧹 EJECUTAR LIMPIEZA DE BASE DE DATOS - Guía Completa

## ✅ Scripts Preparados

- ✅ `cleanup-workflows.php` - Script PHP completo
- ✅ `cleanup-workflows.sql` - Script SQL completo
- ✅ Servicio Railway: **espocrmDEV** (ya seleccionado)

## 🚀 MÉTODO RECOMENDADO: Railway Dashboard Shell

### Paso 1: Abrir Shell en Railway

1. Ve a https://railway.app
2. Proyecto: **DBP**
3. Servicio: **espocrmDEV**
4. Pestaña: **"Deployments"**
5. Click en el deployment más reciente
6. Click en **"Shell"** (botón de terminal)

### Paso 2: Copiar y Ejecutar Script

En el shell del contenedor, ejecuta:

```bash
# 1. Crear el script de limpieza
cat > /tmp/cleanup-workflows.php << 'EOFPHP'
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
    
    // Remover de tabList global
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
    
    // Remover de quickCreateList global
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

# 2. Ejecutar el script
php /tmp/cleanup-workflows.php
```

### Paso 3: Eliminar Tablas (Opcional)

Si quieres eliminar también las tablas de la base de datos, ejecuta el SQL:

```bash
# Conectar a PostgreSQL
railway connect postgres

# Luego ejecutar:
DROP TABLE IF EXISTS workflow_log CASCADE;
DROP TABLE IF EXISTS workflow_execution CASCADE;
DROP TABLE IF EXISTS workflow CASCADE;
```

## 📋 Verificación

Después de ejecutar:

1. **Acceder a EspoCRM** y verificar:
   - ✅ No aparece "Workflow" en el menú
   - ✅ Administration > Extensions no muestra Workflows

2. **Rebuild final:**
```bash
php clear_cache.php
php rebuild.php --skip-db-check
```

## 🎯 Próximo Paso

Después de la limpieza, instalar FreeWorkflows extension desde `packages/build/FreeWorkflows-1.0.0.zip`

