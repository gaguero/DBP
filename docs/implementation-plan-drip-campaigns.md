# Plan Completo de Implementación - Drip Campaigns en EspoCRM
## Dolphin Blue Paradise

## Resumen Ejecutivo

Este documento detalla el plan completo para implementar un sistema de drip campaigns en EspoCRM que maneje dos formularios:
1. **News and Offers Form** - Inicia campaña automáticamente
2. **Get Personalized Assistance Form** - Requiere email manual personalizado antes de iniciar campaña

---

## PARTE 1: ANÁLISIS DE FEATURES - ESPOCRM VS HUBSPOT

### Features Ya Planificadas en EspoCRM ✅

#### Lead Management
- ✅ Lead capture desde formularios web
- ✅ Pipeline de ventas personalizable
- ✅ Contact management y history
- ✅ Duplicate prevention
- ✅ Auto-assignment por idioma/interés

#### Email & Campaigns
- ✅ Email templates con placeholders
- ✅ Campaign entity nativa
- ✅ Target Lists para segmentación
- ✅ BPM Workflows para automatización
- ✅ Email tracking (opens, clicks)

#### Integraciones
- ✅ REST API (ya implementado)
- ✅ Chatwoot integration (planificado)
- ✅ Google Analytics sync (planificado)
- ✅ Google Calendar sync (planificado)

#### Reporting
- ✅ Custom dashboards
- ✅ Report exports (PDF/CSV)
- ✅ Analytics básicos

### Features que Necesitamos Implementar ⚠️

#### Drip Campaigns (CRÍTICO)
- ⚠️ **BPM Workflows con delays** - Disponible pero requiere configuración
- ⚠️ **Conditional enrollment** - Requiere lógica custom
- ⚠️ **Pause/Resume logic** - Requiere workflows adicionales
- ✅ **Email Templates** - Disponible
- ✅ **Target Lists** - Disponible

**Solución:** Usar BPM Workflows + campos personalizados + Target Lists

#### Email Personalization
- ✅ **Placeholders básicos** - Disponible ({{lead.name}}, {{lead.email}})
- ⚠️ **Placeholders avanzados** - Limitados comparado con HubSpot
- ❌ **Smart content** - No disponible

**Solución:** Crear campos personalizados para datos que queremos personalizar

#### Lead Scoring
- ⚠️ **Lead scoring básico** - Disponible como extensión o custom
- ⚠️ **Behavioral tracking** - Requiere integración con GA4

**Solución:** Implementar scoring básico con campos + n8n para behavioral

### Features Adicionales a Considerar 🔍

1. **n8n Integration** - Ya planificado, expandir uso
2. **Advanced Email Analytics** - Usar EspoCRM + GA4
3. **Mobile App** - Evaluar para concierge team
4. **AI Integration** - Futuro si hay budget (n8n + OpenAI)

### Conclusión de Features

**EspoCRM tiene ~80% de las features que necesitamos.** Las que faltan pueden ser:
- Implementadas con configuración adicional
- Compensadas con integraciones (n8n, GA4)
- Postergadas hasta que realmente las necesitemos

**Para drip campaigns:** EspoCRM puede hacerlo completamente con BPM Workflows.

---

## PARTE 2: PLAN DE IMPLEMENTACIÓN COMPLETO

### FASE 1: Configuración Base del CRM (Semana 1)

#### 1.1 Campos Personalizados en Lead

**Campos de Campaña Drip:**
```
✅ dripCampaignStatus (Enum)
   - Not Enrolled
   - Active (Email 1-6)
   - Paused
   - Completed
   - Opted Out

✅ dripCampaignType (Enum)
   - News and Offers
   - Get Personalized Assistance
   - None

✅ dripCampaignStartDate (DateTime)
✅ dripCampaignLastEmailSent (DateTime)
✅ dripCampaignNextEmailDate (DateTime)
✅ dripCampaignEmailSequence (Int)
```

**Campos de Asignación:**
```
✅ assignedAgent (Link - User)
✅ assignedAgentEmail (Varchar)
✅ assignedAgentName (Varchar)
```

