import { test, expect } from '@playwright/test';

test('AI story generation with mocked response', async ({ page }) => {
  // Intercept the API call and return deterministic mock
  await page.route('**/api/agent', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        story: 'This is a mocked AI-generated story about dragons and wizards.',
      }),
    });
  });

  await page.goto('/stories');

  // Verify page loaded
  await expect(page.getByRole('heading', { name: 'AI Story Generator' })).toBeVisible();

  // Click generate button
  await page.getByRole('button', { name: 'Generate Story' }).click();

  // Verify mocked story appears
  await expect(page.getByTestId('story-output')).toHaveText(
    'This is a mocked AI-generated story about dragons and wizards.'
  );
});

test('AI story generation shows loading state', async ({ page }) => {
  // Delay the mock response to test loading state
  await page.route('**/api/agent', async (route) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ story: 'Delayed story response.' }),
    });
  });

  await page.goto('/stories');

  const button = page.getByRole('button', { name: 'Generate Story' });
  await button.click();

  // Check loading state
  await expect(button).toHaveText('Generating...');
  await expect(button).toBeDisabled();

  // Wait for completion
  await expect(page.getByTestId('story-output')).toBeVisible();
  await expect(button).toHaveText('Generate Story');
});
