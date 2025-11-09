# Flujo de Trabajo Colaborativo - Múltiples Desarrolladores

## 🌿 Estructura de Ramas

```
main (producción)
 │
 └─→ dev (desarrollo/integración)
      │
      ├─→ kelly (rama de Kelly)
      │
      └─→ gerson (rama de Gerson)
```

## 📋 Flujo de Trabajo Diario

### 1. Antes de Empezar a Trabajar

**Cada desarrollador debe actualizar su rama desde dev:**

```bash
# Kelly en su rama
git checkout kelly
git fetch origin dev
git merge dev
# O más simple:
git pull origin dev

# Gerson en su rama
git checkout gerson
git fetch origin dev
git merge dev
# O más simple:
git pull origin dev
```

**¿Por qué?** Para asegurarse de tener los últimos cambios de otros desarrolladores antes de empezar.

### 2. Durante el Desarrollo

**Cada uno trabaja en su rama:**

```bash
# Hacer cambios
git add .
git commit -m "Descripción clara de cambios"
git push origin kelly  # o gerson
```

### 3. Cuando Terminas una Feature

**Crear Pull Request hacia dev:**

```bash
# Opción 1: Desde GitHub UI
# Ir a: https://github.com/gaguero/DBP/pulls
# Click "New Pull Request"
# Base: dev, Compare: kelly (o gerson)

# Opción 2: Desde terminal (si tienes GitHub CLI)
gh pr create --base dev --head kelly --title "Título descriptivo"
```

## 🔀 Escenarios de Merge

### Escenario 1: Merge Simple (Sin Conflictos)

**Cuando Kelly hace merge primero:**

```bash
# 1. Kelly crea PR: kelly → dev
# 2. Code review y aprobación
# 3. Merge a dev (desde GitHub UI o terminal)

# 4. Gerson actualiza su rama
git checkout gerson
git pull origin dev  # Trae los cambios de Kelly
# Continúa trabajando normalmente
```

**Cuando Gerson hace merge primero:**

```bash
# 1. Gerson crea PR: gerson → dev
# 2. Code review y aprobación
# 3. Merge a dev

# 4. Kelly actualiza su rama
git checkout kelly
git pull origin dev  # Trae los cambios de Gerson
# Continúa trabajando normalmente
```

### Escenario 2: Conflictos (Ambos Cambiaron lo Mismo)

**Situación:** Kelly y Gerson modificaron el mismo archivo en diferentes lugares.

**Solución:**

```bash
# 1. Kelly mergea primero: kelly → dev ✅

# 2. Gerson intenta actualizar su rama
git checkout gerson
git pull origin dev

# 3. Git detecta conflictos:
# Auto-merging apps/web/src/app/page.tsx
# CONFLICT (content): Merge conflict in apps/web/src/app/page.tsx

# 4. Gerson resuelve conflictos manualmente
# Abre el archivo con conflictos:
# 
# <<<<<<< HEAD (cambios de Gerson)
# código de Gerson
# =======
# código de Kelly
# >>>>>>> dev (cambios de Kelly)
#
# Edita para mantener ambos cambios o elegir uno:
# código combinado o elegido

# 5. Marca conflictos como resueltos
git add apps/web/src/app/page.tsx
git commit -m "Merge dev into gerson, resolved conflicts"
git push origin gerson

# 6. Ahora puede crear PR normalmente
```

### Escenario 3: Conflictos en Pull Request

**Cuando creas PR y GitHub detecta conflictos:**

```bash
# GitHub mostrará: "This branch has conflicts that must be resolved"

# Opción A: Resolver desde GitHub (recomendado para conflictos simples)
# 1. Click "Resolve conflicts" en GitHub
# 2. GitHub editor te muestra los conflictos
# 3. Edita directamente en GitHub
# 4. Marca como resuelto
# 5. Merge automático

# Opción B: Resolver localmente (recomendado para conflictos complejos)
git checkout gerson
git fetch origin dev
git merge origin/dev
# Resolver conflictos localmente
git add .
git commit -m "Resolve merge conflicts"
git push origin gerson
# PR se actualiza automáticamente
```

## 🎯 Mejores Prácticas

### 1. Actualizar Frecuentemente

```bash
# Al inicio de cada día/sesión
git checkout tu-rama
git pull origin dev
```

**Beneficio:** Conflictos más pequeños y fáciles de resolver.

### 2. Commits Pequeños y Frecuentes

