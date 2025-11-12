# 🔄 Guía: Crear Workflows BPM para Drip Campaigns

## ✅ Estado Actual

- ✅ Campos creados y configurados
- ✅ SMTP funcionando
- ✅ Email Template 1 (EN) listo
- ⏳ **Falta:** Workflows BPM para automatizar las drip campaigns

---

## 🎯 PRÓXIMO PASO: Crear Workflows BPM

**Sin workflows, las drip campaigns NO funcionarán automáticamente.**

---

## 📋 WORKFLOW 1: News and Offers Form → Start Campaign

Este es el workflow más importante. Se activa cuando alguien completa el formulario "News and Offers".

### Paso 1: Crear el Workflow

1. **Ve a:** Administration → Workflows
2. **Click en:** "Create Workflow"
3. **Configuración básica:**
   - **Name:** `Drip Campaign - News and Offers - Start`
   - **Type:** Selecciona `Record`
   - **Entity Type:** Selecciona `Lead`
   - **Trigger Type:** Selecciona `Record Created`
   - **Status:** `Active` (toggle switch arriba)

### Paso 2: Configurar Condiciones

**Click en "Conditions" y agrega:**

**Condición 1:**
- **Field:** `cFormSource` (o `formSource` si no tiene prefijo)
- **Type:** `equals`
- **Value:** `News and Offers Form`

**Condición 2 (Opcional pero recomendado):**
- **Field:** `cDripCampaignStatus`
- **Type:** `equals`
- **Value:** `Not Enrolled`

**Condición 3 (Opcional - si tienes campo de consentimiento):**
- **Field:** `consentMarketing` (o el campo que uses)
- **Type:** `equals`
- **Value:** `true`

### Paso 3: Configurar Acciones

**Click en "Actions" y agrega las siguientes acciones:**

#### Acción 1: Assign to User (Asignar Agente)

- **Type:** `Assign to User`
- **Assignment Logic:** 
  - Opción A: Round-Robin (asignación automática rotativa)
  - Opción B: Basado en `preferredLanguage`
    - Si `preferredLanguage = "Spanish"` → Asignar a agente que habla español
    - Si no → Asignar a agente que habla inglés

**Nota:** Si solo tienes un agente por ahora, puedes asignar manualmente o usar round-robin.

#### Acción 2: Update Fields (Actualizar Campos)

- **Type:** `Update Fields`
- **Fields a actualizar:**

```
cDripCampaignType = "News and Offers"
cDripCampaignStatus = "Active (Email 1)"
cDripCampaignStartDate = [now] (fecha actual)
cDripCampaignEmailSequence = 1
cDripCampaignNextEmailDate = [now] (fecha actual)
cDripCampaignLastEmailSent = [now] (fecha actual)
```

**Campos adicionales (si están disponibles):**
```
cAssignedAgentEmail = {{assignedUser.emailAddress}}
cAssignedAgentName = {{assignedUser.name}}
```

**Nota:** En EspoCRM, usa `{{assignedUser.fieldName}}` para referenciar campos del usuario asignado.

#### Acción 3: Send Email (Enviar Email)

- **Type:** `Send Email`
- **Template:** Selecciona `Drip Email 1 - News and Offers - Welcome & Promotions`
- **To:** `{{emailAddress}}`
- **From:** `{{assignedUser.emailAddress}}` (o el email del sistema)
- **Subject:** Dejar vacío (usará el subject del template)

#### Acción 4: Add to Target List (Agregar a Lista)

- **Type:** `Add to Target List`
- **Target List:** Selecciona `Drip Campaign - News and Offers Active`
- (Opcional) También agregar a: `Drip Campaign - Email 1`

#### Acción 5: Create Scheduled Job (Programar Email 2)

- **Type:** `Create Scheduled Job`
- **Workflow:** `Drip Campaign - Send Email 2` (lo crearás después)
- **Execute at:** `{{now + 1 day}}` (1 día después)
- **Entity Type:** `Lead`
- **Entity ID:** `{{id}}`

**Nota:** Si EspoCRM no tiene "Create Scheduled Job", puedes usar un workflow separado tipo "Scheduled" que se ejecute diariamente y verifique `cDripCampaignNextEmailDate`.

### Paso 4: Guardar y Activar

1. **Click en "Save"**
2. **Activar el workflow:** Toggle switch arriba debe estar en "Active"
3. **Verificar:** El workflow debe aparecer en la lista como "Active"

---

## 📋 WORKFLOW 2: Get Personalized Assistance Form → Wait for Manual

Este workflow se activa cuando alguien completa el formulario "Get Personalized Assistance".

### Paso 1: Crear el Workflow

1. **Click en:** "Create Workflow"
2. **Configuración:**
   - **Name:** `Drip Campaign - Get Personalized Assistance - Wait for Manual`
   - **Type:** `Record`
   - **Entity Type:** `Lead`
   - **Trigger Type:** `Record Created`
   - **Status:** `Active`

### Paso 2: Condiciones

**Condición 1:**
- **Field:** `cFormSource`
- **Type:** `equals`
- **Value:** `Get Personalized Assistance Form`

**Condición 2:**
- **Field:** `cDripCampaignStatus`
- **Type:** `equals`
- **Value:** `Not Enrolled`

### Paso 3: Acciones

#### Acción 1: Assign to User
- Misma lógica que Workflow 1

