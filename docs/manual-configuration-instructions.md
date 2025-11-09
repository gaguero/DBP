# Instrucciones Paso a Paso - Configuración Manual en EspoCRM
## Dolphin Blue Paradise - Drip Campaigns + Lead Scoring + GA4

**Fecha:** Noviembre 2025  
**Versión:** 1.0  
**Tiempo Estimado:** 4-6 horas de configuración

---

## ⚠️ IMPORTANTE: ANTES DE EMPEZAR

1. **Backup de EspoCRM:** Haz un backup completo antes de empezar
2. **Acceso de Administrador:** Necesitas acceso completo de administrador
3. **Tiempo:** Reserva 4-6 horas sin interrupciones
4. **Documentación:** Ten abiertos los documentos de referencia:
   - `docs/complete-implementation-guide.md`
   - `docs/espocrm-drip-campaign-setup.md`

---

## SECCIÓN 1: CREAR CAMPOS PERSONALIZADOS (1-2 horas)

### Paso 1.1: Acceder a Entity Manager

1. Login a EspoCRM como administrador
2. Click en el menú superior derecho (tu nombre) → `Administración`
3. En el menú lateral izquierdo, buscar `Entity Manager`
4. Click en `Entity Manager`
5. En la lista de entidades, buscar y click en `Lead`

### Paso 1.2: Crear Campos de Drip Campaign

#### Campo 1: dripCampaignStatus

1. En la página de Lead, click en la pestaña `Fields`
2. Click en el botón `Create Field` (arriba a la derecha)
3. Configurar:
   - **Type:** Seleccionar `Enum` (dropdown)
   - **Name:** Escribir `dripCampaignStatus`
   - **Label:** Escribir `Drip Campaign Status`
   - **Required:** Dejar sin marcar
   - **Default:** Seleccionar `Not Enrolled`
4. En la sección `Options`, escribir cada opción en una línea nueva:
   ```
   Not Enrolled
   Active (Email 1)
   Active (Email 2)
   Active (Email 3)
   Active (Email 4)
   Active (Email 5)
   Active (Email 6)
   Waiting for Manual Email 1
   Paused
   Completed
   Opted Out
   ```
5. Click en `Save`
6. ✅ Verificar que el campo aparece en la lista

#### Campo 2: dripCampaignType

1. Click `Create Field`
2. Configurar:
   - **Type:** `Enum`
   - **Name:** `dripCampaignType`
   - **Label:** `Drip Campaign Type`
   - **Default:** `None`
3. Options:
   ```
   News and Offers
   Get Personalized Assistance
   None
   ```
4. Click `Save`

#### Campo 3: dripCampaignStartDate

1. Click `Create Field`
2. Configurar:
   - **Type:** `DateTime`
   - **Name:** `dripCampaignStartDate`
   - **Label:** `Drip Campaign Start Date`
   - **Required:** No
3. Click `Save`

#### Campo 4: dripCampaignLastEmailSent

1. Click `Create Field`
2. Configurar:
   - **Type:** `DateTime`
   - **Name:** `dripCampaignLastEmailSent`
   - **Label:** `Drip Campaign Last Email Sent`
   - **Required:** No
3. Click `Save`

#### Campo 5: dripCampaignNextEmailDate

1. Click `Create Field`
2. Configurar:
   - **Type:** `DateTime`
   - **Name:** `dripCampaignNextEmailDate`
   - **Label:** `Drip Campaign Next Email Date`
   - **Required:** No
3. Click `Save`

#### Campo 6: dripCampaignEmailSequence

1. Click `Create Field`
2. Configurar:
   - **Type:** `Int`
   - **Name:** `dripCampaignEmailSequence`
   - **Label:** `Drip Campaign Email Sequence`
   - **Default:** `0`
   - **Min:** `0`
   - **Max:** `6`
   - **Required:** No
3. Click `Save`

### Paso 1.3: Crear Campos de Asignación de Agente

#### Campo 7: assignedAgent

1. Click `Create Field`
2. Configurar:
   - **Type:** `Link` → Seleccionar `User`
   - **Name:** `assignedAgent`
   - **Label:** `Assigned Agent`
   - **Required:** No
3. Click `Save`

#### Campo 8: assignedAgentEmail

