# Registro de Progreso - Workflows App

## 2025-11-12
- **Contexto:** Arranque de Fase 1 (MVP) para la aplicación externa de workflows.
- **Logros:**
  - CRUD completo de workflows con validación (`apps/workflows/api/src/routes/workflows.routes.ts`).
  - Servicios de integraciones EspoCRM con cifrado AES y test de conectividad (`services/integrations.service.ts`).
  - Autenticación básica con JWT y bcrypt (registro/login + middleware).
  - Documentación de pruebas y scripts multiplataforma (`TESTING.md`, `test-endpoints.sh`, `test-endpoints.ps1`).
  - Dockerfiles ajustados para build desde subdirectorios en Railway.
- **Retos actuales:**
  - La ejecución manual aún no envía jobs a BullMQ.
  - Falta cliente EspoCRM centralizado para acciones dentro del workflow.
  - No se registran logs de ejecución ni estados en la base de datos.
  - Scripts de prueba requieren URL pública de Railway para validar end-to-end.
- **Siguientes pasos sugeridos:**
  1. Implementar `POST /workflows/:id/execute` que cree registros en `workflow_executions` y agregue jobs a la cola `workflow-execute`.
  2. Construir `EspoClient` compartido que permita operaciones básicas (leer, actualizar, crear, enviar email).
  3. Actualizar worker `workflow-execute` para procesar nodos trigger/action/condition sencillos y registrar logs.
  4. Registrar resultados en `workflow_logs` y exponer endpoint `GET /executions` para monitoreo básico.
  5. Repetir scripts de prueba apuntando a Railway y documentar resultados exitosos.

## 2025-11-12 (continuación)
- **Logros:**
  - Endpoint `POST /workflows/:id/execute` activo con validación y creación de ejecuciones en base de datos.
  - Paquete compartido actualizado (`@dbp/workflows-shared`) con colas BullMQ, cliente EspoCRM y utilidades de cifrado.
  - Worker `workflow-execute` procesa triggers/acciones/condiciones, registra logs y marca estados (`scheduled → running → completed/failed`).
  - Nuevos endpoints de monitoreo (`GET /executions`, `GET /executions/:id`, `GET /executions/:id/logs`) con paginación y logs detallados.
- **Retos actuales:**
  - Falta UI (React Flow) conectada al motor y a los nuevos endpoints de monitoreo.
  - Pendiente ampliar soporte de nodos (`delay`, `split`, `code`) y política de reintentos.
  - Ajustar workspace PNPM para compilar paquetes `api`, `workers`, `shared` desde la raíz sin pasos manuales.
- **Siguientes pasos sugeridos:**
  1. Integrar React Flow en la UI y validar guardado/carga de definiciones.
  2. Construir dashboard de ejecuciones en la UI (listado + detalle con logs).
  3. Diseñar soporte para nodos avanzados y reintentos en el worker.
  4. Ejecutar pruebas end-to-end en Railway registrando evidencia en `TESTING.md`.

## 2025-11-13
- **Logros:**
  - UI autenticada con React Router + Zustand: login, layout protegido y navegación Workflows/Executions.
  - Editor React Flow funcional (crear nodos trigger/action/condition/delay/split/code, editar propiedades, guardar definición vía API).
  - Dashboard de ejecuciones en UI con filtros, paginación, detalle y timeline de logs.
  - Worker ampliado con manejo de `delay` (reprogramación diferida), `split`, `code` (placeholder seguro) y reintentos con backoff usando BullMQ.
  - Paquete `@dbp/workflows-shared` compilado y reutilizado por API/Workers/UI; ajustes en `pnpm-workspace.yaml` y overrides de tipos React.
- **Retos actuales:**
  - Afinar UX del editor (validaciones, undo/redo, plantillas de nodos, mensajes de error amigables).
  - Documentar y ejecutar pruebas end-to-end en Railway (API + workers + UI).
  - Integrar webhooks de EspoCRM para disparos automáticos y refresco en tiempo real del dashboard.
- **Siguientes pasos sugeridos:**
  1. QA funcional del editor con workflows reales (ramas múltiples, delays encadenados, acciones combinadas).
  2. Preparar guía de uso/UI y checklist de pruebas para `TESTING.md`.
  3. Implementar flujo de webhooks y socket/polling para actualizaciones en vivo.
  4. Investigar sandbox seguro para nodos `code` y ampliar logging/perfilado.