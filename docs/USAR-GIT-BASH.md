# Solución Más Simple: Usar Git Bash

PowerShell está interceptando todos los comandos (`sh`, `cat`, `php`, etc.) antes de que Railway los reciba. 

## La Solución Más Rápida:

**Usa Git Bash** (viene con Git para Windows):

1. **Abre Git Bash** (busca "Git Bash" en el menú de inicio de Windows)

2. **Navega al proyecto:**
```bash
cd /c/Users/jovy2/Documents/VTF/DBPwix
```

3. **Verifica Railway CLI:**
```bash
railway --version
```

4. **Si no está instalado en Git Bash, instálalo:**
```bash
npm install -g @railway/cli
```

5. **Autentícate:**
```bash
railway login
```

6. **Vincula el proyecto:**
```bash
railway link
# Selecciona: DBP -> production -> espocrm
```

7. **Ejecuta estos comandos uno por uno:**
```bash
# Seleccionar servicio original
railway service espocrm

# Exportar config.php
railway run sh -c "cat /persistent/data/config.php" > config-temp.php

# Verificar que se creó
cat config-temp.php | head -20

# Cambiar al servicio nuevo
railway service espocrmDEV

# Copiar a la nueva instancia
cat config-temp.php | railway run sh -c "cat > /persistent/data/config.php"

# Ajustar permisos
railway run sh -c "chown www-data:www-data /persistent/data/config.php"
railway run sh -c "chmod 664 /persistent/data/config.php"

# Limpiar
rm config-temp.php
```

8. **Reinicia la nueva instancia en Railway Dashboard**

9. **Verifica:** Accede a la URL de la nueva instancia y deberías ver el login en lugar de la pantalla de instalación

## ¿No tienes Git Bash?

Puedes instalarlo descargando Git para Windows desde: https://git-scm.com/download/win

Git Bash viene incluido en la instalación y es la forma más fácil de ejecutar comandos tipo Unix en Windows sin problemas de interpretación de PowerShell.

