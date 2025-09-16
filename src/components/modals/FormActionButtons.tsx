import { Box, Button } from "@mui/material";

interface FormActionButtonsProps {
    handleOpenFormModal: () => void;
}

const FormActionButtons = ({ handleOpenFormModal }: FormActionButtonsProps) => {
    return (
        <Box display="flex" justifyContent="flex-start" gap={2} mt={2} flexDirection={{ xs: "column", sm: "row" }}>
            <Button variant="contained" color="secondary" onClick={handleOpenFormModal}>
                Add Task
            </Button>
        </Box>
    );
};

export default FormActionButtons;
