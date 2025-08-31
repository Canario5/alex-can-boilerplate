import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import App from '../../src/App';
import { expectAccessible } from '../utils/accessibility';

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

    await expectAccessible(container);

    const button = getByRole('button', { name: /count is/ });
    await button.click();

    await expectAccessible(container, undefined, 'after click');
  });
});