1. Click `Create Field`
2. Configurar:
   - **Type:** `Varchar`
   - **Name:** `assignedAgentEmail`
   - **Label:** `Assigned Agent Email`
   - **Max Length:** `255`
   - **Required:** No
3. Click `Save`

#### Campo 9: assignedAgentName

1. Click `Create Field`
2. Configurar:
   - **Type:** `Varchar`
   - **Name:** `assignedAgentName`
   - **Label:** `Assigned Agent Name`
   - **Max Length:** `255`
   - **Required:** No
3. Click `Save`

### Paso 1.4: Crear Campos de Tracking

#### Campo 10: hasResponded

1. Click `Create Field`
2. Configurar:
   - **Type:** `Bool` (Checkbox)
   - **Name:** `hasResponded`
   - **Label:** `Has Responded`
   - **Default:** Desmarcado (false)
   - **Required:** No
3. Click `Save`

#### Campo 11: lastEmailResponseDate

1. Click `Create Field`
2. Configurar:
   - **Type:** `DateTime`
   - **Name:** `lastEmailResponseDate`
   - **Label:** `Last Email Response Date`
   - **Required:** No
3. Click `Save`

#### Campo 12: emailResponseCount

1. Click `Create Field`
2. Configurar:
   - **Type:** `Int`
   - **Name:** `emailResponseCount`
   - **Label:** `Email Response Count`
   - **Default:** `0`
   - **Required:** No
3. Click `Save`

### Paso 1.5: Crear Campos de Formulario

#### Campo 13: formSource

1. Click `Create Field`
2. Configurar:
   - **Type:** `Enum`
   - **Name:** `formSource`
   - **Label:** `Form Source`
   - **Default:** `Manual Entry`
3. Options:
   ```
   News and Offers Form
   Get Personalized Assistance Form
   Newsletter Popup
   Chatwoot
   Manual Entry
   OTA
   Referral
   ```
4. Click `Save`

#### Campo 14: formSubmissionDate

1. Click `Create Field`
2. Configurar:
   - **Type:** `DateTime`
   - **Name:** `formSubmissionDate`
   - **Label:** `Form Submission Date`
   - **Required:** No
3. Click `Save`

### Paso 1.6: Crear Campos de Lead Scoring

#### Campo 15: leadScore

1. Click `Create Field`
2. Configurar:
   - **Type:** `Int`
   - **Name:** `leadScore`
   - **Label:** `Lead Score`
   - **Default:** `0`
   - **Min:** `0`
   - **Max:** `150`
   - **Required:** No
3. Click `Save`

#### Campo 16: leadScoreDemographic

1. Click `Create Field`
2. Configurar:
   - **Type:** `Int`
   - **Name:** `leadScoreDemographic`
   - **Label:** `Lead Score - Demographic`
   - **Default:** `0`
   - **Min:** `0`
   - **Max:** `30`
3. Click `Save`

#### Campo 17: leadScoreBehavioral

1. Click `Create Field`
2. Configurar:
   - **Type:** `Int`
   - **Name:** `leadScoreBehavioral`
   - **Label:** `Lead Score - Behavioral`
   - **Default:** `0`
   - **Min:** `0`
   - **Max:** `50`
3. Click `Save`

#### Campo 18: leadScoreEngagement

1. Click `Create Field`
2. Configurar:
   - **Type:** `Int`
   - **Name:** `leadScoreEngagement`
   - **Label:** `Lead Score - Engagement`
   - **Default:** `0`
   - **Min:** `0`
   - **Max:** `30`
3. Click `Save`

#### Campo 19: leadScoreFormSubmission

1. Click `Create Field`
2. Configurar:
   - **Type:** `Int`
   - **Name:** `leadScoreFormSubmission`
   - **Label:** `Lead Score - Form Submission`
   - **Default:** `0`
   - **Min:** `0`
   - **Max:** `40`
3. Click `Save`

#### Campo 20: leadScoreCategory

1. Click `Create Field`
2. Configurar:
   - **Type:** `Enum`
   - **Name:** `leadScoreCategory`
   - **Label:** `Lead Score Category`
   - **Default:** `Cold`
3. Options:
   ```
   Hot
   Warm
   Cold
   ```
