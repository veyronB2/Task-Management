import { Box, Button, Stack } from "@mui/material";
import React, { useCallback } from "react";

import HeroBanner from "../layout/HeroBanner";
import { heroBannerDefaultAnimation } from "../../animations/heroBanner";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { viewTasksPath } from "../../utilities/constants";

const MotionBox = motion(Box);
const MotionStack = motion(Stack);

const Home: React.FC = () => {
    const navigate = useNavigate();

    const handleViewTasksClick = useCallback(() => {
        navigate(viewTasksPath);
    }, [navigate]);

    return (
        <MotionBox
            width="100%"
            height="100vh"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            px={2}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            <HeroBanner title="Task Management" animation={heroBannerDefaultAnimation} />
            <MotionStack
                spacing={2}
                direction={{ xs: "column", sm: "row" }}
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: { opacity: 0, y: 50 },
                    visible: {
                        opacity: 1,
                        y: 0,
                        transition: {
                            delay: 0.5,
                            duration: 0.6,
                            ease: "easeOut",
                        },
                    },
                }}
            >
                <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300 }}
                >
                    <Button variant="contained" color="primary" onClick={handleViewTasksClick}>
                        View Tasks
                    </Button>
                </motion.div>
            </MotionStack>
        </MotionBox>
    );
};

export default Home;
