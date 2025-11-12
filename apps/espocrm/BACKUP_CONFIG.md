# Backup y Configuración - EspoCRM

## Fecha de Backup
**Fecha:** $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")

## Configuración Actual Documentada

### Variables de Entorno (Railway/Producción)
- `ESPOCRM_SITE_URL`: [Verificar en Railway]
- `ESPOCRM_DB_HOST`: [Verificar en Railway]
- `ESPOCRM_DB_PORT`: [Verificar en Railway]
- `ESPOCRM_DB_NAME`: [Verificar en Railway]
- `ESPOCRM_DB_USER`: [Verificar en Railway]
- `ESPOCRM_DB_PASSWORD`: [Verificar en Railway]
- `ESPOCRM_DB_DRIVER`: pdoPgsql
- `ESPOCRM_DEFAULT_LANGUAGE`: [Verificar]
- `ESPOCRM_TIMEZONE`: [Verificar]

### Archivos de Configuración Docker
- `Dockerfile`: Configurado para PHP 8.2-apache
- `docker-entrypoint.sh`: Configuración de persistent volumes y cron
- `docker-compose.yml`: Configuración local
- `php.ini`: Configuración PHP (memory_limit=512M, etc.)

### Datos Importantes a Conservar
- **Base de datos:** Todos los datos de CRM (Leads, Contacts, Accounts, etc.)
- **Configuración:** Variables de entorno en Railway
- **Volumen persistente:** `/persistent` contiene `data/` y `custom/`
- **Extensiones instaladas:** [Listar extensiones actuales]

## Comandos de Backup

### Backup de Base de Datos (PostgreSQL)
```bash
# Desde Railway CLI o servidor
pg_dump -h $ESPOCRM_DB_HOST -U $ESPOCRM_DB_USER -d $ESPOCRM_DB_NAME > espocrm_backup_$(date +%Y%m%d_%H%M%S).sql
```

### Backup de Volumen Persistente
```bash
# Si tienes acceso SSH al servidor Railway
tar -czf espocrm_persistent_$(date +%Y%m%d_%H%M%S).tar.gz /persistent
```

## Notas Importantes
- El código fuente de EspoCRM será reemplazado completamente
- Los datos en la base de datos se conservarán (excepto tablas Workflow)
- La configuración Docker se mantendrá
- Las extensiones deberán reinstalarse después de la actualización