4. Click `Save`

#### Campo 21: leadScoreLastUpdated

1. Click `Create Field`
2. Configurar:
   - **Type:** `DateTime`
   - **Name:** `leadScoreLastUpdated`
   - **Label:** `Lead Score Last Updated`
   - **Required:** No
3. Click `Save`

### Paso 1.7: Crear Campos de Web Tracking

#### Campo 22: websiteVisits

1. Click `Create Field`
2. Configurar:
   - **Type:** `Int`
   - **Name:** `websiteVisits`
   - **Label:** `Website Visits`
   - **Default:** `0`
3. Click `Save`

#### Campo 23: websitePagesViewed

1. Click `Create Field`
2. Configurar:
   - **Type:** `Int`
   - **Name:** `websitePagesViewed`
   - **Label:** `Website Pages Viewed`
   - **Default:** `0`
3. Click `Save`

#### Campo 24: websiteTimeOnSite

1. Click `Create Field`
2. Configurar:
   - **Type:** `Int`
   - **Name:** `websiteTimeOnSite`
   - **Label:** `Website Time On Site (seconds)`
   - **Default:** `0`
3. Click `Save`

#### Campo 25: websiteLastVisit

1. Click `Create Field`
2. Configurar:
   - **Type:** `DateTime`
   - **Name:** `websiteLastVisit`
   - **Label:** `Website Last Visit`
   - **Required:** No
3. Click `Save`

#### Campo 26: websiteFirstVisit

1. Click `Create Field`
2. Configurar:
   - **Type:** `DateTime`
   - **Name:** `websiteFirstVisit`
   - **Label:** `Website First Visit`
   - **Required:** No
3. Click `Save`

#### Campo 27: websitePagesVisited

1. Click `Create Field`
2. Configurar:
   - **Type:** `Text` (Long Text)
   - **Name:** `websitePagesVisited`
   - **Label:** `Website Pages Visited (JSON)`
   - **Required:** No
3. Click `Save`

#### Campo 28: websiteCTAClicks

1. Click `Create Field`
2. Configurar:
   - **Type:** `Int`
   - **Name:** `websiteCTAClicks`
   - **Label:** `Website CTA Clicks`
   - **Default:** `0`
3. Click `Save`

#### Campo 29: websiteFormViews

1. Click `Create Field`
2. Configurar:
   - **Type:** `Int`
   - **Name:** `websiteFormViews`
   - **Label:** `Website Form Views`
   - **Default:** `0`
3. Click `Save`

### Paso 1.8: Configurar Layouts

1. En la página de Lead, click en la pestaña `Layouts`
2. Seleccionar `Detail` layout
3. Click en `Edit`
4. Crear nueva sección "Drip Campaign":
   - Click `Add Panel`
   - Name: `Drip Campaign`
   - Arrastrar campos:
     - dripCampaignStatus
     - dripCampaignType
     - dripCampaignStartDate
     - dripCampaignLastEmailSent
     - dripCampaignNextEmailDate
     - dripCampaignEmailSequence
5. Crear nueva sección "Lead Scoring":
   - Click `Add Panel`
   - Name: `Lead Scoring`
   - Arrastrar campos:
     - leadScore
     - leadScoreCategory
     - leadScoreDemographic
     - leadScoreBehavioral
     - leadScoreEngagement
     - leadScoreFormSubmission
     - leadScoreLastUpdated
6. Crear nueva sección "Web Tracking":
   - Click `Add Panel`
   - Name: `Web Tracking`
   - Arrastrar campos:
     - websiteVisits
     - websitePagesViewed
     - websiteTimeOnSite
     - websiteFirstVisit
     - websiteLastVisit
     - websiteCTAClicks
     - websiteFormViews
7. Click `Save`

✅ **Verificación:** Crear un Lead de prueba y verificar que todos los campos aparecen correctamente.

---

## SECCIÓN 2: CREAR TARGET LISTS (15 minutos)

1. Ir a `Marketing > Target Lists`
2. Click `Create Target List`
3. Crear las siguientes listas (una por una):

**Lista 1:**
- Name: `Drip Campaign - News and Offers Active`
- Description: `Leads actively enrolled in News and Offers drip campaign`
- Click `Save`

