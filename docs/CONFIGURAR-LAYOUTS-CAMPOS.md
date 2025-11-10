# 📋 Guía: Organizar Campos en Layouts de Lead

## Acceso a los Layouts

1. **Login a EspoCRM:** `https://espocrm-dev-production.up.railway.app`
2. **Ve a:** Administration → Entity Manager → Lead → Layouts
3. **Selecciona el layout a editar:**
   - **Detail** (vista de detalle)
   - **List** (vista de lista)
   - **Mass Update** (actualización masiva)

## Organización Recomendada de Secciones

### Layout: Detail (Vista de Detalle)

#### Sección 1: "Basic Information" (Información Básica)
**Campos existentes:**
- Name, Email Address, Phone Number, etc.

**Campos nuevos a agregar:**
- `cFormSource` (Form Source)
- `cFormSubmissionDate` (Form Submission Date)
- `preferredLanguage` (si no está ya)

---

#### Sección 2: "Drip Campaign" (Nueva Sección)
**Crear nueva sección** y agregar:
- `cDripCampaignStatus` (Drip Campaign Status)
- `cDripCampaignType` (Drip Campaign Type)
- `cDripCampaignStartDate` (Drip Campaign Start Date)
- `cDripCampaignLastEmailSent` (Drip Campaign Last Email Sent)
- `cDripCampaignNextEmailDate` (Drip Campaign Next Email Date)
- `cDripCampaignEmailSequence` (Drip Campaign Email Sequence)

---

#### Sección 3: "Agent Assignment" (Nueva Sección)
**Crear nueva sección** y agregar:
- `cAssignedAgent` (Assigned Agent) - Link a User
- `cAssignedAgentName` (Assigned Agent Name)
- `cAssignedAgentEmail` (Assigned Agent Email)

---

#### Sección 4: "Lead Scoring" (Nueva Sección)
**Crear nueva sección** y agregar:
- `cLeadScore` (Lead Score) - Campo principal
- `cLeadScoreCategory` (Lead Score Category) - Hot/Warm/Cold
- `cLeadScoreLastUpdated` (Lead Score Last Updated)

**Subsección: "Score Breakdown"**
- `cLeadScoreDemographic` (Lead Score - Demographic)
- `cLeadScoreBehavioral` (Lead Score - Behavioral)
- `cLeadScoreEngagement` (Lead Score - Engagement)
- `cLeadScoreFormSubmission` (Lead Score - Form Submission)

---

#### Sección 5: "Email Engagement" (Nueva Sección)
**Crear nueva sección** y agregar:
- `cHasResponded` (Has Responded) - Checkbox
- `cLastEmailResponseDate` (Last Email Response Date)
- `cEmailResponseCount` (Email Response Count)

---

#### Sección 6: "Website Behavior" (Nueva Sección)
**Crear nueva sección** y agregar:
- `cWebsiteVisits` (Website Visits)
- `cWebsitePagesViewed` (Website Pages Viewed)
- `cWebsiteTimeOnSite` (Website Time on Site)
- `cWebsiteLastVisit` (Website Last Visit)
- `cWebsiteFirstVisit` (Website First Visit)
- `cWebsiteCTAClicks` (Website CTA Clicks)
- `cWebsiteFormViews` (Website Form Views)
- `cWebsitePagesVisited` (Website Pages Visited) - Text field (JSON)

---

### Layout: List (Vista de Lista)

**Columnas recomendadas a mostrar:**
- Name
- Email Address
- Phone Number
- `cLeadScore` (Lead Score)
- `cLeadScoreCategory` (Lead Score Category)
- `cDripCampaignStatus` (Drip Campaign Status)
- `cDripCampaignType` (Drip Campaign Type)
- `cAssignedAgentName` (Assigned Agent Name)
- `cFormSource` (Form Source)
- Created At
- Modified At

---

## Pasos Detallados para Configurar Layouts

### Paso 1: Acceder a Detail Layout

1. Ve a: **Administration → Entity Manager → Lead → Layouts**
2. Click en **Detail** (o el layout que quieras editar)
3. Click en **Edit** (botón arriba derecha)

### Paso 2: Crear Nueva Sección

