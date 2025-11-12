# Método Simplificado: Copiar Archivo Directamente

## Opción 1: Usar Railway CLI para Copiar el Archivo

Desde Git Bash, ejecuta estos comandos:

```bash
# 1. Navegar al directorio del proyecto
cd /c/Users/jovy2/Documents/VTF/DBPwix/apps/espocrm

# 2. Conectar al servicio de EspoCRM
railway service espocrmDEV

# 3. Copiar el archivo directamente al contenedor
railway run bash -c "cat > /tmp/cleanup-workflows.php" < cleanup-workflows.php

# 4. Ejecutar el script
railway run php /tmp/cleanup-workflows.php
```

## Opción 2: Usar Railway SSH (Más Simple)

```bash
# 1. Conectar al shell
railway ssh --project=23b47b3d-1a45-4427-b436-f7df29b01260 --environment=3e530fa9-2f90-443c-8527-2a558242a2f6 --service=de2b02e2-6eca-4e39-a5b1-f49ce59c9956

# 2. Una vez dentro del shell, ejecuta esto de UNA VEZ (copia todo el bloque completo):
cat > /tmp/cleanup-workflows.php << 'EOFPHP'
[paste aquí TODO el contenido del archivo cleanup-workflows.php]
EOFPHP

# 3. Ejecutar el script
php /tmp/cleanup-workflows.php
```

## Opción 3: Ejecutar SQL Directamente (Más Rápido)

Si prefieres ejecutar solo el SQL:

```bash
# Conectar a PostgreSQL
railway connect postgres

# Luego ejecuta el contenido de cleanup-workflows.sql
```