**Lista 2:**
- Name: `Drip Campaign - Get Personalized Assistance Active`
- Description: `Leads actively enrolled in Get Personalized Assistance drip campaign`
- Click `Save`

**Lista 3:**
- Name: `Drip Campaign - Email 1`
- Description: `Leads who received Email 1`
- Click `Save`

**Lista 4:**
- Name: `Drip Campaign - Email 2`
- Description: `Leads who received Email 2`
- Click `Save`

**Lista 5:**
- Name: `Drip Campaign - Email 3`
- Description: `Leads who received Email 3`
- Click `Save`

**Lista 6:**
- Name: `Drip Campaign - Email 4`
- Description: `Leads who received Email 4`
- Click `Save`

**Lista 7:**
- Name: `Drip Campaign - Email 5`
- Description: `Leads who received Email 5`
- Click `Save`

**Lista 8:**
- Name: `Drip Campaign - Email 6`
- Description: `Leads who received Email 6`
- Click `Save`

**Lista 9:**
- Name: `Drip Campaign - Paused`
- Description: `Leads with paused drip campaigns`
- Click `Save`

**Lista 10:**
- Name: `Drip Campaign - Opted Out`
- Description: `Leads who opted out of drip campaigns`
- Click `Save`

✅ **Verificación:** Verificar que todas las listas aparecen en `Marketing > Target Lists`

---

## SECCIÓN 3: CONFIGURAR SMTP (30 minutos)

### Opción A: Gmail SMTP (Recomendado para empezar)

1. Ir a `Administración > Settings > Outbound Emails`
2. Seleccionar `SMTP`
3. Configurar:
   - **SMTP Server:** `smtp.gmail.com`
   - **Port:** `587`
   - **Security:** `TLS`
   - **Username:** Tu email de Gmail
   - **Password:** App Password de Gmail (ver instrucciones abajo)
4. Click `Test Email Sending`
5. Ingresar un email de prueba
6. Verificar que recibes el email
7. Click `Save`

**Cómo obtener App Password de Gmail:**
1. Ir a tu cuenta de Google: https://myaccount.google.com/
2. Security → 2-Step Verification (debe estar activado)
3. App Passwords → Generate
4. Seleccionar "Mail" y "Other (Custom name)"
5. Nombre: "EspoCRM"
6. Copiar el password generado (16 caracteres)
7. Usar ese password en EspoCRM

### Opción B: SendGrid, Mailgun, o otro proveedor

1. Obtener credenciales SMTP de tu proveedor
2. Configurar en EspoCRM con las credenciales
3. Test email sending
4. Save

### Configurar Email Accounts para Agentes

1. Ir a `Administración > Settings > Email Accounts`
2. Para cada agente:
   - Click `Create Email Account`
   - Email Address: Email del agente
   - SMTP configurado arriba
   - Assigned User: Seleccionar usuario agente
   - Click `Save`

✅ **Verificación:** Enviar email de prueba desde cada cuenta de agente.

---

## SECCIÓN 4: CREAR EMAIL TEMPLATES (1 hora)

1. Ir a `Administración > Email Templates`
2. Click `Create Email Template`

### Template 1: Drip Email 1 - News and Offers

1. **Name:** `Drip Email 1 - News and Offers - Welcome & Promotions`
2. **Subject (EN):** `{{lead.name}}, Welcome to Dolphin Blue Paradise - Your Eco-Luxury Escape Awaits`
3. **Subject (ES):** `{{lead.name}}, Bienvenido a Dolphin Blue Paradise - Tu Escape Eco-Lujo Te Espera`
4. **Body:** Copiar contenido completo del documento `docs/complete-implementation-guide.md` sección "Email Templates - Template 1"
5. **Variables disponibles:** `{{lead.name}}`, `{{lead.assignedAgentName}}`, `{{lead.assignedAgentEmail}}`
6. Click `Save`

### Template 2: Drip Email 2

1. **Name:** `Drip Email 2 - Paradise Between Jungle & Sea`
2. **Subject (EN):** `{{lead.name}}, Experience True Off-Grid Luxury`
3. Copiar contenido del Template 2
4. Click `Save`

### Template 3: Drip Email 3

