import { Box, IconButton, TextField, Typography } from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { TaskState } from '../App';

interface TasksListProp {
  tasks: TaskState[];
  noTasksMessage?: string;
}

const TasksList = ({ 
  tasks, 
  noTasksMessage = "No Tasks To show...",
}: TasksListProp) => {
  
  function handleSaveClick(key: any): void {
    throw new Error('Function not implemented.');
  }

  function handleDeleteClick(key: any): void {
    throw new Error('Function not implemented.');
  }

  return (
          <Box>
            {tasks.length === 0 ? (
              <Typography>{noTasksMessage}</Typography>
            ) : (
              <ul style={{ padding: 0, margin: 0, listStyleType: 'none' }}>
                {tasks.map((task) => (
                  <li key={task.id} className="todo-item">
                    <Box 
                        display="flex" 
                        alignItems="center" 
                        justifyContent="space-between" 
                        width="100%" 
                        sx={{
                            padding: 2,
                            backgroundColor: task.isCompleted ? '#f0f0f0' : '#fff',
                            borderRadius: 2,
                            boxShadow: 1,
                            borderLeft: task.isCompleted ? '4px solid #4caf50' : '4px solid transparent',
                            transition: 'background-color 0.3s, box-shadow 0.3s',
                            '&:hover': {
                              boxShadow: 3,
                              backgroundColor: '#f9f9f9',
                            },
                            mb: 1,
                          }}
                    >
                      <Box flexGrow={1} ml={2} mr={2}>
                        {task.isInEditMode ? (
                          <TextField
                            fullWidth
                            value={task.taskText}
                          />
                        ) : (
                          <Typography>
                            {task.taskText}
                          </Typography>
                        )}
                      </Box>
                          <Box>
                            {task.isInEditMode ? (
                              <IconButton onClick={handleSaveClick} aria-label="save">
                                <SaveIcon />
                              </IconButton>
                            ) : (
                              <IconButton sx={{ color: '#29ba2cff' }} onClick={handleSaveClick} aria-label="edit">
                                <EditIcon />
                              </IconButton>
                            )}
                            <IconButton sx={{ color: '#D32F2F' }} onClick={handleDeleteClick} aria-label="delete">
                              <DeleteIcon />
                            </IconButton>
                          </Box>
                        </Box>
                  </li>

                ))}
              </ul>
            )}
          </Box>


  )
}

export default TasksList