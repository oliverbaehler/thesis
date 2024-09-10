import { defineConfig } from '@playwright/test';
import { createTestUser, deleteTestUser } from './tests/auth.setup';
import dotenv from 'dotenv';

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });


export default defineConfig({
  testDir: './tests/specs/',
  timeout: 3000,
  use: {
    headless: true,
    baseURL: 'http://localhost:5002', 
    browserName: 'chromium',
  },
  globalSetup: './tests/global-setup.ts',
  //globalTeardown: './tests/global-teardown.ts', 
});