1. Click en **Add Section** (o el botón "+" para agregar sección)
2. Ingresa el nombre de la sección (ej: "Drip Campaign")
3. Selecciona el estilo:
   - **Side Panels** (paneles laterales) - Recomendado para campos secundarios
   - **Bottom Panels** (paneles inferiores) - Recomendado para campos principales
   - **Two Columns** (dos columnas) - Para organizar campos horizontalmente

### Paso 3: Agregar Campos a la Sección

1. En la sección creada, click en **Add Field**
2. Busca el campo por nombre (ej: `cDripCampaignStatus`)
3. Selecciona el campo
4. Arrastra y suelta para reordenar si es necesario

### Paso 4: Organizar Campos en Filas

1. **Fila 1:** Campos principales (ej: Status, Type)
2. **Fila 2:** Campos de fechas (ej: Start Date, Last Email Sent)
3. **Fila 3:** Campos numéricos (ej: Email Sequence)

### Paso 5: Guardar

1. Click en **Save** (arriba derecha)
2. Espera a que se guarde (puede tomar unos segundos)

---

## Recomendaciones de Diseño

### Orden de Secciones (de arriba a abajo):

1. **Basic Information** (Información básica del lead)
2. **Drip Campaign** (Estado de la campaña)
3. **Agent Assignment** (Asignación de agente)
4. **Lead Scoring** (Puntuación del lead)
5. **Email Engagement** (Interacción por email)
6. **Website Behavior** (Comportamiento web)

### Campos Importantes a Destacar:

- **`cLeadScore`** y **`cLeadScoreCategory`**: Colocar al inicio, fácilmente visible
- **`cDripCampaignStatus`**: Colocar en la sección de Drip Campaign, destacado
- **`cAssignedAgent`**: Colocar en la sección de Agent Assignment, fácil de ver

### Campos que pueden estar ocultos inicialmente:

- **`cWebsitePagesVisited`**: Campo de texto largo (JSON), puede estar en una subsección
- Campos de scoring detallados: Pueden estar en una subsección colapsable

---

## Ejemplo Visual de Organización

```
┌─────────────────────────────────────────┐
│ Basic Information                        │
│ ┌─────────────┬───────────────────────┐ │
│ │ Name        │ Email Address         │ │
│ │ Phone       │ Form Source           │ │
│ │ Language    │ Form Submission Date │ │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ Drip Campaign                           │
│ ┌─────────────┬───────────────────────┐ │
│ │ Status      │ Type                  │ │
│ │ Start Date  │ Last Email Sent       │ │
│ │ Next Email  │ Email Sequence        │ │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ Lead Scoring                            │
│ ┌─────────────┬───────────────────────┐ │
│ │ Score       │ Category              │ │
│ │ Last Updated│                        │ │
│ │ ─────────────────────────────────── │ │
│ │ Score Breakdown:                     │ │
│ │ Demographic │ Behavioral            │ │
│ │ Engagement  │ Form Submission       │ │
└─────────────────────────────────────────┘
```

---

## Notas Importantes

1. **Prefijo "c":** Todos los campos personalizados tienen el prefijo "c" automáticamente
2. **Guardar frecuentemente:** Guarda después de cada sección para no perder cambios
3. **Probar la vista:** Después de guardar, ve a un Lead y verifica que los campos aparecen correctamente
4. **Permisos:** Asegúrate de tener permisos de administrador para editar layouts

---

## Troubleshooting

**Problema:** No veo los campos nuevos
- **Solución:** Haz rebuild del cache (Administration → Rebuild)

**Problema:** Los campos no se guardan
- **Solución:** Verifica que tienes permisos de administrador

**Problema:** Los campos aparecen con nombres técnicos
- **Solución:** Los labels están configurados, pero si ves nombres técnicos, verifica en Entity Manager → Lead → Fields

---

## Siguiente Paso Después de Configurar Layouts

Una vez configurados los layouts, continúa con:
1. ✅ Crear Target Lists (ya automatizado)
2. ✅ Crear Email Templates (estructura básica automatizada)
3. ⏳ Configurar BPM Workflows (manual)
4. ⏳ Configurar SMTP (manual)
5. ⏳ Configurar n8n para GA4 (manual)

