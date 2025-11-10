# 📧 Guía: Editar Contenido de Email Templates

## ✅ Estado Actual

- ✅ **7 Email Templates** creados (estructura básica)
- ✅ **SMTP configurado** y funcionando
- ⏳ **Falta:** Agregar contenido HTML a cada template

---

## 📋 Pasos para Editar Templates

### Paso 1: Acceder a Email Templates

1. Login a EspoCRM: `https://espocrm-dev-production.up.railway.app`
2. Ve a: **Administration → Email Templates**
3. Verás la lista de los 7 templates creados

---

### Paso 2: Editar Cada Template

Para cada template, sigue estos pasos:

1. **Click en el template** que quieres editar
2. **Click en "Edit"** (arriba derecha)
3. **Ve a la pestaña "Body"** o "HTML"
4. **Copia el contenido HTML** desde `docs/complete-implementation-guide.md` (Sección 5)
5. **Pega en el editor HTML** del template
6. **Verifica los placeholders:**
   - `{{lead.name}}`
   - `{{lead.assignedAgentName}}`
   - `{{lead.assignedAgentEmail}}`
   - etc.
7. **Click en "Save"**

---

## 📝 Templates a Editar (En orden)

### Template 1: News and Offers - Email 1 (Welcome)

**Nombre en EspoCRM:** Busca el template que tenga "Email 1" o "Welcome" en el nombre

**Ubicación del contenido:** `docs/complete-implementation-guide.md` - Sección "Template 1: Drip Email 1"

**Subject (EN):** `{{lead.name}}, Welcome to Dolphin Blue Paradise - Your Eco-Luxury Escape Awaits`

**Subject (ES):** `{{lead.name}}, Bienvenido a Dolphin Blue Paradise - Tu Escape Eco-Lujo Te Espera`

---

### Template 2: News and Offers - Email 2 (Day 1)

**Nombre en EspoCRM:** Busca el template que tenga "Email 2" o "Day 1" en el nombre

**Ubicación del contenido:** `docs/complete-implementation-guide.md` - Sección "Template 2: Drip Email 2"

**Subject (EN):** `{{lead.name}}, Discover Our 4 Unique Cabanas - Find Your Perfect Match`

**Subject (ES):** `{{lead.name}}, Descubre Nuestras 4 Cabañas Únicas - Encuentra Tu Combinación Perfecta`

---

### Template 3: News and Offers - Email 3 (Day 4)

**Nombre en EspoCRM:** Busca el template que tenga "Email 3" o "Day 4" en el nombre

**Ubicación del contenido:** `docs/complete-implementation-guide.md` - Sección "Template 3: Drip Email 3"

**Subject (EN):** `{{lead.name}}, Experience the Magic - Dolphin Encounters & More`

**Subject (ES):** `{{lead.name}}, Experimenta la Magia - Encuentros con Delfines y Más`

---

### Template 4: News and Offers - Email 4 (Day 9)

**Nombre en EspoCRM:** Busca el template que tenga "Email 4" o "Day 9" en el nombre

**Ubicación del contenido:** `docs/complete-implementation-guide.md` - Sección "Template 4: Drip Email 4"

**Subject (EN):** `{{lead.name}}, Your Personalized Itinerary Awaits - Let's Plan Together`

**Subject (ES):** `{{lead.name}}, Tu Itinerario Personalizado Te Espera - Planifiquemos Juntos`

---

### Template 5: News and Offers - Email 5 (Day 16)

**Nombre en EspoCRM:** Busca el template que tenga "Email 5" o "Day 16" en el nombre

**Ubicación del contenido:** `docs/complete-implementation-guide.md` - Sección "Template 5: Drip Email 5"

**Subject (EN):** `{{lead.name}}, Last Chance - 30% Off Ends Soon + Exclusive Benefits`

**Subject (ES):** `{{lead.name}}, Última Oportunidad - 30% de Descuento Termina Pronto + Beneficios Exclusivos`

---

### Template 6: News and Offers - Email 6 (Day 26)

**Nombre en EspoCRM:** Busca el template que tenga "Email 6" o "Day 26" en el nombre

**Ubicación del contenido:** `docs/complete-implementation-guide.md` - Sección "Template 6: Drip Email 6"

**Subject (EN):** `{{lead.name}}, We're Here When You're Ready - No Pressure, Just Paradise`

**Subject (ES):** `{{lead.name}}, Estamos Aquí Cuando Estés Listo - Sin Presión, Solo Paraíso`

---

### Template 7: Get Personalized Assistance - Manual Email 1

**Nombre en EspoCRM:** Busca el template que tenga "Personalized Assistance" o "Manual Email" en el nombre

**Ubicación del contenido:** `docs/complete-implementation-guide.md` - Sección "Template 7: Get Personalized Assistance - Manual Email 1"

**Subject (EN):** `{{lead.name}}, Welcome! Let's Create Your Perfect Dolphin Blue Paradise Experience`

**Subject (ES):** `{{lead.name}}, ¡Bienvenido! Creemos Tu Experiencia Perfecta en Dolphin Blue Paradise`

---

## 💡 Tips Importantes

1. **Placeholders:** Asegúrate de que los placeholders estén correctos:
   - `{{lead.name}}` - Nombre del lead
   - `{{lead.assignedAgentName}}` - Nombre del agente asignado
   - `{{lead.assignedAgentEmail}}` - Email del agente asignado

2. **HTML:** Los templates incluyen HTML completo con estilos inline para compatibilidad con clientes de email

3. **Bilingüe:** Cada template tiene versión EN y ES - puedes crear dos templates separados o incluir ambos idiomas en uno

4. **Guardar frecuentemente:** Guarda después de cada template para no perder cambios

---

## ✅ Verificación

Después de editar todos los templates:

1. **Preview:** Usa la función "Preview" en cada template para ver cómo se verá
2. **Test Send:** Envía un email de prueba desde un Lead de prueba
3. **Verificar placeholders:** Asegúrate de que los placeholders se reemplazan correctamente

---

## 🎯 Siguiente Paso Después de Completar

Una vez que todos los templates tengan contenido:
1. ✅ Email Templates completos
2. ⏳ Crear Workflows BPM (2-3 horas)
3. ⏳ Testing completo (1 hora)

---

## 📚 Documentación de Referencia

- **Contenido completo de templates:** `docs/complete-implementation-guide.md` - Sección 5
- **Guía de placeholders:** Ver documentación de EspoCRM sobre variables disponibles

