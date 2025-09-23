import { AnimatePresence, motion } from "framer-motion";
import {
    Box,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import React, { useCallback, useEffect } from "react";
import { UpdateTaskData, createTask, updateTask } from "../../mock-api";

import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import { getSnackbarNotification } from "../../utilities/notifications";
import { taskFormSchema } from "../../schemas/taskFormSchema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const fieldBackground = { backgroundColor: "white" };
export type TaskFormData = z.infer<typeof taskFormSchema>;
interface TaskFormModalProps {
    open: boolean;
    onCancel: () => void;
    taskData?: TaskFormData | null;
    onTaskComplete: () => void;
    testId?: string;
}

const initialFormData: TaskFormData = {
    title: "",
    dueDate: "",
    completed: "false",
    description: ""
};


export const modalVariants: any = {
    hidden: {
        y: 100,
        scale: 0.8,
        opacity: 0,
    },
    visible: {
        y: 0,
        scale: 1,
        opacity: 1,
        filter: "blur(0px)",
        transition: {
            type: "spring",
            stiffness: 200,
            damping: 20,
        },
    },
    exit: {
        y: 100,
        scale: 0.8,
        opacity: 0,
        filter: "blur(10px)",
        transition: {
            duration: 0.3,
        },
    },
};


const TaskFormModal: React.FC<TaskFormModalProps> = ({open, onCancel, taskData, onTaskComplete, testId }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const { reset, watch, control, handleSubmit, formState: { errors, isSubmitting, isDirty } } = useForm<TaskFormData>({
        resolver: zodResolver(taskFormSchema),
        defaultValues: initialFormData
    });

    const taskId = watch("id");

    useEffect(() => {
        if (taskData) {
            reset(taskData);
        } else {
            reset(initialFormData);
        }
    }, [reset, taskData]);

    const onSubmit = useCallback(async (data: TaskFormData) => {
        getSnackbarNotification({ variant: "info", message: "Task has been submitted" });
        const { id, dueDate, completed } = data;
        const successMessage = `Task ${id ? "updated" : "created"} successfully!`;

        try {
            const basePayload = {
                ...data,
                dueDate: new Date(dueDate),
            };

            if (id) {
                const payload: UpdateTaskData = {
                    ...basePayload,
                    isCompleted: completed === "true" ? true : false
                };
                await updateTask(id, payload);
                getSnackbarNotification({ variant: "success", message: successMessage, closeBtnText: "Dismiss" });
            } else {
                await createTask(basePayload);
                getSnackbarNotification({ variant: "success", message: successMessage });
            }

            onTaskComplete();
            onCancel();
        } catch (error) {
            console.warn(`Failed to update or edit the task ${error}`);
            getSnackbarNotification({ variant: "error", message: `Task could not be ${id ? "updated" : "created"}` });
        }
    }, [onCancel, onTaskComplete]);

    const handleCancel = useCallback(() => {
        reset();
        onCancel();
    }, [onCancel, reset]);

    const handleDialogClose = useCallback((_event: object, reason: "backdropClick" | "escapeKeyDown") => {
        if (reason !== "backdropClick" && reason !== "escapeKeyDown") {
            onCancel();
        }
    }, [onCancel]);

    return (
        <AnimatePresence>
            {open && (
                <Dialog
                    data-testid={testId}
                    open={open}
                    onClose={handleDialogClose}
                    maxWidth="xs"
                    fullWidth
                    slotProps={{
                        paper: {
                            component: motion.div,
                            variants: modalVariants,
                            initial: "hidden",
                            animate: "visible",
                            exit: "exit",
                        } as any,
                    }}
                >
                    <DialogTitle>{taskId ? "Update Task" : "Create Task"}</DialogTitle>
                    <DialogContent>
                        <Box
                            component="form"
                            display="flex"
                            flexDirection="column"
                            gap={2}
                            mt={1}
                        >
                            <Controller
                                name="title"
                                control={control}
                                render={({field}) => (
                                    <TextField
                                        {...field}
                                        sx={fieldBackground}
                                        label="Title"
                                        required
                                        fullWidth
                                        error={!!errors.title}
                                        disabled={isSubmitting}
                                        helperText={errors.title?.message}
                                    />
                                )}
                            />
                            <Controller
                                name="dueDate"
                                control={control}
                                render={({field}) => (
                                    <TextField
                                        {...field}
                                        sx={fieldBackground}
                                        label="Due Date"
                                        name="dueDate"
                                        type="datetime-local"
                                        fullWidth
                                        required
                                        disabled={isSubmitting}
                                        error={!!errors.dueDate}
                                        helperText={errors.dueDate?.message}
                                        slotProps={{ htmlInput: { step: 1 }, inputLabel: { shrink: true } }}
                                    />
                                )}
                            />
                            <Controller
                                name="completed"
                                control={control}
                                render={({field}) => (
                                    <FormControl
                                        {...field}
                                        fullWidth
                                        required
                                        disabled={isSubmitting}
                                        error={!!errors.completed}
                                    >
                                        <InputLabel id="completed-label">Completed</InputLabel>
                                        <Select
                                            sx={fieldBackground}
                                            labelId="completed-label"
                                            id="completed"
                                            label="Completed"
                                            value={field.value}
                                            onChange={field.onChange}
                                        >
                                            <MenuItem value="true">Yes</MenuItem>
                                            <MenuItem value="false">No</MenuItem>
                                        </Select>
                                        {errors.completed && (
                                            <FormHelperText>{errors.completed.message}</FormHelperText>
                                        )}
                                    </FormControl>
                                )}
                            />
                            <Controller
                                name="description"
                                control={control}
                                render={({field}) => (
                                    <TextField
                                        {...field}
                                        sx={fieldBackground}
                                        label="Description"
                                        multiline
                                        rows={isMobile ? 3 : 5}
                                        fullWidth
                                        error={!!errors.description}
                                        disabled={isSubmitting}
                                        helperText={errors.description?.message}
                                    />
                                )}
                            />
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            variant={"outlined"}
                            onClick={handleCancel}
                            disabled={isSubmitting}
                            sx={{textTransform: "none"}}
                            endIcon={<CloseIcon />}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            onClick={handleSubmit(onSubmit)}
                            disabled={isSubmitting || !isDirty}
                            variant="contained" sx={{textTransform: "none"}}
                            endIcon={taskId ? <EditIcon /> : <AddIcon />}
                        >
                            {isSubmitting ? <CircularProgress size={24} color="inherit" /> : taskId ? "Update Task" : "Create Task"}
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
        </AnimatePresence>
    );
};

export default TaskFormModal;
