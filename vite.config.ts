/// <reference types="vitest" />

import { defineConfig } from "vite";
import { nodePolyfills } from "vite-plugin-node-polyfills"
import path from "path";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths"

const root = path.resolve(__dirname, "src");

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
      react(), 
      tsconfigPaths(),
      nodePolyfills({
        globals: {
          process: true,
        },
      })
    ],
    server: {
      port: 3000,
    },
    preview: {
      port: 3000,
    },
    test: {
      include: ['**/*.test.ts', '**/*.test.tsx'],
      globalSetup: './vitest.global-setup.ts',
      globals: true
    },
    appType: "spa",
  });