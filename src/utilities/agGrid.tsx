import { AllEnterpriseModule, ModuleRegistry } from "ag-grid-enterprise";

import { AgGridActionIcon } from "../components/table/AgGridActionIcon";
import { ICellRendererParams } from "ag-grid-community";
import { Task } from "../mock-api";
import { useCallback } from "react";

ModuleRegistry.registerModules([AllEnterpriseModule]);

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

interface GetNoOverlayNoRowsTemplateProps {
    entity?: string;
    customMessage?: string;
}

export const getNoOverlayNoRowsTemplate = ( { entity, customMessage }: GetNoOverlayNoRowsTemplateProps) => {
    const message = customMessage ? customMessage : `There are no ${entity} for the specified criteria.`;
    return `<span class=ag-overlay-no-rows-center>${message}</span>`;
};
