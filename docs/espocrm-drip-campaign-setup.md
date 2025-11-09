# EspoCRM Drip Campaign Setup - Requisitos Completos

## Resumen
Este documento detalla todos los componentes necesarios en EspoCRM para implementar campañas drip automatizadas para Dolphin Blue Paradise, adaptando las mejores prácticas de campañas drip automatizadas al contexto de nuestro eco-luxury resort.

---

## 1. CAMPOS PERSONALIZADOS NECESARIOS

### 1.1 Campos en Lead/Contact

#### Campos de Campaña Drip
```
Campo: dripCampaignStatus
Tipo: Enum (Dropdown)
Opciones:
  - Not Enrolled
  - Active (Email 1)
  - Active (Email 2)
  - Active (Email 3)
  - Active (Email 4)
  - Active (Email 5)
  - Active (Email 6)
  - Paused
  - Completed
  - Opted Out
Valor por defecto: Not Enrolled
```

```
Campo: dripCampaignType
Tipo: Enum (Dropdown)
Opciones:
  - News and Offers (Formulario de noticias y ofertas)
  - Get Personalized Assistance (Formulario de asistencia personalizada)
  - None
Valor por defecto: None
```

```
Campo: dripCampaignStartDate
Tipo: DateTime
Descripción: Fecha/hora en que se inició la campaña drip
```

```
Campo: dripCampaignLastEmailSent
Tipo: DateTime
Descripción: Fecha/hora del último email enviado en la secuencia
```

```
Campo: dripCampaignNextEmailDate
Tipo: DateTime
Descripción: Fecha/hora programada para el próximo email
```

```
Campo: dripCampaignEmailSequence
Tipo: Int
Descripción: Número del email actual en la secuencia (1-6)
Valor por defecto: 0
```

#### Campos de Asignación de Agente
```
Campo: assignedAgent
Tipo: Link (User)
Descripción: Agente/concierge asignado al lead
```

```
Campo: assignedAgentEmail
Tipo: Varchar
Descripción: Email del agente asignado (para personalización)
```

```
Campo: assignedAgentName
Tipo: Varchar
Descripción: Nombre del agente asignado (para personalización)
```

#### Campos de Tracking de Respuesta
```
Campo: lastEmailResponseDate
Tipo: DateTime
Descripción: Fecha/hora de la última respuesta del lead
```

```
Campo: emailResponseCount
Tipo: Int
Descripción: Número de veces que el lead ha respondido
Valor por defecto: 0
```

```
Campo: lastSMSResponseDate
Tipo: DateTime
Descripción: Fecha/hora de la última respuesta por SMS/WhatsApp
```

```
Campo: lastCallDate
Tipo: DateTime
Descripción: Fecha/hora de la última llamada realizada
```

```
Campo: hasResponded
Tipo: Bool (Checkbox)
Descripción: Indica si el lead ha respondido por cualquier canal
Valor por defecto: false
```

#### Campos de Formulario y Fuente
```
Campo: formSource
Tipo: Enum (Dropdown)
Opciones:
  - News and Offers Form
  - Get Personalized Assistance Form
  - Newsletter Popup
  - Chatwoot
  - Manual Entry
  - OTA
  - Referral
Valor por defecto: Manual Entry
```

```
Campo: formSubmissionDate
Tipo: DateTime
Descripción: Fecha/hora en que se envió el formulario
```

```
Campo: formDataJSON
Tipo: Text (JSON)
Descripción: Datos completos del formulario en formato JSON
```

#### Campos de Promoción Actual
```
Campo: currentPromotionCode
Tipo: Varchar
Descripción: Código de la promoción activa (ej: "HIGH_SEASON_30")
```

```
Campo: currentPromotionDiscount
Tipo: Int
Descripción: Porcentaje de descuento (ej: 30)
```

```
Campo: currentPromotionValidUntil
Tipo: Date
Descripción: Fecha de expiración de la promoción
```

#### Campos de Consentimiento
```
Campo: consentEmailMarketing
Tipo: Bool (Checkbox)
Descripción: Consentimiento para email marketing
Valor por defecto: false
```

```
Campo: consentWhatsApp
Tipo: Bool (Checkbox)
Descripción: Consentimiento para WhatsApp
Valor por defecto: false
```

```
Campo: consentSMS
Tipo: Bool (Checkbox)
Descripción: Consentimiento para SMS
Valor por defecto: false
```

