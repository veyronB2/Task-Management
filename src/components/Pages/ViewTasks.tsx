import {
  AllCommunityModule,
  CellClickedEvent,
  ModuleRegistry,
} from 'ag-grid-community';
import {
  Box,
  Button,
  Paper,
} from '@mui/material';
import { Task, deleteTask, getTasks } from '../../mock-api';
import TaskFormModal, { TaskFormData } from './TaskFormModal';
import { columnDefs, gridOptions } from '../../utilities/agGrid';
import { useCallback, useEffect, useRef, useState } from 'react';

import { AgGridReact } from 'ag-grid-react';
import ConfirmDialog from '../ConfirmationDialog';
import HeroBanner from '../HeroBanner';
import { enqueueSnackbar } from 'notistack';
import { isEmpty } from 'lodash';

ModuleRegistry.registerModules([AllCommunityModule]);

const staticFieldValues = { required: false, error: false };

export interface RowData extends Task {
    actions: null;
}

const TaskTable = () => {
    const [allTasks, setAllTasks] = useState<Task[] | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedTaskData, setSelectedTaskData] = useState<TaskFormData | null>(null);
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
    const [taskToDelete, setTaskToDelete] = useState<string | null>(null);

    const gridRef = useRef<AgGridReact>(null);

    const loadTasks = useCallback(async () => {
      if (!gridRef.current) return;
          setLoading(true);
      try {
          const tasks = await getTasks();
          setAllTasks(tasks);
      } catch (error) {
          enqueueSnackbar('Failed to fetch tasks', { variant: 'error' });
      } finally {
          setLoading(false);
      }
    }, [enqueueSnackbar]);

    useEffect(() => {
      loadTasks();
    }, [loadTasks]);

    const handleCellClick = useCallback((event: CellClickedEvent<Task>) => {
      const rowData = event.data;

      if (event.colDef.colId === 'actions') {
          return;
      }

      if (!isEmpty(rowData)) {
        const formData: TaskFormData = {
          title: { value: rowData.title, ...staticFieldValues },
          dueDate: {
            value: rowData.dueDate ? new Date(rowData.dueDate).toISOString().split('T')[0] : '',
            ...staticFieldValues,
          },
          description: { value: rowData.description || '', ...staticFieldValues },
          completed: { value: rowData.isCompleted ? 'true' : 'false', ...staticFieldValues },
          id: { value: rowData.id, ...staticFieldValues },
        };
        setSelectedTaskData(formData);
        setModalOpen(true);
      }
    }, []);

  const handleCloseModal = useCallback(() => {
    setModalOpen(false);
    setSelectedTaskData(null);
  }, []);

  const refetchTasks = useCallback(() => {
        loadTasks();
  }, [loadTasks])

  const onDeleteItemIconClick = (taskId: string) => {
    setTaskToDelete(taskId);
    setConfirmDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!taskToDelete) return;

    try {
      await deleteTask(taskToDelete);
      enqueueSnackbar('Task deleted successfully!', { variant: 'success' });
      loadTasks();
    } catch (error) {
      enqueueSnackbar('Failed to delete task.', { variant: 'error' });
    } finally {
      setConfirmDialogOpen(false);
      setTaskToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setConfirmDialogOpen(false);
    setTaskToDelete(null);
  };

  return (
    <Box display="flex" flexDirection="column" width="100%" paddingLeft="3rem" paddingRight="3rem">
        <HeroBanner title="View All Tasks" />
        <Box display="flex" justifyContent="flex-start" gap={2} mt={2} flexDirection={{ xs: 'column', sm: 'row' }}>
            <Button variant="contained" color="primary" onClick={() => window.history.back()}>
            Go Back
            </Button>
            <Button variant="contained" color="secondary" onClick={() => setModalOpen(true)}>
            Add Task
            </Button>
            <Button variant="outlined" color="secondary" onClick={loadTasks}>
            Refresh
            </Button>
        </Box>
        <Paper sx={{ mt: 4, padding: '4rem' }}>
            <div className="ag-theme-alpine" style={{ height: 500, width: '100%' }}>
            <AgGridReact
                ref={gridRef}
                gridOptions={gridOptions}
                columnDefs={columnDefs}
                loading={loading}
                rowData={allTasks}
                onCellClicked={handleCellClick}
                context={{onDeleteItemIconClick}}
            />
            </div>
        </Paper>
        <TaskFormModal
            open={modalOpen}
            onClose={handleCloseModal}
            initialData={selectedTaskData}
            onTaskComplete={refetchTasks}
        />
        <ConfirmDialog
            open={confirmDialogOpen}
            message="Are you sure you want to delete this task?"
            onConfirm={handleConfirmDelete}
            onCancel={handleCancelDelete}
      />
    </Box>
  );
};

export default TaskTable;
