# Resumen de Cambios para Push a Gerson → Merge con Dev

## Estado Actual

**Rama actual:** `gerson`  
**Rama destino:** `dev`  
**Commits en gerson que no están en dev:** 3 commits

## Commits Pendientes en Gerson

1. **df4d0d7a** - `fix: Fix linting errors in GA4 route and form testing page`
2. **974b6181** - `docs: Add Railway execution instructions`
3. **f46037a0** - `feat: Add drip campaign automation scripts and complete documentation`

## Cambios Sin Committear

### Archivos Modificados:
- `apps/web/src/app/api/ga4-event/route.ts` - Ya corregido (sin errores de linting)
- `apps/web/src/app/form_testing/page.tsx` - Ya corregido (sin errores de linting)

### Archivos Nuevos (Relacionados con Copia de Configuración):
Estos archivos fueron creados para ayudar con la copia de configuración entre instancias de EspoCRM:

**Scripts:**
- `scripts/espocrm/copy-config*.sh` (varios scripts bash)
- `scripts/espocrm/copy-config*.ps1` (scripts PowerShell)
- `scripts/espocrm/copy-config-wsl.sh`
- `scripts/espocrm/export-config.php`
- `scripts/espocrm/create-temp-endpoint.php`
- `scripts/espocrm/generate-temp-token.php`
- `scripts/espocrm/README-copy-config.md`

**Documentación:**
- `docs/copiar-config-entre-instancias.md`
- `docs/INSTRUCCIONES-WSL.md`
- `docs/pasos-copiar-config-manual.md`
- `docs/solucion-endpoint-http.md`
- `docs/solucion-final-copiar-config.md`
- `docs/metodo-alternativo-copiar-config.md`
- `docs/USAR-GIT-BASH.md`

**Archivo Temporal:**
- `config-temp.php` - **NO DEBE SER COMMITEADO** (archivo temporal)

## Plan de Acción

### Opción 1: Commit Solo Cambios Importantes (Recomendado)
- Committear los archivos modificados (ga4-event y form_testing)
- Committear solo la documentación útil (INSTRUCCIONES-WSL.md y copiar-config-entre-instancias.md)
- Ignorar los scripts de copia de configuración (son herramientas temporales)

### Opción 2: Commit Todo
- Committear todos los cambios incluyendo scripts de copia de configuración
- Útil si quieres mantener estos scripts para referencia futura

### Opción 3: Limpiar y Commit
- Eliminar archivos temporales y scripts no esenciales
- Committear solo lo necesario

## Recomendación

**Opción 1** es la mejor porque:
- Los scripts de copia de configuración fueron herramientas temporales para resolver un problema específico
- La documentación útil puede ser útil para referencia futura
- Los cambios en los archivos de código son importantes y deben committearse

## Próximos Pasos

1. Decidir qué archivos commitear
2. Hacer commit de los cambios
3. Push a origin/gerson
4. Crear Pull Request o merge directo a dev