```
Campo: optOutDate
Tipo: DateTime
Descripción: Fecha en que el lead hizo opt-out
```

---

## 2. ENTIDADES Y RELACIONES

### 2.1 Campaña (Campaign)
EspoCRM ya tiene entidad Campaign, pero necesitamos personalizarla:

**Campos adicionales necesarios:**
```
Campo: campaignType
Tipo: Enum
Opciones:
  - Drip Campaign
  - Newsletter
  - Promotional
  - Informational
```

```
Campo: emailSequence
Tipo: Int
Descripción: Número de email en la secuencia (1-6)
```

```
Campo: parentCampaign
Tipo: Link (Campaign)
Descripción: Campaña padre (para agrupar secuencia completa)
```

```
Campo: delayDays
Tipo: Int
Descripción: Días de espera antes de enviar este email
```

```
Campo: emailTemplate
Tipo: Link (EmailTemplate)
Descripción: Template de email a usar
```

### 2.2 Target Lists (Listas de Destinatarios)
EspoCRM usa Target Lists para agrupar contactos en campañas.

**Necesitamos crear:**
- Target List: "Drip Campaign - News and Offers Active"
- Target List: "Drip Campaign - Get Personalized Assistance Active"
- Target List: "Drip Campaign - Email 1"
- Target List: "Drip Campaign - Email 2"
- Target List: "Drip Campaign - Email 3"
- Target List: "Drip Campaign - Email 4"
- Target List: "Drip Campaign - Email 5"
- Target List: "Drip Campaign - Email 6"
- Target List: "Drip Campaign - Paused"
- Target List: "Drip Campaign - Opted Out"

---

## 3. WORKFLOWS (BPM) - AUTOMATIZACIONES

### 3.1 Workflow: News and Offers Form Submission → Start Drip Campaign

**Trigger:**
- Cuando: Lead creado o actualizado
- Condición: `formSource = "News and Offers Form"` AND `dripCampaignStatus = "Not Enrolled"` AND `consentEmailMarketing = true`

**Acciones:**
1. Asignar agente automáticamente
   - Basado en `preferredLanguage`
   - O round-robin si no hay preferencia
   
2. Actualizar campos:
   ```
   assignedAgent = [agente asignado]
   assignedAgentEmail = [email del agente]
   assignedAgentName = [nombre del agente]
   dripCampaignType = "News and Offers"
   dripCampaignStatus = "Active (Email 1)"
   dripCampaignStartDate = [fecha actual]
   dripCampaignEmailSequence = 1
   dripCampaignNextEmailDate = [fecha actual]
   ```

3. Enviar Email 1 inmediatamente
   - Template: "Drip Email 1 - News and Offers - Welcome & Promotions"
   - From: `{{lead.assignedAgentEmail}}`
   - Personalización: `{{lead.name}}`, `{{lead.assignedAgentName}}`

4. Agregar a Target List: "Drip Campaign - News and Offers Active"

5. Programar Email 2
   - Crear tarea para agente: "Send Email 2 in 3 days"
   - O usar workflow con delay de 3 días

### 3.2 Workflow: Get Personalized Assistance Form Submission → Wait for Manual Email 1

**Trigger:**
- Cuando: Lead creado o actualizado
- Condición: `formSource = "Get Personalized Assistance Form"` AND `dripCampaignStatus = "Not Enrolled"`

**Acciones:**
1. Asignar agente automáticamente
   - Basado en `preferredLanguage`
   - O round-robin si no hay preferencia
   
2. Actualizar campos:
   ```
   assignedAgent = [agente asignado]
   assignedAgentEmail = [email del agente]
   assignedAgentName = [nombre del agente]
   dripCampaignType = "Get Personalized Assistance"
   dripCampaignStatus = "Waiting for Manual Email 1"
   ```

3. Crear tarea para agente:
   - Asunto: "Send personalized Email 1 to {{lead.name}}"
   - Descripción: Incluir datos del formulario, fechas de viaje, y preguntas específicas
   - Fecha de vencimiento: [fecha actual + 2 horas]
   - Prioridad: Alta

4. NOT enviar email automático (esto es clave - el agente personaliza primero)

### 3.3 Workflow: Manual Enrollment → Start from Email 2 (Get Personalized Assistance)

