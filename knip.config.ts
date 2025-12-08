import type { KnipConfig } from 'knip';

const config: KnipConfig = {
  entry: ['src/main.tsx!'],
  project: ['**/*.{js,cjs,mjs,jsx,ts,cts,mts,tsx}!', '!tests/**/*!'],
  ignoreBinaries: ['d2'],
};

export default config;
