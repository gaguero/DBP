<?php
/**
 * Script para crear campos personalizados usando las clases internas de EspoCRM
 * Ejecutar dentro del contenedor: php /tmp/create-fields-internal.php
 * 
 * Este script debe ejecutarse desde el directorio raíz de EspoCRM (/var/www/html)
 */

// Cambiar al directorio raíz de EspoCRM
chdir('/var/www/html');

// Incluir bootstrap de EspoCRM
require_once '/var/www/html/bootstrap.php';

use Espo\Core\Application;
use Espo\Tools\EntityManager\FieldManager as FieldManagerTool;

// Inicializar aplicación EspoCRM usando Command runner
$app = new Application();
$app->setupSystemUser();

$container = $app->getContainer();

// Obtener FieldManager
$fieldManager = $container->get('injectableFactory')->create(FieldManagerTool::class);

// Obtener Metadata para verificar campos existentes
$metadata = $container->get('metadata');

echo "🚀 Iniciando creación de campos personalizados...\n\n";

$fields = [
    [
        'name' => 'dripCampaignType',
        'type' => 'enum',
        'label' => 'Drip Campaign Type',
        'default' => 'None',
        'options' => ['News and Offers', 'Get Personalized Assistance', 'None'],
    ],
    [
        'name' => 'dripCampaignStartDate',
        'type' => 'datetime',
        'label' => 'Drip Campaign Start Date',
    ],
    [
        'name' => 'dripCampaignLastEmailSent',
        'type' => 'datetime',
        'label' => 'Drip Campaign Last Email Sent',
    ],
    [
        'name' => 'dripCampaignNextEmailDate',
        'type' => 'datetime',
        'label' => 'Drip Campaign Next Email Date',
    ],
    [
        'name' => 'dripCampaignEmailSequence',
        'type' => 'int',
        'label' => 'Drip Campaign Email Sequence',
        'default' => 0,
        'min' => 0,
        'max' => 6,
    ],
    [
        'name' => 'assignedAgent',
        'type' => 'link',
        'label' => 'Assigned Agent',
        'entity' => 'User',
    ],
    [
        'name' => 'assignedAgentEmail',
        'type' => 'varchar',
        'label' => 'Assigned Agent Email',
        'maxLength' => 255,
    ],
    [
        'name' => 'assignedAgentName',
        'type' => 'varchar',
        'label' => 'Assigned Agent Name',
        'maxLength' => 255,
    ],
    [
        'name' => 'hasResponded',
        'type' => 'bool',
        'label' => 'Has Responded',
        'default' => false,
    ],
    [
        'name' => 'lastEmailResponseDate',
        'type' => 'datetime',
        'label' => 'Last Email Response Date',
    ],
    [
        'name' => 'emailResponseCount',
        'type' => 'int',
        'label' => 'Email Response Count',
        'default' => 0,
    ],
    [
        'name' => 'formSource',
        'type' => 'enum',
        'label' => 'Form Source',
        'options' => [
            'News and Offers Form',
            'Get Personalized Assistance Form',
            'Newsletter Popup',
            'Contact Form',
            'Other',
        ],
    ],
    [
        'name' => 'formSubmissionDate',
        'type' => 'datetime',
        'label' => 'Form Submission Date',
    ],
    [
        'name' => 'leadScore',
        'type' => 'int',
        'label' => 'Lead Score',
        'default' => 0,
        'min' => 0,
        'max' => 150,
    ],
    [
        'name' => 'leadScoreDemographic',
        'type' => 'int',
        'label' => 'Lead Score - Demographic',
        'default' => 0,
        'min' => 0,
        'max' => 30,
    ],
    [
        'name' => 'leadScoreBehavioral',
        'type' => 'int',
        'label' => 'Lead Score - Behavioral',
        'default' => 0,
        'min' => 0,
        'max' => 50,
    ],
    [
        'name' => 'leadScoreEngagement',
        'type' => 'int',
        'label' => 'Lead Score - Engagement',
        'default' => 0,
        'min' => 0,
        'max' => 30,
    ],
    [
        'name' => 'leadScoreFormSubmission',
        'type' => 'int',
        'label' => 'Lead Score - Form Submission',
        'default' => 0,
        'min' => 0,
        'max' => 40,
    ],
    [
        'name' => 'leadScoreCategory',
        'type' => 'enum',
        'label' => 'Lead Score Category',
        'options' => ['Hot', 'Warm', 'Cold'],
        'default' => 'Cold',
    ],
    [
        'name' => 'leadScoreLastUpdated',
        'type' => 'datetime',
        'label' => 'Lead Score Last Updated',
    ],
    [
        'name' => 'websiteVisits',
        'type' => 'int',
        'label' => 'Website Visits',
        'default' => 0,
    ],
    [
        'name' => 'websitePagesViewed',
        'type' => 'int',
        'label' => 'Website Pages Viewed',
        'default' => 0,
    ],
    [
        'name' => 'websiteTimeOnSite',
        'type' => 'int',
        'label' => 'Website Time on Site (seconds)',
        'default' => 0,
    ],
    [
        'name' => 'websiteLastVisit',
        'type' => 'datetime',
        'label' => 'Website Last Visit',
    ],
    [
        'name' => 'websiteFirstVisit',
        'type' => 'datetime',
        'label' => 'Website First Visit',
    ],
    [
        'name' => 'websitePagesVisited',
        'type' => 'text',
        'label' => 'Website Pages Visited (JSON)',
    ],
    [
        'name' => 'websiteCTAClicks',
        'type' => 'int',
        'label' => 'Website CTA Clicks',
        'default' => 0,
    ],
    [
        'name' => 'websiteFormViews',
        'type' => 'int',
        'label' => 'Website Form Views',
        'default' => 0,
    ],
];