**Trigger:**
- Manual (botón en Lead record)
- O cuando: `dripCampaignStatus = "Waiting for Manual Email 1"` AND `lastEmailResponseDate` está establecido

**Acciones:**
1. Actualizar campos:
   ```
   dripCampaignStatus = "Active (Email 2)"
   dripCampaignEmailSequence = 2
   dripCampaignNextEmailDate = [fecha actual + 3 días]
   ```

2. Agregar a Target List: "Drip Campaign - Get Personalized Assistance Active"

3. Programar Email 2 para enviar en 3 días

### 3.4 Workflow: Send Email 2 (Automático)

**Trigger:**
- Cuando: `dripCampaignStatus = "Active (Email 2)"` AND `dripCampaignNextEmailDate <= [fecha actual]`
- Y: `hasResponded = false` AND `dripCampaignStatus != "Opted Out"`

**Acciones:**
1. Enviar Email 2
   - Template: "Drip Email 2 - Paradise Between Jungle & Sea"
   - From: `{{lead.assignedAgentEmail}}`

2. Actualizar campos:
   ```
   dripCampaignLastEmailSent = [fecha actual]
   dripCampaignEmailSequence = 2
   dripCampaignNextEmailDate = [fecha actual + 4 días]
   dripCampaignStatus = "Active (Email 3)"
   ```

3. Crear actividad de email en el registro del lead

### 3.5 Workflow: Send Email 3 (Automático)

**Trigger:**
- Similar a Email 2, pero para secuencia 3

**Acciones:**
1. Enviar Email 3
   - Template: "Drip Email 3 - Eco-Luxury Experience"
   - Delay: 4 días después de Email 2

2. Actualizar campos para Email 4

### 3.6 Workflow: Send Email 4 (Automático)

**Trigger y acciones similares para Email 4**

### 3.7 Workflow: Send Email 5 (Automático)

**Trigger y acciones similares para Email 5**

### 3.8 Workflow: Send Email 6 (Automático)

**Trigger y acciones similares para Email 6**

### 3.9 Workflow: Stop Campaign on Response

**Trigger:**
- Cuando: `hasResponded = true`
- O cuando: `lastEmailResponseDate` se actualiza
- O cuando: `lastSMSResponseDate` se actualiza
- O cuando: `lastCallDate` se actualiza
- O cuando: `status = "Converted"` o `status = "Booked"`

**Acciones:**
1. Actualizar campos:
   ```
   dripCampaignStatus = "Paused"
   ```

2. Remover de todas las Target Lists activas

3. Crear nota: "Campaign paused due to response"

### 3.10 Workflow: Stop Campaign on Opt-Out

**Trigger:**
- Cuando: `consentEmailMarketing = false`
- O cuando: Lead hace clic en "Unsubscribe"

**Acciones:**
1. Actualizar campos:
   ```
   dripCampaignStatus = "Opted Out"
   optOutDate = [fecha actual]
   consentEmailMarketing = false
   ```

2. Remover de todas las Target Lists

---

## 4. EMAIL TEMPLATES

### 4.1 Template: Drip Email 1 - News and Offers - Welcome & Promotions

**Nombre:** `Drip Email 1 - News and Offers - Welcome & Promotions`

**Subject:** `{{lead.name}}, Welcome to Dolphin Blue Paradise - Your Eco-Luxury Escape Awaits`

**From:** `{{lead.assignedAgentEmail}}`

**Reply-To:** `{{lead.assignedAgentEmail}}`

**Contenido (con placeholders):**
```
Hello {{lead.name}},

My name is {{lead.assignedAgentName}}, Concierge Specialist at Dolphin Blue Paradise. 
I am here to make your trip planning simple and ensure that everything is perfectly 
organized for your stay at our eco-luxury resort in Bahia Delfines, Bocas del Toro.

**Current Promotions**
Enjoy {{lead.currentPromotionDiscount}}% off (before taxes) on stays through 
{{lead.currentPromotionValidUntil}}.

[Tabla de precios con placeholders dinámicos para nuestras 4 cabanas]

**What's Included:**
- All meals at Blø Bar & Restaurant (farm-to-table dining)
- Access to our swim platform and marine life observation
- Kayaks, paddleboards, and snorkel equipment
- Concierge assistance for activity reservations
- Boat transfers to/from Bocas del Toro Airport (BOC)

When you are ready to reserve, just indicate to me which accommodation you would like, 
and I will gladly secure it for you.

Contact Me

All the best,
{{lead.assignedAgentName}}
Concierge Specialist
WhatsApp +507 6346 0605 | Email contact@dolphinblueparadise.com
```

