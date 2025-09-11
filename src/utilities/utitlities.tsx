import { Task } from "../mock-api";
import { format } from "date-fns";

interface GetNoOverlayNoRowsTemplateProps {
    entity?: string;
    customMessage?: string;
}

export const getNoOverlayNoRowsTemplate = ( { entity, customMessage }: GetNoOverlayNoRowsTemplateProps) => {
    const message = customMessage ? customMessage : `There are no ${entity} for the specified criteria.`;
    return `<span class=ag-overlay-no-rows-center>${message}</span>`;
};

export const formatDisplayDate = (dateString: string): string => {
    try {
        return format(new Date(dateString), "dd MMMM yyyy, HH:mm:ss");
    } catch (error) {
        console.warn(`Invalid date ${error}`);

        return dateString;
    }
};

export const getTaskDataById = (tasks: Task[], idToFind: string) => tasks?.find(task => task.id === idToFind);




