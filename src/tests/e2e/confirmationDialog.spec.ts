import { expect, test } from "./fixtures";

test.describe("ConfirmationDialog", () => {
    test("should display with default title, message, and buttons", async ({ confirmationDialog }) => {
        const { dialog, title, message, cancelButton, deleteButton} = confirmationDialog

        await expect(dialog).toBeVisible();

        await expect(title).toBeVisible();
        await expect(title).toContainText("Confirm!");

        await expect(dialog.getByTestId("WarningAmberIcon")).toBeVisible();

        await expect(message).toBeVisible();
        
        await expect(cancelButton).toBeVisible();
        await expect(cancelButton).toContainText("Cancel");
        await expect(cancelButton.getByTestId("CloseIcon")).toBeVisible();

        await expect(deleteButton).toBeVisible();
        await expect(deleteButton).toContainText("Delete");
        await expect(deleteButton.getByTestId("DeleteIcon")).toBeVisible();
    });

    test("should have correct button colors", async ({ confirmationDialog }) => {
        const { cancelButton, deleteButton } = confirmationDialog;

        await expect(cancelButton).toHaveCSS("color", "rgb(25, 118, 210)");
        await expect(deleteButton).toHaveCSS("background-color", "rgb(211, 47, 47)");
    });

    test("should close the dialog on cancel", async ({ confirmationDialog }) => {
        const { dialog, cancelButton } = confirmationDialog;

        await expect(dialog).toBeVisible();
        await cancelButton.click();
        await expect(dialog).not.toBeVisible();
    });
});
