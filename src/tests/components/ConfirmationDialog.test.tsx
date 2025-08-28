import { fireEvent, render, screen } from "@testing-library/react";

import ConfirmDialog from "../../components/ConfirmationDialog";
import { vi } from "vitest";

describe("ConfirmDialog", () => {
    const mockOnConfirm = vi.fn();
    const mockOnCancel = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("should render with title, message, and buttons when open", () => {
        render(
            <ConfirmDialog
                open={true}
                title="Delete Item"
                message="Are you sure you want to delete this item?"
                onConfirm={mockOnConfirm}
                onCancel={mockOnCancel}
            />
        );

        expect(screen.getByText("Delete Item")).toBeInTheDocument();
        expect(screen.getByText("Are you sure you want to delete this item?")).toBeInTheDocument();
        expect(screen.getByText("Cancel")).toBeInTheDocument();
        expect(screen.getByText("Delete")).toBeInTheDocument();
    });

    it("should call onCancel when Cancel button is clicked", () => {
        render(
            <ConfirmDialog
                open={true}
                message="Test message"
                onConfirm={mockOnConfirm}
                onCancel={mockOnCancel}
            />
        );

        fireEvent.click(screen.getByText("Cancel"));
        expect(mockOnCancel).toHaveBeenCalledTimes(1);
    });

    it("calls onConfirm when Delete button is clicked", () => {
        render(
            <ConfirmDialog
                open={true}
                message="Test message"
                onConfirm={mockOnConfirm}
                onCancel={mockOnCancel}
            />
        );

        fireEvent.click(screen.getByText("Delete"));
        expect(mockOnConfirm).toHaveBeenCalledTimes(1);
    });
});
