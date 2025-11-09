# Instrucciones para Ejecutar Scripts en Railway
## Después del Push a rama Gerson

## ✅ PUSH COMPLETADO

El código ha sido pusheado a la rama `gerson`. Railway debería detectar los cambios y hacer deploy automáticamente.

---

## 🚀 EJECUTAR SCRIPTS EN RAILWAY

### MÉTODO 1: Railway CLI (Recomendado - Más Fácil)

#### Paso 1: Instalar Railway CLI (si no lo tienes)
```bash
npm i -g @railway/cli
```

#### Paso 2: Login y Link
```bash
# Login a Railway
railway login

# Link al proyecto (selecciona tu proyecto cuando te pregunte)
railway link

# Selecciona el servicio "web" (Next.js app, NO EspoCRM)
railway service
# Cuando te pregunte, selecciona el servicio "web"
```

#### Paso 3: Ejecutar Script Todo-en-Uno
```bash
railway run pnpm -F web espocrm:setup
```

Este comando ejecutará los 3 scripts en orden:
1. ✅ Crear 29 campos personalizados
2. ✅ Crear 10 Target Lists  
3. ✅ Crear estructura de 7 Email Templates

**Tiempo estimado:** 2-5 minutos

---

### MÉTODO 2: Railway Dashboard (Alternativa)

Si prefieres usar el Dashboard:

1. **Ir a Railway Dashboard:**
   - https://railway.app
   - Login con tu cuenta

2. **Seleccionar Proyecto:**
   - Click en tu proyecto de Dolphin Blue Paradise

3. **Seleccionar Servicio:**
   - Click en el servicio **"web"** (Next.js app)
   - ⚠️ NO selecciones el servicio "espocrm"

4. **Abrir Shell:**
   - Ir a la pestaña **"Deployments"**
   - Click en el deployment más reciente (debería ser el que acabas de pushear)
   - Click en **"Shell"** o busca el botón de terminal

5. **Ejecutar Comando:**
   ```bash
   pnpm -F web espocrm:setup
   ```

---

## 📊 QUÉ ESPERAR

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
✅ Campo "dripCampaignStartDate" creado exitosamente
...
✅ Cache reconstruido

📊 Resumen:
✅ Creados: 29
⏭️  Ya existían: 0
❌ Errores: 0

============================================================
🚀 Ejecutando: Crear Target Lists
   Crea todas las Target Lists necesarias
============================================================
✅ Target List "Drip Campaign - News and Offers Active" creada exitosamente
...

📊 Resumen:
✅ Creadas: 10
⏭️  Ya existían: 0
❌ Errores: 0

============================================================
🚀 Ejecutando: Crear Email Templates
   Crea la estructura de los email templates
============================================================
✅ Template "Drip Email 1 - News and Offers..." creado exitosamente
...

📊 Resumen Final
============================================================
✅ Scripts exitosos: 3
❌ Scripts con errores: 0

✅ ¡Configuración automatizada completada!
```

---

## ✅ VERIFICAR RESULTADOS

Después de ejecutar los scripts, verifica en EspoCRM:

### 1. Campos Personalizados
1. Login a EspoCRM como administrador
2. Ir a `Administración > Entity Manager`
3. Click en `Lead`
4. Click en pestaña `Fields`
5. **Deberías ver 29 campos nuevos:**
   - dripCampaignStatus
   - dripCampaignType
   - leadScore
   - leadScoreCategory
   - websiteVisits
   - etc.

### 2. Target Lists
1. Ir a `Marketing > Target Lists`
2. **Deberías ver 10 listas nuevas:**
   - Drip Campaign - News and Offers Active
   - Drip Campaign - Get Personalized Assistance Active
   - Drip Campaign - Email 1
   - etc.

### 3. Email Templates
1. Ir a `Administración > Email Templates`
2. **Deberías ver 7 templates nuevos:**
   - Drip Email 1 - News and Offers - Welcome & Promotions
   - Drip Email 2 - Paradise Between Jungle & Sea
   - etc.

---

## 🐛 SI ALGO FALLA

### Error: "ESPOCRM_URL not found"
**Solución:**
1. Ir a Railway Dashboard → Servicio "web" → Variables
2. Verificar que existe `ESPOCRM_URL`
3. Verificar que el valor es correcto (debe incluir `/api/v1`)
4. Si no existe, agregarla y volver a ejecutar

### Error: "401 Unauthorized"
**Solución:**
1. Verificar que `ESPOCRM_API_KEY` existe en Railway
2. Verificar que el API key es correcto
3. Verificar que el API key tiene permisos de administrador en EspoCRM
4. Regenerar API key si es necesario

### Error: "Cannot connect to EspoCRM"
**Solución:**
1. Verificar que EspoCRM está desplegado y funcionando
2. Verificar que la URL es accesible (probar en navegador)
3. Verificar que la URL incluye `/api/v1` al final
4. Verificar conectividad de red desde Railway

### Error: "Field already exists"
**Esto es normal:** Los scripts son idempotentes. Si un campo ya existe, simplemente lo saltará y continuará.

---

## 📋 PRÓXIMOS PASOS DESPUÉS DE EJECUTAR

Una vez que los scripts se ejecuten exitosamente:

1. ⚠️ **Configurar Layouts** (15 min)
   - Ir a `Administración > Entity Manager > Lead > Layouts`
   - Arrastrar campos a secciones apropiadas
   - Ver instrucciones en `docs/manual-configuration-instructions.md` Paso 1.8

2. ⚠️ **Editar Email Templates** (1 hora)
   - Ir a `Administración > Email Templates`
   - Editar cada template
   - Copiar contenido HTML desde `docs/complete-implementation-guide.md`
   - Ver instrucciones en `docs/manual-configuration-instructions.md` Sección 4

3. ⚠️ **Crear Workflows BPM** (2-3 horas)
   - Ir a `Administración > Workflows`
   - Crear los 9+ workflows necesarios
   - Ver instrucciones en `docs/manual-configuration-instructions.md` Sección 5

4. ⚠️ **Configurar SMTP** (30 min)
   - Ir a `Administración > Settings > Outbound Emails`
   - Configurar SMTP
   - Ver instrucciones en `docs/manual-configuration-instructions.md` Sección 3

---

## 🎯 COMANDOS RÁPIDOS

### Ejecutar Todo-en-Uno:
```bash
railway run pnpm -F web espocrm:setup
```

### Ejecutar Individualmente:
```bash
# Solo campos
railway run pnpm -F web espocrm:fields

# Solo Target Lists
railway run pnpm -F web espocrm:target-lists

# Solo Templates
railway run pnpm -F web espocrm:templates
```

---

## ✅ CHECKLIST

- [ ] Push completado a rama gerson
- [ ] Railway detectó cambios y está haciendo deploy
- [ ] Variables de entorno verificadas en Railway (`ESPOCRM_URL`, `ESPOCRM_API_KEY`)
- [ ] EspoCRM está accesible y funcionando
- [ ] Scripts ejecutados en Railway
- [ ] Verificado que campos se crearon en EspoCRM
- [ ] Verificado que Target Lists se crearon
- [ ] Verificado que Email Templates se crearon
- [ ] Listo para configuración manual (layouts, workflows, SMTP)

---

**¡Listo para ejecutar!** 🚀

Ejecuta el comando cuando Railway termine el deploy:
```bash
railway run pnpm -F web espocrm:setup
```

