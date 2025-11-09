# Solución Final: Usar Git Bash o WSL

Railway CLI funciona mejor con entornos tipo Unix (bash). En Windows, PowerShell intercepta comandos como `sh`, `cat`, `php`, etc.

## Opción 1: Usar Git Bash (Recomendado)

Si tienes Git instalado, Git Bash viene incluido:

1. **Abre Git Bash** (busca "Git Bash" en el menú de inicio)

2. **Navega al directorio del proyecto:**
```bash
cd /c/Users/jovy2/Documents/VTF/DBPwix
```

3. **Verifica que Railway CLI funciona:**
```bash
railway --version
```

4. **Si Railway CLI no está disponible en Git Bash**, instálalo:
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

7. **Ejecuta el script:**
```bash
bash scripts/espocrm/copy-config.sh espocrm espocrmDEV DBP
```

## Opción 2: Usar WSL (Windows Subsystem for Linux)

Si tienes WSL instalado:

1. **Abre WSL** (Ubuntu)

2. **Instala Railway CLI en WSL:**
```bash
npm install -g @railway/cli
```

3. **Autentícate:**
```bash
railway login
```

4. **Navega al proyecto:**
```bash
cd /mnt/c/Users/jovy2/Documents/VTF/DBPwix
```

5. **Ejecuta el script:**
```bash
bash scripts/espocrm/copy-config.sh espocrm espocrmDEV DBP
```

## Opción 3: Comandos Manuales en Git Bash/WSL

Si prefieres ejecutar los comandos manualmente:

```bash
# 1. Seleccionar servicio original
railway service espocrm

# 2. Exportar config.php
railway run sh -c "cat /persistent/data/config.php" > config-temp.php

# 3. Cambiar al servicio nuevo
railway service espocrmDEV

# 4. Copiar a la nueva instancia
cat config-temp.php | railway run sh -c "cat > /persistent/data/config.php"

# 5. Ajustar permisos
railway run sh -c "chown www-data:www-data /persistent/data/config.php"
railway run sh -c "chmod 664 /persistent/data/config.php"

# 6. Limpiar
rm config-temp.php
```

## Verificación

Después de copiar el archivo:
1. Reinicia la nueva instancia en Railway dashboard
2. Accede a la URL de la nueva instancia
3. Deberías ver el login de EspoCRM en lugar de la pantalla de instalación

