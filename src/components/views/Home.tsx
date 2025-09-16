import { Box, Button, Stack } from "@mui/material";
import React, { useCallback } from "react";

import HeroBanner from "../layout/HeroBanner";
import { useNavigate } from "react-router-dom";
import { viewTasksPath } from "../../utilities/constants";

const Home: React.FC = () => {
    const navigate = useNavigate();

    const handleViewTasksClick = useCallback(() => {
        navigate(viewTasksPath);
    }, [navigate]);

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
            <HeroBanner title="Task Management" />
            <Stack spacing={2} direction={{ xs: "column", sm: "row" }}>
                <Button variant="contained" color="primary" onClick={handleViewTasksClick}>
                    View Tasks
                </Button>
            </Stack>
        </Box>
    );
};

export default Home;
