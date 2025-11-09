# Método alternativo: Crear endpoint HTTP temporal

## Paso 1: Crear un script PHP temporal en la instancia original

Ejecuta esto en tu terminal PowerShell:

```powershell
# Conectarte al servicio original
railway service espocrm

# Crear el script PHP temporal usando Railway run
@'
<?php
header('Content-Type: text/plain');
readfile('/persistent/data/config.php');
'@ | railway run -- sh -c "cat > /tmp/export-config.php"
```

Pero como PowerShell está interceptando, mejor hazlo así:

**Opción más simple:** Usa el dashboard de Railway para ejecutar comandos directamente.

1. Ve a Railway Dashboard
2. Selecciona el servicio `espocrm`
3. Ve a la pestaña "Deployments" o "Settings"
4. Busca la opción "Execute Command" o "Shell"
5. Ejecuta: `cat /persistent/data/config.php`
6. Copia todo el contenido
7. Pégalo en un archivo local llamado `config-temp.php`

Luego continúa con los pasos para copiarlo a la nueva instancia.