**Campos de Tracking:**
```
✅ hasResponded (Bool)
✅ lastEmailResponseDate (DateTime)
✅ lastSMSResponseDate (DateTime)
✅ lastCallDate (DateTime)
✅ emailResponseCount (Int)
```

**Campos de Formulario:**
```
✅ formSource (Enum)
   - News and Offers Form
   - Get Personalized Assistance Form
   - Newsletter Popup
   - Chatwoot
   - Manual Entry
   - OTA
   - Referral

✅ formSubmissionDate (DateTime)
✅ formDataJSON (Text - JSON)
```

**Campos de Promoción:**
```
✅ currentPromotionCode (Varchar)
✅ currentPromotionDiscount (Int)
✅ currentPromotionValidUntil (Date)
```

**Campos de Consentimiento:**
```
✅ consentEmailMarketing (Bool)
✅ consentWhatsApp (Bool)
✅ consentSMS (Bool)
✅ optOutDate (DateTime)
```

#### 1.2 Target Lists

Crear las siguientes Target Lists:
- "Drip Campaign - News and Offers Active"
- "Drip Campaign - Get Personalized Assistance Active"
- "Drip Campaign - Email 1"
- "Drip Campaign - Email 2"
- "Drip Campaign - Email 3"
- "Drip Campaign - Email 4"
- "Drip Campaign - Email 5"
- "Drip Campaign - Email 6"
- "Drip Campaign - Paused"
- "Drip Campaign - Opted Out"

#### 1.3 Configuración SMTP

- Configurar SMTP en EspoCRM
- Configurar múltiples cuentas de email (una por agente)
- O configurar "Send As" para permitir envío desde email del agente
- Habilitar tracking de aperturas y clics

#### 1.4 Roles y Permisos

- **Concierge:** Ver/editar leads asignados, cambiar pipeline stages
- **Marketing:** Ver todos los leads, crear campañas, exportar reportes
- **Admin:** Acceso completo
- **Contractor:** Solo lectura de datos específicos

---

### FASE 2: Email Templates (Semana 2)

#### 2.1 Template: Email 1 - News and Offers

**Nombre:** `Drip Email 1 - News and Offers - Welcome & Promotions`

**Subject:** `{{lead.name}}, Welcome to Dolphin Blue Paradise - Your Eco-Luxury Escape Awaits`

**From:** `{{lead.assignedAgentEmail}}`

**Contenido:**
- Saludo personalizado
- Introducción del agente
- Promoción actual (si aplica)
- Tabla de precios de las 4 cabanas
- What's included
- CTA: Contact Me
- Firma con contacto del agente

#### 2.2 Templates: Emails 2-6

**Email 2:** Paradise Between Jungle & Sea
**Email 3:** Eco-Luxury Experience
**Email 4:** Let Me Handle Details
**Email 5:** Farm-to-Table Dining
**Email 6:** Adventures Await

Todos con:
- From: {{lead.assignedAgentEmail}}
- Personalización: {{lead.name}}, {{lead.assignedAgentName}}
- Voz del agente: "I, me, my"

#### 2.3 Template: Email 1 - Get Personalized Assistance (Manual)

**Nombre:** `Email 1 - Get Personalized Assistance - Manual Template`

**Uso:** Para agentes, NO se envía automáticamente

**Contenido:**
- Mismo base que News and Offers Email 1
- Sección adicional para personalización:
  - Fechas específicas del cliente
  - Respuesta a preguntas del formulario
  - Información sobre disponibilidad

---

### FASE 3: Workflows BPM (Semana 3-4)

#### 3.1 Workflow: News and Offers → Start Campaign

**Trigger:** Lead creado con `formSource = "News and Offers Form"`

**Acciones:**
1. Asignar agente (por idioma o round-robin)
2. Actualizar campos de campaña
3. Enviar Email 1 inmediatamente
4. Agregar a Target List
5. Programar Email 2 (delay 3 días)

#### 3.2 Workflow: Get Personalized Assistance → Wait for Manual

**Trigger:** Lead creado con `formSource = "Get Personalized Assistance Form"`

