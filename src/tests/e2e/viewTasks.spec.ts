import { Locator, Page, expect, test } from "@playwright/test";

interface FillAndCheckProps {
    field: Locator;
    value: string;
    expectedEnabled: boolean;
    createTask: Locator;
}

interface SelectAndCheckProps {
    combobox: Locator;
    optionName: string;
    expectedEnabled: boolean;
    createTask: Locator;
    page: Page;
}

const fillAndCheck = async ({ createTask, field, value, expectedEnabled }: FillAndCheckProps) => {
    await field.fill(value);
    if (expectedEnabled) {
        await expect(createTask).toBeEnabled();
    } else {
        await expect(createTask).toBeDisabled();
    }
};

const selectAndCheck = async ({ createTask, page, combobox, optionName, expectedEnabled }: SelectAndCheckProps) => {
    await combobox.click();
    await page.getByRole("option", { name: optionName }).click();
    if (expectedEnabled) {
        await expect(createTask).toBeEnabled();
    } else {
        await expect(createTask).toBeDisabled();
    }
};

test.describe("View Tasks", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("http://localhost:3000/view-tasks");
    });

    test("Should have correct elements on the page", async ({ page }) => {
        const heading = page.getByRole("heading", { name: "View All Tasks"});
        await expect(heading).toBeVisible();

        const button = page.getByRole("button", {name: "Add Task"});
        await expect(button).toBeVisible();

        const motionPaper = page.getByTestId("tasks-table-wrapper");
        await expect(motionPaper).toBeVisible();

        const agGrid = motionPaper.locator(".ag-root-wrapper");
        await expect(agGrid).toBeVisible();

        await button.focus();
        await button.click();

        const newTaskForm = page.getByTestId("new-task-form");
        await expect(newTaskForm).toBeVisible();
    });
});

test.describe("Task Form Modal", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("http://localhost:3000/view-tasks");

        const button = page.getByRole("button", { name: "Add Task" });
        await expect(button).toBeVisible();
        await button.focus();
        await button.click();

        await expect(page.getByTestId("new-task-form")).toBeVisible();
    });

    test("should have correct fields on the form", async ({ page }) => {
        const heading = page.getByRole("heading", { level: 2 });
        const titleField = page.getByLabel("Title");
        const dueDateField = page.getByLabel("Due Date");
        const completedField = page.getByLabel("Completed");
        const descriptiondField = page.getByRole("textbox", {name: "Description"});

        await expect(heading).toBeVisible();
        await expect(heading).toHaveText("Create Task");

        await expect(titleField).toHaveAttribute("type", "text");
        await expect(titleField).toBeVisible();

        await expect(dueDateField).toHaveAttribute("type", "datetime-local");
        await expect(dueDateField).toBeVisible();

        await expect(completedField).toBeVisible();

        await expect(descriptiondField).toBeVisible();
    });

    test("Should have correct buttons on the new task form", async ({ page }) => {
        const cancelButton = page.getByRole("button", { name: "Cancel"});
        const closeIcon = cancelButton.getByTestId("CloseIcon");

        const createTask = page.getByRole("button", { name: "Create Task"});
        const addIcon = createTask.getByTestId("AddIcon");

        await expect(cancelButton).toBeVisible();
        await expect(closeIcon).toBeVisible();

        await expect(createTask).toBeVisible();
        await expect(createTask).toBeDisabled();
        await expect(addIcon).toBeVisible();
    });

    test("should enable create task button when user changes the form", async ({ page }) => {
        const createTask = page.getByRole("button", { name: "Create Task"});
        const dueDateField = page.getByLabel("Due Date");
        const completedField = page.getByRole("combobox", { name: "Completed" });
        const descriptiondField = page.getByRole("textbox", {name: "Description"});
        const titleField = page.getByLabel("Title");

        await fillAndCheck({ createTask, field: titleField, value: "My Task", expectedEnabled: true});
        await fillAndCheck({ createTask, field: titleField, value: "", expectedEnabled: false});

        await fillAndCheck({ createTask, field: dueDateField, value: "2025-09-23T14:30", expectedEnabled: true});
        await fillAndCheck({ createTask, field: dueDateField, value: "", expectedEnabled: false});

        await selectAndCheck({ createTask, page, combobox: completedField, optionName: "Yes", expectedEnabled: true});
        await selectAndCheck({ createTask, page, combobox: completedField, optionName: "No", expectedEnabled: false});

        await fillAndCheck({ createTask, field: descriptiondField, value: "Testing testing", expectedEnabled: true});
        await fillAndCheck({ createTask, field: descriptiondField, value: "", expectedEnabled: false});
    });
});
