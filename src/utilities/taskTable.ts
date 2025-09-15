import { ColDef } from "ag-grid-enterprise";
import { RowData } from "../configs/taskTableGridConfig";
import { Task } from "../mock-api";

export type PathValue = {
    path: string[];
    value: any;
};

export const transformTasksToPathArray = (tasks: Task[], columnDefs: ColDef<RowData>[]): PathValue[] => {
    const result: PathValue[] = [];
    const columns = columnDefs.map(definition => definition.field as string).filter(field => field !== "id" && field !== "actions" && field !== undefined);

    tasks.forEach((task) => {
        const taskId = task.id;
        const addedColumns = new Set<string>();

        Object.entries(task).forEach(([key, value]) => {
            if (key !== "id" && columns.includes(key)) {
                result.push({
                    path: [taskId, key],
                    value,
                });
                addedColumns.add(key);
            }
        });

        columns.forEach(column => {
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


