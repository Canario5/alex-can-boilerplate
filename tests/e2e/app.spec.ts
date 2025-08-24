import { expect, test } from '@playwright/test';

test('should display Vite + React heading', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Vite + React' })).toBeVisible();
});

test('should increment counter on button click', async ({ page }) => {
  await page.goto('/');
  const button = page.getByRole('button', { name: /count is/ });
  await expect(button).toHaveText('count is 0');
  await button.click();
  await expect(button).toHaveText('count is 1');
});
