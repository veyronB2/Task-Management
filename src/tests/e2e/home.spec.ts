import { expect, test } from "@playwright/test";

test.describe("Home", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("http://localhost:3000/");
    });

    test("should have correct metadata and elements", async ({ page }) => {
        await expect(page).toHaveTitle("Task Management");

        const heading = page.getByRole("heading", { name: "Task Management"});
        await expect(heading).toBeVisible();

        const link = page.getByRole("button", {name: "VIEW TASKS"});
        await expect(link).toBeVisible();
    });

    test("should redirect to view tasks page on click ", async ({ page }) => {
        await page.getByRole("button", { name: "VIEW TASKS"}).click();
        await expect(page).toHaveURL("http://localhost:3000/view-tasks");
    });
});
