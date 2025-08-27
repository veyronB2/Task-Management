import { Box, TextField } from '@mui/material';
import ButtonMui, { ButtonProps } from './Button';

interface AddTaskProps extends Pick<ButtonProps, "sx" | "text">{
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    onAddClick: () => void;
    value: string;
    placeholder?: string;
}

const AddTask = ({ onChange, placeholder = "Add Task...", onAddClick, value, text}: AddTaskProps) => {
  return (
    <Box display="flex" gap={1} mb={2}>
            <TextField fullWidth placeholder={placeholder} value={value} onChange={onChange} sx={{ flexGrow: 1 }}/>
            {/* <Box sx={{ flexShrink: 0, width: 100 }}> */}
                <ButtonMui text={text} onClick={onAddClick} sx={{ flexShrink: 0, width: 100 }}/>
            {/* </Box> */}
            
    </Box>
  )
}

export default AddTask