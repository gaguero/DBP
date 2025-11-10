# Solución Propuesta: Deployment del Módulo Workflows

**Fecha:** Noviembre 10, 2025  
**Problema:** Los archivos del módulo Workflows no se copian correctamente al volumen persistente en Railway

## 🔍 Análisis del Problema

### Problema Raíz Identificado

El problema tiene múltiples capas:

1. **Volumen Persistente se Monta en Runtime**: `/persistent` es un volumen de Railway que se monta cuando el contenedor se ejecuta, NO durante el build de Docker.

2. **Dockerfile Elimina Archivos Antes del Montaje**: El Dockerfile hace:
   ```dockerfile
   COPY src/ /var/www/html/  # Copia custom/Espo/Modules/Workflows
   rm -rf data custom        # ELIMINA los archivos antes de que el volumen se monte
   ln -s /persistent/custom custom  # Crea symlink a volumen vacío
   ```

3. **Entrypoint se Ejecuta Después**: Cuando `docker-entrypoint.sh` se ejecuta, los archivos originales ya fueron eliminados por el `rm -rf custom`.

### Por Qué la Solución Anterior No Funcionó

La modificación del Dockerfile para copiar a `/persistent/custom` durante el build no funciona porque:
- Durante el build, `/persistent` puede no existir o estar vacío
- El volumen persistente se monta DESPUÉS del build, en runtime
- Cualquier cosa copiada durante el build puede ser sobrescrita cuando el volumen se monta

## ✅ Solución Implementada

### Estrategia: Guardar Módulo en Lugar Temporal

**Paso 1: Dockerfile - Guardar Módulo en /tmp**
```dockerfile
# Después de COPY src/, guardar el módulo en /tmp antes de eliminarlo
mkdir -p /tmp/workflows-module;
if [ -d "custom/Espo/Modules/Workflows" ]; then 
  cp -a custom/Espo/Modules/Workflows /tmp/workflows-module/; 
fi;
rm -rf data custom;  # Ahora es seguro eliminar
```

**Paso 2: docker-entrypoint.sh - Copiar desde /tmp al Volumen Persistente**
```bash
# Cuando el volumen persistente ya está montado, copiar desde /tmp
if [ -d "/tmp/workflows-module/Workflows" ]; then
  mkdir -p /persistent/custom/Espo/Modules
  rm -rf /persistent/custom/Espo/Modules/Workflows
  cp -a /tmp/workflows-module/Workflows /persistent/custom/Espo/Modules/
fi
```

### Ventajas de Esta Solución

1. ✅ **Funciona con Volúmenes Persistentes**: El módulo se copia en runtime cuando el volumen ya está montado
2. ✅ **Siempre Actualizado**: Cada vez que el contenedor se inicia, copia la versión más reciente del módulo
3. ✅ **No Requiere Rebuild Completo**: El módulo se copia automáticamente en cada inicio del contenedor
4. ✅ **Sobrescribe Versiones Antiguas**: Si hay una versión antigua en el volumen, se reemplaza con la nueva

## 📋 Archivos Modificados

1. **apps/espocrm/Dockerfile**
   - Línea 50-51: Guardar módulo en `/tmp/workflows-module` antes de eliminarlo

2. **apps/espocrm/docker-entrypoint.sh**
   - Líneas 17-36: Copiar módulo desde `/tmp/workflows-module` a `/persistent/custom` cuando el contenedor se inicia

## 🎯 Próximos Pasos

1. **Hacer Commit y Push**
   ```bash
   git add apps/espocrm/Dockerfile apps/espocrm/docker-entrypoint.sh
   git commit -m "fix(workflows): Copy module from /tmp to persistent volume in entrypoint"
   git push origin gerson
   ```

2. **Esperar Deployment de Railway**
   - Railway detectará el push y hará un nuevo build
   - El nuevo build guardará el módulo en `/tmp/workflows-module`
   - Cuando el contenedor se inicie, el entrypoint copiará el módulo al volumen persistente

3. **Verificar Deployment**
   ```bash
   railway ssh -- "ls -la /persistent/custom/Espo/Modules/Workflows/Controllers/"
   railway ssh -- "ls -la /persistent/custom/Espo/Modules/Workflows/Resources/client/"
   ```

4. **Ejecutar Rebuild de EspoCRM**
   ```bash
   railway ssh -- "php /var/www/html/rebuild.php"
   ```

5. **Probar en el Navegador**
   - Acceder a `#Workflow/list`
   - Verificar que los archivos JavaScript se cargan correctamente

## 🔄 Alternativas Consideradas

### Alternativa 1: Modificar Dockerfile para Copiar Durante Build
**Problema**: `/persistent` no está disponible durante el build, solo en runtime.

### Alternativa 2: Copiar Manualmente Después de Cada Deployment
**Problema**: Requiere intervención manual cada vez, no es escalable.

### Alternativa 3: Usar Init Container
**Problema**: Railway no soporta init containers de la misma manera que Kubernetes.

### Alternativa 4: Modificar Entrypoint para Copiar desde Código Fuente
**Problema**: El código fuente ya fue eliminado por `rm -rf custom`.

## ✅ Solución Elegida: Guardar en /tmp y Copiar en Entrypoint

Esta solución es la más robusta porque:
- Funciona con el modelo de volúmenes persistentes de Railway
- No requiere intervención manual
- Siempre mantiene el módulo actualizado
- Es compatible con el flujo de trabajo actual