1. **Name:** `Drip Email 3 - Eco-Luxury Experience`
2. **Subject (EN):** `{{lead.name}}, Real Sustainability, Real Luxury`
3. Copiar contenido del Template 3
4. Click `Save`

### Template 4: Drip Email 4

1. **Name:** `Drip Email 4 - Let Me Handle Details`
2. **Subject (EN):** `{{lead.name}}, I'll Handle All the Details`
3. Copiar contenido del Template 4
4. Click `Save`

### Template 5: Drip Email 5

1. **Name:** `Drip Email 5 - Farm-to-Table Dining`
2. **Subject (EN):** `{{lead.name}}, Dining at Blø Bar & Restaurant`
3. Copiar contenido del Template 5
4. Click `Save`

### Template 6: Drip Email 6

1. **Name:** `Drip Email 6 - Adventures Await`
2. **Subject (EN):** `{{lead.name}}, Your Caribbean Adventure Awaits`
3. Copiar contenido del Template 6
4. Click `Save`

### Template 7: Manual Email 1

1. **Name:** `Email 1 - Get Personalized Assistance - Manual Template`
2. **Subject (EN):** `{{lead.name}}, Welcome to Dolphin Blue Paradise - Let's Plan Your Stay`
3. Copiar contenido del Template 7 (con sección de personalización)
4. Click `Save`

✅ **Verificación:** Crear un Lead de prueba y enviar un email usando cada template para verificar que los placeholders funcionan.

---

## SECCIÓN 5: CREAR WORKFLOWS BPM (2-3 horas)

### Workflow 1: News and Offers → Start Campaign

1. Ir a `Administración > Workflows`
2. Click `Create Workflow`
3. Configurar:
   - **Name:** `Drip Campaign - News and Offers - Start`
   - **Type:** `Record`
   - **Entity Type:** `Lead`
   - **Trigger Type:** `Record Created`
4. Click `Conditions`:
   - Add condition:
     - Field: `formSource`
     - Type: `equals`
     - Value: `News and Offers Form`
   - Add condition:
     - Field: `dripCampaignStatus`
     - Type: `equals`
     - Value: `Not Enrolled`
   - Add condition:
     - Field: `consentEmailMarketing` (o el campo de consentimiento que uses)
     - Type: `equals`
     - Value: `true`
5. Click `Actions`:
   
   **Action 1: Assign to User**
   - Type: `Assign to User`
   - Logic: 
     - If `preferredLanguage` equals `ES` → Assign to Spanish-speaking agent
     - Else → Round-Robin assignment
   
   **Action 2: Update Fields**
   - Type: `Update Fields`
   - Fields to update:
     - `assignedAgentEmail` = `{{assignedAgent.emailAddress}}`
     - `assignedAgentName` = `{{assignedAgent.name}}`
     - `dripCampaignType` = `News and Offers`
     - `dripCampaignStatus` = `Active (Email 1)`
     - `dripCampaignStartDate` = `{{now}}`
     - `dripCampaignEmailSequence` = `1`
     - `dripCampaignNextEmailDate` = `{{now}}`
   
   **Action 3: Send Email**
   - Type: `Send Email`
   - Template: `Drip Email 1 - News and Offers - Welcome & Promotions`
   - To: `{{emailAddress}}`
   - From: `{{assignedAgentEmail}}`
   
   **Action 4: Add to Target List**
   - Type: `Add to Target List`
   - Target List: `Drip Campaign - News and Offers Active`
   - Also add to: `Drip Campaign - Email 1`
   
   **Action 5: Create Scheduled Job** (para Email 2)
   - Type: `Create Scheduled Job`
   - Workflow: `Drip Campaign - Send Email 2` (crear después)
   - Execute at: `{{now + 3 days}}`
   - Entity Type: `Lead`
   - Entity ID: `{{id}}`

6. Click `Save`
7. **Activar workflow:** Toggle switch en la parte superior

### Workflow 2: Get Personalized Assistance → Wait for Manual

1. Crear nuevo workflow
2. Configurar:
   - **Name:** `Drip Campaign - Get Personalized Assistance - Wait for Manual`
   - **Type:** `Record`
   - **Entity Type:** `Lead`
   - **Trigger Type:** `Record Created`
