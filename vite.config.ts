/// <reference types="vitest/config" />
import react from '@vitejs/plugin-react-swc';
import { playwright } from '@vitest/browser-playwright';
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
      reportsDirectory: './reports/coverage',
      include: ['src/**/*'],
      exclude: ['src/main.tsx', 'src/vite-env.d.ts', 'src/**/*.d.ts'],
    },
    reporters: ['verbose', 'junit'],
    outputFile: {
      junit: './reports/vitest/junit.xml',
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
          include: ['./tests/component/*.test.{ts,tsx,js,jsx}'],
          setupFiles: ['./tests/setup/setup-browser.ts'],
          browser: {
            enabled: true,
            provider: playwright(),
            headless: true,
            instances: [{ browser: 'chromium' }],
          },
        },
        /*? Without optimizeDeps it reloads these deps during the tests... */
        optimizeDeps: {
          include: ['react/jsx-dev-runtime', 'jest-axe'],
        },
      },
      {
        test: {
          name: { label: 'integration', color: 'magenta' },
          include: ['./tests/integration/*.test.{ts,tsx,js,jsx}'],
          setupFiles: ['./tests/setup/setup-browser.ts'],
          browser: {
            enabled: true,
            provider: playwright(),
            headless: true,
            instances: [{ browser: 'chromium' }],
          },
        },
        /*? Without optimizeDeps it reloads these deps during the tests... */
        optimizeDeps: {
          include: ['react/jsx-dev-runtime', 'jest-axe'],
        },
      },
    ],
  },
});
