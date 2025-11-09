# Solución: Error de Conexión a PostgreSQL en Rebuild

**Problema:** Error al ejecutar `php /var/www/html/rebuild.php`:
```
Error: SQLSTATE[08006] [7] connection to server at "postgres-amms.railway.internal" (fd12:cbe9:2908:0:a000:74:ad6e:c0f1), port 5432 failed: Connection refused
```

## ✅ Archivos Creados Correctamente

Los archivos JSON se crearon exitosamente:
- ✅ `manifest.json` - Contenido correcto
- ✅ `Resources/module.json` - Contenido correcto
- ✅ Permisos ajustados correctamente

## 🔍 Diagnóstico del Error

El error es de **conexión a PostgreSQL**, no del módulo. Posibles causas:

1. **Base de datos no está disponible temporalmente**
2. **Variables de entorno de conexión incorrectas**
3. **Problema de red interno en Railway**

## 🛠️ Soluciones

### Opción 1: Verificar Variables de Entorno en Railway

1. Railway Dashboard → Proyecto → Servicio espocrmDEV
2. Pestaña "Variables"
3. Verificar que existen:
   - `ESPOCRM_DB_HOST`
   - `ESPOCRM_DB_PORT`
   - `ESPOCRM_DB_NAME`
   - `ESPOCRM_DB_USER`
   - `ESPOCRM_DB_PASSWORD`

### Opción 2: Intentar Rebuild Nuevamente

A veces es un problema temporal. Intenta:

```bash
# En la sesión SSH
php /var/www/html/rebuild.php
```

### Opción 3: Verificar Conexión a Base de Datos

```bash
# Verificar que la base de datos está accesible
php -r "echo 'Testing DB connection...'; \$pdo = new PDO('pgsql:host=postgres-amms.railway.internal;port=5432;dbname=railway', 'postgres', 'password'); echo 'Connected!';"
```

(Reemplaza los valores con tus credenciales reales)

### Opción 4: Verificar desde EspoCRM UI

Aunque el rebuild falle, el módulo podría estar registrado. Verifica:

1. Login a EspoCRM
2. Administration → Extensions
3. Buscar "Workflows" en la lista

## 📋 Verificación de Archivos i18n

También verifica que los archivos i18n estén correctos:

```bash
# Verificar archivos i18n
cat /persistent/custom/Espo/Modules/Workflows/Resources/i18n/en_US/Workflow.json
cat /persistent/custom/Espo/Modules/Workflows/Resources/i18n/es_ES/Workflow.json
```

Si están vacíos o mal formateados, créalos también con los comandos del documento `workflows-manual-setup-commands.md`.

## 🎯 Próximo Paso

Una vez que el rebuild se ejecute exitosamente (o verifiques que el módulo aparece en la UI), podemos continuar con la **Fase 2: Crear Entidades**.

