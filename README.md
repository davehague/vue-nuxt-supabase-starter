# Vue-Nuxt-Supabase Starter Project

This is an opinionated starter project that to quickly spin up Nuxt based web projects with Google OAuth, Supabase backend, and client side state management with Pinia.

## Features

- Vue.js (latest version) / Nuxt 3
- [Supabase](https://supabase.com/) for data persistences (PaaS)
- [Pinia](https://pinia.vuejs.org/ssr/nuxt.html) for state management (with [Pinia Persisted State](https://prazdevs.github.io/pinia-plugin-persistedstate/frameworks/nuxt.html))
- Tailwind CSS for utility-first styling
- Lucide Vue Next for icons
- [Vue3-Google-Sign-In for authentication](https://vue3-google-signin.wavezync.com/guide/)

## Prerequisites

- Node.js (version compatible with Nuxt 3)
- pnpm (recommended) or npm

## Getting Started

Clone the repository:

```
git clone [your-repo-url]
cd vue-nuxt-supabase-starter
```

Install dependencies:

```
pnpm install
```

### TypeScript Checking

The project includes TypeScript checking commands to catch type errors during development:

```bash
pnpm run typecheck      # Check Vue files and TypeScript with vue-tsc
pnpm run typecheck:tsc  # Pure TypeScript checking with tsc
```

- **`pnpm run typecheck`**: Uses `vue-tsc` to check both `.vue` files and TypeScript files for type errors
- **`pnpm run typecheck:tsc`**: Uses the TypeScript compiler directly (`tsc --noEmit --skipLibCheck`) for pure TypeScript checking

#### Checking Individual Files

To check a single file instead of the entire project:

```bash
npx vue-tsc --noEmit path/to/file.vue    # For Vue files
npx tsc --noEmit path/to/file.ts         # For TypeScript files
```

Run these commands before committing to ensure type safety across the codebase.

### Setting up Google Sign-In

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Go to the Credentials page
4. Create an OAuth 2.0 Client ID
   - Application type: Web application
   - Add authorized JavaScript origins: `https://localhost:3000` (for development)
   - Add authorized redirect URIs: `https://localhost:3000` (for development)
5. Copy the Client ID and paste it into your `.env` file as `GOOGLE_CLIENT_ID`

Local dev now requires HTTPS. Use `mkcert` to create local certificates:

_**Note**: Install mkcert using chocolately (Windows) or Homebrew (Mac)_

```
mkcert localhost
```

Note: `nuxt.config.ts` is already set up to use the cert during local dev:

```
export default defineNuxtConfig({
  devServer: {
    https: {
      key: './localhost-key.pem',
      cert: './localhost.pem',
    }
  },
```

### Setting up Supabase

1. Add the variables `SUPABASE_URL`, `SUPABASE_SERVICE_KEY`, and `SUPABASE_SCHEMA` to your `.env` file
2. Run the automated setup script:
   ```
   pnpm run setup:supabase
   ```
   This will generate a SQL script with all necessary schema setup commands.

3. Go to your Supabase Dashboard
4. Navigate to SQL Editor
5. Copy and paste the generated SQL script
6. Execute the script
7. Go to Settings > API
8. Add your schema name to the exposed schemas list
9. Save the changes

**Note**: We default to org_id = 1 in `UserService`, but modify as needed.

**Background**: This approach uses Postgres schemas to allow multiple projects on Supabase's free tier. See [this gist](https://www.davehague.com/gists/5f694889f466d18c5b48fda89ddfc14a) for more details about the schema-based approach.

## Styling with Tailwind CSS

This project uses Tailwind CSS for styling. Tailwind provides a set of utility classes that you can use directly in your HTML to style your components. To customize your Tailwind setup, you can modify the `tailwind.config.js` file (if you've created one) or add Tailwind-specific configuration to your `nuxt.config.ts` file.

## Icons with Lucide Vue Next

The project includes [Lucide](https://lucide.dev/) for icons. You can use these icons in your Vue components as needed.

## Favicon

To change the title and favicon, update `nuxt.config.ts`. Create your own favicon at https://favicon.io/ and simply drop overtop of the files in the `public` folder.

## Environment Variables

Create a `.env` file in the root directory of the project to store secret project variables.

```
NUXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
SUPABASE_URL=your_supabase_project_url
SUPABASE_SCHEMA=your_supabase_schema
SUPABASE_SERVICE_KEY=your_supabase_service_key
```
