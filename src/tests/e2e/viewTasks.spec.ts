import { expect, test } from "./fixtures";

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
});
