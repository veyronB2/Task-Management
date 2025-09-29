import { Locator, Page } from "@playwright/test";
import { expect, test } from "./fixtures";

const errorColor = "rgb(211, 47, 47)";

interface SelectAndCheckProps {
    combobox: Locator;
    optionName: string;
    expectedEnabled: boolean;
    createTask: Locator;
    page: Page;
}

interface FillAndCheckProps {
    field: Locator;
    value: string;
    expectedEnabled: boolean;
    createTask: Locator;
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

test.describe("TaskFormModal Validation", async () => {
    test("should have correct fields on the form", async ({ taskForm, page }) => {
        const {
                titleField,
                dueDateField,
                completedField,
                descriptionField
        } = taskForm;

        const heading = page.getByRole("heading", { level: 2 });

        await expect(heading).toBeVisible();
        await expect(heading).toHaveText("Create Task");


        await expect(titleField).toHaveAttribute("type", "text");
        await expect(titleField).toBeVisible();

        await expect(dueDateField).toHaveAttribute("type", "datetime-local");
        await expect(dueDateField).toBeVisible();

        await expect(completedField).toBeVisible();

        await expect(descriptionField).toBeVisible();
        });

    test("Should have correct buttons on the new task form", async ({ taskForm }) => {
        const { cancelButton, createTaskButton } = taskForm;

        const closeIcon = cancelButton.getByTestId("CloseIcon");
        const addIcon = createTaskButton.getByTestId("AddIcon");

        await expect(cancelButton).toBeVisible();
        await expect(closeIcon).toBeVisible();

        await expect(createTaskButton).toBeVisible();
        await expect(createTaskButton).toBeDisabled();
        await expect(addIcon).toBeVisible();
    });

    test("should enable create task button when user changes the form", async ({ taskForm, page }) => {
        const { createTaskButton, titleField, dueDateField, completedField, descriptionField } = taskForm

        await fillAndCheck({ createTask: createTaskButton, field: titleField, value: "My Task", expectedEnabled: true});
        await fillAndCheck({ createTask: createTaskButton, field: titleField, value: "", expectedEnabled: false});

        await fillAndCheck({ createTask: createTaskButton, field: dueDateField, value: "2025-09-23T14:30", expectedEnabled: true});
        await fillAndCheck({ createTask: createTaskButton, field: dueDateField, value: "", expectedEnabled: false});

        await selectAndCheck({ createTask: createTaskButton, page, combobox: completedField, optionName: "Yes", expectedEnabled: true});
        await selectAndCheck({ createTask: createTaskButton, page, combobox: completedField, optionName: "No", expectedEnabled: false});

        await fillAndCheck({ createTask: createTaskButton, field: descriptionField, value: "Testing testing", expectedEnabled: true});
        await fillAndCheck({ createTask: createTaskButton, field: descriptionField, value: "", expectedEnabled: false});
        });

    test("Should mark title and due date as required fields when description is filled and form submitted and retain the errors after description has been cleared", async ({ taskForm }) => {
        const {
            createTaskButton,
            descriptionField,
            inputFieldset,
            dueDateFieldset,
            titleError,
            dueDateError
            } = taskForm;

            await descriptionField.fill("Test description");
            await createTaskButton.click();

            
        const assertValidationErrorsVisible = async () => {
            await expect(titleError).toBeVisible();
            await expect(titleError).toHaveCSS("color", errorColor);

            await expect(dueDateError).toBeVisible();
            await expect(dueDateError).toHaveCSS("color", errorColor);

            await expect(dueDateFieldset).toHaveCSS("border-color", errorColor);
            await expect(inputFieldset).toHaveCSS("border-color", errorColor);
        };

            await descriptionField.fill("Test description");
            await createTaskButton.click();

            await assertValidationErrorsVisible();
            await descriptionField.fill("");
            await assertValidationErrorsVisible();
        })

    test("Should not retain errors when form is cancelled and then re-opened", async ({ taskForm }) => {
        const {
                createTaskButton,
                descriptionField,
                inputFieldset,
                dueDateFieldset,
                titleError,
                dueDateError,
                cancelButton,
                addButton
                } = taskForm;

        await descriptionField.fill("Test description");
        await createTaskButton.click();
        await cancelButton.click();

        await addButton.click();

        await expect(titleError).not.toBeVisible();
        await expect(dueDateError).not.toBeVisible();

        await expect(dueDateFieldset).not.toHaveCSS("border-color", errorColor);
        await expect(inputFieldset).not.toHaveCSS("border-color", errorColor);
    })
});
