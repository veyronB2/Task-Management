import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./tasksReducer";

export const store = configureStore({
    reducer: {
        taskManagement: tasksReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
