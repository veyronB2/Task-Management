import { ButtonOwnProps, Button as MuiButton, SxProps, Theme } from '@mui/material';

export interface ButtonProps extends Pick<ButtonOwnProps, 'variant' | 'color'> {
  text: string;
  onClick: () => void;
  sx?: SxProps<Theme>;
}

const ButtonMui = ({ text, variant = "contained", onClick, color = "primary", sx}: ButtonProps) => {
  return (
    <MuiButton variant={variant} color={color} fullWidth onClick={onClick} sx={sx}>
            {text}
    </MuiButton>
  )
}

export default ButtonMui