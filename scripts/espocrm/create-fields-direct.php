<?php
/**
 * Script PHP para crear campos personalizados directamente en EspoCRM
 * Este script se ejecuta dentro del contenedor de EspoCRM usando Railway CLI
 * 
 * Uso desde Railway:
 * railway run -- php /tmp/create-fields.php
 * 
 * O copiar al contenedor y ejecutar:
 * railway run -- sh -c "php /tmp/create-fields.php"
 */

require_once __DIR__ . '/bootstrap.php';

use Espo\Core\Application;
use Espo\Core\ApplicationRunners\Command;

// Inicializar aplicación
$app = new Application();
$app->run(Command::class);

// NOTA: Este enfoque requiere acceso directo al código de EspoCRM
// Alternativa: Usar la herramienta FieldManager directamente

use Espo\Tools\EntityManager\FieldManager as FieldManagerTool;
use Espo\Core\InjectableFactory;

$injectableFactory = $app->getContainer()->get('injectableFactory');
$fieldManager = $injectableFactory->create(FieldManagerTool::class);

$fields = [
    [
        'name' => 'dripCampaignType',
        'type' => 'enum',
        'label' => 'Drip Campaign Type',
        'default' => 'None',
        'options' => ['News and Offers', 'Get Personalized Assistance', 'None'],
    ],
    // ... más campos
];

foreach ($fields as $fieldDef) {
    try {
        $name = $fieldManager->create('Lead', $fieldDef['name'], $fieldDef);
        echo "✅ Campo creado: {$name}\n";
    } catch (Exception $e) {
        echo "❌ Error creando campo {$fieldDef['name']}: {$e->getMessage()}\n";
    }
}

echo "\n✅ Proceso completado\n";

