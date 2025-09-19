import { AgGridReact, AgGridReactProps } from "ag-grid-react";
import { CSSProperties, RefObject, useImperativeHandle, useMemo, useRef } from "react";
import { ColDef, ColGroupDef, DefaultMenuItem, GetContextMenuItemsParams, GetMainMenuItemsParams, MenuItemDef } from "ag-grid-community";

import { getMenuItems } from "../../utilities/agGrid";

type ThemeClassName = "ag-theme-quartz" |
    "ag-theme-quartz-dark" |
    "ag-theme-alpine" |
    "ag-theme-alpine-dark" |
    "ag-theme-balham" |
    "ag-theme-material";

const defaultGridStyle: CSSProperties = {
    height: "500px",
    minHeight: "300px",
    width: "100%"
};

export interface TableProps<T> extends Omit<AgGridReactProps<T>, "rowData" | "columnDefs" > {
    rowData: T[];
    columnDefs: (ColDef<T> | ColGroupDef<T>)[];
    className?: string;
    gridRef?: RefObject<AgGridReact<T> | null>;
    themeClassName?: ThemeClassName;
    gridStyle?: CSSProperties;
    contextMenuItems?: (DefaultMenuItem | MenuItemDef)[];
    mainMenuItems?: (DefaultMenuItem | MenuItemDef)[];
}

const Table = <T,>({
    themeClassName = "ag-theme-alpine",
    rowData,
    columnDefs,
    className,
    gridRef,
    gridStyle,
    defaultColDef,
    gridOptions,
    contextMenuItems,
    mainMenuItems,
    ...rest}: TableProps<T>) => {
    const ref = useRef<AgGridReact<T>>(null);

    useImperativeHandle(gridRef, () => ref.current as AgGridReact<T>);

    const mergedGridStyles = useMemo((): CSSProperties => ({
        ...defaultGridStyle,
        ...gridStyle,
    }), [gridStyle]);

    const mergedGridOptions = useMemo((): AgGridReactProps => {
        const updatedOptions = {
            ...gridOptions,
        };

        updatedOptions.getContextMenuItems = (params: GetContextMenuItemsParams) => {
            return getMenuItems(params.column?.getId(), contextMenuItems, "context");
        };
        updatedOptions.getMainMenuItems = (params: GetMainMenuItemsParams) => {
            return getMenuItems(params.column?.getId(), mainMenuItems, "main");
        };

        return updatedOptions;
    }, [contextMenuItems, gridOptions, mainMenuItems]);

    return (
        <div className={`${themeClassName} ${className ?? ""}`} style={mergedGridStyles}>
            <AgGridReact
                ref={ref}
                rowData={rowData}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
                {...mergedGridOptions}
                {...rest}
            />
        </div>
    );
};

export default Table;
