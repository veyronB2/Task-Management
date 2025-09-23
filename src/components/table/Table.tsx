import { AgGridReact, AgGridReactProps } from "ag-grid-react";
import { CSSProperties, RefObject, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react";
import { ColDef, ColGroupDef, DefaultMenuItem, GetContextMenuItemsParams, GetMainMenuItemsParams, MenuItemDef } from "ag-grid-community";

import { getMenuItems } from "../../utilities/agGrid";

type ThemeClassName = "ag-theme-quartz" |
    "ag-theme-quartz-dark" |
    "ag-theme-alpine" |
    "ag-theme-alpine-dark" |
    "ag-theme-balham" |
    "ag-theme-material";


export interface TableProps<T> extends Omit<AgGridReactProps<T>, "rowData" | "columnDefs" > {
    rowData: T[];
    columnDefs: (ColDef<T> | ColGroupDef<T>)[];
    className?: string;
    gridRef?: RefObject<AgGridReact<T> | null>;
    themeClassName?: ThemeClassName;
    gridStyle?: CSSProperties;
    contextMenuItems?: (DefaultMenuItem | MenuItemDef)[];
    mainMenuItems?: (DefaultMenuItem | MenuItemDef)[];
    testId?: string;
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
    testId,
    ...rest}: TableProps<T>) => {
    const ref = useRef<AgGridReact<T>>(null);
    const tableWrapperRef = useRef<HTMLDivElement | null>(null);
    const [gridHeight, setGridHeight] = useState<number>(0);

    useImperativeHandle(gridRef, () => ref.current as AgGridReact<T>);

    const recalculateGridHeight = useCallback(() => {
        if (tableWrapperRef.current) {
            const container = tableWrapperRef.current;
            const containerTop = container.getBoundingClientRect().top;
            const titleElement = document.getElementById("hero-banner");
            const titleHeight = titleElement ? titleElement.offsetHeight : 0;
            const availableHeight = window.innerHeight - containerTop - titleHeight ;

            setGridHeight(availableHeight);
        }
    }, []);

    useEffect(() => {
        recalculateGridHeight();

        const resizeObserver = new ResizeObserver(recalculateGridHeight);
        if (tableWrapperRef.current) {
            resizeObserver.observe(tableWrapperRef.current);
        }

        window.addEventListener("resize", recalculateGridHeight);

        return () => {
            resizeObserver.disconnect();
            window.removeEventListener("resize", recalculateGridHeight);
        };
    }, [recalculateGridHeight, gridOptions]);

    const defaultGridStyle = useMemo((): CSSProperties => ({
        height: gridHeight,
        minHeight: "18.75rem",
        width: "100%"
    }), [gridHeight]);

    const mergedGridStyles = useMemo((): CSSProperties => ({
        ...defaultGridStyle,
        ...gridStyle,
    }), [defaultGridStyle, gridStyle]);

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
        <div className={`${themeClassName} ${className ?? ""}`} style={mergedGridStyles} ref={tableWrapperRef}>
            <AgGridReact
                data-testid={testId}
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
