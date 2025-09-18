import Button, { ButtonProps } from "@mui/material/Button";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import React, { useMemo } from "react";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Tooltip from "@mui/material/Tooltip";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { convertStringToPascalWithSpaces } from "../../utilities/utitlities";
import { motion } from "framer-motion";

interface AgGridActionIconProps extends Omit<IconButtonProps, "children"> {
    iconType: "delete" | "edit" | "view";
    ariaLabel?: string;
    tooltip?: string;
    isMobile?: boolean;
}

const iconMap = {
    delete: motion(DeleteIcon),
    edit: motion(EditIcon),
    view: motion(VisibilityIcon),
};

type MuiButtonColor = ButtonProps["color"];

const colorMap: Record<string, MuiButtonColor> = {
    success: "success",
    error: "error",
    info: "info",
    warning: "warning",
    primary: "primary",
    secondary: "secondary",
};

export const AgGridActionIcon: React.FC<AgGridActionIconProps> = ({
    onClick,
    iconType,
    disabled = false,
    ariaLabel,
    tooltip,
    color,
    isMobile = false
}) => {
    const IconComponent = useMemo(() => iconMap[iconType], [iconType]);

    const btnColour = useMemo(() => color ? colorMap[color] || "primary" : "primary", [color]);

    if (isMobile) {
        return (
            <Button
                variant="contained"
                color={btnColour}
                onClick={onClick}
                disabled={disabled}
                size="small"
                aria-label={ariaLabel}
                sx={{textTransform: "none"}}
            >
                {convertStringToPascalWithSpaces(iconType)}
            </Button>
        );
    }
    return (
        <Tooltip title={tooltip || ariaLabel || ""}>
            <IconButton
                aria-label={ariaLabel}
                onClick={onClick}
                disabled={disabled}
                size="small"
                color={color}
            >
                <IconComponent
                    fontSize="small"
                    whileHover={{ scale: 1.5 }}
                    whileTap={{ scale: 0.95 }}
                />
            </IconButton>
        </Tooltip>
    );
};
