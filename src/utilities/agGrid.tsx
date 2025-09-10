import { AgGridActionIcon } from "../components/table/AgGridActionIcon";
import { ICellRendererParams } from "ag-grid-community";
import { Task } from "../mock-api";
import { useCallback } from "react";

export const GetActionIcons = (params: ICellRendererParams<Task> ) => {
    const taskId = (params.data as Task).id?.toString();

    const handleDeleteClick = useCallback(() => {
        params.context.handleDeleteClick(taskId);
    }, [params.context, taskId]);

    const handleEditClick = useCallback(() => {
        params.context.handleEditClick(taskId);
    }, [params.context, taskId]);

    return (
        <>
            <AgGridActionIcon tooltip="Edit Task" iconType="edit" onClick={handleEditClick} color="success" />
            <AgGridActionIcon tooltip="Delete Task" iconType="delete" onClick={handleDeleteClick} color="error" />
        </>
    );
};
