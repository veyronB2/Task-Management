import { SnackbarAction, SnackbarKey, VariantType, closeSnackbar, enqueueSnackbar } from "notistack";
import { danger, lightSky, success, warning } from "./constants";

import CloseIcon from "@mui/icons-material/Close";
import { JSX } from "react";

type HorizontalPosition = "left" | "center" | "right";
type VerticalPosition = "top" | "bottom";

export interface SnackbarNotificationProps {
    variant: VariantType;
    message: string | JSX.Element;
    duration?: number;
    verticalPosition?: VerticalPosition;
    horizontalPosition?: HorizontalPosition;
    closeBtnText?: string;
    action?: SnackbarAction;
    persist?: boolean;
}

interface SnackbarCloseButtonProps {
    snackbarId: SnackbarKey;
    closeBtnText?: string;
}

const getVariantColour = (variant: VariantType) => {
    switch (variant) {
        case "error":
            return danger;
        case "warning":
            return warning;
        case "info":
            return lightSky;
        case "success":
            return success;
        default:
            return;
    }
};

const SnackbarCloseButton = ({ snackbarId, closeBtnText }: SnackbarCloseButtonProps) => (
    <button onClick={() => closeSnackbar(snackbarId)} className="snackbar-close-btn">
        {closeBtnText ? closeBtnText : <CloseIcon fontSize="small" />}
    </button>
);

export const getSnackbarNotification = ({
    duration = 3000,
    variant,
    message,
    verticalPosition = "bottom",
    horizontalPosition = "left",
    closeBtnText,
    action,
    persist = false }: SnackbarNotificationProps) => {

    const defaultAction = (snackbarId: SnackbarKey) => <SnackbarCloseButton snackbarId={snackbarId} closeBtnText={closeBtnText} />;

    return enqueueSnackbar(message, {
        autoHideDuration: duration,
        variant: variant,
        persist: persist,
        style: {backgroundColor: getVariantColour(variant)},
        anchorOrigin: {
            vertical: verticalPosition,
            horizontal: horizontalPosition
        },
        action: action ? action : defaultAction
    });
};
