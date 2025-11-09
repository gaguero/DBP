# Guía Rápida: Ejecutar Scripts de EspoCRM

## Paso 1: Crear API Key en EspoCRM

1. Login a EspoCRM DEV: https://espocrm-dev-production.up.railway.app
2. Click en tu nombre (arriba derecha) → **Preferences**
3. Click en **API** (en el menú lateral)
4. Click en **Create API Key**
5. Copia el API Key generado (lo necesitarás)

## Paso 2: Configurar Variables de Entorno

En PowerShell:
```powershell
$env:ESPOCRM_URL = "https://espocrm-dev-production.up.railway.app/api/v1"
$env:ESPOCRM_API_KEY = "TU_API_KEY_AQUI"
```

O crear archivo `.env.local` en la raíz del proyecto:
```
ESPOCRM_URL=https://espocrm-dev-production.up.railway.app/api/v1
ESPOCRM_API_KEY=tu-api-key-aqui
```

## Paso 3: Ejecutar Scripts

```powershell
# Ejecutar todo
node scripts/espocrm/setup-all.js

# O individualmente
node scripts/espocrm/create-fields.js
node scripts/espocrm/create-target-lists.js
node scripts/espocrm/create-email-templates.js
```

## Paso 4: Verificar Resultados

1. Login a EspoCRM DEV
2. Administration → Entity Manager → Lead → Fields
3. Verificar que aparecen los 29 campos nuevos