**Acciones:**
1. Asignar agente
2. Actualizar campos (status = "Waiting for Manual Email 1")
3. Crear tarea para agente (alta prioridad, 2 horas)
4. NO enviar email automático

#### 3.3 Workflow: Manual Enrollment → Start from Email 2

**Trigger:** Botón manual o cuando agente envía Email 1

**Acciones:**
1. Actualizar status a "Active (Email 2)"
2. Programar Email 2 (delay 3 días)
3. Agregar a Target List

#### 3.4-3.8 Workflows: Send Emails 2-6

**Trigger:** Cuando llega fecha programada

**Condiciones:**
- hasResponded = false
- status != "Booked"
- status != "Opted Out"

**Acciones:**
- Enviar email correspondiente
- Actualizar campos
- Programar siguiente email

**Delays:**
- Email 2: 3 días después de Email 1
- Email 3: 4 días después de Email 2 (total 7 días)
- Email 4: 3 días después de Email 3 (total 10 días)
- Email 5: 4 días después de Email 4 (total 14 días)
- Email 6: 4 días después de Email 5 (total 18 días)

#### 3.9 Workflow: Stop Campaign on Response

**Trigger:** Cuando lead responde

**Condiciones:**
- hasResponded = true
- O lastEmailResponseDate se actualiza
- O lastSMSResponseDate se actualiza
- O lastCallDate se actualiza
- O status = "Booked"

**Acciones:**
- Actualizar status = "Paused"
- Remover de Target Lists activas
- Crear nota

#### 3.10 Workflow: Stop Campaign on Opt-Out

**Trigger:** Cuando lead hace opt-out

**Acciones:**
- Actualizar status = "Opted Out"
- Remover de todas las Target Lists
- Actualizar optOutDate

---

### FASE 4: Integración Frontend (Semana 5)

#### 4.1 API Endpoints

**Endpoint existente:** `/api/lead` (ya implementado)

**Modificar para soportar:**
- `formSource` field
- Diferentes payloads según tipo de formulario

#### 4.2 Formulario: News and Offers

**Campos:**
- Name (required)
- Email (required)
- Phone (optional)
- Preferred Language (EN/ES)
- Interests (checkboxes: rooms, dining, activities, volunteering)
- Consent Email Marketing (checkbox)

**Payload a EspoCRM:**
```json
{
  "formSource": "News and Offers Form",
  "consentEmailMarketing": true,
  "preferredLanguage": "EN",
  "interestsWeb": ["rooms", "activities"]
}
```

#### 4.3 Formulario: Get Personalized Assistance

**Campos:**
- Name (required)
- Email (required)
- Phone (optional)
- Preferred Language (EN/ES)
- Arrival Date (date picker)
- Departure Date (date picker)
- Party Size (number)
- Interests (checkboxes)
- Message (textarea - required)
- Consent Email Marketing (checkbox)

**Payload a EspoCRM:**
```json
{
  "formSource": "Get Personalized Assistance Form",
  "arrivalDate": "2025-12-15",
  "departureDate": "2025-12-20",
  "partySize": 2,
  "description": "Mensaje del cliente",
  "consentEmailMarketing": true
}
```

#### 4.4 Página de Testing: `/form_testing`

**Propósito:** Probar ambos formularios antes de implementarlos en el sitio

**Contenido:**
- Dos formularios side-by-side o en tabs
- Indicadores visuales de qué formulario es cuál
- Mensajes de éxito/error
- Link a EspoCRM para verificar lead creado
- Instrucciones de testing

---

### FASE 5: UI y Acciones en EspoCRM (Semana 6)

#### 5.1 Botones Personalizados

**Botón 1:** "Start Drip Campaign from Email 2"
- Visible cuando: `dripCampaignType = "Get Personalized Assistance"` y `status = "Waiting for Manual Email 1"`
- Acción: Enrolla en workflow desde Email 2

**Botón 2:** "Pause Drip Campaign"
- Acción: Pausa campaña activa

**Botón 3:** "Resume Drip Campaign"
- Acción: Continúa desde donde se pausó

**Botón 4:** "Mark as Responded"
- Acción: Marca como respondido y pausa automáticamente

#### 5.2 Vistas y Filtros

