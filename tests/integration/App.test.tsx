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
});
