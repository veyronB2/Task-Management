import { MenuItem, Select } from '@mui/material';

import { SelectChangeEvent } from '@mui/material/Select';
import { convertStringToPascalWithSpaces } from '../utilities/utitlities';

export interface StatusFilterProps<T extends string> {
  options: T[];
  onChange: (event: SelectChangeEvent<T>) => void;
  filter?: T;
}

const StatusFilter = <T extends string>({
  filter,
  options,
  onChange,
}: StatusFilterProps<T>) => {
  return (
    <Select value={filter ?? ''} onChange={onChange} fullWidth sx={{ mb: 2 }} >
      {options.map((option) => (
        <MenuItem key={option} value={option}>
          {convertStringToPascalWithSpaces(option)}
        </MenuItem>
      ))}
    </Select>
  );
};

export default StatusFilter;
