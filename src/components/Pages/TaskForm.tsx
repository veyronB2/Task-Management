import {
  Box,
  Button,
  CircularProgress,
  Container,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { CreateTaskData, createTask } from '../../mock-api';
import React, { useCallback, useState } from 'react';

import { enqueueSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';

interface FormField {
  value: string;
  required: boolean;
  error: boolean;
}

interface FormData {
  title: FormField;
  dueDate: FormField;
  description: FormField;
}

const initialFormData: FormData = {
  title: { value: '', required: true, error: false },
  dueDate: { value: '', required: true, error: false },
  description: { value: '', required: false, error: false },
};

const fieldBackground = { backgroundColor: 'white' };

const TaskForm: React.FC = () => {
   const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isLoading, setIsLoading] = useState(false);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    enqueueSnackbar('The Task has been submitted', { variant: 'info' });
    const updatedFormData = Object.keys(formData).reduce((acc, key) => {
      const fieldKey = key as keyof FormData;
      const field = formData[fieldKey];
      const isError = field.required && field.value.trim() === '';
      acc[fieldKey] = { ...field, error: isError };
      return acc;
    }, {} as FormData);

    setFormData(updatedFormData);

    const isFormValid = !Object.values(updatedFormData).some(field => field.error);

    if (isFormValid) {
      const newTask: CreateTaskData = {
        title: updatedFormData.title.value,
        description: updatedFormData.description.value,
        dueDate: new Date(updatedFormData.dueDate.value),
      };
      setIsLoading(true);
      try {
        await createTask(newTask);
        enqueueSnackbar('The task has been sucessfully created!', { variant: 'success' });
        setFormData(initialFormData);
      } catch (error) {
        enqueueSnackbar('Task could not be created', { variant: 'error' });
      } finally {
        setIsLoading(false);
      }
    }
  };

const handleChange = useCallback(
  (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: {
        ...prev[name as keyof FormData],
        value,
        error: prev[name as keyof FormData].required && value.trim() === '',
      },
    }));
  }, []);

  const handleBackBtnClick = useCallback(() => {
    navigate(-1);
  }, [])

  const handleViewTasksClick = useCallback(() => {
    navigate('/view-tasks')
  }, [])


  return (
    <Container 
      maxWidth="sm"
      sx={{
          border: '1px solid',
          borderColor: 'primary.main', 
          borderRadius: 2, 
          padding: "2rem",
      }}
    >
      <Box display="flex" justifyContent="space-between" width='100%' mb={2}>
        <Button variant="contained" onClick={handleBackBtnClick} disabled={isLoading}>
          ← Back
        </Button>
        <Button variant="contained" onClick={handleViewTasksClick} disabled={isLoading}>
          View Tasks
        </Button>
      </Box>
      <Box >
        <Typography variant="h5" gutterBottom>
          Add New Task
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          display="flex"
          flexDirection="column"
          gap={2}
        >
          <TextField
            sx={fieldBackground}
            label="Title"
            name="title"
            required
            fullWidth
            error={formData.title.error}
            value={formData?.title.value}
            disabled={isLoading}
            onChange={handleChange}
          />
          <TextField
            sx={fieldBackground}
            label="Due Date"
            name="dueDate"
            type="date"
            fullWidth
            value={formData?.dueDate.value}
            required
            disabled={isLoading}
            onChange={handleChange}
            error={formData.dueDate.error}
            slotProps={{
                inputLabel: {
                shrink: true,
                },
         }}
          />
          <TextField
            sx={fieldBackground}
            label="Description"
            name="description"
            multiline
            rows={isMobile ? 3 : 5}
            fullWidth
            value={formData?.description?.value}
            error={formData.description.error}
            disabled={isLoading}
            onChange={handleChange}
          />
          <Button variant="contained" color="primary" type="submit" disabled={isLoading}>
            {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Create Task'}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default TaskForm;
