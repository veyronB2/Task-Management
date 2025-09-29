import { defineConfig, devices } from "@playwright/test";

const baseUrl = "http://localhost:3000";

const defaults = {
    baseURL: baseUrl
};

export default defineConfig({
    testDir: "src/tests/e2e",
    testMatch: "**/*.spec.ts",
    timeout: 60000,
    fullyParallel: true,
    reporter: [["html", { open: "on-failure" }]],
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
            use: { ...devices["Desktop Chrome"], ...defaults }
        },
        {
            name: "firefox",
            use: { ...devices["Desktop Firefox"], ...defaults }
        },
        {
            name: "webkit",
            use: { ...devices["Desktop Safari"], ...defaults }
        },
        {
            name: "edge",
            use: {
                ...devices["Desktop Edge"],
                channel: "msedge",
                ...defaults
            }
        }
    ],
});
