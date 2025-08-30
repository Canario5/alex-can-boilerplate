import { page } from '@vitest/browser/context';
import { axe } from 'jest-axe';
import { describe, expect, test } from 'vitest';
import { render } from 'vitest-browser-react';

import App from '../../src/App';

describe('App component in browser', () => {
  test('should be accessible', async () => {
    const { container } = await render(<App />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('should render and interact with the counter', async () => {
    await render(<App />);

    expect(page.getByRole('heading', { name: 'Vite + React' })).toBeVisible();

    const button = page.getByRole('button', { name: /count is/ });
    await expect.element(button).toHaveTextContent('count is 0');

    await button.click();

    await expect.element(button).toHaveTextContent('count is 1');
  });
});
