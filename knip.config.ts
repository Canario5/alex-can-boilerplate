import type { KnipConfig } from 'knip';

const config: KnipConfig = {
  entry: ['src/main.tsx!'],
  project: ['**/*.{js,cjs,mjs,jsx,ts,cts,mts,tsx}!', '!scripts/npm-prepare.js!'],
  ignoreBinaries: ['docker-compose', 'lefthook'],
};

export default config;
