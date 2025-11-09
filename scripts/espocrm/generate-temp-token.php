<?php
/**
 * Script temporal para generar un token de acceso único
 * Este script debe ejecutarse UNA VEZ en la instancia original para crear un endpoint temporal
 * que permita descargar el config.php de forma segura.
 * 
 * USO:
 *   1. Sube este archivo a la instancia original (via Railway CLI o FTP)
 *   2. Ejecuta: php generate-temp-token.php
 *   3. Copia el token generado
 *   4. Usa el token en el script copy-config-via-http.sh
 *   5. ELIMINA este archivo y el endpoint después de usarlo por seguridad
 */

// Generar un token aleatorio seguro
$token = bin2hex(random_bytes(32));

echo "========================================\n";
echo "Token de acceso temporal generado:\n";
echo "========================================\n";
echo $token . "\n";
echo "========================================\n";
echo "\n";
echo "Guarda este token de forma segura.\n";
echo "Este token expirará después de 1 hora de uso.\n";
echo "\n";
echo "Para crear el endpoint temporal, ejecuta:\n";
echo "  php create-temp-endpoint.php $token\n";
echo "\n";

// Guardar token en archivo temporal (solo para referencia)
file_put_contents('/tmp/config-export-token.txt', $token);
echo "Token guardado en /tmp/config-export-token.txt\n";
echo "\n";
echo "⚠️  IMPORTANTE: Elimina este archivo y el endpoint después de usarlo\n";

