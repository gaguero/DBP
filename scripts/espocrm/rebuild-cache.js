/**
 * Script para hacer rebuild del cache de EspoCRM vía API
 */

const ESPOCRM_URL = process.env.ESPOCRM_URL;
const ESPOCRM_API_KEY = process.env.ESPOCRM_API_KEY;

if (!ESPOCRM_URL || !ESPOCRM_API_KEY) {
  console.error('❌ Error: ESPOCRM_URL y ESPOCRM_API_KEY deben estar configurados');
  process.exit(1);
}

async function rebuildCache() {
  try {
    console.log('🔄 Reconstruyendo cache de EspoCRM...');
    const response = await fetch(`${ESPOCRM_URL}/Admin/rebuild`, {
      method: 'POST',
      headers: {
        'X-Api-Key': ESPOCRM_API_KEY,
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      console.log('✅ Cache reconstruido exitosamente');
      return true;
    } else {
      const errorText = await response.text();
      console.error(`❌ Error al reconstruir cache: ${response.status} ${response.statusText}`);
      console.error(`   Response: ${errorText}`);
      return false;
    }
  } catch (error) {
    console.error('❌ Error al reconstruir cache:', error);
    return false;
  }
}

rebuildCache().then((success) => {
  process.exit(success ? 0 : 1);
});