### 4.2 Template: Drip Email 2 - Paradise Between Jungle & Sea

**Nombre:** `Drip Email 2 - Paradise Between Jungle & Sea`

**Subject:** `Your Eco-Luxury Paradise Between Jungle & Sea Awaits!`

**From:** `{{lead.assignedAgentEmail}}`

**Contenido:** 
- Enfoque en la ubicación única: entre la selva y el mar Caribe
- 80 delfines residentes en Bahia Delfines
- Experiencia off-grid auténtica (100% solar, agua de lluvia)
- Cabanas sobre el agua con acceso directo al mar
- Swim platform para observación de vida marina

### 4.3 Template: Drip Email 3 - Eco-Luxury Experience

**Nombre:** `Drip Email 3 - Eco-Luxury Experience`

**Subject:** `Experience True Eco-Luxury in Bocas del Toro`

**From:** `{{lead.assignedAgentEmail}}`

**Contenido:**
- Prácticas de sostenibilidad auténticas (no greenwashing)
- Belleza natural virgen: playas de arena blanca, aguas cristalinas, selva tropical
- Alojamientos únicos: 4 cabanas distintas, cada una con su personalidad
- Experiencias únicas: avistamiento de delfines, snorkel desde la plataforma, tours a la selva

### 4.4 Template: Drip Email 4 - Let Me Handle Details

**Nombre:** `Drip Email 4 - Let Me Handle Details`

**Subject:** `Let me handle the details for your arrival at Dolphin Blue Paradise!`

**From:** `{{lead.assignedAgentEmail}}`

**Contenido:**
- Antes de llegar: guía de viaje desde múltiples orígenes (Panama City, Costa Rica, etc.)
- Traslado incluido: desde Bocas del Toro Airport (BOC) en lancha privada
- Bienvenida personalizada: nuestro equipo te recibe en la plataforma
- Asistencia personalizada: nuestro concierge te guía en cada paso
- Logística sin estrés: desde reservas de actividades hasta recomendaciones locales

### 4.5 Template: Drip Email 5 - Farm-to-Table Dining

**Nombre:** `Drip Email 5 - Farm-to-Table Dining`

**Subject:** `A Fresh Caribbean Culinary Experience at Blø Bar & Restaurant`

**From:** `{{lead.assignedAgentEmail}}`

**Contenido:**
- Blø Bar & Restaurant: restaurante sobre el agua con vistas al mar Caribe
- Farm-to-table auténtico: ingredientes del jardín orgánico de Roque
- Mariscos frescos: pescado local de pescadores de Bocas del Toro
- Menú dinámico: combinación de sabores caribeños y europeos
- Experiencia gastronómica: desayuno, almuerzo y cena con ingredientes cultivados diariamente

### 4.6 Template: Drip Email 6 - Adventures Await

**Nombre:** `Drip Email 6 - Adventures Await`

**Subject:** `Your Caribbean Adventure Awaits at Dolphin Blue Paradise`

**From:** `{{lead.assignedAgentEmail}}`

**Contenido:**
- Acceso directo al mar desde las cabanas
- Snorkel desde nuestra plataforma de nado
- Kayaks y paddleboards incluidos
- Avistamiento de delfines al atardecer (80 delfines residentes)
- Tours a la selva y granjas de cacao
- Excursiones a playas vírgenes cercanas
- Vida marina diversa: cientos de especies de peces, estrellas de mar, erizos

### 4.7 Template: Email 1 - Get Personalized Assistance (Manual, para agentes)

**Nombre:** `Email 1 - Get Personalized Assistance - Manual Template`

**Subject:** `{{lead.name}}, Welcome to Dolphin Blue Paradise - Let's Plan Your Stay`

**From:** `{{lead.assignedAgentEmail}}`

**Contenido:** 
- Mismo template base que News and Offers Email 1
- Pero con sección adicional para personalización:
  ```
  I see you're interested in visiting from {{lead.arrivalDate}} to {{lead.departureDate}} 
  with a party of {{lead.partySize}}.
  
  [Respuesta personalizada a preguntas específicas del formulario]
  [Mencionar intereses específicos: {{lead.interestsWeb}}]
  [Información sobre disponibilidad para esas fechas]
  ```

