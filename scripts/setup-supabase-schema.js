#!/usr/bin/env node

import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { writeFileSync } from 'fs';

// Load environment variables from parent directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
config({ path: join(__dirname, '..', '.env') });

// Validate required environment variables
const requiredEnvVars = ['SUPABASE_SCHEMA'];
const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
  console.error('❌ Missing required environment variables:', missingVars.join(', '));
  console.error('Please ensure your .env file contains SUPABASE_SCHEMA.');
  process.exit(1);
}

const SCHEMA_NAME = process.env.SUPABASE_SCHEMA;

// Generate SQL script
const sqlScript = `-- Supabase Schema Setup Script for: ${SCHEMA_NAME}
-- Generated on: ${new Date().toISOString()}

-- Step 1: Create schema
CREATE SCHEMA IF NOT EXISTS ${SCHEMA_NAME};

-- Step 2: Grant permissions
GRANT USAGE ON SCHEMA ${SCHEMA_NAME} TO anon, authenticated, service_role;
GRANT ALL ON ALL TABLES IN SCHEMA ${SCHEMA_NAME} TO anon, authenticated, service_role;
GRANT ALL ON ALL ROUTINES IN SCHEMA ${SCHEMA_NAME} TO anon, authenticated, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA ${SCHEMA_NAME} TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA ${SCHEMA_NAME} GRANT ALL ON TABLES TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA ${SCHEMA_NAME} GRANT ALL ON ROUTINES TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA ${SCHEMA_NAME} GRANT ALL ON SEQUENCES TO anon, authenticated, service_role;

-- Step 3: Create organizations table
CREATE TABLE IF NOT EXISTS ${SCHEMA_NAME}.organizations (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

-- Insert default organization
INSERT INTO ${SCHEMA_NAME}.organizations (id, name)
VALUES (1, 'Default organization')
ON CONFLICT (id) DO NOTHING;

-- Step 4: Create users table
CREATE TABLE IF NOT EXISTS ${SCHEMA_NAME}.users (
  id SERIAL PRIMARY KEY,
  organization_id INTEGER REFERENCES ${SCHEMA_NAME}.organizations(id),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  picture VARCHAR(1024),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  last_login TIMESTAMPTZ DEFAULT NULL
);

-- Step 5: Enable Row Level Security
ALTER TABLE ${SCHEMA_NAME}.organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE ${SCHEMA_NAME}.users ENABLE ROW LEVEL SECURITY;
`;

// Save SQL script to file
const outputPath = join(__dirname, `supabase-setup-${SCHEMA_NAME}.sql`);
writeFileSync(outputPath, sqlScript);

console.log(`
🚀 Supabase Schema Setup Script Generated!

Schema name: ${SCHEMA_NAME}
SQL file: ${outputPath}

To complete the setup:

1. Go to your Supabase Dashboard
2. Navigate to SQL Editor
3. Copy and paste the contents of the generated SQL file
4. Execute the script
5. Go to Settings > API
6. Add "${SCHEMA_NAME}" to the exposed schemas list
7. Save the changes

Your schema "${SCHEMA_NAME}" will then be ready to use!
`);

// Also display the SQL for easy copying
console.log('\n--- SQL Script ---\n');
console.log(sqlScript);
console.log('\n--- End of SQL Script ---\n');