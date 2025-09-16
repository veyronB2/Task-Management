import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import React, { useMemo } from "react";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Tooltip from "@mui/material/Tooltip";
import VisibilityIcon from "@mui/icons-material/Visibility";

interface AgGridActionIconProps extends Omit<IconButtonProps, "children"> {
    iconType: "delete" | "edit" | "view";
    ariaLabel?: string;
    tooltip?: string;
}

const iconMap = {
    delete: DeleteIcon,
    edit: EditIcon,
    view: VisibilityIcon,
};

export const AgGridActionIcon: React.FC<AgGridActionIconProps> = ({
    onClick,
    iconType,
    disabled = false,
    ariaLabel,
    tooltip,
    color
}) => {
    const IconComponent = useMemo(() => iconMap[iconType], [iconType]);

    return (
        <Tooltip title={tooltip || ariaLabel || ""}>
            <span>
                <IconButton
                    aria-label={ariaLabel}
                    onClick={onClick}
                    disabled={disabled}
                    size="small"
                    color={color}
                >
                    <IconComponent fontSize="small" />
                </IconButton>
            </span>
        </Tooltip>
    );
};
