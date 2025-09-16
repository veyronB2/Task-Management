import "ag-grid-community/styles/ag-theme-material.css";

import { AllCommunityModule, DefaultMenuItem, GetMainMenuItemsParams, MenuItemDef, ModuleRegistry, iconOverrides, themeAlpine } from "ag-grid-community";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { Box, Paper } from "@mui/material";
import TaskFormModal, { TaskFormData } from "../modals/TaskFormModal";
import { closeConfirmDialog, closeModal, fetchTasks, openConfirmDialog, openModal, removeTask } from "../../redux/tasksReducer";
import { columnDefs, gridOptions, gridOptionsMobile, mobileColumnDefs } from "../../configs/taskTableGridConfig";
import { getTaskDataById, getTransformedData } from "../../utilities/taskTable";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useCallback, useEffect, useRef, useState } from "react";

import { AgGridReact } from "ag-grid-react";
import ConfirmDialog from "../modals/ConfirmationDialog";
import FormActionButtons from "../FormActionButtons";
import HeroBanner from "../HeroBanner";
import { RowGroupingModule } from "ag-grid-enterprise";
import Table from "./Table";
import { format } from "date-fns";
import { getSnackbarNotification } from "../../utilities/notifications";

ModuleRegistry.registerModules([AllCommunityModule, RowGroupingModule]);

const customTheme = themeAlpine
    .withPart(
        iconOverrides({
            type: "image",
            mask: true,
            icons: {
                "menu-alt": {
                    url: "https://www.ag-grid.com/example-assets/svg-icons/menu-alt.svg",
                },
            },
        }),
    );

const TaskTable = () => {
    const gridRef = useRef<AgGridReact>(null);
    const dispatch: ThunkDispatch<any, any, AnyAction> = useAppDispatch();
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    const [taskData, setTaskData] = useState<TaskFormData | null>(null);
    const [taskToDelete, setTaskToDelete] = useState<string | null>(null);

    const { data, loading, modalOpen, isDeletingTask, confirmDialogOpen } = useAppSelector(state => state.taskManagement);

    const getTasks = useCallback(() => {
        if (!gridRef.current) return;
        dispatch(fetchTasks());
    }, [dispatch]);

    useEffect(() => getTasks(), [getTasks]);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

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

    //Reset AG Grid internal row grouping state when switching between mobile and desktop sizes
    useEffect(() => {
        if (!gridRef.current?.api) return;

        if (!isMobile) {
            gridRef.current.api.setGridOption("treeData", false);
        }
    }, [isMobile]);

    const getMainMenuItems = useCallback((params: GetMainMenuItemsParams): (MenuItemDef | DefaultMenuItem)[] => {
        const defaultItems = params.defaultItems ?? [];

        const customItems: (MenuItemDef | DefaultMenuItem)[] = [
            ...defaultItems.filter(item => item === "sortAscending" || item === "sortDescending"),
        ];

        if (isMobile) {
            customItems.push("separator", "expandAll", "contractAll");
        }

        return customItems;
    }, [isMobile]);

    return (
        <Box display="flex" flexDirection="column" width="100%" px="3rem">
            <HeroBanner title="View All Tasks" />
            <FormActionButtons handleOpenFormModal={handleOpenFormModal} />
            <Paper sx={{ mt: 4, padding: "4rem" }}>
                <Table
                    theme={customTheme}
                    key={isMobile ? "mobile" : "desktop"}
                    gridRef={gridRef}
                    rowData={getTransformedData(data, isMobile, columnDefs) ?? []}
                    columnDefs={!isMobile ? columnDefs : mobileColumnDefs}
                    gridOptions={!isMobile ? gridOptions : gridOptionsMobile}
                    context={{ handleDeleteClick, handleEditClick }}
                    loading={loading}
                    pagination={!isMobile}
                    getMainMenuItems={getMainMenuItems}
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
