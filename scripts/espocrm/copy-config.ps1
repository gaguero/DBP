# Script PowerShell para copiar config.php entre instancias de EspoCRM
# Uso: .\copy-config.ps1

$ORIGINAL_SERVICE = "espocrm"
$NEW_SERVICE = "espocrmDEV"
$TEMP_FILE = "config-temp.php"

Write-Host "=== Script de Copia de Configuración de EspoCRM ===" -ForegroundColor Green
Write-Host ""

# Paso 1: Exportar config.php desde la instancia original
Write-Host "Paso 1: Exportando config.php desde la instancia original..." -ForegroundColor Yellow
railway run -s $ORIGINAL_SERVICE sh -c 'cat /persistent/data/config.php' | Out-File -FilePath $TEMP_FILE -Encoding utf8 -NoNewline

if (-not (Test-Path $TEMP_FILE) -or (Get-Item $TEMP_FILE).Length -eq 0) {
    Write-Host "❌ Error al exportar config.php" -ForegroundColor Red
    exit 1
}

Write-Host "✓ config.php exportado exitosamente" -ForegroundColor Green
Write-Host ""

# Paso 2: Verificar contenido
$content = Get-Content $TEMP_FILE -Raw
if ($content -notmatch "database") {
    Write-Host "⚠️  Advertencia: El archivo no parece tener el formato esperado" -ForegroundColor Yellow
}

# Paso 3: Crear directorio en la nueva instancia
Write-Host "Paso 2: Creando directorio en la nueva instancia..." -ForegroundColor Yellow
railway run -s $NEW_SERVICE sh -c 'mkdir -p /persistent/data' 2>&1 | Out-Null

# Paso 4: Copiar config.php a la nueva instancia
Write-Host "Paso 3: Copiando config.php a la nueva instancia..." -ForegroundColor Yellow
Get-Content $TEMP_FILE -Raw | railway run -s $NEW_SERVICE sh -c 'cat > /persistent/data/config.php'

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Error al copiar config.php" -ForegroundColor Red
    Remove-Item $TEMP_FILE -ErrorAction SilentlyContinue
    exit 1
}

Write-Host "✓ config.php copiado exitosamente" -ForegroundColor Green
Write-Host ""

# Paso 5: Ajustar permisos
Write-Host "Paso 4: Ajustando permisos..." -ForegroundColor Yellow
railway run -s $NEW_SERVICE sh -c 'chown www-data:www-data /persistent/data/config.php' 2>&1 | Out-Null
railway run -s $NEW_SERVICE sh -c 'chmod 664 /persistent/data/config.php' 2>&1 | Out-Null

# Limpiar archivo temporal
Remove-Item $TEMP_FILE -ErrorAction SilentlyContinue

Write-Host ""
Write-Host "✅ ¡Proceso completado exitosamente!" -ForegroundColor Green
Write-Host ""
Write-Host "Próximos pasos:"
Write-Host "  1. Reinicia la nueva instancia de EspoCRM en Railway"
Write-Host "  2. Accede a la URL de la nueva instancia"
Write-Host "  3. Deberías ver el login de EspoCRM en lugar de la pantalla de instalación"
Write-Host ""

