# 🔍 Investigación Profunda: Workflows en EspoCRM Sin Versión Pagada

## 📋 Resumen Ejecutivo

**Problema:** Necesitas workflows/automatización en EspoCRM pero no tienes la versión pagada (Advanced Pack).

**Solución:** Existen **4 alternativas viables** que podemos implementar usando lo que ya tienes configurado.

---

## 🎯 Opciones Disponibles

### **OPCIÓN 1: Scripts Node.js con Cron Jobs** ⭐ RECOMENDADA

**¿Qué es?**
- Scripts que se ejecutan periódicamente (cada hora, cada día, etc.)
- Consultan EspoCRM vía API para encontrar leads que necesitan acciones
- Ejecutan las acciones automáticamente (enviar emails, actualizar campos, etc.)

**Ventajas:**
- ✅ Totalmente gratis
- ✅ Control total sobre la lógica
- ✅ Ya tienes scripts funcionando con la API
- ✅ Puedes ejecutarlo en Railway (donde ya tienes EspoCRM)
- ✅ Fácil de debuggear y mantener

**Desventajas:**
- ⚠️ Requiere conocimientos básicos de Node.js
- ⚠️ Necesitas configurar un cron job o servicio que ejecute el script periódicamente

**Complejidad:** Media (2-3 horas de desarrollo)

---

### **OPCIÓN 2: n8n Workflows** ⭐ ALTA RECOMENDACIÓN

**¿Qué es?**
- Plataforma de automatización visual (gratuita, open source)
- Conecta diferentes servicios sin código
- Ya mencionas n8n en tu documentación para GA4

**Ventajas:**
- ✅ Gratuita (self-hosted)
- ✅ Interfaz visual (no necesitas escribir código)
- ✅ Puede ejecutarse en Railway junto con tu proyecto
- ✅ Ya tienes experiencia con n8n (GA4 integration)
- ✅ Puede manejar delays, condiciones complejas, etc.

**Desventajas:**
- ⚠️ Necesitas desplegar n8n (pero es fácil en Railway)
- ⚠️ Requiere aprender la interfaz de n8n (pero es intuitiva)

**Complejidad:** Baja-Media (1-2 horas de configuración)

---

### **OPCIÓN 3: Webhooks + API Endpoint Personalizado**

**¿Qué es?**
- Modificar tu endpoint `/api/lead` para ejecutar acciones inmediatamente después de crear el lead
- En lugar de solo crear el lead, también ejecuta la primera acción del workflow

**Ventajas:**
- ✅ Acciones inmediatas (no espera a cron job)
- ✅ Ya tienes el endpoint funcionando
- ✅ No requiere servicios adicionales

**Desventajas:**
- ⚠️ Solo funciona para acciones inmediatas (no puede manejar delays de días)
- ⚠️ Para delays necesitas combinarlo con Opción 1 o 2
- ⚠️ Puede hacer el endpoint más lento si hay muchas acciones

**Complejidad:** Baja (30 minutos - 1 hora)

---

### **OPCIÓN 4: Scripts PHP Personalizados en EspoCRM**

**¿Qué es?**
- Crear extensiones PHP directamente en EspoCRM
- Usar hooks/eventos de EspoCRM para ejecutar código cuando algo pasa

**Ventajas:**
- ✅ Integración nativa con EspoCRM
- ✅ Acceso directo a la base de datos
- ✅ Puede ser muy rápido

**Desventajas:**
- ⚠️ Requiere conocimientos de PHP
- ⚠️ Más difícil de mantener
- ⚠️ Necesitas acceso al servidor de EspoCRM
- ⚠️ Más riesgo de romper algo si hay errores

**Complejidad:** Alta (4-6 horas)

---

## 🏆 RECOMENDACIÓN: Combinación de Opciones 1 + 2 + 3

**Estrategia Híbrida (La Mejor Solución):**

1. **Opción 3 (Webhooks):** Para acciones inmediatas cuando se crea un lead
   - Asignar agente
   - Enviar Email 1 inmediatamente
   - Actualizar campos iniciales

