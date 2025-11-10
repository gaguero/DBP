# Fase 1 - Verificación del Entorno en Railway

**Fecha:** Noviembre 9, 2025  
**Método:** Railway SSH (según [documentación oficial](https://docs.railway.com/guides/cli))

## ✅ Verificaciones Completadas

### 1. Versión de PHP
- **Resultado:** ✅ PHP 8.2.29 instalado
- **Requisito:** PHP 8.1+
- **Estado:** ✅ CUMPLE

```bash
railway ssh -- php --version
# Output: PHP 8.2.29 (cli) (built: Nov  4 2025 04:11:47)
```

### 2. Estructura de Directorios
- **Directorio `/persistent/custom/`:** ✅ Existe
- **Directorio `/persistent/custom/Espo/`:** ✅ Existe
- **Directorio `/persistent/custom/Espo/Modules/`:** ⏳ No existe aún (esperado, se creará con push)

```bash
railway ssh -- ls -la /persistent/custom
# Output: 
# drwxrwxr-x 3 www-data www-data 4096 Nov  9 19:01 Espo

railway ssh -- ls -la /persistent/custom/Espo
# Output: (estructura actual del directorio)
```

### 3. Permisos
- **Propietario:** www-data:www-data
- **Permisos:** 775 (rwxrwxr-x)
- **Estado:** ✅ Correctos para desarrollo

### 4. Versión de EspoCRM
- **Método de verificación:** Revisar archivos de configuración o código fuente
- **Nota:** Necesitamos verificar desde la UI o archivos de instalación

## 📋 Próximos Pasos

### Opción 1: Push y Verificación (Recomendado)
1. Hacer push de la estructura del módulo a la rama `gerson`
2. Railway hará deploy automático
3. Verificar que el módulo aparece en EspoCRM:
   - Login a EspoCRM
   - Administration → Extensions → Verificar que "Workflows" aparece en la lista
4. Ejecutar rebuild si es necesario:
   ```bash
   railway ssh -- php /var/www/html/rebuild.php
   ```

### Opción 2: Crear Directorio Manualmente (Para Pruebas)
```bash
railway ssh -- mkdir -p /persistent/custom/Espo/Modules/Workflows
railway ssh -- chown -R www-data:www-data /persistent/custom/Espo/Modules
```

## 🔍 Comandos Útiles para Verificación

```bash
# Verificar PHP
railway ssh -- php --version

# Ver estructura de custom
railway ssh -- ls -la /persistent/custom/Espo/Modules/

# Verificar que módulo está registrado (después de push)
railway ssh -- ls -la /persistent/custom/Espo/Modules/Workflows/

# Ejecutar rebuild de EspoCRM
railway ssh -- php /var/www/html/rebuild.php

# Ver logs de EspoCRM
railway ssh -- tail -f /var/www/html/data/logs/espo-*.log
```

## ✅ Conclusión

El entorno está listo para recibir el módulo:
- ✅ PHP 8.2.29 (cumple requisitos)
- ✅ Directorio custom existe y tiene permisos correctos
- ✅ Estructura lista para recibir módulos

**Recomendación:** Hacer push de la estructura del módulo y verificar que se registra correctamente en EspoCRM.

