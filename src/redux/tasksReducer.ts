import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Task, deleteTask, getTasks } from "../mock-api";

interface TasksState {
    data: Task[] | null;
    loading: boolean;
    error: string | null;
    modalOpen: boolean;
    confirmDialogOpen: boolean;
    isDeletingTask: boolean;
}

const initialState: TasksState = {
    data: null,
    loading: false,
    error: null,
    modalOpen: false,
    confirmDialogOpen: false,
    isDeletingTask: false
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
    name: "taskManagement",
    initialState,
    reducers: {
        openModal(state) {
            state.modalOpen = true;
        },
        closeModal(state) {
            state.modalOpen = false;
        },
        openConfirmDialog(state) {
            state.confirmDialogOpen = true;
        },
        closeConfirmDialog(state) {
            state.confirmDialogOpen = false;
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
                state.isDeletingTask = false;
            })
            .addCase(removeTask.pending, state => {
                state.isDeletingTask = true;
            })
            .addCase(removeTask.rejected, state => {
                state.isDeletingTask = false;
            });
    },
});

export const { openModal, closeModal, openConfirmDialog, closeConfirmDialog } = taskSlice.actions;

export default taskSlice.reducer;