```bash
# ✅ Bueno: Commits pequeños y descriptivos
git commit -m "Add contact form validation"
git commit -m "Update footer links"
git commit -m "Fix mobile navigation"

# ❌ Malo: Un commit gigante
git commit -m "Update everything"
```

**Beneficio:** Más fácil identificar qué causó un problema.

### 3. Pull Requests Descriptivos

```markdown
## Cambios
- Agregué validación al formulario de contacto
- Actualicé los links del footer
- Corregí navegación móvil

## Testing
- [x] Probado en Chrome
- [x] Probado en móvil
- [x] Formulario funciona correctamente

## Screenshots
[Si aplica]
```

### 4. Comunicación

**Antes de hacer cambios grandes:**
- Avisar al equipo
- Coordinar si afecta archivos compartidos
- Considerar crear rama temporal para experimentar

## 📊 Comandos Útiles

### Ver Estado de Ramas

```bash
# Ver todas las ramas
git branch -a

# Ver commits en cada rama
git log --oneline --graph --all --decorate

# Ver diferencias entre ramas
git diff dev..kelly
git diff dev..gerson
```

### Ver Qué Archivos Cambiaron

```bash
# Ver cambios en tu rama vs dev
git diff dev --name-only

# Ver cambios detallados
git diff dev
```

### Abortar Merge Si Te Equivocaste

```bash
# Si estás en medio de resolver conflictos y quieres empezar de nuevo
git merge --abort
```

## 🔄 Flujo Completo Ejemplo

### Día 1: Kelly y Gerson Empiezan

```bash
# Kelly
git checkout kelly
git pull origin dev  # Actualiza desde dev
# Trabaja en feature A
git add .
git commit -m "Feature A: Add sitemap structure"
git push origin kelly

# Gerson
git checkout gerson
git pull origin dev  # Actualiza desde dev
# Trabaja en feature B
git add .
git commit -m "Feature B: Update navigation"
git push origin gerson
```

### Día 2: Kelly Termina Primero

```bash
# Kelly crea PR: kelly → dev
# Code review
# Merge a dev ✅

# Gerson actualiza
git checkout gerson
git pull origin dev  # Trae cambios de Kelly
# Continúa trabajando en feature B
```

### Día 3: Gerson Termina, Hay Conflictos

```bash
# Gerson crea PR: gerson → dev
# GitHub detecta conflictos en navigation.tsx

# Gerson resuelve localmente
git checkout gerson
git pull origin dev
# Edita navigation.tsx para resolver conflictos
git add navigation.tsx
git commit -m "Resolve conflicts with kelly's changes"
git push origin gerson
# PR se actualiza, ahora puede mergearse ✅
```

## ⚠️ Qué NO Hacer

❌ **NO hacer merge directo a main**
- Siempre pasar por dev primero

❌ **NO trabajar directamente en dev**
- Dev es solo para integración

❌ **NO hacer force push a ramas compartidas**
- Puede romper el trabajo de otros

❌ **NO ignorar conflictos**
- Siempre resolverlos antes de mergear

❌ **NO hacer commits grandes**
- Dificulta el code review y debugging

## ✅ Checklist Antes de Crear PR

- [ ] Mi rama está actualizada con dev (`git pull origin dev`)
- [ ] No hay conflictos pendientes
- [ ] Código compila sin errores
- [ ] Tests pasan (si aplica)
- [ ] Probado en diferentes navegadores
- [ ] Probado en móvil
- [ ] Commits descriptivos
- [ ] PR tiene descripción clara

## 🆘 Resolución de Problemas

### "Your branch is behind 'origin/dev'"

```bash
git pull origin dev
# Resolver conflictos si los hay
```

### "Merge conflict" durante pull

```bash
# Ver archivos con conflictos
git status

# Resolver manualmente cada archivo
# Luego:
git add archivo-resuelto.tsx
git commit -m "Resolve merge conflicts"
```

### "Remote branch was deleted"

```bash
# Limpiar referencias locales
git fetch --prune
git branch -d nombre-rama-local
```

---

## 📝 Resumen Rápido

**Flujo diario:**
1. `git pull origin dev` - Actualizar antes de trabajar
2. Trabajar en tu rama
3. `git commit` y `git push` frecuentemente
4. Crear PR cuando termines feature
5. Code review y merge a dev
6. Todos actualizan desde dev

**Si hay conflictos:**
1. Resolver localmente o en GitHub
2. Probar que todo funciona
3. Continuar con el merge

**¡Comunicación es clave!** Si vas a cambiar algo grande, coordina con el equipo.

---

**Última actualización:** Noviembre 6, 2025

