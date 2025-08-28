import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        environment: "jsdom",
        include: ["**/*.test.ts", "**/*.test.tsx"],
        globals: true,
        setupFiles: "./vitest.setup.ts",
    },
    appType: "spa",
    server: {
        port: 3000,
    },
    preview: {
        port: 3000,
    },
});
