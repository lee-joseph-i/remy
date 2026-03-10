import { test, expect } from '@playwright/test';

test('homepage loads and displays content', async ({ page }) => {
  await page.goto('/');
  
  // Check main heading
  await expect(page.getByRole('heading', { name: 'Hello World' })).toBeVisible();
  
  // Check all three buttons are present
  await expect(page.getByRole('button', { name: 'Primary' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Secondary' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Outline' })).toBeVisible();
});

test('buttons are clickable', async ({ page }) => {
  await page.goto('/');
  
  // Test button interactions
  const primaryButton = page.getByRole('button', { name: 'Primary' });
  await expect(primaryButton).toBeEnabled();
  await primaryButton.click();
});