**Vista: "Drip Campaigns Active"**
- Filtro: `dripCampaignStatus` contiene "Active"
- Columnas: Name, Email, Campaign Type, Email Sequence, Next Email Date, Assigned Agent

**Vista: "Waiting for Manual Email 1"**
- Filtro: `dripCampaignStatus = "Waiting for Manual Email 1"`
- Columnas: Name, Email, Form Submission Date, Assigned Agent, Task Status

**Vista: "Drip Campaigns Paused"**
- Filtro: `dripCampaignStatus = "Paused"`
- Columnas: Name, Email, Last Response Date, Reason

#### 5.3 Dashboards

**Dashboard: Drip Campaign Overview**
- Widget 1: Leads activos por tipo (News and Offers vs Get Personalized Assistance)
- Widget 2: Próximos emails a enviar (próximas 24h)
- Widget 3: Leads que respondieron hoy
- Widget 4: Campañas pausadas
- Widget 5: Tasa de conversión
- Widget 6: Leads esperando Email 1 manual

---

### FASE 6: Testing y QA (Semana 7)

#### 6.1 Testing de Formularios

**News and Offers:**
- [ ] Enviar formulario desde `/form_testing`
- [ ] Verificar lead creado en EspoCRM
- [ ] Verificar Email 1 enviado automáticamente
- [ ] Verificar campos actualizados correctamente
- [ ] Verificar agente asignado
- [ ] Verificar Target List actualizada

**Get Personalized Assistance:**
- [ ] Enviar formulario desde `/form_testing`
- [ ] Verificar lead creado en EspoCRM
- [ ] Verificar NO se envía Email 1 automático
- [ ] Verificar tarea creada para agente
- [ ] Simular agente enviando Email 1 manual
- [ ] Verificar botón "Start Drip Campaign from Email 2" aparece
- [ ] Click botón y verificar workflow inicia desde Email 2

#### 6.2 Testing de Workflows

- [ ] Probar workflow Email 2 se envía después de 3 días
- [ ] Probar workflow Email 3 se envía después de 7 días total
- [ ] Probar pausa cuando lead responde
- [ ] Probar opt-out funciona
- [ ] Probar resume después de pausa
- [ ] Probar que workflows se detienen si status = "Booked"

#### 6.3 Testing de Personalización

- [ ] Verificar placeholders funcionan en emails
- [ ] Verificar emails se envían desde email del agente
- [ ] Verificar personalización por idioma (EN/ES)

---

### FASE 7: Training y Lanzamiento (Semana 8)

#### 7.1 Training para Agentes

**Contenido:**
- Cómo funciona el sistema de drip campaigns
- Diferencia entre News and Offers y Get Personalized Assistance
- Cómo enviar Email 1 manual para Get Personalized Assistance
- Cómo usar botón "Start Drip Campaign from Email 2"
- Cómo pausar/resume campañas
- Cómo marcar leads como respondidos

**Materiales:**
- Guía escrita paso a paso
- Video tutorial
- Sesión de práctica con datos de prueba

#### 7.2 Documentación

- Runbook de operaciones
- Troubleshooting guide
- FAQ para agentes
- Guía de templates de email

#### 7.3 Lanzamiento

- [ ] Deploy formularios en producción
- [ ] Activar workflows en EspoCRM
- [ ] Monitorear primeras 48 horas
- [ ] Ajustar según feedback

---

## PARTE 3: IMPLEMENTACIÓN TÉCNICA DETALLADA

### 3.1 Estructura de Campos en EspoCRM

**Lead Entity - Campos Personalizados:**

