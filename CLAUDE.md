# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Vue.js + Nuxt 3 + Supabase starter template with Google OAuth authentication. It uses PNPM as the package manager and includes Tailwind CSS for styling.

## Essential Commands

```bash
# Development (starts HTTPS server on https://localhost:3000)
pnpm dev
```

## Architecture

### Authentication Flow
- Landing page (`/`) → Login (`/login`) → Home (`/home`)
- Google OAuth via `vue3-google-signin` component
- JWT tokens stored in Pinia store with persistence
- Global middleware (`middleware/auth.global.ts`) protects routes
- Server-side token validation on all API endpoints

### API Pattern
- Client: `utils/api.ts` wrapper automatically includes Bearer token
- Server: `server/api/` endpoints validate JWT and use `UserService`
- All API calls to `/api/database/*` require valid authentication

### Key Integration Points
- **Supabase Client**: `utils/supabaseClient.ts` (client) and `server/utils/supabaseServerClient.ts` (server)
- **Auth Store**: `stores/auth.ts` manages user state and tokens
- **User Service**: `server/services/UserService.ts` handles database operations

### Database Schema
```sql
-- Users table with RLS enabled
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    given_name TEXT,
    family_name TEXT,
    picture TEXT,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now()
);
```

## Environment Variables

Required in `.env`:
```
NUXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id
SUPABASE_URL=your-supabase-project-url
SUPABASE_SCHEMA=your-schema-name
SUPABASE_SERVICE_KEY=your-service-key
```

## Development Setup Requirements

1. Local HTTPS certificates required for Google OAuth:
   ```bash
   mkcert -install
   mkcert localhost
   ```
   Place `localhost.pem` and `localhost-key.pem` in project root.

2. Google OAuth setup:
   - Create project in Google Cloud Console
   - Enable Google+ API
   - Configure OAuth consent screen
   - Add `https://localhost:3000` to authorized JavaScript origins

## Common Tasks

### Adding a New Protected Page
1. Create page in `pages/` directory
2. Middleware automatically protects non-public routes
3. Access user data via `const { user } = useAuthStore()`

### Adding a New API Endpoint
1. Create file in `server/api/database/`
2. Use `validateUserFromToken()` to verify authentication:
   ```typescript
   const user = await validateUserFromToken(event);
   if (!user) throw createError({ statusCode: 401 });
   ```

### Modifying Database Schema
1. Update Supabase table via dashboard or SQL
2. Update `types/interfaces.ts` with new fields
3. Update `UserService` if needed for new operations


# Tech

This is a Vue project, built using Nuxt with Typescript and Tailwind CSS.  I strongly prefer to use compositional API with `<script setup>` tags, please default to that style.  When writing functions use the "arrow function" syntax (example:  `const sendWelcomeEmail = async (email: string) => {})`

I also prefer this ordering:  `<template>`, followed by `<script setup lang="ts">` followed by `<style>` (but only if needed because Tailwind couldn't do something very specific).

This project uses pnpm. 

The project also uses Pinia as a client side store, with Pinia persisted state plugin. 

We'll be using Supabase as a backend with custom authentication (not Supabase Auth). The project implements Google Sign-In for authentication, with Google ID tokens validated on the backend using the `verifyAuth()` utility in `/server/utils/auth.ts`. This project uses API endpoints (server/api) to handle connections from the frontend code, which then call services (server/services) to connect to the Supabase cloud instance. We use a supabaseServerClient utility (/server/utils/supabaseServerClient.ts) configured with a service account key to bypass RLS configurations, allowing the backend to manage data access control through our custom authentication layer. 

When importing add the word "type" to the import for types, and use the "@" syntax for referring to the root of the project.  Example: `import { type Organization } from '@/types/interfaces'`

Use Lucide icons.

Keep mobile layout in mind when making UI changes. 

Use the Nuxt `layouts` as appropriate for reusable layouts.

When generating code files, try to keep them a manageable size, a few hundred lines at most.  If a file is getting too long, consider breaking it up into utility files or components and organizing them in a folder hierarchy.   When creating temporary scripts, clean them up afterwards if we solved the problem or the script is not evergreen.  Same applies for types, keep them reasonable size and organized in a folder structure as they get too long. 

When creating API endpoints, consider if you should put them under test so we can validate them independently of the UI.

## Conditional conditions
When and if we get to a place where we implement emails, I prefer Mailjet.  Ask me before getting started and I'll provide a starter script. 

When and if we are integrating third-party APIs ask for request and response body examples or look them up using your Web Tools.
