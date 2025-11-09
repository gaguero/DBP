# Instrucciones para Copiar config.php usando WSL

## Requisitos Previos

1. WSL instalado y funcionando (ya lo tienes - Ubuntu)
2. Node.js instalado en WSL (necesario para Railway CLI)

## Paso 1: Instalar Node.js en WSL

Abre WSL (Ubuntu) y ejecuta:

```bash
# Instalar Node.js usando nvm (recomendado)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Cerrar y reabrir la terminal WSL, luego:
nvm install --lts
nvm use --lts

# Verificar instalación
node --version
npm --version
```

**O instalar Node.js directamente:**

```bash
# Actualizar paquetes
sudo apt update

# Instalar Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Verificar instalación
node --version
npm --version
```

## Paso 2: Instalar Railway CLI en WSL

```bash
npm install -g @railway/cli

# Verificar instalación
railway --version
```

## Paso 3: Autenticarse en Railway CLI

```bash
railway login
```

Esto abrirá tu navegador para autenticarte.

## Paso 4: Navegar al Proyecto

```bash
cd /mnt/c/Users/jovy2/Documents/VTF/DBPwix
```

## Paso 5: Vincular el Proyecto

```bash
railway link
```

Sigue las instrucciones:
- Selecciona: **Gaguero's Projects**
- Selecciona: **DBP**
- Selecciona: **production**
- Selecciona servicio: **espocrm** (o presiona Enter para omitir)

## Paso 6: Ejecutar los Comandos para Copiar config.php

Ejecuta estos comandos **uno por uno**:

```bash
# 1. Seleccionar servicio original
railway service espocrm

# 2. Exportar config.php desde la instancia original
railway run sh -c "cat /persistent/data/config.php" > config-temp.php

# 3. Verificar que el archivo se creó correctamente
head -20 config-temp.php

# 4. Cambiar al servicio nuevo
railway service espocrmDEV

# 5. Crear directorio si no existe (opcional, puede que ya exista)
railway run sh -c "mkdir -p /persistent/data"

# 6. Copiar config.php a la nueva instancia
cat config-temp.php | railway run sh -c "cat > /persistent/data/config.php"

# 7. Ajustar permisos
railway run sh -c "chown www-data:www-data /persistent/data/config.php"
railway run sh -c "chmod 664 /persistent/data/config.php"

# 8. Verificar que se copió correctamente
railway run sh -c "ls -la /persistent/data/config.php"

# 9. Limpiar archivo temporal
rm config-temp.php
```

## Paso 7: Reiniciar la Nueva Instancia

1. Ve a Railway Dashboard: https://railway.app
2. Selecciona tu proyecto **DBP**
3. Selecciona el servicio **espocrmDEV**
4. Haz clic en **"Restart"** o **"Redeploy"**

## Paso 8: Verificar

1. Accede a la URL de la nueva instancia (debería estar en Railway Dashboard)
2. Deberías ver el **login de EspoCRM** en lugar de la pantalla de instalación
3. Inicia sesión con las mismas credenciales de la instancia original

## Solución de Problemas

### Error: "node: command not found"
- Asegúrate de haber instalado Node.js en WSL (Paso 1)
- Verifica con: `node --version`

### Error: "railway: command not found"
- Asegúrate de haber instalado Railway CLI en WSL (Paso 2)
- Verifica con: `railway --version`

### Error: "Unauthorized"
- Ejecuta: `railway login` nuevamente

### Error: "No linked project found"
- Ejecuta: `railway link` y selecciona el proyecto DBP

### Error: "config.php no encontrado"
- Verifica que la instancia original esté completamente instalada
- Verifica la ruta: `railway run sh -c "ls -la /persistent/data/"`

### El archivo se copió pero la nueva instancia sigue mostrando instalación
- Verifica que reiniciaste la nueva instancia en Railway
- Verifica los logs de la nueva instancia para errores
- Verifica que ambas instancias usan la misma base de datos

## Notas Importantes

- ✅ Ambas instancias compartirán los **mismos datos** (misma base de datos)
- ✅ Los cambios en una instancia se reflejarán en la otra
- ✅ Usa esto solo para **pruebas/desarrollo**
- ⚠️ No uses esto si necesitas instancias completamente independientes

## Comandos Rápidos (Copy-Paste)

Si prefieres ejecutar todo de una vez (después de instalar Node.js y Railway CLI):

```bash
cd /mnt/c/Users/jovy2/Documents/VTF/DBPwix
railway service espocrm
railway run sh -c "cat /persistent/data/config.php" > config-temp.php
railway service espocrmDEV
cat config-temp.php | railway run sh -c "cat > /persistent/data/config.php"
railway run sh -c "chown www-data:www-data /persistent/data/config.php"
railway run sh -c "chmod 664 /persistent/data/config.php"
rm config-temp.php
```

