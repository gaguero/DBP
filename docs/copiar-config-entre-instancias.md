# Guía Rápida: Copiar Configuración entre Instancias de EspoCRM

## 🎯 Problema

Duplicaste tu instancia de EspoCRM en Railway. Ambas comparten la misma base de datos, pero la nueva instancia muestra la pantalla de instalación porque no tiene el archivo `config.php` que indica que EspoCRM ya está instalado.

## ✅ Solución Rápida (Recomendada)

### Método más simple usando Railway CLI:

1. **Instala Railway CLI** (si no lo tienes):
   ```bash
   npm install -g @railway/cli
   ```

2. **Inicia sesión en Railway:**
   ```bash
   railway login
   ```

3. **Ejecuta el script:**
   ```bash
   bash scripts/espocrm/copy-config-from-original.sh
   ```

4. **Sigue las instrucciones:**
   - Ingresa el nombre del servicio **original** (el que ya está configurado)
   - Ingresa el nombre del servicio **nuevo** (el que muestra la pantalla de instalación)
   - El script copiará automáticamente el archivo `config.php`

5. **Reinicia la nueva instancia** en Railway (botón "Restart" o "Redeploy")

6. **Verifica:** Accede a la URL de la nueva instancia y deberías ver el login en lugar de la pantalla de instalación

## 📋 Información que Necesitarás

Antes de ejecutar el script, ten a mano:
- **Nombre del servicio original** (ej: "espocrm-production")
- **Nombre del servicio nuevo** (ej: "espocrm-dev")
- **Nombre del proyecto en Railway** (opcional, si tienes múltiples proyectos)

## 🔍 Verificar Nombres de Servicios

Para ver los nombres de tus servicios en Railway:
1. Ve a tu proyecto en Railway
2. En la lista de servicios, verás el nombre de cada uno
3. O ejecuta: `railway service list`

## ⚠️ Importante Recordar

- ✅ Ambas instancias compartirán los **mismos datos** (misma base de datos)
- ✅ Los cambios en una instancia se reflejarán en la otra
- ✅ Usa esto solo para **pruebas/desarrollo**
- ❌ No uses esto si necesitas instancias completamente independientes

## 🆘 Si Tienes Problemas

### Error: "Railway CLI no está instalado"
```bash
npm install -g @railway/cli
```

### Error: "No estás autenticado"
```bash
railway login
```

### Error: "config.php no encontrado"
- Verifica que la instancia original esté completamente instalada
- Verifica que el servicio original esté corriendo

### La nueva instancia sigue mostrando instalación
- Verifica que reiniciaste la nueva instancia
- Verifica los logs de la nueva instancia para errores
- Verifica que ambas instancias usan la misma base de datos

## 📚 Documentación Completa

Para más detalles y métodos alternativos, consulta:
- `scripts/espocrm/README-copy-config.md` - Documentación completa con 3 métodos diferentes

## 🚀 Próximos Pasos Después de Copiar

Una vez que la nueva instancia funcione:

1. **Verifica que puedes iniciar sesión** con las mismas credenciales
2. **Verifica que ves los mismos datos** que en la instancia original
3. **Configura las variables de entorno** específicas de la nueva instancia (como `ESPOCRM_SITE_URL`)
4. **Prueba tus scripts de automatización** en la nueva instancia sin afectar la original

