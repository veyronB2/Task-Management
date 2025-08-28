/// <reference types="vitest" />

import { defineConfig } from 'vitest/config';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import path from 'path';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    nodePolyfills({
      globals: {
        process: true,
      },
    }),
  ],
  server: {
    port: 3000,
  },
  preview: {
    port: 3000,
  },
  resolve: {
    alias: {
      '~fa': path.resolve(__dirname, 'node_modules/@fortawesome/fontawesome-free/scss'),
      '@jsdevtools/ono': '@jsdevtools/ono/cjs/index.js',
    },
  },
  test: {
    include: ['**/*.test.ts', '**/*.test.tsx'],
    globalSetup: './vitest.global-setup.ts',
    globals: true,
    environment: 'jsdom',
  },
  appType: 'spa',
});
