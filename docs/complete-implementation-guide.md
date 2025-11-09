# Implementación Completa - Drip Campaigns + Lead Scoring + GA4 + Mobile App
## Dolphin Blue Paradise - EspoCRM

**Fecha:** Noviembre 2025  
**Versión:** 1.0  
**Estado:** Implementación Inicial

---

## TABLA DE CONTENIDOS

1. [Resumen Ejecutivo](#resumen-ejecutivo)
2. [Lead Scoring Implementation](#lead-scoring-implementation)
3. [GA4 Behavioral Tracking Integration](#ga4-behavioral-tracking-integration)
4. [Mobile App Setup](#mobile-app-setup)
5. [Email Templates - Drafts Completos](#email-templates---drafts-completos)
6. [Instrucciones de Configuración Manual](#instrucciones-de-configuración-manual)
7. [Testing & QA](#testing--qa)
8. [Training Materials](#training-materials)

---

## RESUMEN EJECUTIVO

Este documento detalla la implementación completa del sistema de drip campaigns en EspoCRM para Dolphin Blue Paradise, incluyendo:

- ✅ **Drip Campaigns** - 2 formularios con automatización completa
- ✅ **Lead Scoring** - Sistema automático basado en comportamiento
- ✅ **GA4 Integration** - Tracking de comportamiento web para scoring
- ✅ **Mobile App** - Acceso móvil para el equipo concierge
- ✅ **Email Templates** - 7 templates completos listos para usar

**Tiempo Estimado:** 8-10 semanas  
**Costo:** Solo hosting y desarrollo (vs $10,680-38,400/año de HubSpot)

---

## LEAD SCORING IMPLEMENTATION

### 1. Modelo de Scoring

#### Factores de Scoring

**Demographic Score (0-30 puntos):**
- Email válido: +5
- Teléfono válido: +5
- Fechas de viaje especificadas: +10
- Party size especificado: +5
- Intereses múltiples seleccionados: +5

**Behavioral Score (0-50 puntos):**
- Visita página de Rooms: +5
- Visita página de Experiences: +5
- Visita página de Dining: +5
- Visita Plan Your Journey: +10
- Visita página de Contact: +10
- Múltiples visitas al sitio (>3): +10
- Tiempo en sitio >5 minutos: +5

**Engagement Score (0-30 puntos):**
- Abre Email 1: +5
- Abre Email 2: +5
- Abre Email 3: +5
- Click en email: +10
- Responde a email: +15
- Click en CTA del sitio: +5

**Form Submission Score (0-40 puntos):**
- News and Offers Form: +10
- Get Personalized Assistance Form: +20
- Newsletter Popup: +5
- Chatwoot engagement: +15
- Múltiples formularios: +10

**Total Máximo:** 150 puntos

#### Thresholds

- **Hot Lead (100-150 puntos):** Asignar inmediatamente, seguimiento prioritario
- **Warm Lead (50-99 puntos):** Seguimiento estándar, continuar drip campaign
- **Cold Lead (0-49 puntos):** Seguimiento básico, enfocar en educación

### 2. Campos Personalizados Necesarios

```php
// Lead Entity - Campos de Lead Scoring

leadScore: int (default: 0)
  - Rango: 0-150
  - Descripción: Puntuación total del lead

leadScoreDemographic: int (default: 0)
  - Rango: 0-30
  - Descripción: Puntuación demográfica

leadScoreBehavioral: int (default: 0)
  - Rango: 0-50
  - Descripción: Puntuación basada en comportamiento web

leadScoreEngagement: int (default: 0)
  - Rango: 0-30
  - Descripción: Puntuación de engagement con emails

leadScoreFormSubmission: int (default: 0)
  - Rango: 0-40
  - Descripción: Puntuación por formularios enviados

leadScoreLastUpdated: datetime
  - Descripción: Última vez que se actualizó el score

leadScoreCategory: enum
  - Hot (100-150)
  - Warm (50-99)
  - Cold (0-49)
  - Default: Cold

// Campos de Tracking Web (para GA4)
websiteVisits: int (default: 0)
websitePagesViewed: int (default: 0)
websiteTimeOnSite: int (default: 0) // en segundos
websiteLastVisit: datetime
websiteFirstVisit: datetime
websitePagesVisited: text (JSON array)
websiteCTAClicks: int (default: 0)
websiteFormViews: int (default: 0)
```

### 3. Workflows de Scoring

#### Workflow 1: Calculate Demographic Score

```
Name: "Lead Scoring - Calculate Demographic"
Type: Record
Entity Type: Lead
Trigger Type: Record Created or Updated
Conditions:
  - Any demographic field changed

Actions:
  1. Calculate Score:
     - If emailAddress is valid: +5
     - If phoneNumber is valid: +5
     - If arrivalDate AND departureDate exist: +10
     - If partySize exists: +5
     - If interestsWeb count > 1: +5
  
  2. Update Fields:
     - leadScoreDemographic = calculated score
     - Recalculate total leadScore
     - Update leadScoreCategory
     - leadScoreLastUpdated = now()
```

#### Workflow 2: Update Behavioral Score (from GA4)

```
Name: "Lead Scoring - Update Behavioral from GA4"
Type: Record
Entity Type: Lead
Trigger Type: Record Updated
Conditions:
  - websiteVisits changed
  OR websitePagesViewed changed
  OR websiteTimeOnSite changed

Actions:
  1. Calculate Score:
     - websiteVisits * 2 (max 20)
     - websitePagesViewed * 1 (max 20)
     - If websiteTimeOnSite > 300: +10
  
  2. Update Fields:
     - leadScoreBehavioral = calculated score
     - Recalculate total leadScore
     - Update leadScoreCategory
     - leadScoreLastUpdated = now()
```

#### Workflow 3: Update Engagement Score

```
Name: "Lead Scoring - Update Engagement"
Type: Record
Entity Type: Lead
Trigger Type: Record Updated
Conditions:
  - emailResponseCount changed
  OR hasResponded changed

Actions:
  1. Calculate Score:
     - emailResponseCount * 5 (max 15)
     - If hasResponded = true: +15
  
  2. Update Fields:
     - leadScoreEngagement = calculated score
     - Recalculate total leadScore
     - Update leadScoreCategory
     - leadScoreLastUpdated = now()
```

#### Workflow 4: Recalculate Total Score

```
Name: "Lead Scoring - Recalculate Total"
Type: Formula
Entity Type: Lead
Trigger: After any score component changes

Formula:
leadScore = leadScoreDemographic + leadScoreBehavioral + leadScoreEngagement + leadScoreFormSubmission

Then update:
- If leadScore >= 100: leadScoreCategory = "Hot"
- Else if leadScore >= 50: leadScoreCategory = "Warm"
- Else: leadScoreCategory = "Cold"
```

### 4. Integración con n8n para GA4

**Flujo n8n: GA4 → EspoCRM Lead Update**

```
Trigger: GA4 Event (via Measurement Protocol or BigQuery)
  - Event: page_view, form_view, cta_click, etc.
  - User ID: email del visitante

Actions:
  1. Find Lead in EspoCRM by email
  2. If found:
     - Update websiteVisits (+1)
     - Update websitePagesViewed (+1)
     - Add page to websitePagesVisited array
     - Update websiteTimeOnSite
     - Update websiteLastVisit
  3. If not found:
     - Create new Lead with email
     - Set websiteFirstVisit = now()
  4. Trigger workflow "Update Behavioral Score"
```

---

## GA4 BEHAVIORAL TRACKING INTEGRATION

### 1. Eventos GA4 a Trackear

#### Eventos Personalizados

```javascript
// 1. Page Views (automático, pero con user_id)
gtag('config', 'GA_MEASUREMENT_ID', {
  'user_id': '{{email}}' // Si está disponible
});

// 2. Form Views
gtag('event', 'form_view', {
  'form_name': 'news_and_offers' | 'personalized_assistance',
  'form_location': 'homepage' | 'contact_page' | 'popup'
});

// 3. Form Starts (usuario empieza a llenar)
gtag('event', 'form_start', {
  'form_name': 'news_and_offers' | 'personalized_assistance'
});

// 4. CTA Clicks
gtag('event', 'cta_click', {
  'cta_name': 'book_now' | 'plan_journey' | 'contact_us',
  'cta_location': 'hero' | 'rooms' | 'experiences'
});

// 5. Page Engagement
gtag('event', 'page_engagement', {
  'page_path': '/rooms/premium-deluxe',
  'engagement_time_msec': 5000,
  'scroll_depth': 75
});

// 6. Email Link Clicks (desde emails)
gtag('event', 'email_link_click', {
  'link_url': 'https://...',
  'email_campaign': 'drip_email_1',
  'link_text': 'Book Now'
});
```

### 2. Configuración GA4

#### Measurement Protocol API

Para enviar eventos desde el servidor (n8n) a GA4:

```javascript
// n8n HTTP Request Node
POST https://www.google-analytics.com/mp/collect?api_secret=YOUR_SECRET&measurement_id=GA_MEASUREMENT_ID

Body:
{
  "client_id": "{{email}}",
  "events": [{
    "name": "form_submission",
    "params": {
      "form_name": "news_and_offers",
      "lead_id": "{{espocrm_lead_id}}"
    }
  }]
}
```

#### BigQuery Export (Opcional, para análisis avanzado)

1. Habilitar BigQuery export en GA4
2. Crear query para extraer eventos de leads
3. n8n lee BigQuery cada hora
4. Actualiza EspoCRM con datos de comportamiento

### 3. Scripts Frontend

#### Google Tag Manager - Custom HTML Tags

**Tag: Form View Tracking**
```html
<script>
(function() {
  // Track form views
  document.querySelectorAll('form').forEach(function(form) {
    var formName = form.getAttribute('data-form-name') || 'unknown';
    
    // Intersection Observer para detectar cuando form es visible
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          dataLayer.push({
            'event': 'form_view',
            'form_name': formName,
            'form_location': window.location.pathname
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    observer.observe(form);
  });
})();
</script>
```

**Tag: CTA Click Tracking**
```html
<script>
(function() {
  document.querySelectorAll('[data-cta]').forEach(function(cta) {
    cta.addEventListener('click', function() {
      dataLayer.push({
        'event': 'cta_click',
        'cta_name': cta.getAttribute('data-cta'),
        'cta_location': cta.closest('section')?.id || 'unknown',
        'cta_text': cta.textContent.trim()
      });
    });
  });
})();
</script>
```

### 4. n8n Workflow: GA4 → EspoCRM

**Workflow Steps:**

1. **Trigger:** Webhook (GA4 Measurement Protocol) o Scheduled (BigQuery)
2. **Extract Data:** Parse event data
3. **Find Lead:** Search EspoCRM by email/user_id
4. **Update Lead:** 
   - Increment counters
   - Update timestamps
   - Add to arrays
5. **Trigger Workflow:** Call EspoCRM API to trigger scoring workflow

**n8n JSON Configuration:**

```json
{
  "name": "GA4 to EspoCRM Lead Update",
  "nodes": [
    {
      "name": "Webhook",
      "type": "n8n-nodes-base.webhook",
      "parameters": {
        "path": "ga4-events",
        "httpMethod": "POST"
      }
    },
    {
      "name": "Extract Email",
      "type": "n8n-nodes-base.function",
      "parameters": {
        "functionCode": "// Extract email from GA4 event\nconst email = items[0].json.body.events[0].params.user_email || items[0].json.body.client_id;\nreturn [{ json: { email } }];"
      }
    },
    {
      "name": "Find Lead in EspoCRM",
      "type": "n8n-nodes-base.httpRequest",
      "parameters": {
        "method": "GET",
        "url": "={{ $env.ESPOCRM_URL }}/Lead",
        "authentication": "genericCredentialType",
        "genericAuthType": "httpHeaderAuth",
        "sendHeaders": true,
        "headerParameters": {
          "X-Api-Key": "={{ $env.ESPOCRM_API_KEY }}"
        },
        "qs": {
          "where[0][type]": "equals",
          "where[0][attribute]": "emailAddress",
          "where[0][value]": "={{ $json.email }}"
        }
      }
    },
    {
      "name": "Update Lead",
      "type": "n8n-nodes-base.httpRequest",
      "parameters": {
        "method": "PUT",
        "url": "={{ $env.ESPOCRM_URL }}/Lead/{{ $json.id }}",
        "authentication": "genericCredentialType",
        "genericAuthType": "httpHeaderAuth",
        "sendBody": true,
        "bodyParameters": {
          "websiteVisits": "={{ $json.websiteVisits + 1 }}",
          "websiteLastVisit": "={{ $now }}"
        }
      }
    }
  ]
}
```

---

## MOBILE APP SETUP

### 1. EspoCRM Mobile App - Overview

EspoCRM ofrece una aplicación móvil oficial disponible para iOS y Android.

**Características Disponibles:**
- ✅ Ver y editar leads
- ✅ Ver y crear actividades (calls, meetings, tasks)
- ✅ Ver y enviar emails
- ✅ Ver contactos y cuentas
- ✅ Notificaciones push
- ✅ Búsqueda
- ✅ Vistas personalizadas
- ✅ Sincronización offline básica

**Limitaciones:**
- ⚠️ Workflows no se ejecutan desde mobile
- ⚠️ Dashboards limitados
- ⚠️ Reportes básicos
- ⚠️ No todas las customizaciones disponibles

### 2. Instalación y Configuración

#### Paso 1: Descargar App

**iOS:**
- App Store: Buscar "EspoCRM"
- Requiere iOS 12.0 o superior

**Android:**
- Google Play Store: Buscar "EspoCRM"
- Requiere Android 7.0 o superior

#### Paso 2: Configurar en EspoCRM

1. **Habilitar Mobile App Access:**
   - Ir a `Administración > Settings > Mobile`
   - Habilitar "Mobile App"
   - Configurar URL del servidor

2. **Configurar Push Notifications (Opcional):**
   - iOS: Configurar Apple Push Notification Service (APNS)
   - Android: Configurar Firebase Cloud Messaging (FCM)

3. **Configurar Vistas para Mobile:**
   - Ir a `Administración > Entity Manager > Lead > Views`
   - Crear vista específica para mobile con campos esenciales:
     - Name
     - Email
     - Phone
     - Lead Score
     - Lead Score Category
     - Drip Campaign Status
     - Assigned Agent
     - Status

#### Paso 3: Configurar Permisos

1. **Roles:**
   - Ir a `Administración > Roles`
   - Editar rol "Concierge"
   - Habilitar acceso mobile
   - Configurar permisos de lectura/escritura

2. **Teams:**
   - Asegurar que usuarios están en teams correctos
   - Mobile app respeta team permissions

### 3. Configuración Específica para Drip Campaigns

#### Vistas Personalizadas

**Vista: "My Active Drip Campaigns"**
- Filtro: `assignedAgent = current user` AND `dripCampaignStatus contains "Active"`
- Campos: Name, Email, Campaign Type, Email Sequence, Next Email Date, Lead Score

**Vista: "Waiting for Manual Email 1"**
- Filtro: `assignedAgent = current user` AND `dripCampaignStatus = "Waiting for Manual Email 1"`
- Campos: Name, Email, Form Submission Date, Message Preview

**Vista: "Hot Leads"**
- Filtro: `leadScoreCategory = "Hot"`
- Campos: Name, Email, Phone, Lead Score, Last Activity

#### Acciones Rápidas

Configurar acciones rápidas en mobile:
1. "Mark as Responded" - Actualiza hasResponded = true
2. "Pause Campaign" - Pausa drip campaign
3. "Call Lead" - Abre teléfono con número del lead
4. "Send Email" - Abre cliente de email

### 4. Training para Mobile App

**Guía Rápida:**
1. Login con credenciales de EspoCRM
2. Navegar a Leads
3. Ver leads asignados
4. Editar lead (tap en lead)
5. Crear actividad (call, email, task)
6. Marcar como respondido
7. Pausar campaña

**Best Practices:**
- Revisar "Waiting for Manual Email 1" diariamente
- Responder a Hot Leads dentro de 2 horas
- Usar notas para contexto rápido
- Sincronizar antes de trabajar offline

---

## EMAIL TEMPLATES - DRAFTS COMPLETOS

### Template 1: Drip Email 1 - News and Offers - Welcome & Promotions

**Subject (EN):** `{{lead.name}}, Welcome to Dolphin Blue Paradise - Your Eco-Luxury Escape Awaits`

**Subject (ES):** `{{lead.name}}, Bienvenido a Dolphin Blue Paradise - Tu Escape Eco-Lujo Te Espera`

**From:** `{{lead.assignedAgentEmail}}`  
**Reply-To:** `{{lead.assignedAgentEmail}}`

**Body (EN):**

```
Hello {{lead.name}},

I'm {{lead.assignedAgentName}}, your personal concierge at Dolphin Blue Paradise. Thank you for your interest in our eco-luxury resort nestled between the jungle and the Caribbean Sea.

I wanted to personally reach out and share some exciting news about what makes Dolphin Blue Paradise truly special:

🏝️ **Paradise Between Jungle & Sea**
Our 4 unique cabanas sit on Isla San Cristóbal in Bahia Delfines, where 80 resident dolphins call home. Imagine waking up to the sound of waves and jungle birds, completely off-grid yet with all the comforts you deserve.

💰 **Special Offer - Limited Time**
For a limited time, we're offering 30% off stays of 4+ nights during high season. This includes:
- Complimentary boat transfer from Bocas Town
- Daily farm-to-table breakfast
- Access to our private swim platform
- Dolphin watching from your cabana

📋 **Our 4 Unique Accommodations:**

1. **Premium Deluxe Sea View Cabana** (33 m²)
   - California king bed
   - Private terrace with hammock
   - Up to 2 guests
   - Starting at $XXX/night

2. **Sea View Cabanas** (20 m², renovated Feb 2024)
   - King bed
   - Ocean views
   - Up to 2 guests
   - Starting at $XXX/night

3. **Dolphin View Room** (30 m²)
   - King bed
   - Large terrace perfect for dolphin watching
   - Up to 2 guests
   - Starting at $XXX/night

4. **Family Jungle Room** (60+ m²)
   - King + twin beds
   - Bathtub and shower
   - Up to 3 guests
   - Starting at $XXX/night

✨ **What's Included:**
- 100% solar-powered accommodations
- Farm-to-table dining at Blø Bar & Restaurant
- Access to private swim platform
- Dolphin watching from property
- Concierge service from booking to departure
- Complimentary WiFi (limited, embrace the disconnect!)

I'd love to help you plan your perfect stay. Do you have specific dates in mind? Any questions about our accommodations, activities, or sustainability practices?

Feel free to reply to this email or reach me directly at:
📱 WhatsApp: +507 6346 0605
📧 Email: {{lead.assignedAgentEmail}}

Looking forward to welcoming you to paradise!

Warm regards,
{{lead.assignedAgentName}}
Concierge Specialist
Dolphin Blue Paradise
Isla San Cristóbal, Bocas del Toro, Panama

---
P.S. Curious about our sustainability practices? We're 100% solar-powered, collect rainwater, and source from our organic garden. Learn more: [link to sustainability page]
```

**Body (ES):**

```
Hola {{lead.name}},

Soy {{lead.assignedAgentName}}, tu conserje personal en Dolphin Blue Paradise. Gracias por tu interés en nuestro resort eco-lujo ubicado entre la selva y el Mar Caribe.

Quería contactarte personalmente para compartirte algunas noticias emocionantes sobre lo que hace a Dolphin Blue Paradise verdaderamente especial:

🏝️ **Paraíso Entre Selva y Mar**
Nuestras 4 cabañas únicas están en Isla San Cristóbal en Bahia Delfines, donde 80 delfines residentes llaman hogar. Imagina despertar con el sonido de las olas y los pájaros de la selva, completamente fuera de la red pero con todas las comodidades que mereces.

💰 **Oferta Especial - Tiempo Limitado**
Por tiempo limitado, estamos ofreciendo 30% de descuento en estadías de 4+ noches durante temporada alta. Esto incluye:
- Traslado en bote gratuito desde Bocas Town
- Desayuno farm-to-table diario
- Acceso a nuestra plataforma de natación privada
- Avistamiento de delfines desde tu cabaña

📋 **Nuestras 4 Acomodaciones Únicas:**

1. **Cabaña Premium Deluxe Vista al Mar** (33 m²)
   - Cama California king
   - Terraza privada con hamaca
   - Hasta 2 huéspedes
   - Desde $XXX/noche

2. **Cabañas Vista al Mar** (20 m², renovadas Feb 2024)
   - Cama king
   - Vistas al océano
   - Hasta 2 huéspedes
   - Desde $XXX/noche

3. **Habitación Vista Delfines** (30 m²)
   - Cama king
   - Terraza grande perfecta para ver delfines
   - Hasta 2 huéspedes
   - Desde $XXX/noche

4. **Habitación Familiar Selva** (60+ m²)
   - Camas king + individual
   - Bañera y ducha
   - Hasta 3 huéspedes
   - Desde $XXX/noche

✨ **Qué Incluye:**
- Acomodaciones 100% solares
- Comida farm-to-table en Blø Bar & Restaurant
- Acceso a plataforma de natación privada
- Avistamiento de delfines desde la propiedad
- Servicio de conserje desde reserva hasta salida
- WiFi gratuito (limitado, ¡abraza la desconexión!)

Me encantaría ayudarte a planear tu estadía perfecta. ¿Tienes fechas específicas en mente? ¿Alguna pregunta sobre nuestras acomodaciones, actividades o prácticas de sostenibilidad?

Siéntete libre de responder a este email o contactarme directamente en:
📱 WhatsApp: +507 6346 0605
📧 Email: {{lead.assignedAgentEmail}}

¡Espero darte la bienvenida al paraíso!

Saludos cordiales,
{{lead.assignedAgentName}}
Especialista en Conserjería
Dolphin Blue Paradise
Isla San Cristóbal, Bocas del Toro, Panamá

---
P.D. ¿Curioso sobre nuestras prácticas de sostenibilidad? Somos 100% solares, recolectamos agua de lluvia y obtenemos de nuestro jardín orgánico. Aprende más: [link a página de sostenibilidad]
```

---

### Template 2: Drip Email 2 - Paradise Between Jungle & Sea

**Subject (EN):** `{{lead.name}}, Experience True Off-Grid Luxury`

**Subject (ES):** `{{lead.name}}, Experimenta el Verdadero Lujo Fuera de la Red`

**From:** `{{lead.assignedAgentEmail}}`  
**Reply-To:** `{{lead.assignedAgentEmail}}`

**Body (EN):**

```
Hi {{lead.name}},

I hope this email finds you well. I wanted to share more about what makes Dolphin Blue Paradise a truly unique experience - our authentic off-grid lifestyle.

🌿 **100% Solar-Powered Paradise**
Every watt of electricity comes from our solar panels. No generators, no noise - just clean energy powering your stay. You'll notice the difference: the quiet, the connection to nature, the peace.

💧 **Rainwater Collection & Purification**
We collect and purify rainwater for all our needs. It's not just sustainable - it's some of the purest water you'll taste. Every shower, every glass of water connects you to the natural cycle.

🌊 **Between Jungle & Sea**
Our location is truly special. On one side, the Caribbean Sea with its 80 resident dolphins. On the other, the lush Panamanian jungle. You're in the middle of it all, experiencing both worlds.

🏡 **Our Off-Grid Philosophy**
Being off-grid doesn't mean sacrificing comfort. Our cabanas feature:
- Comfortable beds with quality linens
- Private terraces with hammocks
- Hot water (solar-heated, of course!)
- Limited WiFi (we encourage you to disconnect)
- Beautiful natural lighting

But more importantly, it means:
- No light pollution - incredible stargazing
- No noise pollution - just nature's sounds
- True connection to the environment
- A sense of peace you can't find elsewhere

🐬 **The Dolphins**
Bahia Delfines is home to 80 resident dolphins. You'll see them from your cabana, from our swim platform, and during our guided tours. They're part of our daily life here, and we're honored to share this space with them.

Would you like to learn more about our sustainability practices? Or perhaps you have questions about what "off-grid" really means for your stay?

I'm here to help!

Best,
{{lead.assignedAgentName}}
Concierge Specialist
Dolphin Blue Paradise

📱 WhatsApp: +507 6346 0605
📧 {{lead.assignedAgentEmail}}
```

**Body (ES):**

```
Hola {{lead.name}},

Espero que este email te encuentre bien. Quería compartirte más sobre lo que hace a Dolphin Blue Paradise una experiencia verdaderamente única - nuestro estilo de vida auténtico fuera de la red.

🌿 **Paraíso 100% Solar**
Cada vatio de electricidad viene de nuestros paneles solares. Sin generadores, sin ruido - solo energía limpia alimentando tu estadía. Notarás la diferencia: la quietud, la conexión con la naturaleza, la paz.

💧 **Recolección y Purificación de Agua de Lluvia**
Recolectamos y purificamos agua de lluvia para todas nuestras necesidades. No es solo sostenible - es una de las aguas más puras que probarás. Cada ducha, cada vaso de agua te conecta con el ciclo natural.

🌊 **Entre Selva y Mar**
Nuestra ubicación es verdaderamente especial. Por un lado, el Mar Caribe con sus 80 delfines residentes. Por el otro, la exuberante selva panameña. Estás en medio de todo, experimentando ambos mundos.

🏡 **Nuestra Filosofía Fuera de la Red**
Estar fuera de la red no significa sacrificar comodidad. Nuestras cabañas incluyen:
- Camas cómodas con ropa de cama de calidad
- Terrazas privadas con hamacas
- Agua caliente (¡calentada por solar, por supuesto!)
- WiFi limitado (te animamos a desconectarte)
- Hermosa iluminación natural

Pero más importante, significa:
- Sin contaminación lumínica - observación de estrellas increíble
- Sin contaminación acústica - solo sonidos de la naturaleza
- Verdadera conexión con el ambiente
- Una sensación de paz que no encontrarás en otro lugar

🐬 **Los Delfines**
Bahia Delfines es hogar de 80 delfines residentes. Los verás desde tu cabaña, desde nuestra plataforma de natación, y durante nuestros tours guiados. Son parte de nuestra vida diaria aquí, y estamos honrados de compartir este espacio con ellos.

¿Te gustaría aprender más sobre nuestras prácticas de sostenibilidad? ¿O tal vez tienes preguntas sobre qué significa realmente "fuera de la red" para tu estadía?

¡Estoy aquí para ayudar!

Saludos,
{{lead.assignedAgentName}}
Especialista en Conserjería
Dolphin Blue Paradise

📱 WhatsApp: +507 6346 0605
📧 {{lead.assignedAgentEmail}}
```

---

### Template 3: Drip Email 3 - Eco-Luxury Experience

**Subject (EN):** `{{lead.name}}, Real Sustainability, Real Luxury`

**Subject (ES):** `{{lead.name}}, Sostenibilidad Real, Lujo Real`

**From:** `{{lead.assignedAgentEmail}}`  
**Reply-To:** `{{lead.assignedAgentEmail}}`

**Body (EN):**

```
Hello {{lead.name}},

Many resorts claim to be "eco-friendly," but at Dolphin Blue Paradise, sustainability isn't a marketing tagline - it's our way of life.

🌱 **Roque's Organic Garden**
Our chef, Roque, maintains an extensive organic garden that supplies much of our produce. You'll taste the difference in every meal at Blø Bar & Restaurant. Fresh, local, and grown with care.

🍽️ **Farm-to-Table Dining**
Every meal is an experience:
- Breakfast: Fresh fruits from the garden, homemade bread, local coffee
- Lunch: Light, fresh options featuring garden vegetables
- Dinner: European-fusion cuisine with Panamanian ingredients

We accommodate all dietary needs with 48 hours notice. Vegan? Gluten-free? We've got you covered.

♻️ **Waste Management**
- Composting all food waste
- No single-use plastics
- Refillable amenities (no mini bottles!)
- Essential oil pest control (no harsh chemicals)

🌊 **Marine Conservation**
Our location in Bahia Delfines means we're part of a delicate ecosystem. We:
- Use reef-safe products only
- Support local marine conservation efforts
- Educate guests about responsible tourism
- Partner with Floating Doctors for community health

💡 **Solar Power Details**
- 100% solar-powered (no backup generators)
- Battery storage for night use
- Energy-efficient appliances
- LED lighting throughout

This isn't greenwashing - it's real, measurable sustainability. And it doesn't mean sacrificing luxury. Our cabanas are comfortable, our service is personalized, and your experience will be unforgettable.

Want to know more about our sustainability practices? Or perhaps you're curious about how we balance eco-consciousness with luxury?

I'm here to answer any questions!

Warmly,
{{lead.assignedAgentName}}
Concierge Specialist
Dolphin Blue Paradise

📱 WhatsApp: +507 6346 0605
📧 {{lead.assignedAgentEmail}}

P.S. Our partnership with Floating Doctors means your stay supports healthcare for indigenous communities. Learn more: [link]
```

**Body (ES):**

```
Hola {{lead.name}},

Muchos resorts afirman ser "eco-amigables," pero en Dolphin Blue Paradise, la sostenibilidad no es un eslogan de marketing - es nuestra forma de vida.

🌱 **Jardín Orgánico de Roque**
Nuestro chef, Roque, mantiene un extenso jardín orgánico que abastece gran parte de nuestros productos. Notarás la diferencia en cada comida en Blø Bar & Restaurant. Fresco, local y cultivado con cuidado.

🍽️ **Comida Farm-to-Table**
Cada comida es una experiencia:
- Desayuno: Frutas frescas del jardín, pan casero, café local
- Almuerzo: Opciones ligeras y frescas con vegetales del jardín
- Cena: Cocina fusión europea con ingredientes panameños

Acomodamos todas las necesidades dietéticas con 48 horas de anticipación. ¿Vegano? ¿Sin gluten? Estamos preparados.

♻️ **Gestión de Residuos**
- Compostaje de todos los desechos de comida
- Sin plásticos de un solo uso
- Amenidades rellenables (¡sin botellas mini!)
- Control de plagas con aceites esenciales (sin químicos agresivos)

🌊 **Conservación Marina**
Nuestra ubicación en Bahia Delfines significa que somos parte de un ecosistema delicado. Nosotros:
- Usamos solo productos seguros para arrecifes
- Apoyamos esfuerzos locales de conservación marina
- Educamos a huéspedes sobre turismo responsable
- Colaboramos con Floating Doctors para salud comunitaria

💡 **Detalles de Energía Solar**
- 100% energía solar (sin generadores de respaldo)
- Almacenamiento de batería para uso nocturno
- Electrodomésticos eficientes en energía
- Iluminación LED en todas partes

Esto no es greenwashing - es sostenibilidad real y medible. Y no significa sacrificar lujo. Nuestras cabañas son cómodas, nuestro servicio es personalizado, y tu experiencia será inolvidable.

¿Quieres saber más sobre nuestras prácticas de sostenibilidad? ¿O tal vez tienes curiosidad sobre cómo balanceamos la conciencia ecológica con el lujo?

¡Estoy aquí para responder cualquier pregunta!

Cordialmente,
{{lead.assignedAgentName}}
Especialista en Conserjería
Dolphin Blue Paradise

📱 WhatsApp: +507 6346 0605
📧 {{lead.assignedAgentEmail}}

P.D. Nuestra colaboración con Floating Doctors significa que tu estadía apoya la atención médica para comunidades indígenas. Aprende más: [link]
```

---

### Template 4: Drip Email 4 - Let Me Handle Details

**Subject (EN):** `{{lead.name}}, I'll Handle All the Details`

**Subject (ES):** `{{lead.name}}, Yo Me Encargo de Todos los Detalles`

**From:** `{{lead.assignedAgentEmail}}`  
**Reply-To:** `{{lead.assignedAgentEmail}}`

**Body (EN):**

```
Hi {{lead.name}},

Planning a trip to an off-grid island resort can feel overwhelming. That's where I come in - I'm here to handle all the logistics so you can focus on the excitement of your upcoming adventure.

🚤 **Getting Here - I'll Coordinate Everything**

From Panama City:
- I'll help you book your flight to Bocas del Toro (BOC)
- Coordinate your boat transfer from Bocas Town to Isla San Cristóbal
- Our complimentary transfer runs at 12:30 PM and 5:00 PM daily
- For stays of 4+ nights, transfers are FREE
- For shorter stays, it's just $90 (still a great deal!)

From Costa Rica:
- I can help coordinate border crossing logistics
- Arrange transportation to Almirante (Panama side)
- Coordinate boat transfer ($105 for two people)

From Other Locations:
- Just tell me where you're coming from, and I'll figure out the best route
- I've helped guests from all over the world get here smoothly

📦 **What to Pack - My Recommendations**

Essentials:
- Lightweight, breathable clothing
- Swimwear (you'll want to swim daily!)
- Reef-safe sunscreen
- Insect repellent (we use essential oils, but bring your favorite)
- Water shoes for rocky areas
- Camera (you'll want to capture everything)

What NOT to bring:
- High heels (you won't need them!)
- Fancy clothes (we're casual here)
- Too many electronics (embrace the disconnect)

🏝️ **Pre-Arrival Checklist**

I'll send you a personalized checklist based on your travel dates, but here's what I typically help coordinate:

- [ ] Flight confirmations
- [ ] Boat transfer timing
- [ ] Dietary requirements (48h notice)
- [ ] Activity preferences
- [ ] Special occasions (anniversaries, birthdays, etc.)
- [ ] Any questions or concerns

💬 **I'm Here for You**

From the moment you book until you're back home, I'm your point of contact. Questions about:
- What to expect
- Weather concerns
- Activity availability
- Local customs
- Anything else!

Just reply to this email or reach me on WhatsApp: +507 6346 0605

Let's make your stay perfect!

Best,
{{lead.assignedAgentName}}
Concierge Specialist
Dolphin Blue Paradise

📧 {{lead.assignedAgentEmail}}
```

**Body (ES):**

```
Hola {{lead.name}},

Planear un viaje a un resort fuera de la red en una isla puede sentirse abrumador. Ahí es donde entro yo - estoy aquí para manejar toda la logística para que puedas enfocarte en la emoción de tu próxima aventura.

🚤 **Llegar Aquí - Yo Coordinaré Todo**

Desde Ciudad de Panamá:
- Te ayudo a reservar tu vuelo a Bocas del Toro (BOC)
- Coordino tu traslado en bote desde Bocas Town a Isla San Cristóbal
- Nuestro traslado gratuito sale a las 12:30 PM y 5:00 PM diariamente
- Para estadías de 4+ noches, los traslados son GRATIS
- Para estadías más cortas, es solo $90 (¡sigue siendo una gran oferta!)

Desde Costa Rica:
- Puedo ayudar a coordinar la logística de cruce de frontera
- Organizar transporte a Almirante (lado panameño)
- Coordinar traslado en bote ($105 para dos personas)

Desde Otras Ubicaciones:
- Solo dime de dónde vienes, y encontraré la mejor ruta
- He ayudado a huéspedes de todo el mundo a llegar aquí sin problemas

📦 **Qué Empacar - Mis Recomendaciones**

Esenciales:
- Ropa ligera y transpirable
- Traje de baño (¡querrás nadar diariamente!)
- Protector solar seguro para arrecifes
- Repelente de insectos (usamos aceites esenciales, pero trae tu favorito)
- Zapatos acuáticos para áreas rocosas
- Cámara (querrás capturar todo)

Qué NO traer:
- Tacones altos (¡no los necesitarás!)
- Ropa elegante (somos casuales aquí)
- Demasiados electrónicos (abraza la desconexión)

🏝️ **Lista de Verificación Pre-Llegada**

Te enviaré una lista de verificación personalizada basada en tus fechas de viaje, pero esto es lo que típicamente ayudo a coordinar:

- [ ] Confirmaciones de vuelo
- [ ] Horario de traslado en bote
- [ ] Requisitos dietéticos (48h de anticipación)
- [ ] Preferencias de actividades
- [ ] Ocasiones especiales (aniversarios, cumpleaños, etc.)
- [ ] Cualquier pregunta o preocupación

💬 **Estoy Aquí para Ti**

Desde el momento en que reservas hasta que regreses a casa, soy tu punto de contacto. ¿Preguntas sobre:
- Qué esperar
- Preocupaciones sobre el clima
- Disponibilidad de actividades
- Costumbres locales
- ¡Cualquier otra cosa!

Solo responde a este email o contáctame en WhatsApp: +507 6346 0605

¡Hagamos que tu estadía sea perfecta!

Saludos,
{{lead.assignedAgentName}}
Especialista en Conserjería
Dolphin Blue Paradise

📧 {{lead.assignedAgentEmail}}
```

---

### Template 5: Drip Email 5 - Farm-to-Table Dining

**Subject (EN):** `{{lead.name}}, Dining at Blø Bar & Restaurant`

**Subject (ES):** `{{lead.name}}, Comer en Blø Bar & Restaurant`

**From:** `{{lead.assignedAgentEmail}}`  
**Reply-To:** `{{lead.assignedAgentEmail}}`

**Body (EN):**

```
Hello {{lead.name}},

One of the things our guests rave about most is the food. Let me tell you about Blø Bar & Restaurant, our over-water dining experience.

🍽️ **Farm-to-Table Excellence**

Our chef, Roque, brings European training and Panamanian ingredients together in a way that's truly special. Every meal features:

- Fresh produce from our organic garden
- Locally sourced seafood (caught daily by local fishermen)
- Homemade breads and pastries
- Local coffee roasted nearby
- Herbs and spices grown on-site

🌅 **Dining Schedule**

**Breakfast** (7:30 AM - 10:00 AM)
- Fresh fruit platter
- Homemade granola and yogurt
- Eggs cooked to order
- Local coffee and fresh juices
- Pastries from our kitchen

**Lunch** (12:00 PM - 2:00 PM)
- Light, fresh options
- Salads with garden vegetables
- Fresh fish options
- Vegetarian choices
- Local specialties

**Dinner** (6:30 PM - 9:00 PM)
- European-fusion cuisine
- Fresh catch of the day
- Garden-to-plate vegetables
- House-made desserts
- Wine selection (we can arrange)

🍷 **Dining Experience**

Blø Bar & Restaurant sits over the water, giving you:
- Panoramic views of Bahia Delfines
- Dolphin sightings during meals
- Sunset views (book dinner accordingly!)
- The sound of waves beneath you
- An intimate, romantic atmosphere

🌿 **Dietary Accommodations**

We accommodate all dietary needs with 48 hours notice:
- Vegan options
- Gluten-free
- Vegetarian
- Allergies and intolerances
- Kids' meals
- Special occasion requests

Just let me know your preferences when you book, and Roque will create something special for you.

💡 **Pro Tip**

Many guests love our "Chef's Choice" option - let Roque surprise you with a multi-course meal featuring the freshest ingredients of the day. It's always a highlight!

Want to know more about our dining options? Or perhaps you have specific dietary questions?

I'm here to help!

Warmly,
{{lead.assignedAgentName}}
Concierge Specialist
Dolphin Blue Paradise

📱 WhatsApp: +507 6346 0605
📧 {{lead.assignedAgentEmail}}

P.S. Our garden tour is a guest favorite - you'll see where your food comes from and learn about our sustainable practices!
```

**Body (ES):**

```
Hola {{lead.name}},

Una de las cosas de las que nuestros huéspedes más hablan es la comida. Déjame contarte sobre Blø Bar & Restaurant, nuestra experiencia gastronómica sobre el agua.

🍽️ **Excelencia Farm-to-Table**

Nuestro chef, Roque, combina entrenamiento europeo e ingredientes panameños de una manera verdaderamente especial. Cada comida incluye:

- Productos frescos de nuestro jardín orgánico
- Mariscos de origen local (pescados diariamente por pescadores locales)
- Panes y pasteles caseros
- Café local tostado cerca
- Hierbas y especias cultivadas en el lugar

🌅 **Horario de Comidas**

**Desayuno** (7:30 AM - 10:00 AM)
- Plato de frutas frescas
- Granola y yogurt caseros
- Huevos cocinados a pedido
- Café local y jugos frescos
- Pasteles de nuestra cocina

**Almuerzo** (12:00 PM - 2:00 PM)
- Opciones ligeras y frescas
- Ensaladas con vegetales del jardín
- Opciones de pescado fresco
- Opciones vegetarianas
- Especialidades locales

**Cena** (6:30 PM - 9:00 PM)
- Cocina fusión europea
- Pescado fresco del día
- Vegetales del jardín al plato
- Postres caseros
- Selección de vinos (podemos organizar)

🍷 **Experiencia Gastronómica**

Blø Bar & Restaurant está sobre el agua, dándote:
- Vistas panorámicas de Bahia Delfines
- Avistamientos de delfines durante las comidas
- Vistas del atardecer (¡reserva la cena en consecuencia!)
- El sonido de las olas debajo de ti
- Una atmósfera íntima y romántica

🌿 **Acomodaciones Dietéticas**

Acomodamos todas las necesidades dietéticas con 48 horas de anticipación:
- Opciones veganas
- Sin gluten
- Vegetariano
- Alergias e intolerancias
- Comidas para niños
- Solicitudes de ocasiones especiales

Solo avísame tus preferencias cuando reserves, y Roque creará algo especial para ti.

💡 **Consejo Pro**

Muchos huéspedes aman nuestra opción "Elección del Chef" - deja que Roque te sorprenda con una comida de varios platos con los ingredientes más frescos del día. ¡Siempre es un punto destacado!

¿Quieres saber más sobre nuestras opciones gastronómicas? ¿O tal vez tienes preguntas dietéticas específicas?

¡Estoy aquí para ayudar!

Cordialmente,
{{lead.assignedAgentName}}
Especialista en Conserjería
Dolphin Blue Paradise

📱 WhatsApp: +507 6346 0605
📧 {{lead.assignedAgentEmail}}

P.D. ¡Nuestro tour del jardín es favorito de los huéspedes - verás de dónde viene tu comida y aprenderás sobre nuestras prácticas sostenibles!
```

---

### Template 6: Drip Email 6 - Adventures Await

**Subject (EN):** `{{lead.name}}, Your Caribbean Adventure Awaits`

**Subject (ES):** `{{lead.name}}, Tu Aventura Caribeña Te Espera`

**From:** `{{lead.assignedAgentEmail}}`  
**Reply-To:** `{{lead.assignedAgentEmail}}`

**Body (EN):**

```
Hi {{lead.name}},

Beyond our beautiful cabanas and farm-to-table dining, Dolphin Blue Paradise offers incredible adventures in the Caribbean and Panamanian jungle.

🐬 **Dolphin Watching**

Our location in Bahia Delfines means you're in the heart of dolphin territory:
- Watch from your cabana terrace
- Swim from our private platform (they often come close!)
- Join our guided dolphin watching tours
- 80 resident dolphins call this bay home

🤿 **Snorkeling & Marine Life**

The waters around Isla San Cristóbal are teeming with life:
- Hundreds of fish species
- Colorful coral formations
- Starfish and sea urchins
- Rays and occasional sea turtles
- Our swim platform is the perfect starting point

🌴 **Jungle Adventures**

Explore the Panamanian rainforest:
- Guided jungle hikes
- Chocolate farm tours (learn about cacao!)
- Bird watching (incredible diversity)
- Sloth spotting (we have a resident sloth!)
- Indigenous community visits

🏄 **Water Sports**

For the adventurous:
- Kayaking around the bay
- Stand-up paddleboarding
- Fishing trips (catch and release)
- Boat tours to nearby islands
- Beach excursions to pristine spots

🧘 **Wellness & Relaxation**

Sometimes adventure means slowing down:
- Massage services (book in advance)
- Yoga sessions on the platform
- Meditation spots throughout property
- Hammock time (highly recommended!)
- Stargazing (no light pollution!)

📅 **Planning Your Activities**

I can help you plan the perfect itinerary:
- What activities interest you most?
- How active do you want to be?
- Any specific interests (photography, birding, etc.)?
- Weather considerations
- Best times for each activity

Many guests combine relaxation with adventure - mornings exploring, afternoons in hammocks, evenings watching dolphins.

💡 **Guest Favorite Combinations**

- **The Nature Lover:** Jungle hikes + dolphin watching + garden tour
- **The Adventurer:** Snorkeling + kayaking + chocolate farm
- **The Relaxer:** Massage + hammock time + stargazing
- **The Explorer:** Island tours + indigenous visits + fishing

What kind of experience are you looking for? I'd love to help you plan the perfect stay!

Ready to start planning? Just reply to this email or reach me on WhatsApp: +507 6346 0605

Adventure awaits!

Best,
{{lead.assignedAgentName}}
Concierge Specialist
Dolphin Blue Paradise

📧 {{lead.assignedAgentEmail}}

P.S. Our activities are weather-dependent, but there's always something amazing to do, rain or shine!
```

**Body (ES):**

```
Hola {{lead.name}},

Más allá de nuestras hermosas cabañas y comida farm-to-table, Dolphin Blue Paradise ofrece increíbles aventuras en el Caribe y la selva panameña.

🐬 **Avistamiento de Delfines**

Nuestra ubicación en Bahia Delfines significa que estás en el corazón del territorio de delfines:
- Observa desde la terraza de tu cabaña
- Nada desde nuestra plataforma privada (¡a menudo se acercan!)
- Únete a nuestros tours guiados de avistamiento de delfines
- 80 delfines residentes llaman esta bahía hogar

🤿 **Snorkel y Vida Marina**

Las aguas alrededor de Isla San Cristóbal están llenas de vida:
- Cientos de especies de peces
- Formaciones de coral coloridas
- Estrellas de mar y erizos
- Rayas y ocasionalmente tortugas marinas
- Nuestra plataforma de natación es el punto de partida perfecto

🌴 **Aventuras en la Selva**

Explora la selva panameña:
- Caminatas guiadas por la selva
- Tours a granjas de cacao (¡aprende sobre cacao!)
- Observación de aves (diversidad increíble)
- Búsqueda de perezosos (¡tenemos un perezoso residente!)
- Visitas a comunidades indígenas

🏄 **Deportes Acuáticos**

Para los aventureros:
- Kayak alrededor de la bahía
- Stand-up paddleboarding
- Viajes de pesca (captura y liberación)
- Tours en bote a islas cercanas
- Excursiones a playas pristinas

🧘 **Bienestar y Relajación**

A veces la aventura significa ir más despacio:
- Servicios de masaje (reserva con anticipación)
- Sesiones de yoga en la plataforma
- Espacios de meditación en toda la propiedad
- Tiempo en hamaca (¡altamente recomendado!)
- Observación de estrellas (¡sin contaminación lumínica!)

📅 **Planificando Tus Actividades**

Puedo ayudarte a planear el itinerario perfecto:
- ¿Qué actividades te interesan más?
- ¿Qué tan activo quieres estar?
- ¿Algún interés específico (fotografía, observación de aves, etc.)?
- Consideraciones del clima
- Mejores momentos para cada actividad

Muchos huéspedes combinan relajación con aventura - mañanas explorando, tardes en hamacas, noches viendo delfines.

💡 **Combinaciones Favoritas de Huéspedes**

- **El Amante de la Naturaleza:** Caminatas por selva + avistamiento de delfines + tour del jardín
- **El Aventurero:** Snorkel + kayak + granja de cacao
- **El Relajado:** Masaje + tiempo en hamaca + observación de estrellas
- **El Explorador:** Tours a islas + visitas indígenas + pesca

¿Qué tipo de experiencia buscas? ¡Me encantaría ayudarte a planear la estadía perfecta!

¿Listo para empezar a planear? Solo responde a este email o contáctame en WhatsApp: +507 6346 0605

¡La aventura te espera!

Saludos,
{{lead.assignedAgentName}}
Especialista en Conserjería
Dolphin Blue Paradise

📧 {{lead.assignedAgentEmail}}

P.D. Nuestras actividades dependen del clima, pero siempre hay algo increíble que hacer, ¡llueva o haga sol!
```

---

### Template 7: Email 1 - Get Personalized Assistance (Manual Template)

**Subject (EN):** `{{lead.name}}, Welcome to Dolphin Blue Paradise - Let's Plan Your Stay`

**Subject (ES):** `{{lead.name}}, Bienvenido a Dolphin Blue Paradise - Planiemos Tu Estadía`

**From:** `{{lead.assignedAgentEmail}}`  
**Reply-To:** `{{lead.assignedAgentEmail}}`

**Body (EN) - Template Base + Personalization Section:**

```
Hello {{lead.name}},

I'm {{lead.assignedAgentName}}, your personal concierge at Dolphin Blue Paradise. Thank you for reaching out through our Get Personalized Assistance form - I'm excited to help you plan your perfect stay!

[PERSONALIZATION SECTION - Agent fills this in]

I see you're interested in visiting Dolphin Blue Paradise from {{lead.arrivalDate}} to {{lead.departureDate}} with a party of {{lead.partySize}}.

[Agent: Respond to specific questions from the form here]
[Agent: Mention specific interests: {{lead.interestsWeb}}]
[Agent: Address any concerns or special requests]
[Agent: Provide availability information for those dates]

[END PERSONALIZATION SECTION]

🏝️ **About Dolphin Blue Paradise**

We're an eco-luxury resort on Isla San Cristóbal in Bahia Delfines, Bocas del Toro. Our 4 unique cabanas sit between the Panamanian jungle and the Caribbean Sea, where 80 resident dolphins call home.

**What Makes Us Special:**
- 100% solar-powered, completely off-grid
- Farm-to-table dining at Blø Bar & Restaurant
- Private swim platform for dolphin watching
- Personalized concierge service
- Authentic sustainability practices

**Our 4 Accommodations:**
1. Premium Deluxe Sea View Cabana (33 m²) - Up to 2 guests
2. Sea View Cabanas (20 m²) - Up to 2 guests
3. Dolphin View Room (30 m²) - Up to 2 guests
4. Family Jungle Room (60+ m²) - Up to 3 guests

[Agent: Mention which cabana might be best for their party size/dates]

✨ **What I Can Help With**

- Availability for your dates
- Room recommendations based on your preferences
- Activity planning and booking
- Travel logistics (flights, transfers, etc.)
- Dietary accommodations
- Special occasion planning
- Any questions about our resort or location

I'm here to make your stay perfect. Feel free to reply to this email with any questions, or reach me directly:

📱 WhatsApp: +507 6346 0605
📧 {{lead.assignedAgentEmail}}

Looking forward to welcoming you to paradise!

Warm regards,
{{lead.assignedAgentName}}
Concierge Specialist
Dolphin Blue Paradise
Isla San Cristóbal, Bocas del Toro, Panama
```

**Body (ES) - Template Base + Personalization Section:**

```
Hola {{lead.name}},

Soy {{lead.assignedAgentName}}, tu conserje personal en Dolphin Blue Paradise. Gracias por contactarnos a través de nuestro formulario de Asistencia Personalizada - ¡estoy emocionado de ayudarte a planear tu estadía perfecta!

[SECCIÓN DE PERSONALIZACIÓN - Agente completa esto]

Veo que estás interesado en visitar Dolphin Blue Paradise del {{lead.arrivalDate}} al {{lead.departureDate}} con un grupo de {{lead.partySize}} personas.

[Agente: Responde preguntas específicas del formulario aquí]
[Agente: Menciona intereses específicos: {{lead.interestsWeb}}]
[Agente: Aborda preocupaciones o solicitudes especiales]
[Agente: Proporciona información de disponibilidad para esas fechas]

[FIN SECCIÓN DE PERSONALIZACIÓN]

🏝️ **Sobre Dolphin Blue Paradise**

Somos un resort eco-lujo en Isla San Cristóbal en Bahia Delfines, Bocas del Toro. Nuestras 4 cabañas únicas están entre la selva panameña y el Mar Caribe, donde 80 delfines residentes llaman hogar.

**Lo Que Nos Hace Especiales:**
- 100% energía solar, completamente fuera de la red
- Comida farm-to-table en Blø Bar & Restaurant
- Plataforma de natación privada para ver delfines
- Servicio de conserje personalizado
- Prácticas de sostenibilidad auténticas

**Nuestras 4 Acomodaciones:**
1. Cabaña Premium Deluxe Vista al Mar (33 m²) - Hasta 2 huéspedes
2. Cabañas Vista al Mar (20 m²) - Hasta 2 huéspedes
3. Habitación Vista Delfines (30 m²) - Hasta 2 huéspedes
4. Habitación Familiar Selva (60+ m²) - Hasta 3 huéspedes

[Agente: Menciona qué cabaña podría ser mejor para su tamaño de grupo/fechas]

✨ **Con Qué Puedo Ayudar**

- Disponibilidad para tus fechas
- Recomendaciones de habitaciones basadas en tus preferencias
- Planificación y reserva de actividades
- Logística de viaje (vuelos, traslados, etc.)
- Acomodaciones dietéticas
- Planificación de ocasiones especiales
- Cualquier pregunta sobre nuestro resort o ubicación

Estoy aquí para hacer que tu estadía sea perfecta. Siéntete libre de responder a este email con cualquier pregunta, o contáctame directamente:

📱 WhatsApp: +507 6346 0605
📧 {{lead.assignedAgentEmail}}

¡Espero darte la bienvenida al paraíso!

Saludos cordiales,
{{lead.assignedAgentName}}
Especialista en Conserjería
Dolphin Blue Paradise
Isla San Cristóbal, Bocas del Toro, Panamá
```

---

## INSTRUCCIONES DE CONFIGURACIÓN MANUAL

### SECCIÓN 1: CONFIGURACIÓN DE CAMPOS PERSONALIZADOS EN ESPOCRM

#### Paso 1: Acceder a Entity Manager

1. Login a EspoCRM como administrador
2. Ir a `Administración > Entity Manager`
3. Seleccionar entidad `Lead`
4. Click en `Fields`

#### Paso 2: Crear Campos de Drip Campaign

**Campo: dripCampaignStatus**
1. Click `Create Field`
2. Tipo: `Enum`
3. Name: `dripCampaignStatus`
4. Label: `Drip Campaign Status`
5. Options (una por línea):
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
6. Default: `Not Enrolled`
7. Required: No
8. Click `Save`

**Campo: dripCampaignType**
1. Click `Create Field`
2. Tipo: `Enum`
3. Name: `dripCampaignType`
4. Label: `Drip Campaign Type`
5. Options:
   ```
   News and Offers
   Get Personalized Assistance
   None
   ```
6. Default: `None`
7. Required: No
8. Click `Save`

**Repetir para todos los campos listados en la sección de campos personalizados del documento principal.**

#### Paso 3: Crear Campos de Lead Scoring

**Campo: leadScore**
1. Tipo: `Int`
2. Name: `leadScore`
3. Label: `Lead Score`
4. Default: `0`
5. Min: `0`
6. Max: `150`
7. Required: No
8. Click `Save`

**Repetir para:**
- leadScoreDemographic
- leadScoreBehavioral
- leadScoreEngagement
- leadScoreFormSubmission
- leadScoreCategory (Enum: Hot, Warm, Cold)
- leadScoreLastUpdated (DateTime)

#### Paso 4: Crear Campos de Tracking Web

**Campo: websiteVisits**
1. Tipo: `Int`
2. Name: `websiteVisits`
3. Label: `Website Visits`
4. Default: `0`
5. Required: No
6. Click `Save`

**Repetir para todos los campos de tracking web.**

#### Paso 5: Configurar Layouts

1. Ir a `Administración > Entity Manager > Lead > Layouts`
2. Seleccionar `Detail`
3. Arrastrar campos nuevos a las secciones apropiadas:
   - Drip Campaign fields → Nueva sección "Drip Campaign"
   - Lead Scoring fields → Nueva sección "Lead Scoring"
   - Web Tracking fields → Nueva sección "Web Tracking"
4. Click `Save`

---

### SECCIÓN 2: CONFIGURACIÓN DE TARGET LISTS

1. Ir a `Marketing > Target Lists`
2. Click `Create Target List`
3. Crear las siguientes listas:

**Lista 1:**
- Name: `Drip Campaign - News and Offers Active`
- Description: `Leads actively enrolled in News and Offers drip campaign`

**Lista 2:**
- Name: `Drip Campaign - Get Personalized Assistance Active`
- Description: `Leads actively enrolled in Get Personalized Assistance drip campaign`

**Repetir para todas las Target Lists necesarias.**

---

### SECCIÓN 3: CONFIGURACIÓN DE SMTP

1. Ir a `Administración > Settings > Outbound Emails`
2. Seleccionar `SMTP`
3. Configurar:
   - SMTP Server: `smtp.gmail.com` (o tu proveedor)
   - Port: `587`
   - Security: `TLS`
   - Username: `tu-email@gmail.com`
   - Password: `tu-app-password`
4. Test email sending
5. Click `Save`

**Para enviar desde email del agente:**
1. Ir a `Administración > Settings > Email Accounts`
2. Crear cuenta de email para cada agente
3. O configurar "Send As" permissions

---

### SECCIÓN 4: CREAR WORKFLOWS BPM

#### Workflow: News and Offers → Start Campaign

1. Ir a `Administración > Workflows`
2. Click `Create Workflow`
3. Configurar:
   - Name: `Drip Campaign - News and Offers - Start`
   - Type: `Record`
   - Entity Type: `Lead`
   - Trigger Type: `Record Created`
4. Click `Conditions`:
   - Add condition: `formSource` equals `News and Offers Form`
   - Add condition: `dripCampaignStatus` equals `Not Enrolled`
   - Add condition: `consentEmailMarketing` equals `true`
5. Click `Actions`:
   - Add Action: `Assign to User`
     - Logic: Round-Robin o por preferredLanguage
   - Add Action: `Update Fields`
     - Set `assignedAgentEmail` = `{{assignedAgent.emailAddress}}`
     - Set `assignedAgentName` = `{{assignedAgent.name}}`
     - Set `dripCampaignType` = `News and Offers`
     - Set `dripCampaignStatus` = `Active (Email 1)`
     - Set `dripCampaignStartDate` = `{{now}}`
     - Set `dripCampaignEmailSequence` = `1`
     - Set `dripCampaignNextEmailDate` = `{{now}}`
   - Add Action: `Send Email`
     - Template: `Drip Email 1 - News and Offers - Welcome & Promotions`
     - To: `{{emailAddress}}`
     - From: `{{assignedAgentEmail}}`
   - Add Action: `Add to Target List`
     - Target List: `Drip Campaign - News and Offers Active`
6. Click `Save`
7. Activar workflow

**Repetir para todos los workflows según el documento principal.**

---

### SECCIÓN 5: CREAR EMAIL TEMPLATES

1. Ir a `Administración > Email Templates`
2. Click `Create Email Template`
3. Para cada template:
   - Name: `Drip Email 1 - News and Offers - Welcome & Promotions`
   - Subject: `{{lead.name}}, Welcome to Dolphin Blue Paradise - Your Eco-Luxury Escape Awaits`
   - Body: Copiar contenido del draft correspondiente
   - Variables disponibles: `{{lead.name}}`, `{{lead.assignedAgentName}}`, etc.
4. Click `Save`

**Repetir para los 7 templates.**

---

### SECCIÓN 6: CONFIGURAR GA4 INTEGRATION

#### Paso 1: Configurar GA4 Measurement Protocol

1. Ir a Google Analytics 4
2. Ir a `Admin > Data Streams`
3. Seleccionar tu stream
4. Click `Measurement Protocol API secrets`
5. Crear nuevo secret
6. Copiar `api_secret` y `measurement_id`

#### Paso 2: Configurar n8n Workflow

1. Login a n8n
2. Crear nuevo workflow
3. Configurar según el JSON proporcionado en la sección GA4
4. Test con evento de prueba
5. Activar workflow

---

### SECCIÓN 7: CONFIGURAR MOBILE APP

1. Descargar EspoCRM Mobile App desde App Store/Play Store
2. Abrir app
3. Ingresar URL del servidor EspoCRM
4. Login con credenciales
5. Configurar notificaciones push (opcional)
6. Personalizar vistas según instrucciones

---

## TESTING & QA

### Checklist de Testing

**Formularios:**
- [ ] News and Offers form crea lead correctamente
- [ ] Get Personalized Assistance form crea lead correctamente
- [ ] formSource se establece correctamente
- [ ] Campos se mapean correctamente

**Workflows:**
- [ ] News and Offers workflow se activa automáticamente
- [ ] Email 1 se envía inmediatamente
- [ ] Get Personalized Assistance crea tarea (no email)
- [ ] Emails 2-6 se envían en fechas correctas
- [ ] Workflow de pausa funciona cuando lead responde
- [ ] Workflow de opt-out funciona

**Lead Scoring:**
- [ ] Demographic score se calcula correctamente
- [ ] Behavioral score se actualiza desde GA4
- [ ] Engagement score se actualiza con emails
- [ ] Total score se recalcula automáticamente
- [ ] Category se actualiza correctamente

**GA4 Integration:**
- [ ] Eventos se envían a GA4
- [ ] n8n workflow actualiza EspoCRM
- [ ] Behavioral score se actualiza correctamente

**Mobile App:**
- [ ] Login funciona
- [ ] Vistas personalizadas se muestran
- [ ] Leads se pueden ver y editar
- [ ] Acciones rápidas funcionan

---

## TRAINING MATERIALS

### Guía Rápida para Agentes

**Drip Campaigns:**
1. News and Offers: Automático, no requiere acción
2. Get Personalized Assistance: Revisar tarea, enviar Email 1 manual, luego activar campaña

**Lead Scoring:**
- Hot Leads (100-150): Responder dentro de 2 horas
- Warm Leads (50-99): Seguimiento estándar
- Cold Leads (0-49): Enfoque en educación

**Mobile App:**
- Revisar "Waiting for Manual Email 1" diariamente
- Usar acciones rápidas para eficiencia
- Sincronizar antes de trabajar offline

---

**FIN DEL DOCUMENTO**

Para preguntas o soporte, contactar al equipo técnico.

