import { defineConfig, devices } from "@playwright/test";

const baseUrl = "http://localhost:3000";

export default defineConfig({
    testDir: "src/tests/e2e",
    testMatch: "**/*.spec.ts",
    timeout: 60000,
    fullyParallel: true,
    webServer: {
        command: "npm run dev",
        url: baseUrl,
        reuseExistingServer: !process.env.CI,
        stdout: "ignore",
        stderr: "pipe",
    },
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
