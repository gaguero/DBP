/**
 * Script para crear todos los Email Templates en EspoCRM
 * Ejecutar: node scripts/espocrm/create-email-templates.js
 * 
 * NOTA: Los templates se crearán con placeholders básicos.
 * Debes editar cada template manualmente para agregar el contenido HTML completo
 * desde docs/complete-implementation-guide.md
 * 
 * Requiere variables de entorno:
 * - ESPOCRM_URL
 * - ESPOCRM_API_KEY
 */

const ESPOCRM_URL = process.env.ESPOCRM_URL;
const ESPOCRM_API_KEY = process.env.ESPOCRM_API_KEY;

if (!ESPOCRM_URL || !ESPOCRM_API_KEY) {
  console.error('❌ Error: ESPOCRM_URL y ESPOCRM_API_KEY deben estar configurados');
  console.error('   Ejemplo:');
  console.error('   export ESPOCRM_URL=https://crm.yourdomain.com/api/v1');
  console.error('   export ESPOCRM_API_KEY=your-api-key-here');
  process.exit(1);
}

const emailTemplates = [
  {
    name: 'Drip Email 1 - News and Offers - Welcome & Promotions',
    subject: '{{lead.name}}, Welcome to Dolphin Blue Paradise - Your Eco-Luxury Escape Awaits',
    subjectEs: '{{lead.name}}, Bienvenido a Dolphin Blue Paradise - Tu Escape Eco-Lujo Te Espera',
    body: `Hello {{lead.name}},

I'm {{lead.assignedAgentName}}, your personal concierge at Dolphin Blue Paradise.

[CONTENIDO COMPLETO DISPONIBLE EN: docs/complete-implementation-guide.md - Template 1]

Por favor, copia el contenido HTML completo desde el documento y reemplaza este placeholder.`,
    category: 'Drip Campaign',
  },
  {
    name: 'Drip Email 2 - Paradise Between Jungle & Sea',
    subject: '{{lead.name}}, Experience True Off-Grid Luxury',
    subjectEs: '{{lead.name}}, Experimenta el Verdadero Lujo Fuera de la Red',
    body: `Hi {{lead.name}},

[CONTENIDO COMPLETO DISPONIBLE EN: docs/complete-implementation-guide.md - Template 2]`,
    category: 'Drip Campaign',
  },
  {
    name: 'Drip Email 3 - Eco-Luxury Experience',
    subject: '{{lead.name}}, Real Sustainability, Real Luxury',
    subjectEs: '{{lead.name}}, Sostenibilidad Real, Lujo Real',
    body: `Hello {{lead.name}},

[CONTENIDO COMPLETO DISPONIBLE EN: docs/complete-implementation-guide.md - Template 3]`,
    category: 'Drip Campaign',
  },
  {
    name: 'Drip Email 4 - Let Me Handle Details',
    subject: '{{lead.name}}, I\'ll Handle All the Details',
    subjectEs: '{{lead.name}}, Yo Me Encargo de Todos los Detalles',
    body: `Hi {{lead.name}},

[CONTENIDO COMPLETO DISPONIBLE EN: docs/complete-implementation-guide.md - Template 4]`,
    category: 'Drip Campaign',
  },
  {
    name: 'Drip Email 5 - Farm-to-Table Dining',
    subject: '{{lead.name}}, Dining at Blø Bar & Restaurant',
    subjectEs: '{{lead.name}}, Comer en Blø Bar & Restaurant',
    body: `Hello {{lead.name}},

[CONTENIDO COMPLETO DISPONIBLE EN: docs/complete-implementation-guide.md - Template 5]`,
    category: 'Drip Campaign',
  },
  {
    name: 'Drip Email 6 - Adventures Await',
    subject: '{{lead.name}}, Your Caribbean Adventure Awaits',
    subjectEs: '{{lead.name}}, Tu Aventura Caribeña Te Espera',
    body: `Hi {{lead.name}},

[CONTENIDO COMPLETO DISPONIBLE EN: docs/complete-implementation-guide.md - Template 6]`,
    category: 'Drip Campaign',
  },
  {
    name: 'Email 1 - Get Personalized Assistance - Manual Template',
    subject: '{{lead.name}}, Welcome to Dolphin Blue Paradise - Let\'s Plan Your Stay',
    subjectEs: '{{lead.name}}, Bienvenido a Dolphin Blue Paradise - Planiemos Tu Estadía',
    body: `Hello {{lead.name}},

I'm {{lead.assignedAgentName}}, your personal concierge.

[CONTENIDO COMPLETO DISPONIBLE EN: docs/complete-implementation-guide.md - Template 7]

Este template requiere personalización manual por el agente antes de enviar.`,
    category: 'Manual',
  },
];

