# 🌐 Manejo de Idiomas en Email Templates - EspoCRM

## ⚠️ Limitación de EspoCRM

EspoCRM **NO soporta múltiples idiomas en un solo template** de forma nativa. Cada template tiene un solo Subject y un solo Body.

---

## ✅ SOLUCIONES DISPONIBLES

### Opción 1: Templates Separados (RECOMENDADO) ⭐

**Crear 2 templates por cada email: uno EN y uno ES**

**Ventajas:**
- ✅ Más simple y directo
- ✅ Fácil de mantener
- ✅ Mejor control sobre cada idioma

**Desventajas:**
- ⚠️ Duplica el número de templates (14 en total en lugar de 7)

**Cómo hacerlo:**

1. **Para cada template existente, crear una versión ES:**
   - Ejemplo: "Drip Email 1 - News and Offers - Welcome (EN)"
   - Ejemplo: "Drip Email 1 - News and Offers - Welcome (ES)"

2. **En los Workflows BPM, usar lógica condicional:**
   - Si `lead.preferredLanguage = "en_US"` → Usar template EN
   - Si `lead.preferredLanguage = "es_ES"` → Usar template ES

---

### Opción 2: Template Único con Ambos Idiomas

**Incluir ambos idiomas en el mismo template usando HTML condicional**

**Ventajas:**
- ✅ Menos templates (7 en total)
- ✅ Un solo lugar para mantener

**Desventajas:**
- ⚠️ Templates más largos
- ⚠️ Requiere lógica condicional en el HTML

**Cómo hacerlo:**

Usar placeholders condicionales en el HTML del template:

```html
{{#if lead.preferredLanguage == "es_ES"}}
<!-- Contenido en Español -->
<h1>Bienvenido {{lead.name}}</h1>
<p>Contenido en español...</p>
{{else}}
<!-- Contenido en Inglés -->
<h1>Welcome {{lead.name}}</h1>
<p>Content in English...</p>
{{/if}}
```

**⚠️ NOTA:** EspoCRM puede no soportar condicionales complejos. Verificar si funciona.

---

### Opción 3: Usar Extensión Template Helper

**Instalar extensión de terceros para manejo multilingüe**

- Extensión: "Template Helper for EspoCRM"
- Permite traducciones en templates
- Requiere instalación adicional

---

## 🎯 RECOMENDACIÓN: Opción 1 (Templates Separados)

### Plan de Acción:

1. **Mantener los 7 templates actuales como versión EN**
2. **Crear 7 templates adicionales como versión ES**
3. **En los Workflows BPM, usar lógica condicional:**

```
IF lead.preferredLanguage == "es_ES"
  THEN usar template ES
ELSE
  usar template EN
```

---

## 📝 Cómo Crear Templates ES

### Paso 1: Crear Template ES

1. Ve a: Administration → Email Templates
2. Click en "Create Email Template"
3. Nombre: Agregar " (ES)" al final
   - Ejemplo: "Drip Email 1 - News and Offers - Welcome (ES)"
4. Subject: Usar la versión en español
5. Body: Copiar contenido ES desde `docs/complete-implementation-guide.md`
6. Guardar

### Paso 2: Actualizar Workflows

En cada workflow que envía emails, agregar condición:

**Condición:**
- Campo: `preferredLanguage`
- Operador: `equals`
- Valor: `es_ES`

**Acción (si condición es verdadera):**
- Enviar template ES

**Acción (si condición es falsa):**
- Enviar template EN

---

## 🔄 Alternativa Rápida: Template Único Bilingüe

Si prefieres mantener un solo template por ahora:

1. **Incluir ambos idiomas en el mismo template:**
   - Primero español, luego inglés
   - O viceversa
   - Separados visualmente

2. **Subject:** Usar el idioma del lead si es posible, o usar inglés por defecto

3. **Body:** Incluir ambos idiomas con separador visual:

```html
<!-- Español -->
<div style="margin-bottom: 30px;">
  <h1>Bienvenido {{lead.name}}</h1>
  <p>Contenido en español...</p>
</div>

<hr style="margin: 30px 0;">

<!-- English -->
<div>
  <h1>Welcome {{lead.name}}</h1>
  <p>Content in English...</p>
</div>
```

**Ventaja:** Funciona inmediatamente sin crear templates adicionales
**Desventaja:** El email será más largo

---

## ✅ DECISIÓN RECOMENDADA

**Para empezar rápido:** Usa templates bilingües (Opción 2 - Template Único)

**Para producción:** Crea templates separados EN/ES (Opción 1)

---

## 📋 Próximos Pasos

1. **Decide qué opción prefieres:**
   - Templates separados (14 templates)
   - Templates bilingües (7 templates)

2. **Si eliges templates bilingües:**
   - Edita cada template para incluir ambos idiomas
   - Usa el contenido de `docs/complete-implementation-guide.md`

3. **Si eliges templates separados:**
   - Crea los 7 templates ES adicionales
   - Configura los workflows para usar el template correcto según `preferredLanguage`

---

## 💡 Nota sobre preferredLanguage

El campo `preferredLanguage` en Lead debe estar configurado cuando se crea el lead desde el formulario. Verifica que tu API `/api/lead` esté enviando este campo correctamente.





