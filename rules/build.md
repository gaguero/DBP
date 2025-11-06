# Build Process - Dolphin Blue Paradise

## Build Command

```bash
pnpm -F web build
```

This runs: `prisma generate && next build --turbopack`

## Build Steps

### 1. Prisma Client Generation
- Reads `prisma/schema.prisma`
- Generates TypeScript client
- Output: `node_modules/@prisma/client`

### 2. Next.js Build (Turbopack)
- Compiles TypeScript
- Bundles client components
- Optimizes server components
- Generates static pages
- Type-checks all code
- Runs ESLint

### 3. Output
- `.next/` directory with optimized build
- Server bundles
- Client bundles
- Static assets
- Route manifests

## Railway Deployment Build

On Railway, the build process includes:

1. **Install dependencies** (`npm install`)
2. **Generate Prisma client** (`prisma generate`)
3. **Build Next.js** (`next build --turbopack`)
4. **Start server** (`npm start`)

**Note:** Database migrations run at START, not build, so database doesn't need to be accessible during build.

## Build Optimization

### Dynamic vs Static Pages

**Static (Pre-rendered)**
- No database calls at build time
- Fast, cached responses
- Use for mostly-static content

**Dynamic (On-demand)**
- Database calls when requested
- Fresh data every time
- Required for auth-protected pages

```typescript
// Force dynamic rendering
export const dynamic = 'force-dynamic';
export const revalidate = 60; // Cache for 60 seconds
```

### Image Optimization
- Images optimized on-demand
- Cached for subsequent requests
- Use Next.js Image component

### Code Splitting
- Automatic by Next.js
- Dynamic imports for large components
- Separate bundles per route

## Build Errors to Watch For

### TypeScript Errors
**Symptom:** Build fails with type errors

**Fix:**
```bash
pnpm -F web tsc --noEmit  # Check types locally
```

Common issues:
- Missing types
- Incorrect prop types
- Any types (strict mode)

### ESLint Warnings
**Symptom:** Build fails with linting errors

**Fix:**
```bash
pnpm -F web lint  # Run linter locally
```

Common issues:
- Unused variables
- Missing dependencies in useEffect
- Incorrect hook usage

### Prisma Schema Issues
**Symptom:** Can't generate Prisma client

**Fix:**
- Check syntax in `schema.prisma`
- Ensure DATABASE_URL is valid
- Run `pnpm -F web db:generate` locally

### Import Errors
**Symptom:** Module not found

**Fix:**
- Check file paths
- Verify imports use `@/` alias
- Ensure file extensions correct

## Environment Variables in Build

### Build-time Variables
These must be available during build:
- None currently (all runtime)

### Runtime Variables
These are accessed at request time:
- `DATABASE_URL`
- `NEXTAUTH_URL`
- `NEXTAUTH_SECRET`
- `ESPOCRM_URL`
- `ESPOCRM_API_KEY`
- etc.

## Build Performance

### Current Build Time
- **Local:** ~15-20 seconds
- **Railway:** ~60-90 seconds

### Optimization Tips
1. Use Turbopack (already enabled)
2. Minimize dependencies
3. Avoid large client-side libraries
4. Use dynamic imports
5. Optimize images before upload

## Build Artifacts

### .next Directory Structure
```
.next/
├── cache/                  # Build cache
├── server/                 # Server bundles
│   ├── app/               # App Router pages
│   ├── chunks/            # Shared chunks
│   └── edge/              # Edge runtime
├── static/                 # Static assets
│   ├── chunks/            # Client chunks
│   ├── css/               # Compiled CSS
│   └── media/             # Optimized media
└── BUILD_ID               # Current build ID
```

## Troubleshooting Build Issues

### Out of Memory
**Symptom:** Build runs out of memory

**Fix:**
```bash
NODE_OPTIONS=--max_old_space_size=4096 pnpm build
```

### Slow Builds
**Check:**
- Node version (use 22.21.1)
- pnpm cache
- Number of dependencies
- Large image files

### Failed Optimizations
**Check:**
- Image sizes
- External resource loading
- Third-party scripts

## Pre-build Checklist

Before building for production:

- [ ] All TypeScript errors resolved
- [ ] ESLint passing
- [ ] Environment variables documented
- [ ] Database schema up to date
- [ ] Migrations prepared
- [ ] Images optimized
- [ ] Dependencies updated and tested
- [ ] No console.logs (except logging)
- [ ] All tests passing

## Post-build Verification

After successful build:

- [ ] Check bundle sizes
- [ ] Verify all routes accessible
- [ ] Test API endpoints
- [ ] Confirm database connections
- [ ] Check error pages (404, 500)
- [ ] Verify static assets loading
- [ ] Test authentication flows
- [ ] Confirm CRM integration

---

**Last updated:** November 6, 2025
