import {
  Box,
  Button,
  Container,
  IconButton,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
  useMediaQuery
} from '@mui/material';
import { Delete, Edit, Save } from '@mui/icons-material';
import React, { useCallback, useState } from 'react';
import Statistics, { StatItem } from './components/Statistics';

import AddTask from './components/AddTask';
import ButtonMui from './components/Button';
import HeroBanner from './components/HeroBanner';
import StatusFilter from './components/StatusFilter';
import TasksList from './components/TasksList';

export interface TaskState {
  id: string;
  isCompleted?: boolean;
  taskText: string;
  isInEditMode?: boolean;
}

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const statisticsList: StatItem[] = [
      { label: 'All', value:  99},
      { label: 'Completed', value: "55%" },
      { label: 'Uncompleted', value: "45%" },
]

const dummyTasks: TaskState[] = [
  {id: "12345", isCompleted: false, isInEditMode: false, taskText: "Update backlog"},
  {id: "79798", isCompleted: false, isInEditMode: false, taskText: "Update time sheets"}
]

const filterOptions: string[] = ["all" , "completed", "not completed"]

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<string>('all');
  const [input, setInput] = useState<string>('');
  const [editId, setEditId] = useState<number | null>(null);
  const [editText, setEditText] = useState<string>('');

  const isSmallScreen = useMediaQuery('(max-width:600px)');

  const handleAdd = () => {
    if (input.trim()) {
      setTodos([...todos, { id: Date.now(), text: input, completed: false }]);
      setInput('');
    }
  };

  const handleDelete = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleEdit = (id: number, text: string) => {
    setEditId(id);
    setEditText(text);
  };

  const handleSave = (id: number) => {
    setTodos(todos.map(todo => (todo.id === id ? { ...todo, text: editText } : todo)));
    setEditId(null);
    setEditText('');
  };

  const completedCount = todos.filter(todo => todo.completed).length;
  const totalCount = todos.length;
  const completedPercent = totalCount ? Math.round((completedCount / totalCount) * 100) : 0;

  const filteredTodos = todos.filter(todo => {
    if (filter === 'Completed') return todo.completed;
    if (filter === 'Uncompleted') return !todo.completed;
    return true;
  });

  const theme = createTheme();

  const handleClearClick = useCallback(() => {
      console.log("List Cleared");
  }, [])

  const handleAddClick = useCallback(() => {
      console.log("Task Added");
  }, [])

  const handleFilterChange = useCallback((event: SelectChangeEvent<string>) => {
      setFilter(event.target.value);
  }, []);

  const handleAddButtonClick = useCallback(() => {
      console.log("Task has been added");
  }, [])

  const handleTaskInputChange = useCallback(() => {
      console.log("Input has been updated");
  } ,[])

  return (
    <ThemeProvider theme={theme}>
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="#f5f5f5" >
        <Box sx={{ bgcolor: 'white', p: 4, borderRadius: 2, width: { xs: '100%', sm: '90%',  md: '70%', lg: '50%' }, boxShadow: 3 }} >
          <HeroBanner title='Task Management' />
          <Statistics statsItems={statisticsList} />
          <StatusFilter options={filterOptions} onChange={handleFilterChange} filter={filter} />
          <AddTask onAddClick={handleAddButtonClick} onChange={handleTaskInputChange} value={input} text='Add'/> 
          <TasksList tasks={dummyTasks}/>
          <ButtonMui text='Clear List' onClick={handleClearClick} color='error'/>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default App;
