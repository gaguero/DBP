# Solución: Crear Endpoint HTTP Temporal

PowerShell está interceptando todos los comandos antes de que Railway los reciba. La mejor solución es crear un endpoint HTTP temporal en la instancia original que sirva el config.php, y luego descargarlo con PowerShell.

## Pasos:

### 1. Crear el endpoint temporal en la instancia original

Necesitas crear un archivo PHP temporal en la instancia original. Como PowerShell está interceptando comandos, la forma más fácil es:

**Opción A: Usar Git Bash o WSL** (si los tienes):
```bash
# En Git Bash o WSL
railway service espocrm
railway run sh -c "echo '<?php header(\"Content-Type: text/plain\"); readfile(\"/persistent/data/config.php\"); ?>' > /tmp/export-config.php"
```

**Opción B: Crear el archivo manualmente usando Railway Dashboard:**
1. Ve a Railway Dashboard
2. Selecciona el servicio `espocrm`
3. Ve a "Settings" → "Variables" o busca "File Manager" / "Volume Browser"
4. Si hay acceso a archivos, crea `/tmp/export-config.php` con este contenido:
```php
<?php
header('Content-Type: text/plain');
readfile('/persistent/data/config.php');
```

### 2. Hacer el archivo accesible vía web

Necesitas que EspoCRM sirva este archivo. La forma más fácil es ponerlo en un lugar accesible:

```bash
# En Git Bash/WSL
railway run sh -c "cp /tmp/export-config.php /var/www/html/export-config-temp.php"
```

### 3. Descargar el archivo con PowerShell

Una vez que el endpoint esté disponible:

```powershell
# Obtén la URL de tu instancia original (ej: https://espocrm-production.up.railway.app)
$url = "https://TU-URL-ESPOCRM-ORIGINAL.up.railway.app/export-config-temp.php"
Invoke-WebRequest -Uri $url -OutFile config-temp.php
```

### 4. Copiar a la nueva instancia

```powershell
railway service espocrmDEV
Get-Content config-temp.php | railway run -- /bin/cat > /persistent/data/config.php
```

### 5. Limpiar

```powershell
# Eliminar el endpoint temporal de la instancia original
railway service espocrm
railway run sh -c "rm /var/www/html/export-config-temp.php /tmp/export-config.php"

# Eliminar archivo local
del config-temp.php
```

## Alternativa más simple:

Si tienes acceso SSH o puedes ejecutar comandos de otra forma, la solución más directa es usar **Git Bash** o **WSL** como mencioné antes. Es la forma más confiable de evitar los problemas con PowerShell.

