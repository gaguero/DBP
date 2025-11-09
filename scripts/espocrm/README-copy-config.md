# Scripts para Copiar Configuración entre Instancias de EspoCRM

Estos scripts te permiten copiar el archivo `config.php` desde una instancia original de EspoCRM a una nueva instancia, permitiendo que ambas compartan la misma base de datos sin tener que reinstalar.

## ⚠️ Importante

- **Ambas instancias compartirán los mismos datos** (misma base de datos)
- **Los cambios en una instancia se reflejarán en la otra**
- **Usa esto solo para pruebas/desarrollo**, no para producción independiente

## Método 1: Usando Railway CLI (Recomendado)

Este método es el más directo y seguro.

### Requisitos Previos

1. **Instalar Railway CLI:**
   ```bash
   npm install -g @railway/cli
   ```
   O descarga desde: https://docs.railway.app/develop/cli

2. **Autenticarse en Railway:**
   ```bash
   railway login
   ```

### Pasos

1. **Ejecutar el script:**
   ```bash
   bash scripts/espocrm/copy-config-from-original.sh
   ```

2. **Seguir las instrucciones:**
   - Ingresar el nombre del servicio original
   - Ingresar el nombre del servicio nuevo
   - El script copiará automáticamente el archivo

3. **Reiniciar la nueva instancia** en Railway

4. **Verificar** que la nueva instancia muestra el login en lugar de la pantalla de instalación

## Método 2: Usando Endpoint HTTP Temporal

Este método no requiere Railway CLI, pero requiere crear un endpoint temporal en la instancia original.

### Requisitos Previos

- Acceso a la instancia original para subir archivos PHP
- Acceso a terminal/SSH en Railway

### Pasos

#### Paso 1: Generar Token de Acceso

1. **Subir el script a la instancia original:**
   ```bash
   railway run --service [NOMBRE_SERVICIO_ORIGINAL] -- sh -c "cat > /tmp/generate-temp-token.php" < scripts/espocrm/generate-temp-token.php
   ```

2. **Ejecutar el script:**
   ```bash
   railway run --service [NOMBRE_SERVICIO_ORIGINAL] -- php /tmp/generate-temp-token.php
   ```

3. **Copiar el token generado** (lo necesitarás después)

#### Paso 2: Crear Endpoint Temporal

1. **Subir el script de creación de endpoint:**
   ```bash
   railway run --service [NOMBRE_SERVICIO_ORIGINAL] -- sh -c "cat > /tmp/create-temp-endpoint.php" < scripts/espocrm/create-temp-endpoint.php
   ```

2. **Ejecutar con el token:**
   ```bash
   railway run --service [NOMBRE_SERVICIO_ORIGINAL] -- php /tmp/create-temp-endpoint.php [TOKEN_GENERADO]
   ```

3. **Rebuild EspoCRM para cargar la nueva ruta:**
   ```bash
   railway run --service [NOMBRE_SERVICIO_ORIGINAL] -- php command.php rebuild
   ```

#### Paso 3: Descargar config.php

1. **Ejecutar el script de descarga:**
   ```bash
   bash scripts/espocrm/copy-config-via-http.sh
   ```

2. **Ingresar:**
   - URL de la instancia original
   - Token generado anteriormente

3. **Copiar el archivo a la nueva instancia:**
   ```bash
   railway run --service [NOMBRE_SERVICIO_NUEVO] -- sh -c "cat > /persistent/data/config.php" < [ARCHIVO_TEMPORAL]
   ```

#### Paso 4: Limpiar (IMPORTANTE)

**Eliminar el endpoint temporal por seguridad:**

1. **Eliminar archivos temporales en la instancia original:**
   ```bash
   railway run --service [NOMBRE_SERVICIO_ORIGINAL] -- rm -f /tmp/generate-temp-token.php /tmp/create-temp-endpoint.php /tmp/config-export-token.txt
   ```

2. **Eliminar el endpoint y controlador:**
   ```bash
   railway run --service [NOMBRE_SERVICIO_ORIGINAL] -- rm -f custom/Espo/Resources/routes.json custom/Espo/Modules/CustomApi/Controllers/TempConfigExport.php
   ```

3. **Rebuild EspoCRM:**
   ```bash
   railway run --service [NOMBRE_SERVICIO_ORIGINAL] -- php command.php rebuild
   ```

## Método 3: Copia Manual (Más Simple)

Si tienes acceso directo a los volúmenes o prefieres hacerlo manualmente:

### Pasos

1. **Exportar config.php desde la instancia original:**
   ```bash
   railway run --service [NOMBRE_SERVICIO_ORIGINAL] -- cat /persistent/data/config.php > config.php
   ```

2. **Copiar a la nueva instancia:**
   ```bash
   railway run --service [NOMBRE_SERVICIO_NUEVO] -- sh -c "cat > /persistent/data/config.php" < config.php
   ```

3. **Ajustar permisos:**
   ```bash
   railway run --service [NOMBRE_SERVICIO_NUEVO] -- chown www-data:www-data /persistent/data/config.php
   railway run --service [NOMBRE_SERVICIO_NUEVO] -- chmod 664 /persistent/data/config.php
   ```

4. **Reiniciar la nueva instancia** en Railway

5. **Eliminar el archivo temporal:**
   ```bash
   rm config.php
   ```

## Verificación

Después de copiar el archivo:

1. **Reinicia la nueva instancia** en Railway
2. **Accede a la URL** de la nueva instancia
3. **Deberías ver el login de EspoCRM** en lugar de la pantalla de instalación
4. **Inicia sesión** con las mismas credenciales de la instancia original

## Solución de Problemas

### Error: "config.php no encontrado"

- Verifica que la instancia original esté completamente instalada
- Verifica la ruta: `/persistent/data/config.php` o `/var/www/html/data/config.php`

### Error: "Permisos denegados"

- Ejecuta: `chown www-data:www-data /persistent/data/config.php`
- Ejecuta: `chmod 664 /persistent/data/config.php`

### La nueva instancia sigue mostrando la pantalla de instalación

- Verifica que el archivo se copió correctamente
- Verifica que ambas instancias usan la misma base de datos
- Reinicia la nueva instancia
- Verifica los logs de la nueva instancia para errores

### Error: "Token inválido" (Método 2)

- Verifica que el token sea exactamente el mismo
- Verifica que el endpoint se creó correctamente
- Verifica que ejecutaste `php command.php rebuild` después de crear el endpoint

## Notas de Seguridad

- **Nunca compartas el token** generado en el Método 2
- **Elimina siempre los endpoints temporales** después de usarlos
- **No uses estos métodos en producción** sin entender las implicaciones
- **Haz backup** de la base de datos antes de hacer cambios