3. Conditions:
   - `formSource` equals `Get Personalized Assistance Form`
   - `dripCampaignStatus` equals `Not Enrolled`
4. Actions:
   
   **Action 1: Assign to User**
   - Misma lógica que Workflow 1
   
   **Action 2: Update Fields**
   - `assignedAgentEmail` = `{{assignedAgent.emailAddress}}`
   - `assignedAgentName` = `{{assignedAgent.name}}`
   - `dripCampaignType` = `Get Personalized Assistance`
   - `dripCampaignStatus` = `Waiting for Manual Email 1`
   
   **Action 3: Create Task**
   - Type: `Create Task`
   - Name: `Send personalized Email 1 to {{name}}`
   - Assigned To: `{{assignedAgent}}`
   - Due Date: `{{now + 2 hours}}`
   - Priority: `High`
   - Description: 
     ```
     Form submitted via Get Personalized Assistance form.
     Arrival: {{arrivalDate}}
     Departure: {{departureDate}}
     Party Size: {{partySize}}
     Message: {{description}}
     Interests: {{interestsWeb}}
     ```
   
   **Action 4: Add to Target List**
   - Target List: `Drip Campaign - Get Personalized Assistance Active`

5. Click `Save` y Activar

### Workflow 3: Send Email 2 (Automático)

1. Crear nuevo workflow
2. Configurar:
   - **Name:** `Drip Campaign - Send Email 2`
   - **Type:** `Scheduled`
   - **Entity Type:** `Lead`
   - **Trigger Type:** `Scheduled Job`
3. Conditions:
   - `dripCampaignStatus` equals `Active (Email 2)`
   - `dripCampaignNextEmailDate` less than or equal to `{{now}}`
   - `hasResponded` equals `false`
   - `status` not equals `Booked`
   - `dripCampaignStatus` not equals `Opted Out`
4. Actions:
   
   **Action 1: Send Email**
   - Template: `Drip Email 2 - Paradise Between Jungle & Sea`
   - To: `{{emailAddress}}`
   - From: `{{assignedAgentEmail}}`
   
   **Action 2: Update Fields**
   - `dripCampaignLastEmailSent` = `{{now}}`
   - `dripCampaignEmailSequence` = `2`
   - `dripCampaignNextEmailDate` = `{{now + 4 days}}`
   - `dripCampaignStatus` = `Active (Email 3)`
   
   **Action 3: Remove from Target List**
   - Target List: `Drip Campaign - Email 2`
   
   **Action 4: Add to Target List**
   - Target List: `Drip Campaign - Email 3`
   
   **Action 5: Create Scheduled Job**
   - Workflow: `Drip Campaign - Send Email 3`
   - Execute at: `{{now + 4 days}}`

5. Click `Save` y Activar

**Repetir para Workflows 4-7 (Emails 3-6)** con los delays apropiados:
- Email 3: 4 días después de Email 2 (total 7 días)
- Email 4: 3 días después de Email 3 (total 10 días)
- Email 5: 4 días después de Email 4 (total 14 días)
- Email 6: 4 días después de Email 5 (total 18 días)

### Workflow 8: Stop Campaign on Response

1. Crear nuevo workflow
2. Configurar:
   - **Name:** `Drip Campaign - Stop on Response`
   - **Type:** `Record`
   - **Entity Type:** `Lead`
   - **Trigger Type:** `Record Updated`
3. Conditions:
   - `hasResponded` equals `true`
   OR `lastEmailResponseDate` changed
   OR `lastSMSResponseDate` changed (si existe)
   OR `lastCallDate` changed (si existe)
   OR `status` equals `Booked`
   OR `status` equals `Converted`
4. Actions:
   
   **Action 1: Update Fields**
   - `dripCampaignStatus` = `Paused`
   
   **Action 2: Remove from Target Lists**
   - Remover de todas las Target Lists activas
   
   **Action 3: Create Note**
   - Note: `Campaign paused due to response on {{now}}`
   - Type: `System`

5. Click `Save` y Activar

### Workflow 9: Stop Campaign on Opt-Out

1. Crear nuevo workflow
2. Configurar:
   - **Name:** `Drip Campaign - Stop on Opt-Out`
   - **Type:** `Record`
   - **Entity Type:** `Lead`
   - **Trigger Type:** `Record Updated`
