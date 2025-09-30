import { Locator, Page, test as base, expect } from "@playwright/test";

interface ConfirmationDialog {
    dialog: Locator;
    title: Locator;
    message: Locator;
    cancelButton: Locator;
    deleteButton: Locator;
}

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
    addTask: () => Promise<void>;
    confirmationDialog: ConfirmationDialog;
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
    addTask: async ({ viewTasks }, use) => {
        await expect(viewTasks.addButton).toBeVisible();
        await use(() => viewTasks.addButton.click());
    },
    taskForm: async ({ page, addTask, viewTasks }, use) => {
        await addTask();
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
            addButton: viewTasks.addButton
        });
    },
    confirmationDialog: async ({ page, viewTasks: _viewTasks }, use) => {
        const deleteIcon = page.getByRole('row', { name: 'task-1 Setup project' }).getByRole('button').nth(1);
        await deleteIcon.click();

        const dialog = page.locator("div").filter({ hasText: "Confirm!Are you sure you want" }).nth(1);
        const title = page.getByRole("heading", { name: "Confirm!" })
        const message = page.getByText("Are you sure you want to delete this task?");
        const cancelButton = page.getByRole('button', { name: "Cancel" })
        const deleteButton = page.getByRole('button', { name: "Delete" })

        await use({ dialog, title, message, cancelButton, deleteButton });
    }
});

export { expect } from "@playwright/test";
