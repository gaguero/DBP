# Instrucciones para Ejecutar Limpieza - Windows PowerShell

## ⚠️ IMPORTANTE: Usar Git Bash o WSL

PowerShell intercepta comandos como `sh`, `bash`, `php`. Debes ejecutar desde **Git Bash** o **WSL**.

## Opción 1: Git Bash (Recomendado)

1. **Abre Git Bash** (busca "Git Bash" en el menú de inicio)

2. **Navega al proyecto:**
```bash
cd /c/Users/jovy2/Documents/VTF/DBPwix/apps/espocrm
```

3. **Verifica Railway CLI:**
```bash
railway --version
railway whoami
```

4. **Selecciona el servicio (si no está seleccionado):**
```bash
railway service espocrmDEV
```

5. **Copia el script al contenedor:**
```bash
cat cleanup-workflows.php | railway run sh -c "cat > /tmp/cleanup-workflows.php"
```

6. **Ejecuta el script:**
```bash
railway run php /tmp/cleanup-workflows.php
```

## Opción 2: WSL (Windows Subsystem for Linux)

1. **Abre WSL** (Ubuntu)

2. **Navega al proyecto:**
```bash
cd /mnt/c/Users/jovy2/Documents/VTF/DBPwix/apps/espocrm
```

3. **Ejecuta los mismos comandos que en Git Bash**

## Opción 3: Ejecutar SQL Directamente

Si prefieres ejecutar el SQL directamente:

1. **Conectar a PostgreSQL desde Railway:**
```bash
railway connect postgres
```

2. **Ejecutar el contenido de cleanup-workflows.sql**

O desde Railway Dashboard:
- Ir a tu proyecto → Servicio PostgreSQL → Variables
- Copiar DATABASE_URL
- Conectar con psql usando esa URL
- Ejecutar el script SQL

## Verificación

Después de ejecutar, verifica en EspoCRM:
- No debe aparecer "Workflow" en el menú
- Administration > Extensions no debe mostrar Workflows/FreeWorkflows