2. **Opción 1 (Cron Jobs):** Para emails con delays (Email 2, 3, 4, 5, 6)
   - Script que se ejecuta cada hora
   - Busca leads con `dripCampaignNextEmailDate <= ahora`
   - Envía el email correspondiente
   - Actualiza campos y programa siguiente email

3. **Opción 2 (n8n):** Como alternativa más visual si prefieres no escribir código
   - Puede reemplazar completamente la Opción 1
   - Más fácil de modificar sin tocar código

---

## 📊 Comparación Detallada

| Característica | Scripts + Cron | n8n | Webhooks | PHP Extension |
|----------------|---------------|-----|----------|---------------|
| **Costo** | Gratis | Gratis | Gratis | Gratis |
| **Facilidad de Setup** | Media | Fácil | Muy Fácil | Difícil |
| **Mantenimiento** | Media | Fácil | Fácil | Difícil |
| **Delays (días)** | ✅ Sí | ✅ Sí | ❌ No | ✅ Sí |
| **Acciones Inmediatas** | ⚠️ Con delay | ✅ Sí | ✅ Sí | ✅ Sí |
| **Interfaz Visual** | ❌ No | ✅ Sí | ❌ No | ❌ No |
| **Requiere Código** | ✅ Sí | ❌ No | ✅ Sí | ✅ Sí |
| **Ya lo tienes** | ✅ Parcialmente | ✅ Parcialmente | ✅ Sí | ❌ No |

---

## 🚀 Plan de Implementación Recomendado

### **FASE 1: Acciones Inmediatas (30 minutos)**

Modificar `/api/lead/route.ts` para ejecutar acciones inmediatas:

```typescript
// Después de crear el lead exitosamente:
if (formSource === "News and Offers Form") {
  // 1. Asignar agente (round-robin o por idioma)
  // 2. Actualizar campos de drip campaign
  // 3. Enviar Email 1 inmediatamente
  // 4. Agregar a Target List
  // 5. Establecer dripCampaignNextEmailDate = ahora + 1 día
}
```

**Tiempo:** 30 minutos - 1 hora

---

### **FASE 2: Script de Cron para Emails con Delay (2-3 horas)**

Crear `scripts/espocrm/drip-campaign-processor.js`:

**Qué hace:**
1. Consulta EspoCRM API para encontrar leads con:
   - `dripCampaignNextEmailDate <= ahora`
   - `dripCampaignStatus` = "Active (Email X)"
   - `hasResponded` = false
   - `status` != "Converted"

2. Para cada lead encontrado:
   - Determina qué email enviar (basado en `dripCampaignEmailSequence`)
   - Envía el email usando EspoCRM API
   - Actualiza campos:
     - `dripCampaignLastEmailSent` = ahora
     - `dripCampaignEmailSequence` = siguiente número
     - `dripCampaignNextEmailDate` = ahora + delay correspondiente
     - `dripCampaignStatus` = siguiente estado

3. Si es el último email:
   - Cambiar `dripCampaignStatus` = "Completed"

**Ejecutar:** Cada hora usando cron job o Railway cron

**Tiempo:** 2-3 horas de desarrollo

---

### **FASE 3: Configurar Ejecución Automática (30 minutos)**

**Opción A: Railway Cron Job**
- Railway tiene soporte para cron jobs
- Configurar para ejecutar el script cada hora

**Opción B: Node.js Service**
- Crear un servicio que se ejecute continuamente
- Usa `setInterval` para ejecutar cada hora
- Desplegar en Railway como servicio separado

**Opción C: GitHub Actions**
- Si prefieres no usar Railway para esto
- GitHub Actions puede ejecutar scripts periódicamente
- Hace llamadas a la API de EspoCRM

**Tiempo:** 30 minutos

---

## 📝 Detalles Técnicos de Cada Opción

### **OPCIÓN 1: Scripts + Cron - Detalles Técnicos**