```php
// Campos de Campaña Drip
dripCampaignStatus: enum
  - Not Enrolled (default)
  - Active (Email 1)
  - Active (Email 2)
  - Active (Email 3)
  - Active (Email 4)
  - Active (Email 5)
  - Active (Email 6)
  - Waiting for Manual Email 1
  - Paused
  - Completed
  - Opted Out

dripCampaignType: enum
  - News and Offers
  - Get Personalized Assistance
  - None (default)

dripCampaignStartDate: datetime
dripCampaignLastEmailSent: datetime
dripCampaignNextEmailDate: datetime
dripCampaignEmailSequence: int (default: 0)

// Campos de Asignación
assignedAgent: link (User)
assignedAgentEmail: varchar(255)
assignedAgentName: varchar(255)

// Campos de Tracking
hasResponded: bool (default: false)
lastEmailResponseDate: datetime
lastSMSResponseDate: datetime
lastCallDate: datetime
emailResponseCount: int (default: 0)

// Campos de Formulario
formSource: enum
  - News and Offers Form
  - Get Personalized Assistance Form
  - Newsletter Popup
  - Chatwoot
  - Manual Entry (default)
  - OTA
  - Referral

formSubmissionDate: datetime
formDataJSON: text

// Campos de Promoción
currentPromotionCode: varchar(100)
currentPromotionDiscount: int
currentPromotionValidUntil: date

// Campos de Consentimiento
consentEmailMarketing: bool (default: false)
consentWhatsApp: bool (default: false)
consentSMS: bool (default: false)
optOutDate: datetime
```

### 3.2 Workflow BPM - Estructura Detallada

#### Workflow 1: News and Offers Form Submission

```
Name: "Drip Campaign - News and Offers - Start"
Type: Record
Entity Type: Lead
Trigger Type: Record Created
Conditions:
  - formSource equals "News and Offers Form"
  - dripCampaignStatus equals "Not Enrolled"
  - consentEmailMarketing equals true

Actions:
  1. Assign to User
     - Logic: If preferredLanguage equals "ES" → assign to Spanish-speaking agent
              Else → assign using Round-Robin
  
  2. Update Fields
     - assignedAgentEmail = assignedAgent.emailAddress
     - assignedAgentName = assignedAgent.name
     - dripCampaignType = "News and Offers"
     - dripCampaignStatus = "Active (Email 1)"
     - dripCampaignStartDate = now()
     - dripCampaignEmailSequence = 1
     - dripCampaignNextEmailDate = now()
  
  3. Send Email
     - Template: "Drip Email 1 - News and Offers - Welcome & Promotions"
     - To: {{lead.emailAddress}}
     - From: {{lead.assignedAgentEmail}}
     - Subject: "{{lead.name}}, Welcome to Dolphin Blue Paradise - Your Eco-Luxury Escape Awaits"
  
  4. Add to Target List
     - Target List: "Drip Campaign - News and Offers Active"
     - Target List: "Drip Campaign - Email 1"
  
  5. Create Scheduled Job
     - Type: Workflow
     - Workflow: "Drip Campaign - Send Email 2"
     - Execute at: now() + 3 days
```

#### Workflow 2: Get Personalized Assistance Form Submission

```
Name: "Drip Campaign - Get Personalized Assistance - Wait for Manual"
Type: Record
Entity Type: Lead
Trigger Type: Record Created
Conditions:
  - formSource equals "Get Personalized Assistance Form"
  - dripCampaignStatus equals "Not Enrolled"

Actions:
  1. Assign to User
     - Logic: If preferredLanguage equals "ES" → assign to Spanish-speaking agent
              Else → assign using Round-Robin
  
  2. Update Fields
     - assignedAgentEmail = assignedAgent.emailAddress
     - assignedAgentName = assignedAgent.name
     - dripCampaignType = "Get Personalized Assistance"
     - dripCampaignStatus = "Waiting for Manual Email 1"
  
  3. Create Task
     - Name: "Send personalized Email 1 to {{lead.name}}"
     - Assigned To: {{lead.assignedAgent}}
     - Due Date: now() + 2 hours
     - Priority: High
     - Description: "Form submitted via Get Personalized Assistance form. 
                     Arrival: {{lead.arrivalDate}}, Departure: {{lead.departureDate}}
                     Party Size: {{lead.partySize}}
                     Message: {{lead.description}}
                     Interests: {{lead.interestsWeb}}"
  
  4. Add to Target List
     - Target List: "Drip Campaign - Get Personalized Assistance Active"
```

#### Workflow 3: Send Email 2 (Automático)

