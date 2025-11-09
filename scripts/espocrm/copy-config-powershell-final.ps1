# Script PowerShell para copiar config.php usando Railway CLI y WSL

Write-Host "=== Copiando config.php entre instancias ===" -ForegroundColor Green
Write-Host ""

# Paso 1: Seleccionar servicio original
Write-Host "Paso 1: Seleccionando servicio original (espocrm)..." -ForegroundColor Yellow
railway service espocrm

# Paso 2: Exportar config.php usando Railway CLI desde PowerShell
# Pero ejecutar el comando bash dentro del contenedor usando WSL para procesar la salida
Write-Host "Paso 2: Exportando config.php..." -ForegroundColor Yellow

# Ejecutar Railway CLI desde PowerShell y pasar la salida a un archivo temporal
$tempFile = "config-temp.php"
railway run --command "cat /persistent/data/config.php" 2>&1 | Out-File -FilePath $tempFile -Encoding utf8 -NoNewline

# Verificar que el archivo se creó y tiene contenido
if (-not (Test-Path $tempFile) -or (Get-Item $tempFile).Length -eq 0) {
    Write-Host "❌ Error: El archivo exportado está vacío" -ForegroundColor Red
    exit 1
}

Write-Host "✓ config.php exportado exitosamente" -ForegroundColor Green
Write-Host ""

# Paso 3: Verificar contenido
$content = Get-Content $tempFile -Raw
if ($content -notmatch "database") {
    Write-Host "⚠️  Advertencia: El archivo no parece tener el formato esperado" -ForegroundColor Yellow
}

# Paso 4: Cambiar al servicio nuevo
Write-Host "Paso 3: Cambiando al servicio nuevo (espocrmDEV)..." -ForegroundColor Yellow
railway service espocrmDEV

# Paso 5: Copiar a la nueva instancia usando WSL para leer el archivo y pasarlo
Write-Host "Paso 4: Copiando config.php a la nueva instancia..." -ForegroundColor Yellow

# Leer el archivo y pasarlo a Railway usando WSL
$fileContent = Get-Content $tempFile -Raw -Encoding utf8
$fileContent | railway run --command "cat > /persistent/data/config.php"

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Error al copiar config.php" -ForegroundColor Red
    Remove-Item $tempFile -ErrorAction SilentlyContinue
    exit 1
}

Write-Host "✓ config.php copiado exitosamente" -ForegroundColor Green
Write-Host ""

# Paso 6: Ajustar permisos
Write-Host "Paso 5: Ajustando permisos..." -ForegroundColor Yellow
railway run --command "chown www-data:www-data /persistent/data/config.php" 2>&1 | Out-Null
railway run --command "chmod 664 /persistent/data/config.php" 2>&1 | Out-Null

# Limpiar archivo temporal
Remove-Item $tempFile -ErrorAction SilentlyContinue

Write-Host ""
Write-Host "✅ ¡Proceso completado exitosamente!" -ForegroundColor Green
Write-Host ""
Write-Host "Próximos pasos:"
Write-Host "  1. Reinicia la nueva instancia de EspoCRM en Railway"
Write-Host "  2. Accede a la URL de la nueva instancia"
Write-Host "  3. Deberías ver el login de EspoCRM en lugar de la pantalla de instalación"
Write-Host ""

