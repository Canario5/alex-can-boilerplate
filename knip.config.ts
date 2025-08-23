import type { KnipConfig } from 'knip';

const config: KnipConfig = {
  entry: ['src/main.tsx!'],
  project: ['**/*.{js,cjs,mjs,jsx,ts,cts,mts,tsx}!', '!scripts/npm-prepare.js!', '!tests/**/*!'],
  ignoreBinaries: ['docker-compose', 'lefthook'],
  ignoreDependencies: ['@playwright/test'],
};

export default config;
