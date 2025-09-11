import { AgGridReact, AgGridReactProps } from "ag-grid-react";
import { CSSProperties, RefObject, useImperativeHandle, useMemo, useRef } from "react";
import { ColDef, ColGroupDef } from "ag-grid-community";

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

const columnDefsDefaults: ColDef = {
    flex: 1,
};


export interface TableProps<T> extends Omit<AgGridReactProps<T>, "rowData" | "columnDefs" > {
    rowData: T[];
    columnDefs: (ColDef<T> | ColGroupDef<T>)[];
    className?: string;
    gridRef?: RefObject<AgGridReact<T> | null>;
    themeClassName?: ThemeClassName;
    gridStyle?: CSSProperties;
}

const Table = <T,>({
    themeClassName = "ag-theme-alpine",
    rowData,
    columnDefs,
    className,
    gridRef,
    gridStyle,
    defaultColDef,
    ...rest}: TableProps<T>) => {
    const ref = useRef<AgGridReact<T>>(null);

    useImperativeHandle(gridRef, () => ref.current as AgGridReact<T>);

    const mergedGridStyles = useMemo((): CSSProperties => ({
        ...defaultGridStyle,
        ...gridStyle,
    }), [gridStyle]);

    return (
        <div className={`${themeClassName} ${className ?? ""}`} style={mergedGridStyles}>
            <AgGridReact
                ref={ref}
                rowData={rowData}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef ?? columnDefsDefaults}
                {...rest}
            />
        </div>
    );
};

export default Table;
