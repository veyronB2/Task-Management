import { Locator, Page, test as base, expect } from "@playwright/test";

type TaskFormFixture = {
    page: Page;
    viewTasks: {
        addButton: Locator;
    };
    taskForm: {
        createTaskButton: Locator;
        titleField: Locator;
        dueDateField: Locator;
        completedField: Locator;
        descriptionField: Locator;
        dueDateLabel: Locator;
        titleLabel: Locator;
        inputFieldset: Locator;
        dueDateFieldset: Locator;
        titleError: Locator;
        dueDateError: Locator;
        cancelButton: Locator;
        addButton: Locator;
    };
};

export const test = base.extend<TaskFormFixture>({
    page: async ({ page }, use) => {
        await page.addStyleTag({
            content: `
                *, *::before, *::after {
                    transition: none !important;
                    animation: none !important;
                    scroll-behavior: auto !important;
                }
            `,
        });

        await use(page);
    },
    viewTasks: async ({ page }, use) => {
        await page.goto("/view-tasks");
        const addButton = page.getByRole("button", { name: "Add Task" });
        await use({ addButton })
    },
    taskForm: async ({ page, viewTasks }, use) => {
        const { addButton } = viewTasks
        await expect(addButton).toBeVisible();
        await addButton.click();

        const form = page.getByTestId("new-task-form");
        await expect(form).toBeVisible();

        const createTaskButton = page.getByRole("button", { name: "Create Task" });
        const titleField = page.getByLabel("Title");
        const dueDateField = page.getByLabel("Due Date");
        const completedField = page.getByRole("combobox", { name: "Completed" });
        const descriptionField = page.getByRole("textbox", { name: "Description" });
        const dueDateLabel = page.getByText("Due Date *");
        const titleLabel = page.getByText("Title *");
        const inputFieldset = titleField.locator("..").locator("fieldset")
        const dueDateFieldset = dueDateField.locator("..").locator("fieldset")
        const titleError = page.getByText("Title is required")
        const dueDateError = page.getByText("Due Date is required")
        const cancelButton = page.getByRole('button', { name: 'Cancel' })

        await use({ 
            createTaskButton, 
            titleField, 
            dueDateField, 
            completedField, 
            descriptionField, 
            dueDateLabel,
            titleLabel,
            inputFieldset,
            dueDateFieldset,
            titleError,
            dueDateError,
            cancelButton,
            addButton
        });
    },
});

export { expect } from "@playwright/test";
