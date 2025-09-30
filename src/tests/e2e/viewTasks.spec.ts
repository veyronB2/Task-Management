import { expect, test } from "./fixtures";

import { TASKS_MOCK_DATA } from "./mocks/tasksMockData";

test.describe("View Tasks", () => {
    test("Should have correct elements on the page", async ({ viewTasks, page }) => {
        const { addButton } = viewTasks

        const heading = page.getByRole("heading", { name: "View All Tasks"});
        await expect(heading).toBeVisible();
        await expect(addButton).toBeVisible();

        const motionPaper = page.getByTestId("tasks-table-wrapper");
        await expect(motionPaper).toBeVisible();

        const agGrid = motionPaper.locator(".ag-root-wrapper");
        await expect(agGrid).toBeVisible();

        await addButton.focus();
        await addButton.click();

        const newTaskForm = page.getByTestId("new-task-form");
        await expect(newTaskForm).toBeVisible();
    });

    test("should display a table with 3 rows from local storage", async ({ viewTasks: _viewTasks, page }) => {

        await page.evaluate((tasks) => {
            localStorage.setItem("tasks", JSON.stringify(tasks));
        }, TASKS_MOCK_DATA);

        await expect(page.getByRole("row")).toHaveCount(4); // 3 data rows + 1 header row
    });
});
