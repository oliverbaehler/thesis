import { test, expect } from '@playwright/test';


test("User should be able to sign-in via social auth", async ({
  page,
}) => {
  await page.goto('/');
  await page.click('.login-btn');

  // This is the important bit - waiting for a popup event, and letting that page stabilize first
  const popup = await page.waitForEvent("popup");
  await popup.waitForLoadState("networkidle");
  
  // Use the emulator to create a random new account
  await page.click('button:has-text("Continue With Google")');
  await popup.waitForLoadState("networkidle");1
  await popup.getByRole("button", { name: /auto-generate/i }).click();
  
  // Get the email address of the new account
  // It doesn't seem to have an accessible name, so hardcode it knowing it's the first input
  const email = await popup.getByRole("textbox").first().inputValue();
  
  await popup.getByRole("button", { name: /sign in/i }).click();
  await page.waitForURL("/my-url-after-signInWithPopup");
});