/**
 * Script para crear todas las Target Lists en EspoCRM
 * Ejecutar: node scripts/espocrm/create-target-lists.js
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

const targetLists = [
  {
    name: 'Drip Campaign - News and Offers Active',
    description: 'Leads actively enrolled in News and Offers drip campaign',
  },
  {
    name: 'Drip Campaign - Get Personalized Assistance Active',
    description: 'Leads actively enrolled in Get Personalized Assistance drip campaign',
  },
  {
    name: 'Drip Campaign - Email 1',
    description: 'Leads who received Email 1',
  },
  {
    name: 'Drip Campaign - Email 2',
    description: 'Leads who received Email 2',
  },
  {
    name: 'Drip Campaign - Email 3',
    description: 'Leads who received Email 3',
  },
  {
    name: 'Drip Campaign - Email 4',
    description: 'Leads who received Email 4',
  },
  {
    name: 'Drip Campaign - Email 5',
    description: 'Leads who received Email 5',
  },
  {
    name: 'Drip Campaign - Email 6',
    description: 'Leads who received Email 6',
  },
  {
    name: 'Drip Campaign - Paused',
    description: 'Leads with paused drip campaigns',
  },
  {
    name: 'Drip Campaign - Opted Out',
    description: 'Leads who opted out of drip campaigns',
  },
];

async function checkTargetListExists(name) {
  try {
    const response = await fetch(
      `${ESPOCRM_URL}/TargetList?where[0][type]=equals&where[0][attribute]=name&where[0][value]=${encodeURIComponent(name)}`,
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

async function createTargetList(list) {
  const exists = await checkTargetListExists(list.name);
  if (exists) {
    console.log(`⏭️  Target List "${list.name}" ya existe, saltando...`);
    return true;
  }

  const payload = {
    name: list.name,
    description: list.description,
    isOptedOut: false,
    targetListIsOptedOut: false,
  };

  try {
    const response = await fetch(`${ESPOCRM_URL}/TargetList`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': ESPOCRM_API_KEY,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`❌ Error creando Target List "${list.name}":`, errorText);
      return false;
    }

    console.log(`✅ Target List "${list.name}" creada exitosamente`);
    return true;
  } catch (error) {
    console.error(`❌ Error creando Target List "${list.name}":`, error);
    return false;
  }
}

async function main() {
  console.log('🚀 Iniciando creación de Target Lists...\n');
  console.log(`📡 Conectando a: ${ESPOCRM_URL}\n`);

  let successCount = 0;
  let skipCount = 0;
  let errorCount = 0;

  for (const list of targetLists) {
    const exists = await checkTargetListExists(list.name);
    if (exists) {
      skipCount++;
      continue;
    }

    const success = await createTargetList(list);
    if (success) {
      successCount++;
    } else {
      errorCount++;
    }

    // Small delay to avoid rate limiting
    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  console.log('\n📊 Resumen:');
  console.log(`✅ Creadas: ${successCount}`);
  console.log(`⏭️  Ya existían: ${skipCount}`);
  console.log(`❌ Errores: ${errorCount}`);

  if (successCount > 0) {
    console.log('\n✅ ¡Proceso completado!');
  } else if (skipCount === targetLists.length) {
    console.log('\n✅ Todas las Target Lists ya existen. No hay nada que hacer.');
  }
}

main().catch((error) => {
  console.error('❌ Error fatal:', error);
  process.exit(1);
});
