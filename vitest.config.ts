import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  test: {
    projects: [
      {
        test: {
          name: 'unit',
          environment: 'node',
          include: ['tests/unit/**/*.test.{ts,tsx,js,jsx}'],
          setupFiles: ['tests/setup/setup-unit.ts'],
        },
      },
      {
        test: {
          name: 'browser',
          browser: {
            enabled: true,
            instances: [{ browser: 'chromium' }],
            provider: 'playwright',
            headless: true,
          },
          include: ['tests/browser/**/*.test.{ts,tsx,js,jsx}'],
          setupFiles: ['tests/setup/setup-browser.ts'],
        },
        /*? Without optimizeDeps it reloaded these deps during the test... maybe because of beta versions? */
        optimizeDeps: {
          include: ['vitest-browser-react', 'react/jsx-dev-runtime'],
        },
      },
    ],
  },
});
