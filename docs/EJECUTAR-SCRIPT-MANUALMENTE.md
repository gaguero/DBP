# Instrucciones para Ejecutar Script PHP - EJECUTAR MANUALMENTE

## ⚠️ IMPORTANTE: Ejecutar desde WSL o Git Bash

PowerShell está interceptando los comandos, por lo que debes ejecutar esto **manualmente desde WSL o Git Bash**.

## Opción 1: Usar Script Bash (RECOMENDADO) 🚀

### 1. Abre WSL (Ubuntu) o Git Bash

Busca "Ubuntu" o "Git Bash" en el menú de inicio de Windows y ábrelo.

### 2. Ejecuta el script:

```bash
# Navegar al proyecto
cd /mnt/c/Users/jovy2/Documents/VTF/DBPwix

# Ejecutar script (hace todo automáticamente)
./scripts/espocrm/ejecutar-crear-campos.sh
```

## Opción 2: Ejecutar Comandos Manualmente

### 1. Abre WSL (Ubuntu) o Git Bash

### 2. Ejecuta estos comandos uno por uno:

```bash
# Navegar al proyecto
cd /mnt/c/Users/jovy2/Documents/VTF/DBPwix

# Seleccionar servicio
railway service espocrmDEV

# Copiar script al contenedor
cat scripts/espocrm/create-fields-internal.php | railway run -- sh -c "cat > /tmp/create-fields-internal.php"

# Ejecutar script
railway run -- php /tmp/create-fields-internal.php
```

### 3. Verificar Resultados

El script mostrará:
- ✅ Campos creados exitosamente
- ⏭️ Campos que ya existían (se saltarán)
- ❌ Errores (si los hay)

## Si Railway CLI no funciona en WSL:

Necesitas instalar Node.js en WSL primero:

```bash
# Instalar Node.js en WSL
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Instalar Railway CLI
npm install -g @railway/cli

# Autenticarse
railway login

# Luego ejecutar los comandos de arriba
```

## Alternativa: Crear Campos Manualmente

Si el script no funciona, puedes crear los campos manualmente siguiendo el mismo patrón que usaste para `dripCampaignStatus`.

**Tiempo estimado:** ~15-20 minutos por campo × 28 campos = ~7-9 horas

**Lista de campos:** Ver `docs/manual-configuration-instructions.md` - Sección 1

