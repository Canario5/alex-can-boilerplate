import { expect, test } from '@playwright/test';

test('should display Vite + React heading', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Vite + React' })).toBeVisible();
});

test('should increment counter on button click', async ({ page }) => {
  await page.goto('/');
  const button = page.getByRole('button', { name: /count is/ });
  await expect(button).toHaveText('count is 0 times');
  await button.click();
  await expect(button).toHaveText('count is 1 time');
});

test('should handle rapid user interactions gracefully', async ({ page }) => {
  await page.goto('/');

  const button = page.getByRole('button', { name: /count is/ });

  for (let i = 1; i <= 25; i++) {
    await button.click();
  }

  await expect(button).toHaveText('count is 25 times');

  await expect(page.getByRole('heading', { name: 'Vite + React', level: 1 })).toBeVisible();
  await expect(page.getByText('Click on the Vite and React logos to learn more')).toBeVisible();
});

test('should maintain consistent state across complex interaction patterns', async ({ page }) => {
  await page.goto('/');

  const button = page.getByRole('button', { name: /count is/i });

  await button.click(); // 1
  await button.click(); // 2
  await expect(button).toHaveText('count is 2 times');

  await button.click(); // 3
  await button.click(); // 4
  await button.click(); // 5
  await expect(button).toHaveText('count is 5 times');

  await button.click(); // 6
  await button.click(); // 7
  await expect(button).toHaveText('count is 7 times');

  await expect(page.getByRole('heading', { name: 'Vite + React', level: 1 })).toBeVisible();
  await expect(page.getByAltText('Vite logo')).toBeVisible();
  await expect(page.getByAltText('React logo')).toBeVisible();
  await expect(page.getByText('Edit src/App.tsx and save to test HMR')).toBeVisible();
  await expect(page.getByText('Click on the Vite and React logos to learn more')).toBeVisible();
});
