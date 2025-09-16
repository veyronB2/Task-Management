import { AllEnterpriseModule, ModuleRegistry } from "ag-grid-enterprise";
import { ICellRendererParams, SideBarDef, ToolPanelDef } from "ag-grid-community";

import { AgGridActionIcon } from "../components/table/AgGridActionIcon";
import { Task } from "../mock-api";
import { useCallback } from "react";

ModuleRegistry.registerModules([AllEnterpriseModule]);

interface GetActionsIconsProps extends Task {
    path: string;
}
export const GetActionIcons = (params: ICellRendererParams<GetActionsIconsProps> ) => {

    let taskId: string | undefined;
    if (params.data?.path) {
        // Mobile view
        taskId = params.data.path[0];
    } else {
        // Desktop view
        taskId = (params.data as Task).id?.toString();
    }

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

interface GetSideBar {
    columns?: boolean;
    filters?: boolean;
}

export const getSideBar = ({columns = true, filters = true}: GetSideBar): SideBarDef => {
    const toolPanels: ToolPanelDef[] = [];

    if (columns) {
        toolPanels.push({
            id: "columns",
            labelDefault: "Columns",
            labelKey: "columns",
            iconKey: "columns",
            toolPanel: "agColumnsToolPanel",
            toolPanelParams: {
                suppressRowGroups: true,
                suppressValues: true,
                suppressPivots: true,
                suppressPivotMode: true,
                suppressColumnExpandAll: true,
            },
        });
    }

    if (filters) {
        toolPanels.push({
            id: "filters",
            labelDefault: "Filters",
            labelKey: "filters",
            iconKey: "filter",
            toolPanel: "agFiltersToolPanel",
            toolPanelParams: {
                suppressExpandAll: true,
                suppressFilterSearch: true,
                suppressSyncLayoutWithGrid: false,

            },
        });
    }
    return { toolPanels };
};
