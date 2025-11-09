# 📋 Guía Actualizada: Configuración de Layouts de Lead

## ✅ Estado Actual

Veo que ya has creado los siguientes **Bottom Panels**:
- ✅ Drip Campaign
- ✅ Agent Assignment
- ✅ Lead Scoring
- ✅ Email Engagement
- ✅ Website Behavior

Estos son **paneles inferiores** que aparecerán en la vista de detalle del Lead.

## 📝 Configuración Completa Necesaria

### 1. Layout "Detail" (Principal)

**Sección: "Overview"** (ya existe)
- Agregar campos:
  - `cFormSource` (Form Source)
  - `cFormSubmissionDate` (Form Submission Date)

**Sección: "Details"** (ya existe)
- No necesita cambios

### 2. Bottom Panels (Ya creados - Verificar campos)

#### Panel: "Drip Campaign"
Verificar que contenga:
- `cDripCampaignStatus`
- `cDripCampaignType`
- `cDripCampaignStartDate`
- `cDripCampaignLastEmailSent`
- `cDripCampaignNextEmailDate`
- `cDripCampaignEmailSequence`

#### Panel: "Agent Assignment"
Verificar que contenga:
- `cAssignedAgent` (Link a User)
- `cAssignedAgentName`
- `cAssignedAgentEmail`

#### Panel: "Lead Scoring"
Verificar que contenga los 7 campos:
- `cLeadScore`
- `cLeadScoreCategory`
- `cLeadScoreDemographic`
- `cLeadScoreBehavioral`
- `cLeadScoreEngagement`
- `cLeadScoreFormSubmission`
- `cLeadScoreLastUpdated`

#### Panel: "Email Engagement"
Verificar que contenga:
- `cHasResponded`
- `cLastEmailResponseDate`
- `cEmailResponseCount`

#### Panel: "Website Behavior"
Verificar que contenga:
- `cWebsiteVisits`
- `cWebsitePagesViewed`
- `cWebsiteTimeOnSite`
- `cWebsiteLastVisit`
- `cWebsiteFirstVisit`
- `cWebsiteCTAClicks`
- `cWebsiteFormViews`
- `cWebsitePagesVisited`

## 🔍 Cómo Verificar los Campos en Cada Panel

1. Click en cada panel en el menú lateral (ej: "Drip Campaign")
2. Verifica que todos los campos estén agregados
3. Si falta algún campo, agrégalo usando "Add Field"

## 📍 Dónde Aparecerán los Campos

- **Layout "Detail"**: Campos principales visibles inmediatamente al abrir un Lead
- **Bottom Panels**: Paneles adicionales que aparecen debajo del contenido principal, organizados por categoría

## ✅ Próximos Pasos

1. **Agregar campos a "Overview"** en el layout "Detail":
   - Click en "Detail" en el menú lateral
   - Click en "Edit"
   - En la sección "Overview", agregar `cFormSource` y `cFormSubmissionDate`
   - Guardar

2. **Verificar cada Bottom Panel**:
   - Click en cada panel (Drip Campaign, Agent Assignment, etc.)
   - Verificar que todos los campos estén presentes
   - Agregar los que falten
   - Guardar cada uno

3. **Probar la vista**:
   - Ir a un Lead existente o crear uno nuevo
   - Verificar que todos los paneles aparecen correctamente
   - Verificar que los campos están organizados como esperas

## 💡 Nota sobre Bottom Panels vs Detail Sections

- **Detail Sections** (Overview, Details): Aparecen en el área principal de la vista
- **Bottom Panels**: Aparecen como paneles expandibles/colapsables debajo del contenido principal

Ambos enfoques son válidos. Los Bottom Panels son útiles para organizar muchos campos sin saturar la vista principal.

