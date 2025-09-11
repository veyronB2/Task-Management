import "ag-grid-community/styles/ag-theme-material.css";

import { AllCommunityModule, ColDef, GridOptions, ModuleRegistry } from "ag-grid-community";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { Box, Paper } from "@mui/material";
import TaskFormModal, { TaskFormData } from "../modals/TaskFormModal";
import { closeConfirmDialog, closeModal, fetchTasks, openConfirmDialog, openModal, removeTask } from "../../redux/tasksReducer";
import { formatDisplayDate, getNoOverlayNoRowsTemplate, getTaskDataById } from "../../utilities/utitlities";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { AgGridReact } from "ag-grid-react";
import ConfirmDialog from "../modals/ConfirmationDialog";
import FormActionButtons from "../FormActionButtons";
import { GetActionIcons } from "../../utilities/agGrid";
import HeroBanner from "../HeroBanner";
import Table from "./Table";
import { Task } from "../../mock-api";
import { format } from "date-fns";
import { getSnackbarNotification } from "../../utilities/notifications";

ModuleRegistry.registerModules([AllCommunityModule]);

export interface RowData extends Task {
    actions: null;
}

const TaskTable = () => {
    const gridRef = useRef<AgGridReact>(null);
    const dispatch: ThunkDispatch<any, any, AnyAction> = useAppDispatch();

    const [taskData, setTaskData] = useState<TaskFormData | null>(null);
    const [taskToDelete, setTaskToDelete] = useState<string | null>(null);

    const { data, loading, modalOpen, isDeletingTask, confirmDialogOpen } = useAppSelector(state => state.taskManagement);

    const getTasks = useCallback(() => {
        if (!gridRef.current) return;
        dispatch(fetchTasks());
    }, [dispatch]);

    useEffect(() => getTasks(), [getTasks]);

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
            setTaskData(formData);
            dispatch(openModal());
        }
    }, [dispatch, data]);

    const handleCloseModal = useCallback(() => {
        dispatch(closeModal());
        setTaskData(null);
    }, [dispatch]);

    const handleDeleteClick = useCallback((taskId: string) => {
        dispatch(openConfirmDialog());
        setTaskToDelete(taskId);
    }, [dispatch]);

    const handleCancelDelete = useCallback(() => {
        dispatch(closeConfirmDialog());
        setTaskToDelete(null);
    }, [dispatch]);

    const handleOpenFormModal = useCallback(() => dispatch(openModal()), [dispatch]);

    const handleConfirmDelete = useCallback(async () => {
        if (!taskToDelete) return;

        try {
            await dispatch(removeTask(taskToDelete)).unwrap();
            getSnackbarNotification({variant: "success", message: "Task deleted successfully!"});
            dispatch(fetchTasks());
        } catch {
            getSnackbarNotification({variant: "error", message: "Failed to delete selected task!"});
        } finally {
            dispatch(closeConfirmDialog());
        }
    }, [dispatch, taskToDelete]);

    const gridOptions: GridOptions = useMemo(() => {
        return {
            overlayNoRowsTemplate: getNoOverlayNoRowsTemplate({ entity: "tasks" }),
            domLayout: "normal",
            paginationPageSize: 5,
            suppressCellFocus: true,
            pagination: true,
            paginationPageSizeSelector: [5, 10, 15],
            defaultColDef: {
                flex: 1,
                resizable: true,
                filter: "agTextColumnFilter",
                filterParams: { buttons: ["reset"] }
            },
        };
    }, []);

    const columnDefs: ColDef<RowData>[] = useMemo(() => {
        return [
            { field: "id", headerName: "Task ID" },
            { field: "title" },
            { field: "dueDate", headerName: "Due Date", valueFormatter: (params) => formatDisplayDate(params.value) },
            { field: "description" },
            { field: "isCompleted", headerName: "Completed" },
            {
                headerName: "Actions",
                colId: "actions",
                suppressHeaderMenuButton: true,
                suppressHeaderContextMenu: true,
                filter: false,
                sortable: false,
                suppressMovable: true,
                resizable: false,
                cellRenderer: GetActionIcons,
            },
        ];
    }, []);

    return (
        <Box display="flex" flexDirection="column" width="100%" px="3rem">
            <HeroBanner title="View All Tasks" />
            <FormActionButtons handleOpenFormModal={handleOpenFormModal} />
            <Paper sx={{ mt: 4, padding: "4rem" }}>
                <Table
                    gridRef={gridRef}
                    rowData={data ?? []}
                    columnDefs={columnDefs}
                    gridOptions={gridOptions}
                    context={{ handleDeleteClick, handleEditClick }}
                    loading={loading}
                />
            </Paper>
            <TaskFormModal
                open={modalOpen}
                onCancel={handleCloseModal}
                taskData={taskData}
                onTaskComplete={getTasks}
            />
            <ConfirmDialog
                open={confirmDialogOpen}
                message="Are you sure you want to delete this task?"
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
                btnDisabled={isDeletingTask}
            />
        </Box>
    );
};

export default TaskTable;
