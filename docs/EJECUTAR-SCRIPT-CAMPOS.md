# 🚀 Ejecutar Script de Creación de Campos

## Instrucciones Rápidas

### Desde WSL o Git Bash:

```bash
cd /mnt/c/Users/jovy2/Documents/VTF/DBPwix
./scripts/espocrm/ejecutar-crear-campos.sh
```

### O manualmente:

```bash
cd /mnt/c/Users/jovy2/Documents/VTF/DBPwix
railway service espocrmDEV
cat scripts/espocrm/create-fields-internal.php | railway run -- sh -c "cat > /tmp/create-fields-internal.php"
railway run -- php /tmp/create-fields-internal.php
```

## ¿Qué hace el script?

1. ✅ Verifica campos existentes (incluyendo `cDripCampaignStatus` que ya creaste)
2. ✅ Crea los 28 campos restantes automáticamente
3. ✅ Reconstruye el cache de EspoCRM
4. ✅ Muestra un resumen de campos creados/saltados/errores

## Campos que se crearán:

- `cDripCampaignType` (enum)
- `cDripCampaignStartDate` (datetime)
- `cDripCampaignLastEmailSent` (datetime)
- `cDripCampaignNextEmailDate` (datetime)
- `cDripCampaignEmailSequence` (int)
- `cAssignedAgent` (link a User)
- `cAssignedAgentEmail` (varchar)
- `cAssignedAgentName` (varchar)
- `cHasResponded` (bool)
- `cLastEmailResponseDate` (datetime)
- `cEmailResponseCount` (int)
- `cFormSource` (enum)
- `cFormSubmissionDate` (datetime)
- `cLeadScore` (int)
- `cLeadScoreDemographic` (int)
- `cLeadScoreBehavioral` (int)
- `cLeadScoreEngagement` (int)
- `cLeadScoreFormSubmission` (int)
- `cLeadScoreCategory` (enum)
- `cLeadScoreLastUpdated` (datetime)
- `cWebsiteVisits` (int)
- `cWebsitePagesViewed` (int)
- `cWebsiteTimeOnSite` (int)
- `cWebsiteLastVisit` (datetime)
- `cWebsiteFirstVisit` (datetime)
- `cWebsitePagesVisited` (text)
- `cWebsiteCTAClicks` (int)
- `cWebsiteFormViews` (int)

**Total:** 28 campos (excluyendo `cDripCampaignStatus` que ya existe)

## Tiempo estimado: ~2-3 minutos

