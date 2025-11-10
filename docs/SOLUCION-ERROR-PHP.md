# Solución al Error "php no se reconoce"

## Problema
Git Bash está interpretando el comando `php` antes de que Railway lo reciba.

## Solución 1: Usar comillas simples (ya aplicado)

El script ya está actualizado. Ejecuta:

```bash
./scripts/espocrm/ejecutar-crear-campos.sh
```

## Solución 2: Ejecutar comandos manualmente

Si el script aún falla, ejecuta estos comandos uno por uno:

```bash
# 1. Seleccionar servicio
railway service espocrmDEV

# 2. Copiar script (usar comillas simples)
cat scripts/espocrm/create-fields-internal.php | railway run -- sh -c 'cat > /tmp/create-fields-internal.php'

# 3. Ejecutar script (usar comillas simples)
railway run -- sh -c 'php /tmp/create-fields-internal.php'
```

## Solución 3: Usar WSL en lugar de Git Bash

Si Git Bash sigue dando problemas, usa WSL (Ubuntu):

```bash
# En WSL
cd /mnt/c/Users/jovy2/Documents/VTF/DBPwix
./scripts/espocrm/ejecutar-crear-campos.sh
```

## Verificar que Railway está funcionando

Primero verifica que Railway puede ejecutar comandos:

```bash
railway run -- sh -c 'echo "Test"'
```

Si esto funciona, entonces el problema es específico con PHP. En ese caso, verifica que PHP está instalado en el contenedor:

```bash
railway run -- sh -c 'which php'
railway run -- sh -c 'php --version'
```

