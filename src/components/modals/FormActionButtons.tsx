import { Box, Button } from "@mui/material";

import { motion } from "framer-motion";

interface FormActionButtonsProps {
    handleOpenFormModal: () => void;
    buttonText?: string;
}

const FormActionButtons = ({ handleOpenFormModal, buttonText = "Add Task" }: FormActionButtonsProps) => {
    return (
        <Box display="flex" justifyContent="flex-start" gap={2} mt={2} flexDirection={{ xs: "column", sm: "row" }}>
            <motion.div
                initial={{ x: "-100vw" }}
                animate={{ x: 0 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 50 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
            >
                <Button variant="contained" color="secondary" onClick={handleOpenFormModal} sx={{textTransform: "none"}}>
                    {buttonText}
                </Button>
            </motion.div>

        </Box>
    );
};

export default FormActionButtons;
