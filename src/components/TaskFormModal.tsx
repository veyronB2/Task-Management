import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { CreateTaskData, UpdateTaskData, createTask, updateTask } from '../mock-api';
import React, { useCallback, useEffect, useState } from 'react';

import { enqueueSnackbar } from 'notistack';
import { validateForm } from '../utilities/utitlities';

export interface FormField {
  value: string;
  required: boolean;
  error: boolean;
}

export interface TaskFormData {
  title: FormField;
  dueDate: FormField;
  description: FormField;
  completed: FormField;
  id?: FormField;
}

const initialFormData: TaskFormData = {
  title: { value: '', required: true, error: false },
  dueDate: { value: '', required: true, error: false },
  description: { value: '', required: false, error: false },
  completed: { value: '', required: true, error: false },
  id: { value: '', required: false, error: false },
};

const fieldBackground = { backgroundColor: 'white' };

interface TaskFormModalProps {
  open: boolean;
  onClose: () => void;
  taskData?: TaskFormData | null;
  onTaskComplete: () => void; 
}

const TaskFormModal: React.FC<TaskFormModalProps> = ({ open, onClose, taskData, onTaskComplete }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [formData, setFormData] = useState<TaskFormData>(initialFormData);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (taskData) {
      setFormData(taskData);
    } else {
      setFormData(initialFormData);
    }
  }, [taskData, open]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent) => {
      const { name, value } = e.target;
      const key = name as keyof TaskFormData;

      setFormData((prev) => {
        const prevField = prev[key];
        if (!prevField) return prev;
        return {
          ...prev,
          [key]: {
            ...prevField,
            value: String(value),
            error: prevField.required && String(value).trim() === '',
          },
        };
      });
    },
    []
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isExistingTask = !!formData.id?.value;
    const updatedFormData = validateForm(formData, isExistingTask);
    setFormData(updatedFormData);

    const isFormValid = !Object.values(updatedFormData).some((field) => field && typeof field === 'object' && 'error' in field && field.error);

    if (!isFormValid) return;

    enqueueSnackbar('Submitting task...', { variant: 'info' });
    setIsLoading(true);

    try {
      if (isExistingTask) {
        const updatePayload: UpdateTaskData = {
          title: updatedFormData.title.value,
          description: updatedFormData.description.value,
          dueDate: new Date(updatedFormData.dueDate.value),
          isCompleted: updatedFormData.completed.value === 'true',
        };
        await updateTask(updatedFormData.id!.value, updatePayload);
        enqueueSnackbar('Task updated successfully!', { variant: 'success' });
      } else {
        const createPayload: CreateTaskData = {
          title: updatedFormData.title.value,
          description: updatedFormData.description.value,
          dueDate: new Date(updatedFormData.dueDate.value),
        };
        await createTask(createPayload);
        enqueueSnackbar('Task created successfully!', { variant: 'success' });
        setFormData(initialFormData);
      }

      onTaskComplete();
      onClose();
    } catch (error) {
      enqueueSnackbar(`Task could not be ${isExistingTask ? 'updated' : 'created'}`, { variant: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{formData.id?.value ? 'Update Task' : 'Create Task'}</DialogTitle>
      <DialogContent>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          display="flex"
          flexDirection="column"
          gap={2}
          mt={1}
        >
          <TextField
            sx={fieldBackground}
            label="Title"
            name="title"
            required
            fullWidth
            error={formData.title.error}
            value={formData.title.value}
            disabled={isLoading}
            onChange={handleChange}
          />
          <TextField
            sx={fieldBackground}
            label="Due Date"
            name="dueDate"
            type="datetime-local"
            fullWidth
            required
            value={formData.dueDate.value}
            disabled={isLoading}
            onChange={handleChange}
            error={formData.dueDate.error}
            slotProps={{ htmlInput: { step: 1 }, inputLabel: { shrink: true } }}
          />
          <FormControl fullWidth required disabled={isLoading} error={formData.completed.error}>
            <InputLabel id="completed-label">Completed</InputLabel>
            <Select
              sx={fieldBackground}
              labelId="completed-label"
              id="completed"
              name="completed"
              value={formData.completed.value}
              onChange={handleChange}
              label="Completed"
            >
              <MenuItem value="">Select status</MenuItem>
              <MenuItem value="true">Yes</MenuItem>
              <MenuItem value="false">No</MenuItem>
            </Select>
          </FormControl>
          <TextField
            sx={fieldBackground}
            label="Description"
            name="description"
            multiline
            rows={isMobile ? 3 : 5}
            fullWidth
            value={formData.description.value}
            error={formData.description.error}
            disabled={isLoading}
            onChange={handleChange}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={isLoading}>Cancel</Button>
        <Button type="submit" onClick={handleSubmit} disabled={isLoading} variant="contained">
          {isLoading ? <CircularProgress size={24} color="inherit" /> : formData.id?.value ? 'Update Task' : 'Create Task'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskFormModal;
