import { ColDef, GridOptions, ICellRendererParams } from "ag-grid-community";

import { AgGridActionIcon } from "../components/AgGridIcon";
import { RowData } from "../components/Pages/ViewTasks";
import { Task } from "../mock-api";
import { getNoOverlayNoRowsTemplate } from "./utitlities";

export const GetActionIcons = (params: ICellRendererParams<Task> ) => {
    const taskId = (params.data as Task).id?.toString();

    const onDeleteIconClick = () => {
        params.context.onDeleteItemIconClick(taskId);
    };

    return (
            <AgGridActionIcon iconType="delete" onClick={onDeleteIconClick} color="error"/>
    );
};

export const columnDefs: ColDef<RowData>[] = [
  { field: 'id', headerName: 'Task ID', filter: 'agTextColumnFilter' },
  { field: 'title', filter: 'agTextColumnFilter' },
  { field: 'dueDate', headerName: 'Due Date', filter: 'agTextColumnFilter' },
  { field: 'description', filter: 'agTextColumnFilter' },
  { field: 'isCompleted', headerName: 'Completed', filter: 'agTextColumnFilter' },
  {
    headerName: 'Actions',
    colId: 'actions',
    suppressHeaderMenuButton: true,
    suppressHeaderContextMenu: true,
    filter: false,
    sortable: false,
    suppressMovable: true,
    cellRenderer: GetActionIcons,
  },
];

export const gridOptions: GridOptions = {
      overlayNoRowsTemplate: getNoOverlayNoRowsTemplate({ entity: 'tasks' }),
      domLayout: 'normal',
      paginationPageSize: 20,
      suppressCellFocus: true,
      pagination: true,
      defaultColDef: {
        flex: 1,
        resizable: true
      },
    };


