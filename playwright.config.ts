import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
    testDir: "src/tests/e2e",
    testMatch: "**/*.spec.ts",
    use: {
        trace: "off"
    },
    projects: [
        {
            name: "chromium",
            use: { ...devices["Desktop Chrome"] }
        },
        {
            name: "firefox",
            use: { ...devices["Desktop Firefox"] },
        },
        {
            name: "webkit",
            use: { ...devices["Desktop Safari"] }
        },
        {
            name: "edge",
            use: {
                ...devices["Desktop Edge"],
                channel: "msedge"
            }
        }
    ],
});
