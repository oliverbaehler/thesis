import { defineConfig } from '@playwright/test';
import { createTestUser, deleteTestUser } from './e2e/auth.setup';
import dotenv from 'dotenv';

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });


export default defineConfig({
  testDir: './e2e/specs/',
  timeout: 3000,
  use: {
    headless: true,
    baseURL: 'http://localhost:5002', 
    browserName: 'chromium',
  },
  globalSetup: './e2e/global-setup.ts',
  //globalTeardown: './tests/global-teardown.ts', 
});