#### Acción 2: Update Fields
```
cDripCampaignType = "Get Personalized Assistance"
cDripCampaignStatus = "Waiting for Manual Email 1"
cAssignedAgentEmail = {{assignedUser.emailAddress}}
cAssignedAgentName = {{assignedUser.name}}
```

#### Acción 3: Create Task (Crear Tarea)
- **Type:** `Create Task`
- **Name:** `Send personalized Email 1 to {{name}}`
- **Assigned To:** `{{assignedUser}}`
- **Due Date:** `{{now + 2 hours}}`
- **Priority:** `High`
- **Description:** 
  ```
  Form submitted via Get Personalized Assistance form.
  
  Lead: {{name}}
  Email: {{emailAddress}}
  Phone: {{phoneNumber}}
  
  [Agregar campos específicos del formulario si los hay]
  ```

#### Acción 4: Add to Target List
- **Target List:** `Drip Campaign - Get Personalized Assistance Active`

### Paso 4: Guardar y Activar

---

## 📋 WORKFLOW 3: Send Email 2 (Scheduled)

Este workflow envía el Email 2 automáticamente después de 1 día.

### Paso 1: Crear el Workflow

1. **Click en:** "Create Workflow"
2. **Configuración:**
   - **Name:** `Drip Campaign - Send Email 2`
   - **Type:** `Scheduled` (o `Record` si no hay Scheduled)
   - **Entity Type:** `Lead`
   - **Trigger Type:** 
     - Si hay `Scheduled`: `Scheduled Job`
     - Si no: `Record Updated` (y usar otro método)

### Paso 2: Condiciones

**Condición 1:**
- **Field:** `cDripCampaignStatus`
- **Type:** `equals`
- **Value:** `Active (Email 1)`

**Condición 2:**
- **Field:** `cDripCampaignNextEmailDate`
- **Type:** `less than or equal to`
- **Value:** `{{now}}`

**Condición 3:**
- **Field:** `cHasResponded`
- **Type:** `equals`
- **Value:** `false`

**Condición 4:**
- **Field:** `status`
- **Type:** `not equals`
- **Value:** `Converted` (o el status de "Booked")

### Paso 3: Acciones

#### Acción 1: Send Email
- **Template:** `Drip Email 2 - Paradise Between Jungle & Sea`
- **To:** `{{emailAddress}}`
- **From:** `{{assignedUser.emailAddress}}`

#### Acción 2: Update Fields
```
cDripCampaignLastEmailSent = {{now}}
cDripCampaignEmailSequence = 2
cDripCampaignNextEmailDate = {{now + 3 days}}
cDripCampaignStatus = "Active (Email 2)"
```

#### Acción 3: Remove from Target List
- **Target List:** `Drip Campaign - Email 1`

#### Acción 4: Add to Target List
- **Target List:** `Drip Campaign - Email 2`

#### Acción 5: Create Scheduled Job (para Email 3)
- **Workflow:** `Drip Campaign - Send Email 3`
- **Execute at:** `{{now + 3 days}}`

---

## 🔄 Workflows 4-7: Emails 3-6

**Repetir el patrón del Workflow 3 para Emails 3, 4, 5 y 6:**

- **Workflow 4:** Send Email 3 (Delay: 3 días después de Email 2)
- **Workflow 5:** Send Email 4 (Delay: 5 días después de Email 3)
- **Workflow 6:** Send Email 5 (Delay: 7 días después de Email 4)
- **Workflow 7:** Send Email 6 (Delay: 10 días después de Email 5)

**Después de Email 6:**
- Cambiar `cDripCampaignStatus` a `Completed`
- Remover de todas las Target Lists activas

---

## 📋 WORKFLOW 8: Stop Campaign on Response

Detiene la campaña cuando el lead responde.

### Condiciones:
- `cHasResponded` equals `true`
- O `cLastEmailResponseDate` changed
- O `status` equals `Converted`

### Acciones:
- `cDripCampaignStatus` = `Paused`
- Remove from all active Target Lists

---

## ⚠️ IMPORTANTE: Nombres de Campos

**Recuerda usar el prefijo "c" en los nombres de campos:**
- ✅ `cFormSource` (no `formSource`)
- ✅ `cDripCampaignStatus` (no `dripCampaignStatus`)
- ✅ `cDripCampaignType` (no `dripCampaignType`)
- etc.

---

## 🎯 Orden Recomendado de Creación

1. **Primero:** Workflow 1 (News and Offers - Start)
2. **Segundo:** Workflow 2 (Get Personalized Assistance - Wait)
3. **Tercero:** Workflow 3 (Send Email 2)
4. **Luego:** Workflows 4-7 (Emails 3-6)
5. **Finalmente:** Workflow 8 (Stop on Response)

---

## ✅ Verificación

Después de crear cada workflow:

1. **Activar:** Toggle switch debe estar en "Active"
2. **Test:** Crear un Lead de prueba desde `/form_testing`
3. **Verificar:** 
   - Que se crea el Lead
   - Que se activa el workflow
   - Que se envían los emails
   - Que se actualizan los campos

---

## 📚 Documentación de Referencia

- **Guía completa:** `docs/manual-configuration-instructions.md` - Sección 5
- **Plan de implementación:** `docs/implementation-plan-drip-campaigns.md`





