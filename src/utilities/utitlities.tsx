import { Task } from "../mock-api";
import { format } from "date-fns";

export const formatDisplayDate = (dateString: string): string => {
    try {
        return format(new Date(dateString), "dd MMMM yyyy, HH:mm:ss");
    } catch (error) {
        console.warn(`Invalid date ${error}`);

        return dateString;
    }
};

export const getTaskDataById = (tasks: Task[], idToFind: string) => tasks?.find(task => task.id === idToFind);