async function checkTemplateExists(name) {
  try {
    const response = await fetch(
      `${ESPOCRM_URL}/EmailTemplate?where[0][type]=equals&where[0][attribute]=name&where[0][value]=${encodeURIComponent(name)}`,
      {
        method: 'GET',
        headers: {
          'X-Api-Key': ESPOCRM_API_KEY,
        },
      }
    );

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    if (data.list && data.list.length > 0) {
      return data.list[0].id;
    }
    return null;
  } catch (error) {
    return null;
  }
}

async function createEmailTemplate(template) {
  const exists = await checkTemplateExists(template.name);
  if (exists) {
    console.log(`⏭️  Template "${template.name}" ya existe, saltando...`);
    return true;
  }

  const payload = {
    name: template.name,
    subject: template.subject,
    body: template.body,
    bodyPlain: template.body.replace(/<[^>]*>/g, '').substring(0, 500),
    isHtml: true,
    category: template.category,
  };

  try {
    const response = await fetch(`${ESPOCRM_URL}/EmailTemplate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': ESPOCRM_API_KEY,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`❌ Error creando template "${template.name}":`, errorText);
      return false;
    }

    const createdTemplate = await response.json();
    console.log(`✅ Template "${template.name}" creado exitosamente (ID: ${createdTemplate.id})`);

    console.log(`\n   ⚠️  IMPORTANTE: Debes editar este template manualmente:`);
    console.log(`      - Ir a: Administración > Email Templates`);
    console.log(`      - Buscar: "${template.name}"`);
    console.log(`      - Copiar contenido HTML completo desde: docs/complete-implementation-guide.md`);
    console.log(`      - Reemplazar el placeholder con el contenido real`);
    console.log(`      - Verificar placeholders: {{lead.name}}, {{lead.assignedAgentName}}, etc.\n`);

    return true;
  } catch (error) {
    console.error(`❌ Error creando template "${template.name}":`, error);
    return false;
  }
}

async function main() {
  console.log('🚀 Iniciando creación de Email Templates...\n');
  console.log(`📡 Conectando a: ${ESPOCRM_URL}\n`);
  console.log('⚠️  NOTA: Los templates se crearán con placeholders.');
  console.log('   Debes editar cada template manualmente para agregar el contenido HTML completo.\n');

  let successCount = 0;
  let skipCount = 0;
  let errorCount = 0;

  for (const template of emailTemplates) {
    const exists = await checkTemplateExists(template.name);
    if (exists) {
      skipCount++;
      continue;
    }

    const success = await createEmailTemplate(template);
    if (success) {
      successCount++;
    } else {
      errorCount++;
    }

    // Small delay to avoid rate limiting
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  console.log('\n📊 Resumen:');
  console.log(`✅ Creados: ${successCount}`);
  console.log(`⏭️  Ya existían: ${skipCount}`);
  console.log(`❌ Errores: ${errorCount}`);

  if (successCount > 0) {
    console.log('\n✅ ¡Proceso completado!');
    console.log('\n📋 Próximos pasos:');
    console.log('   1. Ir a EspoCRM > Administración > Email Templates');
    console.log('   2. Editar cada template creado');
    console.log('   3. Copiar el contenido HTML completo desde docs/complete-implementation-guide.md');
    console.log('   4. Reemplazar el placeholder con el contenido real');
    console.log('   5. Guardar cada template');
  } else if (skipCount === emailTemplates.length) {
    console.log('\n✅ Todos los templates ya existen. No hay nada que hacer.');
  }
}

main().catch((error) => {
  console.error('❌ Error fatal:', error);
  process.exit(1);
});
