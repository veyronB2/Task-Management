import {
  AllCommunityModule,
  CellClickedEvent,
  ModuleRegistry,
} from 'ag-grid-community';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import {
  Box,
  Button,
  Paper,
} from '@mui/material';
import TaskFormModal, { TaskFormData } from './TaskFormModal';
import {
  closeConfirmDialog,
  closeModal,
  fetchTasks,
  openConfirmDialog,
  openModal,
  removeTask,
} from '../redux/tasksReducer';
import { columnDefs, gridOptions } from '../utilities/agGrid';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { useCallback, useEffect, useRef } from 'react';

import { AgGridReact } from 'ag-grid-react';
import ConfirmDialog from './ConfirmationDialog';
import HeroBanner from './HeroBanner';
import { Task } from '../mock-api';
import { enqueueSnackbar } from 'notistack';
import { isEmpty } from 'lodash';

ModuleRegistry.registerModules([AllCommunityModule]);

const staticFieldValues = { required: false, error: false };

export interface RowData extends Task {
  actions: null;
}

const TaskTable = () => {
  const dispatch: ThunkDispatch<any, any, AnyAction> = useAppDispatch();
  const {
    tasks,
    loading,
    modalOpen,
    selectedTaskData,
    confirmDialogOpen,
    taskToDelete,
  } = useAppSelector(state => state.tasks);

  const gridRef = useRef<AgGridReact>(null);

  const loadTasks = useCallback(() => {
    if (!gridRef.current) return;
    dispatch(fetchTasks());
  }, [dispatch]);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const handleCellClick = useCallback(
    (event: CellClickedEvent<Task>) => {
      const rowData = event.data;

      if (event.colDef.colId === 'actions') return;

      if (!isEmpty(rowData)) {
        const formData: TaskFormData = {
          title: { value: rowData.title, ...staticFieldValues },
          dueDate: {
            value: rowData.dueDate
              ? new Date(rowData.dueDate).toISOString().split('T')[0]
              : '',
            ...staticFieldValues,
          },
          description: { value: rowData.description || '', ...staticFieldValues },
          completed: { value: rowData.isCompleted ? 'true' : 'false', ...staticFieldValues },
          id: { value: rowData.id, ...staticFieldValues },
        };
        dispatch(openModal(formData));
      }
    },
    [dispatch]
  );

  const handleCloseModal = useCallback(() => {
    dispatch(closeModal());
  }, [dispatch]);

  const onDeleteItemIconClick = (taskId: string) => {
    dispatch(openConfirmDialog(taskId));
  };

  const handleConfirmDelete = async () => {
    if (!taskToDelete) return;

    try {
      await dispatch(removeTask(taskToDelete)).unwrap();
      enqueueSnackbar('Task deleted successfully!', { variant: 'success' });
      dispatch(fetchTasks());
    } catch {
      enqueueSnackbar('Failed to delete task.', { variant: 'error' });
    } finally {
      dispatch(closeConfirmDialog());
    }
  };

  const handleCancelDelete = () => {
    dispatch(closeConfirmDialog());
  };

  return (
    <Box display="flex" flexDirection="column" width="100%" paddingLeft="3rem" paddingRight="3rem">
      <HeroBanner title="View All Tasks" />
      <Box display="flex" justifyContent="flex-start" gap={2} mt={2} flexDirection={{ xs: 'column', sm: 'row' }}>
        <Button variant="contained" color="primary" onClick={() => window.history.back()}>
          Go Back
        </Button>
        <Button variant="contained" color="secondary" onClick={() => dispatch(openModal(null))}>
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
            rowData={tasks}
            onCellClicked={handleCellClick}
            context={{ onDeleteItemIconClick }}
          />
        </div>
      </Paper>
      <TaskFormModal
        open={modalOpen}
        onClose={handleCloseModal}
        initialData={selectedTaskData}
        onTaskComplete={loadTasks}
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
