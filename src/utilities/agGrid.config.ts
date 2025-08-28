import { ColDef, GridOptions } from "ag-grid-community";
import { formatDisplayDate, getNoOverlayNoRowsTemplate } from "./utitlities";

import { GetActionIcons } from "./agGrid";
import { RowData } from "../components/TaskTable";

export const columnDefs: ColDef<RowData>[] = [
    { field: "id", headerName: "Task ID", filter: "agTextColumnFilter" },
    { field: "title", filter: "agTextColumnFilter" },
    { field: "dueDate", headerName: "Due Date", filter: "agTextColumnFilter", valueFormatter: (params) => formatDisplayDate(params.value) },
    { field: "description", filter: "agTextColumnFilter" },
    { field: "isCompleted", headerName: "Completed", filter: "agTextColumnFilter" },
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

export const gridOptions: GridOptions = {
    overlayNoRowsTemplate: getNoOverlayNoRowsTemplate({ entity: "tasks" }),
    domLayout: "normal",
    paginationPageSize: 5,
    suppressCellFocus: true,
    pagination: true,
    paginationPageSizeSelector: [5, 10, 15],
    defaultColDef: {
        flex: 1,
        resizable: true
    },
};
