import { ColDef } from "ag-grid-enterprise";
import { RowData } from "../configs/taskTableGridConfig";
import { Task } from "../mock-api";
import { convertStringToPascalWithSpaces } from "./utitlities";

export type PathValue = {
    path: string[];
    value: any;
};

export const transformTasksToPathArray = (tasks: Task[], columnDefs: ColDef<RowData>[]): PathValue[] => {
    const result: PathValue[] = [];

    const fieldHeaderMap = columnDefs.reduce((acc, def) => {
        if (def.field && def.field !== "id") {
            acc[def.field] = def.headerName;
        }
        return acc;
    }, {} as Record<string, any>);

    tasks.forEach((task) => {
        const taskId = task.id;
        const addedColumns = new Set<string>();

        Object.entries(task).forEach(([key, value]) => {
            if (key !== "id" && fieldHeaderMap.hasOwnProperty.call(fieldHeaderMap, key)) {
                result.push({
                    path: [taskId, fieldHeaderMap[key] ?? convertStringToPascalWithSpaces(key)],
                    value: value,
                });
                addedColumns.add(key);
            }
        });

        Object.keys(fieldHeaderMap).forEach(column => {
            if (!addedColumns.has(column)) {
                result.push({
                    path: [taskId, column],
                    value: null,
                });
            }
        });
    });

    return result;
};

export const getDataPath = (data: PathValue[]): string[] => {
    if ("path" in data && Array.isArray(data.path)) {
        return data.path;
    }
    return [];
};

export const getTransformedData = (data: Task[] | null, isMobile: boolean, columnDefs: ColDef<RowData>[]) => {
    if (!isMobile) return data;

    return transformTasksToPathArray(data ?? [], columnDefs);
};

export const getTaskDataById = (tasks: Task[], idToFind: string) => tasks?.find(task => task.id === idToFind);