**Nota:** Este template se usa manualmente por agentes después de revisar el formulario, no se envía automáticamente.

---

## 5. INTEGRACIÓN CON FORMULARIOS WEB

### 5.1 Formulario News and Offers

**Endpoint:** `/api/v1/Lead`

**Payload cuando se envía:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "emailAddress": "john@example.com",
  "phoneNumber": "+1234567890",
  "preferredLanguage": "EN",
  "formSource": "News and Offers Form",
  "formSubmissionDate": "2025-11-06T10:30:00Z",
  "consentEmailMarketing": true,
  "consentWhatsApp": false,
  "currentPromotionCode": "HIGH_SEASON_30",
  "interestsWeb": ["rooms", "activities"],
  "description": "Interested in news and special offers"
}
```

**Workflow se activa automáticamente** → Envía Email 1 inmediatamente

### 5.2 Formulario Get Personalized Assistance

**Endpoint:** `/api/v1/Lead`

**Payload cuando se envía:**
```json
{
  "firstName": "Jane",
  "lastName": "Smith",
  "emailAddress": "jane@example.com",
  "phoneNumber": "+1234567890",
  "preferredLanguage": "ES",
  "formSource": "Get Personalized Assistance Form",
  "formSubmissionDate": "2025-11-06T10:30:00Z",
  "arrivalDate": "2025-12-15",
  "departureDate": "2025-12-20",
  "partySize": 2,
  "interestsWeb": ["rooms", "dining", "activities"],
  "description": "Necesito ayuda para planificar mi estadía. Tengo preguntas sobre las actividades disponibles y la disponibilidad para esas fechas.",
  "consentEmailMarketing": true
}
```

**Workflow crea tarea para agente** → NO envía email automático (agente personaliza primero)

---

## 6. BOTONES Y ACCIONES PERSONALIZADAS

### 6.1 Botón: "Start Drip Campaign from Email 2" (para Get Personalized Assistance)

**Ubicación:** Lead record detail view

**Acción:** 
- Actualiza `dripCampaignStatus = "Active (Email 2)"`
- Enrolla en workflow de Email 2
- Crea nota: "Drip campaign started from Email 2 by {{user.name}}"
- Visible solo cuando `dripCampaignType = "Get Personalized Assistance"` y `dripCampaignStatus = "Waiting for Manual Email 1"`

### 6.2 Botón: "Pause Drip Campaign"

**Ubicación:** Lead record detail view

**Acción:**
- Actualiza `dripCampaignStatus = "Paused"`
- Remueve de Target Lists activas

### 6.3 Botón: "Resume Drip Campaign"

**Ubicación:** Lead record detail view

**Acción:**
- Continúa desde el email donde se pausó
- Re-enrolla en workflow correspondiente

### 6.4 Botón: "Mark as Responded"

**Ubicación:** Lead record detail view

**Acción:**
- Actualiza `hasResponded = true`
- Actualiza `lastEmailResponseDate = [fecha actual]`
- Pausa campaña automáticamente

---

## 7. REPORTES Y DASHBOARDS

### 7.1 Reporte: Drip Campaign Performance

**Métricas:**
- Leads en campaña activa por tipo (News and Offers vs Get Personalized Assistance)
- Emails enviados por secuencia (1-6)
- Tasa de respuesta por email
- Tasa de conversión por tipo de formulario
- Tiempo promedio hasta respuesta
- Leads pausados vs activos

### 7.2 Reporte: Agent Performance

**Métricas:**
- Leads asignados por agente
- Tasa de respuesta por agente
- Tiempo promedio de respuesta manual (Get Personalized Assistance)
- Conversiones por agente

### 7.3 Dashboard: Drip Campaign Overview

**Widgets:**
1. Leads activos en campaña (News and Offers vs Get Personalized Assistance)
2. Próximos emails a enviar (próximas 24h)
3. Leads que respondieron hoy
4. Campañas pausadas pendientes de seguimiento
5. Tasa de conversión de la campaña
6. Leads esperando Email 1 manual (Get Personalized Assistance)

---

## 8. CONFIGURACIÓN DE SMTP

### 8.1 Configuración de Email Outbound

**Requisitos:**
- SMTP configurado en EspoCRM
- Múltiples cuentas de email (una por agente)
- O configuración de "Send As" para permitir que emails se envíen desde email del agente

**Configuración recomendada:**
- Usar SMTP del dominio del resort
- Configurar "From Name" y "From Address" dinámicamente por template
- Habilitar tracking de aperturas y clics

---

## 9. INTEGRACIÓN CON n8n (Opcional pero Recomendado)

### 9.1 Flujo n8n: Form Submission → EspoCRM

**Nodo 1:** Webhook (recibe datos del formulario)
**Nodo 2:** Transformar datos al formato EspoCRM
**Nodo 3:** Crear/Actualizar Lead en EspoCRM via API
**Nodo 4:** Trigger workflow en EspoCRM (si es necesario)

### 9.2 Flujo n8n: Response Detection → Pause Campaign

**Nodo 1:** Webhook de Chatwoot (cuando hay respuesta)
**Nodo 2:** Buscar Lead en EspoCRM por email
**Nodo 3:** Actualizar `hasResponded = true` en EspoCRM
**Nodo 4:** Workflow en EspoCRM pausa campaña automáticamente

---

## 10. CHECKLIST DE IMPLEMENTACIÓN

### Fase 1: Configuración Base
- [ ] Crear todos los campos personalizados en Lead
- [ ] Configurar SMTP y cuentas de email
- [ ] Crear Target Lists necesarias
- [ ] Configurar roles y permisos

### Fase 2: Templates de Email
- [ ] Crear 6 templates de email drip
- [ ] Crear template manual para Get Personalized Assistance Email 1
- [ ] Probar personalización de placeholders
- [ ] Validar formato HTML y responsive

### Fase 3: Workflows
- [ ] Crear workflow News and Offers Form → Start Campaign
- [ ] Crear workflow Get Personalized Assistance Form → Wait for Manual
- [ ] Crear workflows para Emails 2-6
- [ ] Crear workflow Stop on Response
- [ ] Crear workflow Stop on Opt-Out
- [ ] Probar todos los workflows

### Fase 4: Integraciones
- [ ] Configurar API endpoints para formularios
- [ ] Integrar con n8n (si se usa)
- [ ] Configurar webhooks de Chatwoot
- [ ] Probar flujo completo end-to-end

### Fase 5: UI y Acciones
- [ ] Crear botones personalizados en Lead record
- [ ] Configurar vistas y filtros
- [ ] Crear reportes y dashboards
- [ ] Documentar proceso para agentes

### Fase 6: Testing y QA
- [ ] Probar flujo News and Offers completo
- [ ] Probar flujo Get Personalized Assistance completo
- [ ] Probar pausa/resume
- [ ] Probar opt-out
- [ ] Validar personalización de emails
- [ ] Probar con datos reales

### Fase 7: Training y Lanzamiento
- [ ] Entrenar agentes en proceso Get Personalized Assistance (email manual personalizado)
- [ ] Documentar runbook de operaciones
- [ ] Crear guía rápida para agentes sobre cuándo usar cada template
- [ ] Lanzar en producción
- [ ] Monitorear métricas iniciales

---

## 11. NOTAS IMPORTANTES

### Limitaciones de EspoCRM vs HubSpot

1. **Workflows con delays:** EspoCRM puede usar delays, pero pueden ser menos flexibles que HubSpot. Considerar usar Scheduled Jobs.

2. **Envío desde email del agente:** Puede requerir configuración SMTP avanzada o extensión personalizada.

3. **Tracking de respuestas:** Puede requerir integración con Chatwoot o email inbox para detectar respuestas automáticamente.

4. **Personalización avanzada:** Los placeholders en templates pueden ser limitados. Verificar documentación de EspoCRM para placeholders disponibles.

### Alternativas si EspoCRM es limitado

1. **Usar n8n para orquestación:** n8n puede manejar la lógica compleja y usar EspoCRM solo como base de datos.

2. **Usar extensiones de EspoCRM:** Buscar extensiones de la comunidad que agreguen funcionalidad de drip campaigns.

3. **Híbrido:** Usar EspoCRM para datos y n8n para automatizaciones complejas.

---

## 12. PRÓXIMOS PASOS

1. Revisar esta lista con el equipo técnico
2. Validar qué funcionalidades están disponibles en la versión de EspoCRM instalada
3. Priorizar implementación por fases
4. Asignar recursos (desarrollador, marketer, agente de prueba)
5. Crear timeline de implementación