**Archivo:** `scripts/espocrm/drip-campaign-processor.js`

**Funcionalidad:**
- Consulta: `GET /api/v1/Lead?where[0][type]=equals&where[0][attribute]=cDripCampaignNextEmailDate&where[0][value]={{now}}&where[0][operator]=lessThanOrEqual`
- Filtra por status activo y hasResponded = false
- Para cada lead, determina el siguiente email
- Envía email usando: `POST /api/v1/Email`
- Actualiza lead usando: `PUT /api/v1/Lead/{id}`

**Ejecución:**
```bash
# Manualmente
node scripts/espocrm/drip-campaign-processor.js

# Con cron (cada hora)
0 * * * * cd /path/to/project && node scripts/espocrm/drip-campaign-processor.js
```

---

### **OPCIÓN 2: n8n - Detalles Técnicos**

**Setup:**
1. Desplegar n8n en Railway (o usar n8n cloud)
2. Configurar conexión a EspoCRM usando API Key
3. Crear workflow con:
   - Trigger: Cron (cada hora)
   - Query EspoCRM: Buscar leads con `dripCampaignNextEmailDate <= ahora`
   - Loop sobre resultados
   - Condiciones para determinar qué email enviar
   - Enviar email vía EspoCRM API
   - Actualizar lead

**Ventaja:** Interfaz visual, fácil de modificar

---

### **OPCIÓN 3: Webhooks - Detalles Técnicos**

**Modificar:** `apps/web/src/app/api/lead/route.ts`

**Agregar después de crear lead:**

```typescript
// Después de crear el lead exitosamente
if (formSource === "News and Offers Form") {
  // Ejecutar acciones inmediatas
  await executeImmediateWorkflow(leadId, formSource);
}

async function executeImmediateWorkflow(leadId: string, formSource: string) {
  // 1. Asignar agente
  // 2. Actualizar campos
  // 3. Enviar Email 1
  // 4. Agregar a Target List
}
```

---

## 🎯 Decisión: ¿Cuál Opción Elegir?

### **Recomendación Final:**

**Para empezar rápido:** Opción 3 (Webhooks) + Opción 1 (Cron Script)

**Razones:**
1. Ya tienes el endpoint funcionando
2. Ya tienes scripts con la API funcionando
3. Es la solución más rápida de implementar
4. Tienes control total
5. Es fácil de mantener y debuggear

**Si prefieres interfaz visual:** Opción 2 (n8n)

**Razones:**
1. No necesitas escribir código
2. Interfaz visual fácil de entender
3. Ya tienes experiencia con n8n
4. Fácil de modificar después

---

## 📚 Recursos y Documentación

### **EspoCRM API Documentation:**
- REST API: https://docs.espocrm.com/development/api/
- Email API: https://docs.espocrm.com/administration/email-sending/
- Query API: https://docs.espocrm.com/development/api-search-params/

### **n8n Documentation:**
- EspoCRM Integration: Puedes usar HTTP Request node
- Cron Trigger: https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.cron/

### **Railway Cron Jobs:**
- Railway Scheduled Tasks: https://docs.railway.app/guides/scheduled-tasks

---

## ✅ Próximos Pasos

1. **Decidir qué opción prefieres** (recomiendo Opción 1 + 3)
2. **Aprobar el plan de implementación**
3. **Implementar Fase 1** (acciones inmediatas)
4. **Implementar Fase 2** (script de cron)
5. **Configurar ejecución automática** (Fase 3)
6. **Testing completo**

---

## 💡 Notas Importantes

- **Los workflows BPM pagados de EspoCRM** son más fáciles de configurar, pero estas alternativas funcionan igual de bien
- **La ventaja de estas soluciones:** Tienes control total y puedes personalizar todo
- **La desventaja:** Requiere más trabajo inicial, pero después es fácil de mantener
- **Costo:** Todas las opciones son 100% gratuitas

---

**¿Listo para implementar?** Dime qué opción prefieres y empezamos a crear los scripts/implementación.

