import { TaskFormData } from "../components/Pages/TaskFormModal";

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

    if (!field) continue; // Skip if field is undefined

    const isRequired = field.required || (isExistingTask && fieldKey === 'completed');

    const isError =
      isRequired &&
      ((typeof field.value === 'string' && field.value.trim() === '') ||
        typeof field.value === 'boolean' && field.value === null);

    validatedData[fieldKey] = { ...field, error: isError };
  }

  return validatedData as TaskFormData;
};


