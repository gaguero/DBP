# Instrucciones para hacer push del schema a Railway

## Opción 1: Desde Railway CLI o Dashboard

1. Obtén tu DATABASE_URL de Railway:
   - Ve a tu proyecto en Railway
   - Click en tu servicio de PostgreSQL
   - Copia la variable DATABASE_URL

2. Ejecuta localmente con la variable:
```bash
# Windows PowerShell
$env:DATABASE_URL="tu-url-de-railway"; npx prisma db push

# O crea un archivo .env.local temporalmente con:
# DATABASE_URL="tu-url-de-railway"
```

3. Luego ejecuta:
```bash
cd web
npx prisma generate
npx prisma db push
```

## Opción 2: Usar Railway CLI

Si tienes Railway CLI instalado:
```bash
railway link
railway run npx prisma db push
```

## Opción 3: Desde Railway Dashboard

Railway puede ejecutar comandos en el build/deploy:
- Agrega en tu `package.json` scripts de build:
  - `"postinstall": "prisma generate"`
  - En Railway, configura el comando de build para incluir `prisma db push`

## Nota importante:

El schema ya está corregido con la relación faltante entre User y Session.
Ahora puedes hacer push sin errores de validación.

