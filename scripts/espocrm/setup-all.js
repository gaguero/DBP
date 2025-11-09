/**
 * Script principal para ejecutar todos los scripts de configuración
 * Ejecutar: node scripts/espocrm/setup-all.js
 * 
 * Requiere variables de entorno:
 * - ESPOCRM_URL
 * - ESPOCRM_API_KEY
 */

const { exec } = require('child_process');
const { promisify } = require('util');

const execAsync = promisify(exec);

const scripts = [
  {
    name: 'Crear Campos Personalizados',
    file: 'create-fields.js',
    description: 'Crea todos los campos personalizados en Lead entity',
  },
  {
    name: 'Crear Target Lists',
    file: 'create-target-lists.js',
    description: 'Crea todas las Target Lists necesarias',
  },
  {
    name: 'Crear Email Templates',
    file: 'create-email-templates.js',
    description: 'Crea la estructura de los email templates (requiere edición manual del contenido)',
  },
];

async function runScript(script) {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`🚀 Ejecutando: ${script.name}`);
  console.log(`   ${script.description}`);
  console.log('='.repeat(60));

  try {
    const { stdout, stderr } = await execAsync(
      `node scripts/espocrm/${script.file}`,
      { cwd: process.cwd() }
    );

    if (stdout) {
      console.log(stdout);
    }
    if (stderr) {
      console.error(stderr);
    }

    return true;
  } catch (error) {
    console.error(`❌ Error ejecutando ${script.name}:`, error.message);
    return false;
  }
}

async function main() {
  console.log('🎯 Configuración Automatizada de EspoCRM');
  console.log('   Dolphin Blue Paradise - Drip Campaigns Setup\n');

  // Verificar variables de entorno
  if (!process.env.ESPOCRM_URL || !process.env.ESPOCRM_API_KEY) {
    console.error('❌ Error: Variables de entorno no configuradas');
    console.error('   ESPOCRM_URL y ESPOCRM_API_KEY deben estar configuradas');
    console.error('\n   Ejemplo:');
    console.error('   export ESPOCRM_URL=https://crm.yourdomain.com/api/v1');
    console.error('   export ESPOCRM_API_KEY=your-api-key-here');
    console.error('\n   O crear archivo .env.local con:');
    console.error('   ESPOCRM_URL=https://crm.yourdomain.com/api/v1');
    console.error('   ESPOCRM_API_KEY=your-api-key-here');
    process.exit(1);
  }

  console.log('✅ Variables de entorno configuradas');
  console.log(`   ESPOCRM_URL: ${process.env.ESPOCRM_URL}\n`);

  let successCount = 0;
  let errorCount = 0;

  for (const script of scripts) {
    const success = await runScript(script);
    if (success) {
      successCount++;
    } else {
      errorCount++;
      console.log(`\n⚠️  Script falló. ¿Continuar con el siguiente? (presiona Ctrl+C para cancelar)`);
      // Pequeña pausa para que el usuario pueda cancelar si quiere
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  }

  console.log(`\n${'='.repeat(60)}`);
  console.log('📊 Resumen Final');
  console.log('='.repeat(60));
  console.log(`✅ Scripts exitosos: ${successCount}`);
  console.log(`❌ Scripts con errores: ${errorCount}`);

  if (successCount === scripts.length) {
    console.log('\n✅ ¡Configuración automatizada completada!');
    console.log('\n📋 Próximos pasos manuales:');
    console.log('   1. Configurar Layouts en EspoCRM (arrastrar campos a secciones)');
    console.log('   2. Editar Email Templates con contenido HTML completo');
    console.log('   3. Crear Workflows BPM (ver docs/manual-configuration-instructions.md)');
    console.log('   4. Configurar SMTP');
    console.log('   5. Configurar n8n workflow');
    console.log('   6. Setup Mobile App');
  } else {
    console.log('\n⚠️  Algunos scripts fallaron. Revisa los errores arriba.');
    console.log('   Puedes ejecutar los scripts individualmente para más detalles:');
    scripts.forEach((s) => {
      console.log(`   - node scripts/espocrm/${s.file}`);
    });
  }
}

main().catch((error) => {
  console.error('❌ Error fatal:', error);
  process.exit(1);
});
