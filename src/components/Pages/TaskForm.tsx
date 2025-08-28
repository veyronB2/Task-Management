import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { CreateTaskData, createTask } from '../../mock-api';
import React, { useCallback, useState } from 'react';

import { useNavigate } from 'react-router-dom';

interface FormField {
  value: string;
  required: boolean;
  error: boolean;
  id: string;
  isCompleted: boolean;
}

interface FormData {
  title: FormField;
  dueDate: FormField
  description: FormField;
}

const initialFormData: FormData = {
  title: { id: "", value: '', required: true, error: false, isCompleted: false },
  dueDate: { id: "", value: '', required: true, error: false,  isCompleted: false },
  description: { id: "", value: '', required: false, error: false,  isCompleted: false },
}

const fieldBackground = { backgroundColor: 'white' };

const TaskForm: React.FC = () => {
   const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [formData, setFormData] = useState<FormData>(initialFormData)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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
            title: formData.title.value,
            description: formData.description.value,
            dueDate: new Date(formData.dueDate.value),
      };
          try {
            const created = await createTask(newTask);
            console.log('Task created:', created);
          } catch (error) {
            console.error('Error creating task:', error);
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
      <Box mb={2}>
        <Button variant="contained" onClick={handleBackBtnClick}>
          ← Back
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
            onChange={handleChange}
          />
          <Button variant="contained" color="primary" type="submit">
            Create Task
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default TaskForm;
