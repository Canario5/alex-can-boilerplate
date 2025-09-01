/// <reference types="vitest/config" />
import react from '@vitejs/plugin-react-swc';
import { playwright } from '@vitest/browser/providers/playwright';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    strictPort: true,
    watch: {
      usePolling: true,
    },
  },
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['json', 'html', 'lcovonly'],
      reportsDirectory: './coverage',
      include: ['src/**/*'],
      exclude: ['src/main.tsx', 'src/vite-env.d.ts', 'src/**/*.d.ts'],
    },
    projects: [
      {
        test: {
          name: { label: 'unit', color: 'green' },
          environment: 'node',
          include: ['tests/unit/**/*.test.{ts,tsx,js,jsx}'],
          setupFiles: ['tests/setup/setup-unit.ts'],
        },
      },
      {
        test: {
          name: { label: 'component', color: 'cyan' },
          browser: {
            enabled: true,
            instances: [{ browser: 'chromium' }],
            provider: playwright(),
            headless: true,
          },
          include: ['tests/component/**/*.test.{ts,tsx,js,jsx}'],
          setupFiles: ['tests/setup/setup-browser.ts'],
        },
        /*? Without optimizeDeps it reloaded these deps during the test... */
        optimizeDeps: {
          include: ['vitest-browser-react', 'react/jsx-dev-runtime', 'jest-axe'],
        },
      },
      {
        test: {
          name: { label: 'integration', color: 'magenta' },
          browser: {
            enabled: true,
            instances: [{ browser: 'chromium' }],
            provider: playwright(),
            headless: true,
          },
          include: ['tests/integration/**/*.test.{ts,tsx,js,jsx}'],
          setupFiles: ['tests/setup/setup-browser.ts'],
        },
        /*? Without optimizeDeps it reloaded these deps during the test... */
        optimizeDeps: {
          include: ['vitest-browser-react', 'react/jsx-dev-runtime', 'jest-axe'],
        },
      },
    ],
  },
});
