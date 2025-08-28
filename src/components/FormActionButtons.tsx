import { Box, Button } from "@mui/material";

interface FormActionButtonsProps {
    handleOpenFormModal: () => void;
    onRefreshClick: () => void;
}

const FormActionButtons = ({ handleOpenFormModal, onRefreshClick}: FormActionButtonsProps) => {
    return (
        <Box display="flex" justifyContent="flex-start" gap={2} mt={2} flexDirection={{ xs: "column", sm: "row" }}>
            <Button variant="contained" color="primary" onClick={() => window.history.back()}>
                Go Back
            </Button>
            <Button variant="contained" color="secondary" onClick={handleOpenFormModal}>
                Add Task
            </Button>
            <Button variant="outlined" color="secondary" onClick={onRefreshClick}>
                Refresh
            </Button>
        </Box>
    );
};

export default FormActionButtons;
