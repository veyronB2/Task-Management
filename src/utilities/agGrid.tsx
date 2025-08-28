import { AgGridActionIcon } from "../components/AgGridIcon";
import { ICellRendererParams } from "ag-grid-community";
import { Task } from "../mock-api";

export const GetActionIcons = (params: ICellRendererParams<Task> ) => {
    const taskId = (params.data as Task).id?.toString();

    const onDeleteIconClick = () => {
        params.context.onDeleteItemIconClick(taskId);
    };

    return (
        <AgGridActionIcon iconType="delete" onClick={onDeleteIconClick} color="error" />
    );
};
