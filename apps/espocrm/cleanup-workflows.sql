-- Script SQL para limpiar completamente todas las referencias a Workflows de la base de datos EspoCRM
-- Ejecutar en PostgreSQL

-- 1. Eliminar tablas de entidades Workflow (si existen)
DROP TABLE IF EXISTS workflow_log CASCADE;
DROP TABLE IF EXISTS workflow_execution CASCADE;
DROP TABLE IF EXISTS workflow CASCADE;

-- 2. Eliminar scheduled jobs relacionados
DELETE FROM scheduled_job WHERE job IN ('ProcessWorkflowExecution', 'ProcessScheduledWorkflow', 'ProcessRecurringWorkflow');

-- 3. Limpiar config: remover Workflow de tabList
UPDATE config 
SET value = (
    SELECT jsonb_agg(elem)
    FROM jsonb_array_elements(value::jsonb) elem
    WHERE elem::text != '"Workflow"'
)
WHERE name = 'tabList' 
AND value::jsonb @> '"Workflow"';

-- 4. Limpiar config: remover Workflow de quickCreateList
UPDATE config 
SET value = (
    SELECT jsonb_agg(elem)
    FROM jsonb_array_elements(value::jsonb) elem
    WHERE elem::text != '"Workflow"'
)
WHERE name = 'quickCreateList' 
AND value::jsonb @> '"Workflow"';

-- 5. Limpiar preferences: remover Workflow de tabList de usuarios
UPDATE preferences 
SET data = jsonb_set(
    data::jsonb, 
    '{tabList}', 
    (
        SELECT jsonb_agg(elem)
        FROM jsonb_array_elements(data->'tabList') elem
        WHERE elem::text != '"Workflow"'
    )
)::text
WHERE data::jsonb ? 'tabList' 
AND data::jsonb->'tabList' @> '"Workflow"';

-- 6. Eliminar extensiones relacionadas con Workflows
DELETE FROM extension WHERE name IN ('Workflows', 'FreeWorkflows');

-- 7. Limpiar cache de metadata (vaciar tablas de cache)
DELETE FROM cache WHERE name LIKE '%workflow%' OR name LIKE '%Workflow%';

-- Verificación final
SELECT 'Limpieza completada. Verificando...' AS status;

-- Verificar que no quedan referencias
SELECT COUNT(*) AS remaining_workflow_refs FROM config 
WHERE (name = 'tabList' AND value::jsonb @> '"Workflow"')
   OR (name = 'quickCreateList' AND value::jsonb @> '"Workflow"');

SELECT COUNT(*) AS remaining_preferences FROM preferences 
WHERE data::jsonb ? 'tabList' 
AND data::jsonb->'tabList' @> '"Workflow"';

SELECT COUNT(*) AS remaining_jobs FROM scheduled_job 
WHERE job IN ('ProcessWorkflowExecution', 'ProcessScheduledWorkflow', 'ProcessRecurringWorkflow');

