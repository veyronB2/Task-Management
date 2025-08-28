import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

import React from 'react';
import { Task } from '../mock-api';

interface TaskTableProps {
  tasks?: Task[];
}

const TaskTable: React.FC<TaskTableProps> = ({ tasks }) => {
  return (
    <TableContainer component={Paper} sx={{ mt: 4 }}>
      <Typography variant="h6" sx={{ p: 2 }}>
        Task List
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Due Date</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks?.map((task) => (
            <TableRow key={task.id}>
              <TableCell>{task.title}</TableCell>
              <TableCell>{task.description || '-'}</TableCell>
              <TableCell>
                {task.dueDate
                  ? new Date(task.dueDate).toLocaleDateString()
                  : '—'}
              </TableCell>
              <TableCell>
                {task.isCompleted ? 'Completed' : 'Pending'}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TaskTable;
