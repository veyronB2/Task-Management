import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Task, deleteTask, getTasks } from '../mock-api';

import { TaskFormData } from '../components/Pages/TaskFormModal';

interface TasksState {
  tasks: Task[] | null;
  loading: boolean;
  error: string | null;
  modalOpen: boolean;
  selectedTaskData: TaskFormData | null;
  confirmDialogOpen: boolean;
  taskToDelete: string | null;
}

const initialState: TasksState = {
  tasks: null,
  loading: false,
  error: null,
  modalOpen: false,
  selectedTaskData: null,
  confirmDialogOpen: false,
  taskToDelete: null,
};

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async (_, { rejectWithValue }) => {
  try {
    return await getTasks();
  } catch (err) {
    return rejectWithValue('Failed to fetch tasks');
  }
});

export const removeTask = createAsyncThunk('tasks/removeTask', async (taskId: string, { rejectWithValue }) => {
  try {
    await deleteTask(taskId);
    return taskId;
  } catch (err) {
    return rejectWithValue('Failed to delete task');
  }
});

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    openModal(state, action: PayloadAction<TaskFormData | null>) {
      state.modalOpen = true;
      state.selectedTaskData = action.payload;
    },
    closeModal(state) {
      state.modalOpen = false;
      state.selectedTaskData = null;
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
        state.tasks = action.payload;
        state.loading = false;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(removeTask.fulfilled, (state, action: PayloadAction<string>) => {
        state.tasks = state.tasks?.filter(task => task.id !== action.payload) || null;
      });
  },
});

export const {
  openModal,
  closeModal,
  openConfirmDialog,
  closeConfirmDialog,
} = taskSlice.actions;

export default taskSlice.reducer;
