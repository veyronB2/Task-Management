import {
    Box,
    Button,
    ButtonProps,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Typography,
} from "@mui/material";
import React, { useMemo } from "react";

import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

export interface ButtonConfig extends Pick<ButtonProps, "color" | "variant" | "onClick" | "startIcon" | "disabled"> {
    text: string;
}

interface ConfirmDialogProps {
    open: boolean;
    title?: string;
    message: string;
    onCancel: () => void;
    onConfirm?: () => void;
    buttons?: ButtonConfig[];
    titleIcon?: boolean;
    btnDisabled?: boolean;
}

const ConfirmationDialog: React.FC<ConfirmDialogProps> = ({
    open,
    title = "Confirm",
    message,
    onCancel,
    buttons,
    onConfirm,
    titleIcon = true,
    btnDisabled = false
}) => {

    const defaultButtons: ButtonConfig[] = useMemo(() => {
        const buttons: ButtonConfig[] = [
            {
                text: "Cancel",
                color: "primary",
                variant: "outlined",
                onClick: onCancel,
                startIcon: <CloseIcon />,
            },
        ];
        if (onConfirm) {
            buttons.push({
                text: "Delete",
                color: "error",
                variant: "contained",
                onClick: onConfirm,
                startIcon: <DeleteIcon />,
            });
        }

        return buttons;
    }, [onCancel, onConfirm]);

    return (
        <Dialog open={open} onClose={onCancel} maxWidth="xs" fullWidth>
            <DialogTitle>
                <Box display="flex" alignItems="center" p={1} borderRadius={1}>
                    {titleIcon && <WarningAmberIcon sx={{ color: "gold", mr: 1 }} />}
                    <Typography variant="h1" component="span" fontSize={"1.3rem"} letterSpacing={"0.1rem"} fontWeight={"500"}>
                        {title ? `${title}!` : "Confirm!"}
                    </Typography>
                </Box>
            </DialogTitle>
            <DialogContent>
                <DialogContentText>{message}</DialogContentText>
            </DialogContent>
            <DialogActions>
                {(buttons ?? defaultButtons).map(config => {
                    const { text, ...btnProps } = config;
                    return (
                        <Button key={text} {...btnProps} disabled={btnDisabled}>
                            {text}
                        </Button>
                    );
                })}
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmationDialog;
