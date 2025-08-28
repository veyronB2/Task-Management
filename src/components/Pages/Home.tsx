import { Box, Button, Stack } from '@mui/material';
import React, { useCallback } from 'react';

import HeroBanner from '../HeroBanner';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
    const navigate = useNavigate();

    const handleViewTasksClick = useCallback(() => {
        navigate("/view-tasks")
    }, [])

    const handleAddTaskClick = useCallback(() => {
        navigate("/add-task")
    }, [])

  return (
    <Box
        width="100%"
        height="100vh"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        px={2} 
    >
        <HeroBanner title='Task Management'/>
        <Stack  spacing={2} direction={{ xs: 'column', sm: 'row' }}>
            <Button variant="contained" color="primary" onClick={handleViewTasksClick}>
                View Tasks
            </Button>
            <Button variant="outlined" color="primary" onClick={handleAddTaskClick}>
                Add Task
            </Button>
        </Stack>
    </Box>
  );
};

export default HomePage;
