# Scripts de Automatización - Configuración EspoCRM
## Dolphin Blue Paradise - Setup Automatizado

Este directorio contiene scripts que automatizan la configuración de EspoCRM vía API.

## Lo que SÍ puedo automatizar:

✅ **Campos Personalizados** - Crear todos los campos vía API  
✅ **Target Lists** - Crear todas las listas vía API  
✅ **Email Templates** - Crear templates vía API  
✅ **GA4 API Endpoint** - Crear endpoint en Next.js  
✅ **n8n Workflow JSON** - Archivo listo para importar  

## Lo que requiere configuración manual:

⚠️ **Workflows BPM** - La API de EspoCRM no permite crear workflows complejos vía API  
⚠️ **SMTP Configuration** - Requiere credenciales y configuración en admin panel  
⚠️ **Layouts** - Requiere configuración visual en admin panel  
⚠️ **Mobile App** - Requiere instalación en dispositivo  

---

## Cómo usar estos scripts:

1. Asegúrate de tener las variables de entorno configuradas:
   ```bash
   ESPOCRM_URL=https://crm.yourdomain.com/api/v1
   ESPOCRM_API_KEY=your-api-key-here
   ```

2. Ejecutar scripts en orden:
   ```bash
   # 1. Crear campos
   node scripts/espocrm/create-fields.js

   # 2. Crear Target Lists
   node scripts/espocrm/create-target-lists.js

   # 3. Crear Email Templates
   node scripts/espocrm/create-email-templates.js
   ```

3. Para workflows y SMTP, seguir instrucciones manuales en `docs/manual-configuration-instructions.md`

---

## Notas Importantes:

- Los scripts verifican si los recursos ya existen antes de crearlos
- Si algo falla, el script mostrará el error específico
- Todos los scripts son idempotentes (puedes ejecutarlos múltiples veces)
- Los scripts requieren acceso de administrador en EspoCRM

