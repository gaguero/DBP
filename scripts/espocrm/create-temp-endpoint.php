<?php
/**
 * Script para crear un endpoint temporal en EspoCRM que permita descargar config.php
 * de forma segura usando un token de acceso.
 * 
 * USO:
 *   1. Ejecuta primero: php generate-temp-token.php
 *   2. Copia el token generado
 *   3. Ejecuta: php create-temp-endpoint.php [TOKEN]
 *   4. Esto creará un archivo en custom/Espo/Resources/routes.json
 *   5. Usa el endpoint con el script copy-config-via-http.sh
 *   6. ELIMINA este endpoint después de usarlo por seguridad
 */

if ($argc < 2) {
    die("Uso: php create-temp-endpoint.php [TOKEN]\n");
}

$token = $argv[1];

// Ruta base de EspoCRM
$basePath = __DIR__ . '/../../apps/espocrm/src';
if (!file_exists($basePath)) {
    $basePath = '/var/www/html';
}

$customPath = $basePath . '/custom/Espo/Resources';
$routesFile = $customPath . '/routes.json';

// Crear directorio si no existe
if (!is_dir($customPath)) {
    mkdir($customPath, 0755, true);
}

// Leer rutas existentes o crear nuevo array
$routes = [];
if (file_exists($routesFile)) {
    $routes = json_decode(file_get_contents($routesFile), true) ?: [];
}

// Agregar ruta temporal
$routes['routes'][] = [
    'route' => '/api/v1/temp-config-export',
    'method' => 'get',
    'controller' => 'CustomApi\\TempConfigExport',
    'action' => 'export'
];

// Guardar rutas
file_put_contents($routesFile, json_encode($routes, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));

// Crear controlador
$controllerDir = $basePath . '/custom/Espo/Modules/CustomApi/Controllers';
if (!is_dir($controllerDir)) {
    mkdir($controllerDir, 0755, true);
}

$controllerFile = $controllerDir . '/TempConfigExport.php';
$controllerCode = <<<PHP
<?php
namespace CustomApi\Controllers;

use Espo\Core\Api\Request;
use Espo\Core\Api\Response;

class TempConfigExport
{
    private \$token = '{$token}';
    private \$tokenFile = '/tmp/config-export-token.txt';
    private \$expiryTime = 3600; // 1 hora

    public function export(Request \$request, Response \$response): void
    {
        \$providedToken = \$request->getHeader('X-Access-Token');
        
        if (!\$providedToken || \$providedToken !== \$this->token) {
            \$response->setStatus(401);
            \$response->setBody(json_encode(['error' => 'Token inválido']));
            return;
        }

        // Verificar expiración
        if (file_exists(\$this->tokenFile)) {
            \$created = filemtime(\$this->tokenFile);
            if (time() - \$created > \$this->expiryTime) {
                \$response->setStatus(401);
                \$response->setBody(json_encode(['error' => 'Token expirado']));
                return;
            }
        }

        \$configPath = '/persistent/data/config.php';
        if (!file_exists(\$configPath)) {
            \$configPath = __DIR__ . '/../../../../data/config.php';
        }

        if (!file_exists(\$configPath)) {
            \$response->setStatus(404);
            \$response->setBody(json_encode(['error' => 'config.php no encontrado']));
            return;
        }

        \$response->setHeader('Content-Type', 'application/octet-stream');
        \$response->setHeader('Content-Disposition', 'attachment; filename="config.php"');
        \$response->setBody(file_get_contents(\$configPath));
    }
}
PHP;

file_put_contents($controllerFile, $controllerCode);

echo "✅ Endpoint temporal creado exitosamente\n";
echo "\n";
echo "Endpoint URL: /api/v1/temp-config-export\n";
echo "Token: {$token}\n";
echo "\n";
echo "Para usar el endpoint, envía una petición GET con header:\n";
echo "  X-Access-Token: {$token}\n";
echo "\n";
echo "⚠️  IMPORTANTE: Elimina este endpoint después de usarlo:\n";
echo "  1. Elimina: {$routesFile}\n";
echo "  2. Elimina: {$controllerFile}\n";
echo "  3. Ejecuta: php command.php rebuild\n";
echo "\n";

