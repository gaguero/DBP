# Instrucciones para Ejecutar Scripts en Railway

## 🎯 MÉTODO RECOMENDADO: Railway CLI

### Paso 1: Instalar Railway CLI (si no lo tienes)

```bash
npm i -g @railway/cli
```

### Paso 2: Login y Link

```bash
# Login a Railway
railway login

# Link al proyecto (selecciona tu proyecto)
railway link

# Selecciona el servicio "web" (Next.js app, no EspoCRM)
railway service
```

### Paso 3: Ejecutar Scripts

**Opción A: Script Todo-en-Uno (Recomendado)**
```bash
railway run pnpm -F web espocrm:setup
```

**Opción B: Scripts Individuales**
```bash
# Crear campos
railway run pnpm -F web espocrm:fields

# Crear Target Lists
railway run pnpm -F web espocrm:target-lists

# Crear Email Templates
railway run pnpm -F web espocrm:templates
```

---

## 🔧 MÉTODO ALTERNATIVO: Railway Dashboard

1. Ir a [Railway Dashboard](https://railway.app)
2. Seleccionar tu proyecto
3. Seleccionar el servicio **"web"** (Next.js)
4. Ir a la pestaña **"Deployments"**
5. Click en el deployment más reciente
6. Click en **"Shell"** o **"View Logs"**
7. Ejecutar:
   ```bash
   cd apps/web
   node ../../scripts/espocrm/setup-all.js
   ```

---

## 📋 VERIFICACIÓN DE VARIABLES DE ENTORNO

Antes de ejecutar, verifica en Railway Dashboard que estas variables estén configuradas:

**En el servicio "web":**
- ✅ `ESPOCRM_URL` - Ejemplo: `https://crm.yourdomain.com/api/v1`
- ✅ `ESPOCRM_API_KEY` - Tu API key de EspoCRM

**Cómo verificar:**
1. Railway Dashboard → Tu Proyecto → Servicio "web"
2. Pestaña "Variables"
3. Buscar `ESPOCRM_URL` y `ESPOCRM_API_KEY`

---

## ✅ VERIFICAR RESULTADOS

Después de ejecutar los scripts, verifica en EspoCRM:

1. **Campos:**
   - Ir a `Administración > Entity Manager > Lead > Fields`
   - Deberías ver los 29 campos nuevos

2. **Target Lists:**
   - Ir a `Marketing > Target Lists`
   - Deberías ver las 10 listas nuevas

3. **Email Templates:**
   - Ir a `Administración > Email Templates`
   - Deberías ver los 7 templates nuevos

---

## 🐛 TROUBLESHOOTING

### Error: "ESPOCRM_URL not found"
- Verificar que la variable está en Railway Dashboard
- Verificar que el nombre es exacto: `ESPOCRM_URL`

### Error: "401 Unauthorized"
- Verificar que `ESPOCRM_API_KEY` es correcta
- Verificar que el API key tiene permisos de admin

### Error: "Cannot connect"
- Verificar que EspoCRM está desplegado
- Verificar que la URL incluye `/api/v1`
- Verificar conectividad desde Railway

---

## 📝 NOTAS IMPORTANTES

- Los scripts son **idempotentes** (puedes ejecutarlos múltiples veces)
- Si un campo/lista ya existe, el script lo saltará
- Los scripts muestran un resumen al final
- Si algo falla, el script mostrará el error específico

