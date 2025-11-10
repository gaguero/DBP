# Fase 1 - Estado del Deployment

**Fecha:** Noviembre 9, 2025  
**Commit:** `308d8e6e`  
**Estado:** Push completado, módulo necesita ser copiado manualmente o rebuild

## 🔍 Situación Actual

### Problema Identificado
El módulo `Workflows` está en el código fuente (`apps/espocrm/src/custom/Espo/Modules/Workflows/`), pero no aparece en el contenedor desplegado.

**Causa:** 
- El Dockerfile copia `src/` a `/var/www/html/` durante el build
- Luego copia `custom/` a `/persistent/custom` solo si está vacío
- Como `/persistent/custom` ya tiene contenido (`Custom`), no se copia el nuevo módulo

### Soluciones Posibles

#### Opción 1: Rebuild Completo (Recomendado)
Railway necesita hacer un rebuild completo que incluya el nuevo código:
1. Verificar que Railway está usando `apps/espocrm` como contexto de build
2. Forzar un nuevo deployment desde Railway Dashboard
3. El nuevo build debería incluir el módulo Workflows

#### Opción 2: Copiar Manualmente (Temporal)
Copiar el módulo manualmente desde el código fuente al volumen persistente:
```bash
# Verificar que el código está en el build
railway ssh -- find /var/www/html -name "manifest.json" -path "*/Workflows/*"

# Si está en el build, copiar manualmente
railway ssh -- cp -r /var/www/html/custom/Espo/Modules/Workflows /persistent/custom/Espo/Modules/
railway ssh -- chown -R www-data:www-data /persistent/custom/Espo/Modules/Workflows
```

#### Opción 3: Verificar Configuración de Railway
1. Railway Dashboard → Proyecto → Servicio espocrmDEV
2. Verificar "Settings" → "Build Context" = `apps/espocrm`
3. Verificar que el Dockerfile está en `apps/espocrm/Dockerfile`

## ✅ Verificaciones Completadas

- ✅ PHP 8.2.29 instalado
- ✅ EspoCRM 9.2.2 instalado  
- ✅ Estructura de directorios correcta
- ✅ Permisos correctos
- ✅ Push completado exitosamente
- ⏳ Módulo necesita estar disponible en el contenedor

## 🎯 Próximo Paso

**Recomendación:** Verificar configuración de Railway y forzar un nuevo rebuild que incluya el módulo Workflows.

Una vez que el módulo esté disponible:
1. Ejecutar rebuild de EspoCRM: `railway ssh -- php /var/www/html/rebuild.php`
2. Verificar que el módulo aparece en Administration → Extensions
3. Continuar con Fase 2: Crear entidades

