import { defineConfig } from "@playwright/test";

export default defineConfig({
    testDir: "src/tests/e2e",
    testMatch: "**/*.spec.ts",
    use: {
        trace: "off"
    }
});
