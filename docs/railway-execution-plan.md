# Plan de Push y Ejecución en Railway

## 📋 RESUMEN DE LO QUE VAMOS A HACER

### Paso 1: Commit y Push a rama "Gerson"
Vamos a commitear todos los archivos nuevos y modificados:
- ✅ Scripts de automatización (create-fields.js, etc.)
- ✅ Documentación completa
- ✅ API endpoint de GA4
- ✅ Página de testing (/form_testing)
- ✅ Actualizaciones a API de leads

### Paso 2: Ejecutar Scripts en Railway
Una vez que Railway despliegue los cambios, ejecutaremos los scripts desde Railway CLI o Dashboard.

---

## 📦 ARCHIVOS QUE SE VAN A COMMITEAR

### Nuevos Archivos:
```
scripts/espocrm/
├── README.md
├── create-fields.js          # Crea 29 campos personalizados
├── create-target-lists.js    # Crea 10 Target Lists
├── create-email-templates.js # Crea estructura de 7 templates
└── setup-all.js             # Script todo-en-uno

apps/web/src/app/
├── api/ga4-event/route.ts   # Endpoint para eventos GA4
└── form_testing/page.tsx    # Página de testing

docs/
├── complete-implementation-guide.md
├── ga4-integration-scripts.md
├── implementation-plan-drip-campaigns.md
├── manual-configuration-instructions.md
├── automation-vs-manual.md
└── automation-summary.md
```

### Archivos Modificados:
```
apps/web/src/app/api/lead/route.ts  # Soporte para 2 formularios
memory/active_context.md             # Actualizado con nueva info
```

---

## 🚀 PROCESO PASO A PASO

### FASE 1: Commit y Push (Local)

```bash
# 1. Agregar todos los archivos nuevos
git add scripts/
git add docs/
git add apps/web/src/app/api/ga4-event/
git add apps/web/src/app/form_testing/
git add apps/web/src/app/api/lead/route.ts
git add memory/active_context.md

# 2. Crear commit
git commit -m "feat: Add drip campaign automation scripts and complete documentation

- Add scripts to automate EspoCRM field creation (29 fields)
- Add scripts to automate Target Lists creation (10 lists)
- Add scripts to automate Email Templates structure (7 templates)
- Add GA4 event API endpoint
- Add form testing page (/form_testing)
- Update lead API to support News and Offers and Get Personalized Assistance forms
- Add complete implementation guide with email drafts
- Add manual configuration instructions
- Update memory bank with new features"

# 3. Push a rama Gerson
git push origin gerson
```

### FASE 2: Ejecutar Scripts en Railway

**Opción A: Usando Railway CLI (Recomendado)**

```bash
# 1. Instalar Railway CLI (si no lo tienes)
npm i -g @railway/cli

# 2. Login a Railway
railway login

# 3. Link al proyecto (si no está linkeado)
railway link

# 4. Seleccionar el servicio correcto (el servicio web, no EspoCRM)
railway service

# 5. Ejecutar script todo-en-uno
railway run node scripts/espocrm/setup-all.js

# O ejecutar individualmente:
railway run node scripts/espocrm/create-fields.js
railway run node scripts/espocrm/create-target-lists.js
railway run node scripts/espocrm/create-email-templates.js
```

**Opción B: Desde Railway Dashboard**

1. Ir a Railway Dashboard
2. Seleccionar tu proyecto
3. Seleccionar el servicio "web" (Next.js app)
4. Ir a la pestaña "Deployments"
5. Click en el deployment más reciente
6. Ir a "Shell" o "Logs"
7. Ejecutar comandos manualmente:
   ```bash
   node scripts/espocrm/setup-all.js
   ```

**Opción C: Agregar como Script de Railway (Permanente)**

Podemos agregar un script en `package.json` que Railway ejecute automáticamente después del deploy.

---

## ⚠️ IMPORTANTE: VERIFICACIONES ANTES DE EJECUTAR

### 1. Verificar Variables de Entorno en Railway
Asegúrate de que estas variables estén configuradas en Railway:
- ✅ `ESPOCRM_URL` - URL completa de tu EspoCRM (ej: `https://crm.yourdomain.com/api/v1`)
- ✅ `ESPOCRM_API_KEY` - API key de EspoCRM

### 2. Verificar que EspoCRM está Accesible
Los scripts necesitan conectarse a EspoCRM, así que:
- ✅ EspoCRM debe estar desplegado y funcionando
- ✅ La URL debe ser accesible desde Railway
- ✅ El API key debe tener permisos de administrador

### 3. Verificar Node.js en Railway
Railway usa Node.js, así que los scripts deberían funcionar directamente.

---

## 📝 QUÉ ESPERAR AL EJECUTAR LOS SCRIPTS

### Output Esperado:

```
🎯 Configuración Automatizada de EspoCRM
   Dolphin Blue Paradise - Drip Campaigns Setup

✅ Variables de entorno configuradas
   ESPOCRM_URL: https://crm.yourdomain.com/api/v1

============================================================
🚀 Ejecutando: Crear Campos Personalizados
   Crea todos los campos personalizados en Lead entity
============================================================
🚀 Iniciando creación de campos personalizados...
📡 Conectando a: https://crm.yourdomain.com/api/v1

✅ Campo "dripCampaignStatus" creado exitosamente
✅ Campo "dripCampaignType" creado exitosamente
...
✅ Cache reconstruido

📊 Resumen:
✅ Creados: 29
⏭️  Ya existían: 0
❌ Errores: 0

[Similar para Target Lists y Email Templates]

============================================================
📊 Resumen Final
============================================================
✅ Scripts exitosos: 3
❌ Scripts con errores: 0

✅ ¡Configuración automatizada completada!
```

---

## 🔍 SI ALGO FALLA

### Error: "ESPOCRM_URL not configured"
- Verificar que la variable está en Railway Dashboard
- Verificar que el nombre es exactamente `ESPOCRM_URL` (case-sensitive)

### Error: "401 Unauthorized"
- Verificar que `ESPOCRM_API_KEY` es correcta
- Verificar que el API key tiene permisos de administrador

### Error: "Cannot connect to EspoCRM"
- Verificar que EspoCRM está desplegado y funcionando
- Verificar que la URL es correcta (debe incluir `/api/v1`)
- Verificar conectividad de red desde Railway

### Error: "Field already exists"
- Esto es normal si ejecutas el script múltiples veces
- Los scripts son idempotentes (pueden ejecutarse varias veces)

---

## ✅ DESPUÉS DE EJECUTAR LOS SCRIPTS

Una vez que los scripts se ejecuten exitosamente:

1. ✅ **Verificar en EspoCRM:**
   - Ir a `Administración > Entity Manager > Lead > Fields`
   - Verificar que los 29 campos aparecen
   - Ir a `Marketing > Target Lists`
   - Verificar que las 10 listas aparecen
   - Ir a `Administración > Email Templates`
   - Verificar que los 7 templates aparecen

2. ⚠️ **Configuración Manual Requerida:**
   - Configurar Layouts (arrastrar campos a secciones)
   - Editar contenido de Email Templates
   - Crear Workflows BPM
   - Configurar SMTP

---

## 🎯 PLAN DE ACCIÓN

**¿Estás listo para proceder?**

1. ✅ Revisar este plan
2. ✅ Aprobar el commit message
3. ✅ Ejecutar git commands
4. ✅ Push a rama Gerson
5. ✅ Esperar deploy en Railway
6. ✅ Ejecutar scripts en Railway
7. ✅ Verificar resultados

**¿Procedo con el commit y push?**

