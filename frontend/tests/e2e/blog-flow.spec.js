const { test, expect } = require('@playwright/test');

const BASE_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

test.describe('MiniBlog Elite User Flow', () => {
  const randomUser = `user_${Math.floor(Math.random() * 10000)}`;

  test('should allow a user to register, login, and post', async ({ page }) => {
    // 1. Registration
    await page.goto(`${BASE_URL}/register`);
    await page.fill('input[placeholder="Choose a username"]', randomUser);
    await page.fill('input[placeholder="Set a strong password"]', 'password123');
    await page.click('button:has-text("Get Started")');
    
    // Wait for redirect to login
    await expect(page).toHaveURL(/.*login/);
    console.log('✅ Registration successful');

    // 2. Login
    await page.fill('input[placeholder="Enter your username"]', randomUser);
    await page.fill('input[placeholder="••••••••"]', 'password123');
    await page.click('button:has-text("Log In")');
    
    await expect(page).toHaveURL(/.*posts/);
    console.log('✅ Login successful');

    // 3. Create Post
    await page.click('button:has-text("Create Post")');
    const postTitle = `DevOps Insight ${Date.now()}`;
    await page.fill('input[placeholder="Enter an impactful title..."]', postTitle);
    await page.fill('textarea[placeholder="Share your thoughts or code snippets..."]', 'This is a test post from Playwright Elite E2E');
    await page.click('button:has-text("Publish Post")');

    // 4. Verification
    await expect(page.locator(`text=${postTitle}`)).toBeVisible();
    console.log('✅ Post creation and verification successful');
  });
});
