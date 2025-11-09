/**
 * Script para crear todos los campos personalizados en EspoCRM
 * Ejecutar: node scripts/espocrm/create-fields.js
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

const fields = [
  // Drip Campaign Fields
  {
    name: 'dripCampaignStatus',
    type: 'enum',
    label: 'Drip Campaign Status',
    default: 'Not Enrolled',
    options: [
      'Not Enrolled',
      'Active (Email 1)',
      'Active (Email 2)',
      'Active (Email 3)',
      'Active (Email 4)',
      'Active (Email 5)',
      'Active (Email 6)',
      'Waiting for Manual Email 1',
      'Paused',
      'Completed',
      'Opted Out',
    ],
  },
  {
    name: 'dripCampaignType',
    type: 'enum',
    label: 'Drip Campaign Type',
    default: 'None',
    options: ['News and Offers', 'Get Personalized Assistance', 'None'],
  },
  {
    name: 'dripCampaignStartDate',
    type: 'datetime',
    label: 'Drip Campaign Start Date',
  },
  {
    name: 'dripCampaignLastEmailSent',
    type: 'datetime',
    label: 'Drip Campaign Last Email Sent',
  },
  {
    name: 'dripCampaignNextEmailDate',
    type: 'datetime',
    label: 'Drip Campaign Next Email Date',
  },
  {
    name: 'dripCampaignEmailSequence',
    type: 'int',
    label: 'Drip Campaign Email Sequence',
    default: 0,
    min: 0,
    max: 6,
  },
  // Agent Assignment Fields
  {
    name: 'assignedAgent',
    type: 'link',
    label: 'Assigned Agent',
    linkEntity: 'User',
  },
  {
    name: 'assignedAgentEmail',
    type: 'varchar',
    label: 'Assigned Agent Email',
    maxLength: 255,
  },
  {
    name: 'assignedAgentName',
    type: 'varchar',
    label: 'Assigned Agent Name',
    maxLength: 255,
  },
  // Tracking Fields
  {
    name: 'hasResponded',
    type: 'bool',
    label: 'Has Responded',
    default: false,
  },
  {
    name: 'lastEmailResponseDate',
    type: 'datetime',
    label: 'Last Email Response Date',
  },
  {
    name: 'emailResponseCount',
    type: 'int',
    label: 'Email Response Count',
    default: 0,
  },
  // Form Fields
  {
    name: 'formSource',
    type: 'enum',
    label: 'Form Source',
    default: 'Manual Entry',
    options: [
      'News and Offers Form',
      'Get Personalized Assistance Form',
      'Newsletter Popup',
      'Chatwoot',
      'Manual Entry',
      'OTA',
      'Referral',
    ],
  },
  {
    name: 'formSubmissionDate',
    type: 'datetime',
    label: 'Form Submission Date',
  },
  // Lead Scoring Fields
  {
    name: 'leadScore',
    type: 'int',
    label: 'Lead Score',
    default: 0,
    min: 0,
    max: 150,
  },
  {
    name: 'leadScoreDemographic',
    type: 'int',
    label: 'Lead Score - Demographic',
    default: 0,
    min: 0,
    max: 30,
  },
  {
    name: 'leadScoreBehavioral',
    type: 'int',
    label: 'Lead Score - Behavioral',
    default: 0,
    min: 0,
    max: 50,
  },
  {
    name: 'leadScoreEngagement',
    type: 'int',
    label: 'Lead Score - Engagement',
    default: 0,
    min: 0,
    max: 30,
  },
  {
    name: 'leadScoreFormSubmission',
    type: 'int',
    label: 'Lead Score - Form Submission',
    default: 0,
    min: 0,
    max: 40,
  },
  {
    name: 'leadScoreCategory',
    type: 'enum',
    label: 'Lead Score Category',
    default: 'Cold',
    options: ['Hot', 'Warm', 'Cold'],
  },
  {
    name: 'leadScoreLastUpdated',
    type: 'datetime',
    label: 'Lead Score Last Updated',
  },
  // Web Tracking Fields
  {
    name: 'websiteVisits',
    type: 'int',
    label: 'Website Visits',
    default: 0,
  },
  {
    name: 'websitePagesViewed',
    type: 'int',
    label: 'Website Pages Viewed',
    default: 0,
  },
  {
    name: 'websiteTimeOnSite',
    type: 'int',
    label: 'Website Time On Site (seconds)',
    default: 0,
  },
  {
    name: 'websiteLastVisit',
    type: 'datetime',
    label: 'Website Last Visit',
  },
  {
    name: 'websiteFirstVisit',
    type: 'datetime',
    label: 'Website First Visit',
  },
  {
    name: 'websitePagesVisited',
    type: 'text',
    label: 'Website Pages Visited (JSON)',
  },
  {
    name: 'websiteCTAClicks',
    type: 'int',
    label: 'Website CTA Clicks',
    default: 0,
  },
  {
    name: 'websiteFormViews',
    type: 'int',
    label: 'Website Form Views',
    default: 0,
  },
];

async function checkFieldExists(fieldName) {
  try {
    const response = await fetch(`${ESPOCRM_URL}/Metadata/fields/Lead/${fieldName}`, {
      method: 'GET',
      headers: {
        'X-Api-Key': ESPOCRM_API_KEY,
      },
    });
    return response.ok;
  } catch (error) {
    return false;
  }
}

async function createField(field) {
  const exists = await checkFieldExists(field.name);
  if (exists) {
    console.log(`⏭️  Campo "${field.name}" ya existe, saltando...`);
    return true;
  }

  const payload = {
    name: field.name,
    type: field.type,
    label: field.label,
    required: field.required || false,
  };

  // Add type-specific properties
  if (field.type === 'enum' && field.options) {
    payload.options = field.options;
  }
  if (field.default !== undefined) {
    payload.default = field.default;
  }
  if (field.min !== undefined) {
    payload.min = field.min;
  }
  if (field.max !== undefined) {
    payload.max = field.max;
  }
  if (field.maxLength !== undefined) {
    payload.maxLength = field.maxLength;
  }
  if (field.type === 'link' && field.linkEntity) {
    payload.entity = field.linkEntity;
  }
  if (field.type === 'text') {
    payload.textLength = 'long';
  }

  try {
    const response = await fetch(`${ESPOCRM_URL}/Metadata/fields/Lead`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': ESPOCRM_API_KEY,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`❌ Error creando campo "${field.name}":`, errorText);
      return false;
    }

    console.log(`✅ Campo "${field.name}" creado exitosamente`);
    return true;
  } catch (error) {
    console.error(`❌ Error creando campo "${field.name}":`, error);
    return false;
  }
}

async function rebuildCache() {
  try {
    const response = await fetch(`${ESPOCRM_URL}/Action/Rebuild`, {
      method: 'POST',
      headers: {
        'X-Api-Key': ESPOCRM_API_KEY,
      },
    });

    if (response.ok) {
      console.log('✅ Cache reconstruido');
    } else {
      console.warn('⚠️  No se pudo reconstruir el cache automáticamente');
    }
  } catch (error) {
    console.warn('⚠️  Error al reconstruir cache:', error);
  }
}

async function main() {
  console.log('🚀 Iniciando creación de campos personalizados...\n');
  console.log(`📡 Conectando a: ${ESPOCRM_URL}\n`);

  let successCount = 0;
  let skipCount = 0;
  let errorCount = 0;

  for (const field of fields) {
    const exists = await checkFieldExists(field.name);
    if (exists) {
      skipCount++;
      continue;
    }

    const success = await createField(field);
    if (success) {
      successCount++;
    } else {
      errorCount++;
    }

    // Small delay to avoid rate limiting
    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  console.log('\n📊 Resumen:');
  console.log(`✅ Creados: ${successCount}`);
  console.log(`⏭️  Ya existían: ${skipCount}`);
  console.log(`❌ Errores: ${errorCount}`);

  if (successCount > 0) {
    console.log('\n🔄 Reconstruyendo cache...');
    await rebuildCache();
    console.log('\n✅ ¡Proceso completado!');
    console.log('\n⚠️  IMPORTANTE: Ahora debes:');
    console.log('   1. Ir a EspoCRM > Administración > Entity Manager > Lead > Layouts');
    console.log('   2. Arrastrar los nuevos campos a las secciones apropiadas');
    console.log('   3. Guardar los layouts');
  } else if (skipCount === fields.length) {
    console.log('\n✅ Todos los campos ya existen. No hay nada que hacer.');
  }
}

main().catch((error) => {
  console.error('❌ Error fatal:', error);
  process.exit(1);
});
