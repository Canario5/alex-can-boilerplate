import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0, //? In CI retry once to mitigate CI flakiness, locally fail immediately
  workers: process.env.CI ? 1 : undefined, //? locally Playwright sets number of workers automatically
  reporter: process.env.CI
    ? [
        ['html', { outputFolder: './reports/playwright/playwright-report', open: 'never' }],
        ['junit', { outputFile: './reports/playwright/results.xml' }],
        ['github'],
      ]
    : [['html', { outputFolder: './reports/playwright/playwright-report', open: 'never' }], ['list']],
  use: {
    baseURL: process.env.CI ? 'http://localhost:8080' : 'http://localhost:5173',
    trace: 'on-first-retry',
    screenshot: {
      mode: 'only-on-failure',
      fullPage: true,
    },
  },
  outputDir: './reports/playwright/artifacts',
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], channel: 'chromium' },
    },
  ],
  webServer: process.env.CI
    ? undefined
    : {
        command: 'pnpm run dev',
        url: 'http://localhost:5173',
        reuseExistingServer: !process.env.CI,
      },
});
