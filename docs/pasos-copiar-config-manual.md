# Guía Paso a Paso: Copiar config.php entre Instancias

## Paso 1: Seleccionar el servicio original
```powershell
railway service use espocrm
```

## Paso 2: Exportar config.php desde la instancia original
```powershell
railway run sh -c "cat /persistent/data/config.php" > config-temp.php
```

## Paso 3: Verificar que el archivo se creó correctamente
```powershell
dir config-temp.php
```

## Paso 4: Cambiar al servicio nuevo
```powershell
railway service use espocrmDEV
```

## Paso 5: Copiar config.php a la nueva instancia
```powershell
Get-Content config-temp.php | railway run sh -c "cat > /persistent/data/config.php"
```

## Paso 6: Ajustar permisos
```powershell
railway run sh -c "chown www-data:www-data /persistent/data/config.php"
railway run sh -c "chmod 664 /persistent/data/config.php"
```

## Paso 7: Limpiar archivo temporal
```powershell
del config-temp.php
```

## Paso 8: Reiniciar la nueva instancia
- Ve a Railway dashboard
- Selecciona el servicio `espocrmDEV`
- Haz clic en "Restart" o "Redeploy"

## Verificación
- Accede a la URL de la nueva instancia
- Deberías ver el login de EspoCRM en lugar de la pantalla de instalación