3. Conditions:
   - `consentEmailMarketing` equals `false`
   OR `optOutDate` changed
4. Actions:
   
   **Action 1: Update Fields**
   - `dripCampaignStatus` = `Opted Out`
   - `optOutDate` = `{{now}}`
   - `consentEmailMarketing` = `false`
   
   **Action 2: Remove from Target Lists**
   - Remover de todas las Target Lists

5. Click `Save` y Activar

### Workflows de Lead Scoring

Ver documento `docs/complete-implementation-guide.md` sección "Lead Scoring Implementation" para workflows detallados.

---

## SECCIÓN 6: CONFIGURAR n8n WORKFLOW (1 hora)

1. Login a n8n
2. Crear nuevo workflow
3. Importar JSON del documento `docs/ga4-integration-scripts.md`
4. Configurar variables de entorno:
   - `ESPOCRM_URL`
   - `ESPOCRM_API_KEY`
5. Test con evento de prueba
6. Activar workflow
7. Copiar webhook URL para usar en GA4

---

## SECCIÓN 7: CONFIGURAR MOBILE APP (30 minutos)

1. Descargar EspoCRM Mobile App desde App Store (iOS) o Play Store (Android)
2. Abrir app
3. Ingresar URL del servidor EspoCRM (ej: `https://crm.yourdomain.com`)
4. Login con credenciales de EspoCRM
5. Configurar notificaciones push (opcional):
   - iOS: Requiere configuración APNS en EspoCRM
   - Android: Requiere configuración FCM en EspoCRM
6. Personalizar vistas según instrucciones en `docs/complete-implementation-guide.md`

---

## SECCIÓN 8: TESTING COMPLETO (1 hora)

### Test 1: News and Offers Form

1. Ir a `/form_testing` en el sitio web
2. Llenar formulario "News and Offers"
3. Submit
4. Verificar en EspoCRM:
   - ✅ Lead creado
   - ✅ `formSource` = "News and Offers Form"
   - ✅ `dripCampaignStatus` = "Active (Email 1)"
   - ✅ Email 1 enviado
   - ✅ Agente asignado
   - ✅ En Target List correcta

### Test 2: Get Personalized Assistance Form

1. Llenar formulario "Get Personalized Assistance"
2. Submit
3. Verificar en EspoCRM:
   - ✅ Lead creado
   - ✅ `formSource` = "Get Personalized Assistance Form"
   - ✅ `dripCampaignStatus` = "Waiting for Manual Email 1"
   - ✅ NO email enviado automáticamente
   - ✅ Tarea creada para agente
   - ✅ Agente asignado

### Test 3: Lead Scoring

1. Crear lead manualmente con datos completos
2. Verificar que `leadScoreDemographic` se calcula
3. Simular evento GA4 (usar n8n webhook)
4. Verificar que `leadScoreBehavioral` se actualiza
5. Verificar que `leadScore` total se recalcula
6. Verificar que `leadScoreCategory` se actualiza

### Test 4: Workflows de Email

1. Esperar 3 días después de Test 1
2. Verificar que Email 2 se envía automáticamente
3. Verificar que campos se actualizan correctamente
4. Verificar que Target Lists se actualizan

---

## CHECKLIST FINAL

- [ ] Todos los campos personalizados creados
- [ ] Layouts configurados
- [ ] Todas las Target Lists creadas
- [ ] SMTP configurado y testeado
- [ ] Todos los email templates creados
- [ ] Todos los workflows creados y activados
- [ ] n8n workflow configurado
- [ ] Mobile app configurada
- [ ] Testing completo realizado
- [ ] Documentación guardada

---

## SOPORTE

Si encuentras problemas durante la configuración:

1. Revisar logs de EspoCRM: `Administración > Logs`
2. Revisar ejecuciones de n8n: Dashboard > Executions
3. Verificar que todos los campos existen antes de crear workflows
4. Verificar que los workflows están activados
5. Verificar permisos de usuarios

---

**FIN DE LAS INSTRUCCIONES**

¡Felicitaciones! Has completado la configuración del sistema de drip campaigns, lead scoring, GA4 integration y mobile app para Dolphin Blue Paradise.

