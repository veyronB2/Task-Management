import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import React from 'react';
import Tooltip from '@mui/material/Tooltip';
import VisibilityIcon from '@mui/icons-material/Visibility';

interface AgGridActionIconProps {
  onClick: () => void;
  iconType: 'delete' | 'edit' | 'view';
  disabled?: boolean;
  ariaLabel?: string;
  tooltip?: string;
  color?: 'inherit' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'
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
  const IconComponent = iconMap[iconType];

  return (
    <Tooltip title={tooltip || ariaLabel || ''}>
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
