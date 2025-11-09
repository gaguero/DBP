# Plan de Ejecución - Push y Scripts en Railway

## 📋 RESUMEN EJECUTIVO

Vamos a hacer push de todos los cambios a la rama `gerson` y luego ejecutar los scripts de automatización en Railway para configurar EspoCRM.

---

## ✅ LO QUE VAMOS A COMMITEAR

### Archivos Nuevos (19 archivos):
- ✅ **Scripts de automatización** (4 scripts)
- ✅ **Documentación completa** (9 documentos)
- ✅ **API endpoint GA4** (1 archivo)
- ✅ **Página de testing** (1 archivo)
- ✅ **Actualizaciones** (package.json, memory)

### Archivos Modificados:
- ✅ `apps/web/src/app/api/lead/route.ts` - Soporte para 2 formularios
- ✅ `memory/active_context.md` - Actualizado con nuevas features
- ✅ `apps/web/package.json` - Scripts para ejecutar desde Railway

---

## 🚀 PROCESO COMPLETO

### FASE 1: Commit y Push (Ahora)

**Commit Message propuesto:**
```
feat: Add drip campaign automation scripts and complete documentation

- Add scripts to automate EspoCRM configuration (fields, target lists, templates)
- Add GA4 event API endpoint for behavioral tracking
- Add form testing page (/form_testing) for News and Offers and Get Personalized Assistance
- Update lead API to support dual form types
- Add complete implementation guide with 7 email templates (EN/ES)
- Add manual configuration instructions
- Add GA4 integration scripts and n8n workflow JSON
- Update memory bank with new features (lead scoring, GA4, mobile app)
```

**Comandos que ejecutaré:**
```bash
git commit -m "feat: Add drip campaign automation scripts and complete documentation

- Add scripts to automate EspoCRM configuration (fields, target lists, templates)
- Add GA4 event API endpoint for behavioral tracking
- Add form testing page (/form_testing) for News and Offers and Get Personalized Assistance
- Update lead API to support dual form types
- Add complete implementation guide with 7 email templates (EN/ES)
- Add manual configuration instructions
- Add GA4 integration scripts and n8n workflow JSON
- Update memory bank with new features (lead scoring, GA4, mobile app)"

git push origin gerson
```

### FASE 2: Esperar Deploy en Railway

- Railway detectará el push automáticamente
- Hará build y deploy del servicio "web"
- Tiempo estimado: 2-5 minutos

### FASE 3: Ejecutar Scripts en Railway

**Opción A: Railway CLI (Recomendado)**

```bash
# 1. Instalar Railway CLI (si no lo tienes)
npm i -g @railway/cli

# 2. Login y link
railway login
railway link
railway service  # Seleccionar servicio "web"

# 3. Ejecutar script todo-en-uno
railway run pnpm -F web espocrm:setup
```

**Opción B: Desde Railway Dashboard**

1. Ir a Railway Dashboard → Tu Proyecto → Servicio "web"
2. Pestaña "Deployments" → Último deployment
3. Click "Shell" o "View Logs"
4. Ejecutar:
   ```bash
   pnpm -F web espocrm:setup
   ```

---

## ⚠️ VERIFICACIONES ANTES DE EJECUTAR

### 1. Variables de Entorno en Railway
Verificar en Railway Dashboard (servicio "web") que existan:
- ✅ `ESPOCRM_URL` - Ejemplo: `https://crm.yourdomain.com/api/v1`
- ✅ `ESPOCRM_API_KEY` - Tu API key de EspoCRM

### 2. EspoCRM Accesible
- ✅ EspoCRM debe estar desplegado y funcionando
- ✅ La URL debe ser accesible desde Railway
- ✅ El API key debe tener permisos de administrador

---

## 📊 QUÉ ESPERAR AL EJECUTAR

### Output Esperado:

```
🎯 Configuración Automatizada de EspoCRM
   Dolphin Blue Paradise - Drip Campaigns Setup

✅ Variables de entorno configuradas
   ESPOCRM_URL: https://crm.yourdomain.com/api/v1

============================================================
🚀 Ejecutando: Crear Campos Personalizados
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

## ✅ DESPUÉS DE EJECUTAR

1. **Verificar en EspoCRM:**
   - Campos: `Administración > Entity Manager > Lead > Fields` (29 campos)
   - Target Lists: `Marketing > Target Lists` (10 listas)
   - Email Templates: `Administración > Email Templates` (7 templates)

2. **Siguiente paso manual:**
   - Configurar Layouts
   - Editar contenido de Email Templates
   - Crear Workflows BPM
   - Configurar SMTP

---

## 🎯 ¿PROCEDER CON EL COMMIT Y PUSH?

**Si apruebas, ejecutaré:**
1. ✅ `git commit` con el mensaje propuesto
2. ✅ `git push origin gerson`
3. ✅ Te daré instrucciones para ejecutar scripts en Railway

**¿Aprobas el commit message y procedo con el push?**

