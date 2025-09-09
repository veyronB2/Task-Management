import { z } from "zod";

export const taskFormSchema = z.object({
    id: z.string().optional(),
    title: z.string().min(1, "Title is required"),
    dueDate: z
        .string()
        .refine((val) => {
            const parsed = new Date(val);
            return !isNaN(parsed.getTime());
        }, {
            message: "Due Date is required",
        }),
    completed: z
        .string()
        .refine(val => val === "true" || val === "false", {
            message: "Completed is required",
        }),
    description: z.string().max(250, "Description cannot be longer than 250 characters")
});
