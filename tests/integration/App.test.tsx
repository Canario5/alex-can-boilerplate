import { axe } from 'jest-axe';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';

import App from '../../src/App';

describe('App integration', () => {
  it('increments counter on button click', async () => {
    const { getByRole } = await render(<App />);

    const button = getByRole('button', { name: /count is/ });
    expect(button).toBeInTheDocument();

    await button.click();
    expect(button).toHaveTextContent('count is 1');

    await button.click();
    expect(button).toHaveTextContent('count is 2');
  });

  it('maintains accessibility during interactions', async () => {
    const { container, getByRole } = await render(<App />);

    const initialResults = await axe(container);
    expect(initialResults).toHaveNoViolations();

    const button = getByRole('button', { name: /count is/ });
    await button.click();

    const afterClickResults = await axe(container);
    expect(afterClickResults).toHaveNoViolations();
  });
});
