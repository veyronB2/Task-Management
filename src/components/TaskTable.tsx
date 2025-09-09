import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { Box, Paper } from "@mui/material";
import TaskFormModal, { TaskFormData } from "./TaskFormModal";
import { closeConfirmDialog, closeModal, fetchTasks, openConfirmDialog, openModal, removeTask } from "../redux/tasksReducer";
import { columnDefs, gridOptions } from "../utilities/agGrid.config";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useCallback, useEffect, useRef, useState } from "react";

import { AgGridReact } from "ag-grid-react";
import ConfirmDialog from "./ConfirmationDialog";
import FormActionButtons from "./FormActionButtons";
import HeroBanner from "./HeroBanner";
import { Task } from "../mock-api";
import { enqueueSnackbar } from "notistack";
import { format } from "date-fns";
import { getTaskDataById } from "../utilities/utitlities";

ModuleRegistry.registerModules([AllCommunityModule]);

export interface RowData extends Task {
    actions: null;
}

const TaskTable = () => {
    const gridRef = useRef<AgGridReact>(null);
    const dispatch: ThunkDispatch<any, any, AnyAction> = useAppDispatch();

    const [taskDataNew, setTaskDataNew] = useState<TaskFormData | null>(null);

    const {
        data,
        loading,
        modalOpen,
        confirmDialogOpen,
        taskToDelete,
    } = useAppSelector(state => state.tasks);

    const getTasks = useCallback(() => {
        if (!gridRef.current) return;
        dispatch(fetchTasks());
    }, [dispatch]);

    useEffect(() => {
        getTasks();
    }, [getTasks]);

    const handleEditClick = useCallback((taskId: string) => {
        const rowData = getTaskDataById(data ?? [], taskId);

        if (rowData) {
            const formData: TaskFormData = {
                title: rowData.title,
                dueDate: rowData.dueDate ? format(new Date(rowData.dueDate), "yyyy-MM-dd'T'HH:mm") : "",
                description: rowData.description ?? "",
                completed: rowData.isCompleted ? "true" : "false",
                id: rowData.id,
            };
            setTaskDataNew(formData);
            dispatch(openModal());
        }
    }, [dispatch, data]);

    const handleCloseModal = useCallback(() => {
        dispatch(closeModal());
        setTaskDataNew(null);
    }, [dispatch]);

    const handleDeleteClick = useCallback((taskId: string) => {
        dispatch(openConfirmDialog(taskId));
    }, [dispatch]);

    const handleConfirmDelete = async () => {
        if (!taskToDelete) return;

        try {
            await dispatch(removeTask(taskToDelete)).unwrap();
            enqueueSnackbar("Task deleted successfully!", { variant: "success" });
            dispatch(fetchTasks());
        } catch {
            enqueueSnackbar("Failed to delete task.", { variant: "error" });
        } finally {
            dispatch(closeConfirmDialog());
        }
    };

    const handleCancelDelete = useCallback(() => {
        dispatch(closeConfirmDialog());
    }, [dispatch]);

    const handleOpenFormModal = useCallback(() => {
        dispatch(openModal());
    }, [dispatch]);

    return (
        <Box display="flex" flexDirection="column" width="100%" paddingLeft="3rem" paddingRight="3rem">
            <HeroBanner title="View All Tasks" />
            <FormActionButtons handleOpenFormModal={handleOpenFormModal} />
            <Paper sx={{ mt: 4, padding: "4rem" }}>
                <div className="ag-theme-alpine" style={{ height: 500, width: "100%" }}>
                    <AgGridReact
                        ref={gridRef}
                        gridOptions={gridOptions}
                        columnDefs={columnDefs}
                        loading={loading}
                        rowData={data}
                        context={{ handleDeleteClick, handleEditClick }}
                    />
                </div>
            </Paper>
            <TaskFormModal
                open={modalOpen}
                onCancel={handleCloseModal}
                taskData={taskDataNew}
                onTaskComplete={getTasks}
            />
            <ConfirmDialog
                open={confirmDialogOpen}
                message="Are you sure you want to delete this task?"
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
            />
        </Box>
    );
};

export default TaskTable;
