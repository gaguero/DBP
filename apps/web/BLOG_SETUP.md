# Blog System Setup Guide

## Overview

This blog system allows hotel owners to create and manage blog posts through a simple admin panel, similar to WordPress. Posts support flexible content blocks for versatile design.

## Prerequisites

- Node.js 18+ installed
- PostgreSQL database (local or cloud)
- npm or yarn package manager

## Installation Steps

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Create a `.env` file in the `web` directory with the following variables:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/dolphin_blue_paradise?schema=public"

# NextAuth.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-a-random-secret-string-here"

# Admin User (optional - can be created via migration script)
ADMIN_EMAIL="admin@dolphinblueparadise.com"
ADMIN_PASSWORD="change-this-password"
```

**Important**: Generate a secure `NEXTAUTH_SECRET`:
```bash
openssl rand -base64 32
```

### 3. Set Up Database

```bash
# Generate Prisma client
npm run db:generate

# Run migrations (creates tables)
npm run db:migrate

# Or use db:push for development (faster, doesn't create migration files)
npm run db:push
```

### 4. Migrate Existing Posts (Optional)

If you have existing posts in `src/content/stories.ts`, migrate them:

```bash
npm run db:migrate-posts
```

This will:
- Create an admin user (if not exists)
- Migrate all stories from `stories.ts` to the database

### 5. Start Development Server

```bash
npm run dev
```

## Usage

### Admin Panel

1. Navigate to `/admin/login`
2. Log in with admin credentials (from `.env` or created via migration)
3. Access blog management at `/admin/blog`

### Creating a Blog Post

1. Click "New Post" in the admin panel
2. Fill in basic information (title, slug, excerpt, etc.)
3. Add content blocks using the editor:
   - Click buttons to add different block types
   - Reorder blocks using ↑↓ arrows
   - Delete blocks with the Delete button
4. Set publish status (Draft or Published)
5. Click "Create Post"

### Content Block Types

- **Text**: Paragraphs with HTML formatting
- **Heading**: H1, H2, or H3 headings
- **Image**: Images with size and position options
- **Gallery**: Multiple images in a grid
- **Quote**: Highlighted quote blocks
- **Separator**: Visual divider
- **Video**: YouTube or Vimeo embeds
- **Columns**: 2 or 3 column layouts
- **Call-to-Action**: Buttons and links
- **Code**: Code blocks with syntax highlighting
- **List**: Ordered or unordered lists

## API Endpoints

### Public API

- `GET /api/blog` - Get all published posts (filter by `?locale=en` or `?locale=es`)
- `GET /api/blog/[slug]` - Get a specific post by slug

### Admin API (requires authentication)

- `GET /api/admin/blog` - List all posts
- `POST /api/admin/blog` - Create new post
- `GET /api/admin/blog/[id]` - Get post by ID
- `PUT /api/admin/blog/[id]` - Update post
- `DELETE /api/admin/blog/[id]` - Delete post

## Frontend Pages

- `/stories` - English blog listing
- `/stories/[slug]` - English blog post detail
- `/es/historias` - Spanish blog listing
- `/es/historias/[slug]` - Spanish blog post detail

## Troubleshooting

### Database Connection Issues

Ensure PostgreSQL is running and `DATABASE_URL` is correct:
```bash
# Test connection
psql $DATABASE_URL
```

### Authentication Issues

- Verify `NEXTAUTH_SECRET` is set
- Check `NEXTAUTH_URL` matches your domain
- Clear cookies and try logging in again

### Migration Errors

If migration fails:
1. Check database connection
2. Verify schema.prisma matches your database
3. Run `npm run db:generate` before migrating

## Production Deployment

1. Set environment variables in your hosting platform
2. Run migrations: `npm run db:migrate`
3. Build: `npm run build`
4. Start: `npm start`

## Security Notes

- Change default admin password immediately
- Use strong `NEXTAUTH_SECRET` in production
- Enable HTTPS in production
- Regularly update dependencies

