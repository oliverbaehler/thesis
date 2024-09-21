import { test, expect } from '@playwright/test';

test('homepage should have the correct title', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Pariahs Fans/i);
});

test('should navigate to the about page', async ({ page }) => {
  await page.goto('/');
  await page.click('button:has-text("Login")');
  await expect(page).toHaveURL('/login');
});