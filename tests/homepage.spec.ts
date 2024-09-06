import { test, expect } from '@playwright/test';

test('homepage should have the correct title', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/My Firebase App/i);
});

test('should navigate to the about page', async ({ page }) => {
  await page.goto('/');
  await page.click('text=About'); // Assuming you have a link with the text "About"
  await expect(page).toHaveURL('/about');
});