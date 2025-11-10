# Comandos para Ejecutar en Git Bash

## Paso 1: Verificar dónde está PHP

```bash
railway run -- sh -c 'which php || find /usr -name php 2>/dev/null | head -1'
```

## Paso 2: Si PHP está en /usr/local/bin/php (más común)

```bash
railway service espocrmDEV
cat scripts/espocrm/create-fields-internal.php | railway run -- sh -c 'cat > /tmp/create-fields-internal.php'
railway run -- sh -c '/usr/local/bin/php /tmp/create-fields-internal.php'
```

## Paso 3: Si PHP está en /usr/bin/php

```bash
railway run -- sh -c '/usr/bin/php /tmp/create-fields-internal.php'
```

## Alternativa: Usar el comando de EspoCRM directamente

EspoCRM tiene su propio comando PHP. Prueba:

```bash
railway run -- sh -c 'cd /var/www/html && /usr/local/bin/php -f /tmp/create-fields-internal.php'
```

## Comando Completo (Copia y Pega Todo):

```bash
railway service espocrmDEV && cat scripts/espocrm/create-fields-internal.php | railway run -- sh -c 'cat > /tmp/create-fields-internal.php' && railway run -- sh -c 'cd /var/www/html && /usr/local/bin/php -f /tmp/create-fields-internal.php'
```