```
Name: "Drip Campaign - Send Email 2"
Type: Scheduled
Entity Type: Lead
Trigger Type: Scheduled Job
Conditions:
  - dripCampaignStatus equals "Active (Email 2)"
  - dripCampaignNextEmailDate less than or equal to now()
  - hasResponded equals false
  - status not equals "Booked"
  - dripCampaignStatus not equals "Opted Out"

Actions:
  1. Send Email
     - Template: "Drip Email 2 - Paradise Between Jungle & Sea"
     - To: {{lead.emailAddress}}
     - From: {{lead.assignedAgentEmail}}
  
  2. Update Fields
     - dripCampaignLastEmailSent = now()
     - dripCampaignEmailSequence = 2
     - dripCampaignNextEmailDate = now() + 4 days
     - dripCampaignStatus = "Active (Email 3)"
  
  3. Remove from Target List
     - Target List: "Drip Campaign - Email 2"
  
  4. Add to Target List
     - Target List: "Drip Campaign - Email 3"
  
  5. Create Scheduled Job
     - Type: Workflow
     - Workflow: "Drip Campaign - Send Email 3"
     - Execute at: now() + 4 days
```

*(Workflows 4-8 similares para Emails 3-6)*

#### Workflow 9: Stop Campaign on Response

```
Name: "Drip Campaign - Stop on Response"
Type: Record
Entity Type: Lead
Trigger Type: Record Updated
Conditions:
  - hasResponded equals true
  OR lastEmailResponseDate changed
  OR lastSMSResponseDate changed
  OR lastCallDate changed
  OR status equals "Booked"
  OR status equals "Converted"

Actions:
  1. Update Fields
     - dripCampaignStatus = "Paused"
  
  2. Remove from Target Lists
     - All active Target Lists
  
  3. Create Note
     - Note: "Campaign paused due to response on {{now()}}"
     - Type: System
```

#### Workflow 10: Stop Campaign on Opt-Out

```
Name: "Drip Campaign - Stop on Opt-Out"
Type: Record
Entity Type: Lead
Trigger Type: Record Updated
Conditions:
  - consentEmailMarketing equals false
  OR optOutDate changed

Actions:
  1. Update Fields
     - dripCampaignStatus = "Opted Out"
     - optOutDate = now()
     - consentEmailMarketing = false
  
  2. Remove from Target Lists
     - All Target Lists
```

### 3.3 API Integration - Frontend

#### Endpoint: `/api/lead`

**Modificar para soportar ambos formularios:**

```typescript
// apps/web/src/app/api/lead/route.ts

export async function POST(request: Request) {
  const formData = await request.formData();
  
  // Determinar tipo de formulario basado en campos presentes
  const hasDates = formData.get("arrival") && formData.get("departure");
  const hasMessage = formData.get("message");
  
  const formSource = hasDates && hasMessage 
    ? "Get Personalized Assistance Form"
    : "News and Offers Form";
  
  const payload = {
    formSource,
    // ... resto de campos
  };
  
  // Enviar a EspoCRM
  const response = await fetch(`${env.ESPOCRM_URL}/Lead`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Api-Key": env.ESPOCRM_API_KEY,
    },
    body: JSON.stringify(payload),
  });
  
  // Workflow se activa automáticamente en EspoCRM
}
```

---

## PARTE 4: PÁGINA DE TESTING

### 4.1 Ruta: `/form_testing`

**Propósito:**
- Probar ambos formularios antes de implementarlos en producción
- Verificar integración con EspoCRM
- Validar workflows funcionan correctamente

**Características:**
- Dos formularios claramente separados
- Indicadores visuales de éxito/error
- Link directo a EspoCRM para verificar lead
- Instrucciones de testing
- Modo desarrollo (solo visible en desarrollo o con flag)

---

## PARTE 5: CHECKLIST DE IMPLEMENTACIÓN

### Semana 1: Configuración Base
- [ ] Crear todos los campos personalizados en Lead
- [ ] Configurar SMTP y cuentas de email
- [ ] Crear Target Lists necesarias
- [ ] Configurar roles y permisos
- [ ] Probar acceso y permisos

