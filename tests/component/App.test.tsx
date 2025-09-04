import { describe, expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import App from '../../src/App';
import { expectAccessible } from '../utils/accessibility';

describe('App Component', () => {
  test('should render all UI elements correctly', async () => {
    const screen = await render(<App />);

    await expect.element(screen.getByRole('heading', { name: 'Vite + React', level: 1 })).toBeVisible();
    await expect.element(screen.getByRole('button', { name: /count is 0 times/ })).toBeVisible();
    await expect.element(screen.getByAltText('Vite logo')).toBeVisible();
    await expect.element(screen.getByAltText('React logo')).toBeVisible();
    await expect.element(screen.getByText('Edit src/App.tsx and save to test HMR')).toBeVisible();
    await expect.element(screen.getByText('Click on the Vite and React logos to learn more')).toBeVisible();
  });

  test('should handle single button click', async () => {
    const screen = await render(<App />);

    // ✅ GOOD: Semantic selector - tests what users actually see/interact with
    const button = screen.getByRole('button', { name: /count is/ });

    // ❌ AVOID: Implementation-specific selector (brittle)
    // const button = screen.locator('.css-button-class');

    await expect.element(button).toHaveTextContent('count is 0 times');
    await button.click();
    await expect.element(button).toHaveTextContent('count is 1 time');
  });

  test('is accessible', async () => {
    const screen = await render(<App />);
    const appRoot = screen.getByTestId('app-root');
    await expectAccessible(appRoot);
  });
});
