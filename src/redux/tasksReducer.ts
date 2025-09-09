import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Task, deleteTask, getTasks } from "../mock-api";

interface TasksState {
    data: Task[] | null;
    loading: boolean;
    error: string | null;
    modalOpen: boolean;
    confirmDialogOpen: boolean;
    taskToDelete: string | null;
}

const initialState: TasksState = {
    data: null,
    loading: false,
    error: null,
    modalOpen: false,
    confirmDialogOpen: false,
    taskToDelete: null,
};

export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async (_, { rejectWithValue }) => {
    try {
        return await getTasks();
    } catch (err) {
        return rejectWithValue(`Failed to fetch tasks ${err}`);
    }
});

export const removeTask = createAsyncThunk("tasks/removeTask", async (taskId: string, { rejectWithValue }) => {
    try {
        await deleteTask(taskId);
        return taskId;
    } catch (err) {
        return rejectWithValue(`Failed to delete task ${err}`);
    }
});

const taskSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        openModal(state) {
            state.modalOpen = true;
        },
        closeModal(state) {
            state.modalOpen = false;
        },
        openConfirmDialog(state, action: PayloadAction<string>) {
            state.confirmDialogOpen = true;
            state.taskToDelete = action.payload;
        },
        closeConfirmDialog(state) {
            state.confirmDialogOpen = false;
            state.taskToDelete = null;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(fetchTasks.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
                state.data = action.payload;
                state.loading = false;
            })
            .addCase(fetchTasks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(removeTask.fulfilled, (state, action: PayloadAction<string>) => {
                state.data = state.data?.filter(task => task.id !== action.payload) || null;
            });
    },
});

export const { openModal, closeModal, openConfirmDialog, closeConfirmDialog } = taskSlice.actions;

export default taskSlice.reducer;
