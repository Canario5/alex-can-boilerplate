import { page } from '@vitest/browser/context';
import { describe, expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import App from '../../src/App';
import { expectAccessible } from '../utils/accessibility';

async function expectAppVisible() {
  await expect.element(page.getByRole('heading', { name: 'Vite + React', level: 1 })).toBeVisible();
  await expect.element(page.getByAltText('Vite logo')).toBeVisible();
  await expect.element(page.getByAltText('React logo')).toBeVisible();
  await expect.element(page.getByText('Edit src/App.tsx and save to test HMR')).toBeVisible();
  await expect.element(page.getByText('Click on the Vite and React logos to learn more')).toBeVisible();
}

describe('App Integration Flows', () => {
  test('should handle rapid user interactions gracefully', async () => {
    await render(<App />);

    // ✅ GOOD: Integration tests use page context for cross-component interactions
    const button = page.getByRole('button', { name: /count is/i });

    for (let i = 1; i <= 25; i++) {
      await button.click();
    }

    await expect.element(button).toHaveTextContent('count is 25 times');

    await expectAppVisible();
  });

  test('should maintain consistent state across complex interaction patterns', async () => {
    await render(<App />);

    const appRoot = page.getByTestId('app-root');
    await expectAccessible(appRoot, undefined, 'after 7 clicks total');

    // ✅ GOOD: Testing cross-component state consistency
    const button = page.getByRole('button', { name: /count is/i });

    await button.click(); // 1
    await expect.element(button).toHaveTextContent('count is 1 time');
    await button.click(); // 2
    await expect.element(button).toHaveTextContent('count is 2 times');

    await button.click(); // 3
    await button.click(); // 4
    await button.click(); // 5
    await expect.element(button).toHaveTextContent('count is 5 times');

    await button.click(); // 6
    await button.click(); // 7
    await expect.element(button).toHaveTextContent('count is 7 times');

    await expectAppVisible();
    await expectAccessible(appRoot, undefined, 'after 7 clicks total');
  });
});