### Semana 2: Templates de Email
- [ ] Crear 6 templates de email drip
- [ ] Crear template manual para Get Personalized Assistance Email 1
- [ ] Probar personalización de placeholders
- [ ] Validar formato HTML y responsive
- [ ] Traducir templates a español

### Semana 3-4: Workflows
- [ ] Crear workflow News and Offers → Start Campaign
- [ ] Crear workflow Get Personalized Assistance → Wait for Manual
- [ ] Crear workflow Manual Enrollment → Start from Email 2
- [ ] Crear workflows para Emails 2-6
- [ ] Crear workflow Stop on Response
- [ ] Crear workflow Stop on Opt-Out
- [ ] Probar todos los workflows individualmente

### Semana 5: Frontend
- [ ] Crear página `/form_testing`
- [ ] Implementar formulario News and Offers
- [ ] Implementar formulario Get Personalized Assistance
- [ ] Modificar `/api/lead` para soportar ambos formularios
- [ ] Agregar validación y error handling
- [ ] Probar integración end-to-end

### Semana 6: UI EspoCRM
- [ ] Crear botones personalizados en Lead record
- [ ] Configurar vistas y filtros
- [ ] Crear reportes básicos
- [ ] Crear dashboard principal
- [ ] Documentar proceso para agentes

### Semana 7: Testing Completo
- [ ] Probar flujo News and Offers completo
- [ ] Probar flujo Get Personalized Assistance completo
- [ ] Probar pausa/resume
- [ ] Probar opt-out
- [ ] Validar personalización de emails
- [ ] Probar con datos reales
- [ ] Testing de carga (múltiples formularios simultáneos)

### Semana 8: Training y Lanzamiento
- [ ] Crear guía de training para agentes
- [ ] Crear video tutorial
- [ ] Sesión de training con agentes
- [ ] Documentar runbook de operaciones
- [ ] Crear troubleshooting guide
- [ ] Lanzar en producción
- [ ] Monitorear primeras 48 horas
- [ ] Ajustar según feedback

---

## PARTE 6: MÉTRICAS Y KPIs

### Métricas a Trackear

**Drip Campaign Performance:**
- Leads en campaña activa por tipo
- Emails enviados por secuencia (1-6)
- Tasa de respuesta por email
- Tasa de conversión por tipo de formulario
- Tiempo promedio hasta respuesta
- Leads pausados vs activos

**Agent Performance:**
- Leads asignados por agente
- Tasa de respuesta por agente
- Tiempo promedio de respuesta manual (Get Personalized Assistance)
- Conversiones por agente

**Form Performance:**
- Tasa de conversión de formulario (submissions / visits)
- Abandono de formulario
- Tiempo promedio de completar formulario
- Errores de validación

---

## PARTE 7: RIESGOS Y MITIGACIÓN

### Riesgos Identificados

1. **Workflows no se ejecutan correctamente**
   - Mitigación: Testing exhaustivo, monitoreo de scheduled jobs

2. **Emails no se envían desde email del agente**
   - Mitigación: Configuración SMTP avanzada, testing de envío

3. **Agentes no siguen proceso para Get Personalized Assistance**
   - Mitigación: Training completo, recordatorios automáticos, dashboard de leads pendientes

4. **Performance issues con muchos leads**
   - Mitigación: Optimizar workflows, usar scheduled jobs eficientemente

5. **Datos duplicados**
   - Mitigación: Duplicate prevention ya implementado, validar funciona

---

## CONCLUSIÓN

Este plan proporciona una implementación completa y detallada del sistema de drip campaigns en EspoCRM para Dolphin Blue Paradise. Con este sistema podremos:

1. ✅ Capturar leads desde dos tipos de formularios
2. ✅ Iniciar campañas automáticas o manuales según el caso
3. ✅ Enviar secuencias de emails personalizadas
4. ✅ Pausar automáticamente cuando hay respuesta
5. ✅ Trackear métricas y performance
6. ✅ Escalar el sistema según crecemos

**Tiempo estimado total:** 8 semanas
**Costo:** Solo hosting y desarrollo (vs $10,680-38,400/año de HubSpot)
**ROI:** Alto - sistema completo y personalizado para nuestras necesidades

