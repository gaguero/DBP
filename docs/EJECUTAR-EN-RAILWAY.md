# ✅ PUSH COMPLETADO - Instrucciones para Ejecutar Scripts en Railway

## 🎉 Estado Actual

✅ **Commit completado:** `f46037a0`  
✅ **Push completado:** Código en rama `gerson`  
✅ **Railway:** Debería estar detectando cambios y haciendo deploy

---

## 🚀 EJECUTAR SCRIPTS EN RAILWAY

### Opción Recomendada: Railway CLI

#### Paso 1: Instalar Railway CLI
```bash
npm i -g @railway/cli
```

#### Paso 2: Login y Configurar
```bash
# Login
railway login

# Link al proyecto (selecciona tu proyecto)
railway link

# Seleccionar servicio "web" (NO EspoCRM)
railway service
# Cuando te pregunte, selecciona el servicio "web"
```

#### Paso 3: Ejecutar Scripts
```bash
railway run pnpm -F web espocrm:setup
```

Este comando ejecutará automáticamente:
1. ✅ Crear 29 campos personalizados en EspoCRM
2. ✅ Crear 10 Target Lists
3. ✅ Crear estructura de 7 Email Templates

**Tiempo estimado:** 2-5 minutos

---

### Opción Alternativa: Railway Dashboard

1. Ir a https://railway.app
2. Seleccionar tu proyecto
3. Click en servicio **"web"** (Next.js)
4. Pestaña **"Deployments"** → Último deployment
5. Click **"Shell"**
6. Ejecutar:
   ```bash
   pnpm -F web espocrm:setup
   ```

---

## ⚠️ VERIFICACIONES ANTES DE EJECUTAR

### Variables de Entorno en Railway

Verifica en Railway Dashboard → Servicio "web" → Variables:

- ✅ `ESPOCRM_URL` - Debe ser: `https://tu-crm.railway.app/api/v1` (o tu dominio)
- ✅ `ESPOCRM_API_KEY` - Tu API key de EspoCRM

**Cómo verificar:**
1. Railway Dashboard → Tu Proyecto → Servicio "web"
2. Pestaña "Variables"
3. Buscar `ESPOCRM_URL` y `ESPOCRM_API_KEY`

---

## 📊 QUÉ ESPERAR

Al ejecutar `railway run pnpm -F web espocrm:setup`, verás:

```
🎯 Configuración Automatizada de EspoCRM
   Dolphin Blue Paradise - Drip Campaigns Setup

✅ Variables de entorno configuradas
   ESPOCRM_URL: https://...

============================================================
🚀 Ejecutando: Crear Campos Personalizados
============================================================
✅ Campo "dripCampaignStatus" creado exitosamente
✅ Campo "dripCampaignType" creado exitosamente
...
📊 Resumen: ✅ Creados: 29

============================================================
🚀 Ejecutando: Crear Target Lists
============================================================
✅ Target List "Drip Campaign - News and Offers Active" creada
...
📊 Resumen: ✅ Creadas: 10

============================================================
🚀 Ejecutando: Crear Email Templates
============================================================
✅ Template "Drip Email 1..." creado exitosamente
...
📊 Resumen: ✅ Creados: 7

✅ ¡Configuración automatizada completada!
```

---

## ✅ VERIFICAR EN ESPOCRM

Después de ejecutar, verifica en EspoCRM:

1. **Campos:** `Administración > Entity Manager > Lead > Fields` (29 campos nuevos)
2. **Target Lists:** `Marketing > Target Lists` (10 listas nuevas)
3. **Email Templates:** `Administración > Email Templates` (7 templates nuevos)

---

## 🐛 TROUBLESHOOTING

### Error: "ESPOCRM_URL not found"
→ Verificar variables de entorno en Railway Dashboard

### Error: "401 Unauthorized"
→ Verificar que `ESPOCRM_API_KEY` es correcta y tiene permisos admin

### Error: "Cannot connect"
→ Verificar que EspoCRM está desplegado y accesible

---

## 📋 PRÓXIMOS PASOS

Después de ejecutar los scripts:

1. ⚠️ Configurar Layouts (15 min) - Arrastrar campos a secciones
2. ⚠️ Editar Email Templates (1 hora) - Copiar contenido HTML
3. ⚠️ Crear Workflows BPM (2-3 horas)
4. ⚠️ Configurar SMTP (30 min)

Ver instrucciones detalladas en: `docs/manual-configuration-instructions.md`

---

## 🎯 COMANDO PARA EJECUTAR

```bash
railway run pnpm -F web espocrm:setup
```

**¡Ejecuta este comando cuando Railway termine el deploy!** 🚀

