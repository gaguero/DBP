# 📧 Configuración SMTP en EspoCRM - Guía Paso a Paso

## 🔍 Situación Actual

Tienes las variables de entorno configuradas en Railway:
- ✅ `ESPOCRM_SMTP_HOST="smtp.gmail.com"`
- ✅ `ESPOCRM_SMTP_PORT="587"`
- ✅ `ESPOCRM_SMTP_SECURITY="tls"`
- ✅ `ESPOCRM_SMTP_USER="gerson@verdetechfarming.com"`
- ✅ `ESPOCRM_SMTP_PASSWORD="rgfgdmiraushgzbu"`

**⚠️ IMPORTANTE:** Las variables de entorno pueden no aplicarse automáticamente en la UI. Debes configurarlo manualmente en EspoCRM.

---

## 📋 Pasos para Configurar SMTP

### Opción 1: Configuración Global (Outbound Emails)

1. **Ve a:** Administration → Settings → Outbound Emails
2. **Busca la sección de SMTP** (puede estar más abajo, haz scroll)
3. **Si no ves los campos SMTP**, busca un dropdown o selector que diga:
   - "SMTP" o
   - "Email Sending Method" o
   - "Outbound Email Type"
4. **Selecciona "SMTP"** si hay un selector
5. **Configura los campos:**
   - **SMTP Server:** `smtp.gmail.com`
   - **Port:** `587`
   - **Security:** `TLS`
   - **Username:** `gerson@verdetechfarming.com`
   - **Password:** `rgfgdmiraushgzbu` (App Password de Gmail)
   - **Authentication:** ✅ Marcar (si hay checkbox)
6. **Test Email:**
   - Busca el botón "Test Email Sending" o "Send Test Email"
   - Ingresa tu email
   - Click en enviar
   - Verifica que recibes el email
7. **Save:** Click en "Save" arriba

---

### Opción 2: Email Account (Alternativa)

Si no encuentras los campos en Outbound Emails, configura una Email Account:

1. **Ve a:** Administration → Email Accounts
2. **Click en:** "Create Email Account"
3. **Configura:**
   - **Email Address:** `gerson@verdetechfarming.com`
   - **Assigned User:** Selecciona tu usuario (gerson)
   - **Use SMTP:** ✅ Marcar
   - **SMTP Host:** `smtp.gmail.com`
   - **SMTP Port:** `587`
   - **SMTP Security:** `TLS`
   - **SMTP Username:** `gerson@verdetechfarming.com`
   - **SMTP Password:** `rgfgdmiraushgzbu`
   - **SMTP Auth:** ✅ Marcar
4. **Test Connection:** Click en "Test Connection"
5. **Save:** Click en "Save"

---

## 🔍 Si No Ves los Campos SMTP

### Posibles Razones:

1. **Necesitas hacer scroll:** Los campos pueden estar más abajo en la página
2. **Hay un selector:** Busca un dropdown que diga "SMTP" o "Email Sending Method"
3. **Sección colapsable:** Busca secciones que puedas expandir
4. **Permisos:** Asegúrate de estar logueado como administrador

### Qué Buscar Específicamente:

En la página "Outbound Emails", busca:
- Un campo llamado **"SMTP Server"** o **"SMTP Host"**
- Un campo llamado **"SMTP Port"**
- Un campo llamado **"SMTP Security"** o **"Security"**
- Un campo llamado **"SMTP Username"** o **"Username"**
- Un campo llamado **"SMTP Password"** o **"Password"**

---

## ✅ Verificación

Después de configurar:

1. **Test Email:**
   - Envía un email de prueba
   - Verifica que llegue a tu bandeja de entrada
   - Si no llega, revisa los logs en EspoCRM

2. **Verificar Logs:**
   - Administration → Logs
   - Busca errores relacionados con SMTP
   - Si hay errores, revisa las credenciales

---

## 🚨 Troubleshooting

### Error: "Authentication failed"
- Verifica que el password sea un **App Password** de Gmail, no tu contraseña normal
- Asegúrate de que 2-Step Verification esté activado en Gmail

### Error: "Connection timeout"
- Verifica que el puerto sea `587` (TLS) o `465` (SSL)
- Verifica que el servidor sea `smtp.gmail.com`

### No veo los campos SMTP
- Intenta usar la Opción 2 (Email Account)
- Verifica que tengas permisos de administrador
- Haz scroll completo en la página

---

## 📝 Nota sobre Variables de Entorno

Las variables de entorno (`ESPOCRM_SMTP_*`) pueden:
- ✅ Usarse durante la instalación inicial
- ❌ NO aplicarse automáticamente en la UI después de la instalación

**Por eso es necesario configurarlo manualmente en la UI.**

---

## ✅ CONFIGURACIÓN COMPLETADA

**Método usado:** Email Account (Create Email Account)
- ✅ SMTP configurado exitosamente
- ✅ Test email recibido correctamente
- ✅ Sistema listo para enviar emails

---

## 🎯 Siguiente Paso

Una vez configurado SMTP y probado:
1. ✅ SMTP funcionando
2. ⏳ Editar contenido de Email Templates
3. ⏳ Crear Workflows BPM

