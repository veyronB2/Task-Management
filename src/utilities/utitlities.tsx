import { TaskFormData } from "../components/TaskFormModal";
import { format } from "date-fns";

interface GetNoOverlayNoRowsTemplateProps {
    entity?: string;
    customMessage?: string;
}

export const getNoOverlayNoRowsTemplate = ( { entity, customMessage }: GetNoOverlayNoRowsTemplateProps) => {
    const message = customMessage ? customMessage : `There are no ${entity} for the specified criteria.`;
    return `<span class=ag-overlay-no-rows-center>${message}</span>`;
};


export const validateForm = (data: TaskFormData, isExistingTask: boolean): TaskFormData => {
    const validatedData: Partial<TaskFormData> = {};

    for (const key in data) {
        const fieldKey = key as keyof TaskFormData;
        const field = data[fieldKey];

        if (!field) continue;

        const isRequired = field.required || (isExistingTask && fieldKey === "completed");

        let isError = false;

        if (isRequired) {
            if (typeof field.value === "string") {
                isError = field.value.trim() === "";
            } else if (field.value === null || field.value === undefined) {
                isError = true;
            }
        }

        validatedData[fieldKey] = { ...field, error: isError };
    }

    return validatedData as TaskFormData;
};

export const formatDisplayDate = (dateString: string): string => {
    try {
        return format(new Date(dateString), "dd MMMM yyyy, HH:mm:ss");
    } catch (error) {
        console.warn(`Invalid date ${error}`);
        return dateString;
    }
};




