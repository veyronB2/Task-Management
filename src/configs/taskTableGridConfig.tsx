import { ColDef, GridOptions } from "ag-grid-community";
import { GetActionIcons, getNoOverlayNoRowsTemplate } from "../utilities/agGrid";

import { Task } from "../mock-api";
import { formatDisplayDate } from "../utilities/utitlities";
import { getDataPath } from "../utilities/taskTable";

export const gridOptions: GridOptions = {
    overlayNoRowsTemplate: getNoOverlayNoRowsTemplate({ entity: "tasks" }),
    domLayout: "normal",
    paginationPageSize: 5,
    suppressCellFocus: true,
    paginationPageSizeSelector: [5, 10, 15],
    defaultColDef: {
        flex: 1,
        resizable: true,
        filter: "agTextColumnFilter",
        filterParams: { buttons: ["reset"] }
    },
};

export const gridOptionsMobile: GridOptions = {
    overlayNoRowsTemplate: getNoOverlayNoRowsTemplate({ entity: "tasks" }),
    domLayout: "normal",
    suppressCellFocus: true,
    defaultColDef: {
        flex: 1,
        resizable: true,
        filter: "agTextColumnFilter",
        filterParams: { buttons: ["reset"] }
    },
    autoGroupColumnDef: {
        headerName: "Task ID",
        suppressHeaderContextMenu: true,
        cellRendererParams: {
            suppressCount: true,
        },
        hide: true
    },
    treeData: true,
    getDataPath: getDataPath,
};

interface RowDataMobile {
    property: any;
    value: any;
}

interface RowData extends Task {
    actions: null;
}

export const mobileColumnDefs: ColDef<RowDataMobile>[] = [
    { field: "value"},
];

export const columnDefs: ColDef<RowData>[] = [
    { field: "id", headerName: "Task ID"},
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


