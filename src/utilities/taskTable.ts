import { Task } from "../mock-api";

export type PathValue = {
    path: string[];
    value: any;
};

export const transformTasksToPathArray = (tasks: Task[]): PathValue[] => {
    const result: PathValue[] = [];

    tasks.forEach((task) => {
        const taskId = task.id;

        Object.entries(task).forEach(([key, value]) => {
            if (key !== "id") {
                result.push({
                    path: [taskId, key],
                    value,
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

export const getTransformedData = (data: Task[] | null, isMobile: boolean) => {
    if (!isMobile) return data;

    return transformTasksToPathArray(data ?? []);
};