$successCount = 0;
$skipCount = 0;
$errorCount = 0;

foreach ($fields as $fieldDef) {
    $name = $fieldDef['name'];
    $fieldNameWithPrefix = 'c' . ucfirst($name);
    
    // Verificar si el campo ya existe (con prefijo "c")
    $existingFields = $metadata->get(['entityDefs', 'Lead', 'fields', $fieldNameWithPrefix]);
    if ($existingFields !== null) {
        echo "⏭️  Campo \"{$fieldNameWithPrefix}\" ya existe, saltando...\n";
        $skipCount++;
        continue;
    }
    
    try {
        // Preparar datos del campo según el formato que espera FieldManager
        $fieldData = [
            'type' => $fieldDef['type'],
            'label' => $fieldDef['label'],
        ];
        
        // Agregar propiedades específicas del tipo
        if (isset($fieldDef['default'])) {
            $fieldData['default'] = $fieldDef['default'];
        }
        if (isset($fieldDef['options'])) {
            $fieldData['options'] = $fieldDef['options'];
        }
        if (isset($fieldDef['min'])) {
            $fieldData['min'] = $fieldDef['min'];
        }
        if (isset($fieldDef['max'])) {
            $fieldData['max'] = $fieldDef['max'];
        }
        if (isset($fieldDef['maxLength'])) {
            $fieldData['maxLength'] = $fieldDef['maxLength'];
        }
        if (isset($fieldDef['entity'])) {
            $fieldData['entity'] = $fieldDef['entity'];
        }
        if ($fieldDef['type'] === 'text') {
            $fieldData['textLength'] = 'long';
        }
        
        // Crear campo (FieldManager agregará automáticamente el prefijo "c")
        $createdName = $fieldManager->create('Lead', $name, $fieldData);
        echo "✅ Campo \"{$createdName}\" creado exitosamente\n";
        $successCount++;
    } catch (Exception $e) {
        echo "❌ Error creando campo \"{$name}\": {$e->getMessage()}\n";
        echo "   Stack trace: " . $e->getTraceAsString() . "\n";
        $errorCount++;
    }
}

echo "\n📊 Resumen:\n";
echo "✅ Creados: {$successCount}\n";
echo "⏭️  Ya existían: {$skipCount}\n";
echo "❌ Errores: {$errorCount}\n";

if ($successCount > 0) {
    echo "\n🔄 Reconstruyendo cache...\n";
    try {
        $app->run(\Espo\Core\ApplicationRunners\Rebuild::class);
        echo "✅ Cache reconstruido\n";
    } catch (Exception $e) {
        echo "⚠️  No se pudo reconstruir cache automáticamente: {$e->getMessage()}\n";
        echo "   Ejecuta manualmente: php command.php rebuild\n";
    }
}

echo "\n✅ ¡Proceso completado!\n";

