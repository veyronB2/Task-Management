import { Box, Typography } from '@mui/material';

import { convertStringToPascalWithSpaces } from '../utilities/utitlities';

export interface StatItem {
  label: string;
  value: string | number;
}

export interface StatisticsProps {
    statsItems: StatItem[]; 
}

const Statistics = ( { statsItems }: StatisticsProps) => {
  return (
    
<Box display="flex" justifyContent="space-between" flexDirection={{ xs: 'column', sm: 'row' }} gap={1}  mb={2} >
  {statsItems.map(({ label, value }) => (
    <Typography key={label}>
      {convertStringToPascalWithSpaces(label)}: {value}
    </Typography>
  ))}
</Box>

  )
}

export default Statistics