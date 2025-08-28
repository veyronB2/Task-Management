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
import { ColDef, GridOptions } from 'ag-grid-community';
import { Task, getTasks } from '../../mock-api';
import TaskFormModal, { TaskFormData } from './TaskFormModal';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { AgGridReact } from 'ag-grid-react';
import HeroBanner from '../HeroBanner';
import { enqueueSnackbar } from 'notistack';
import { getNoOverlayNoRowsTemplate } from '../../utilities/utitlities';
import { isEmpty } from 'lodash';

ModuleRegistry.registerModules([AllCommunityModule]);

interface ColumnDefs {
  id: string;
  title: string;
  dueDate: Date;
  isCompleted: boolean;
  description: string;
}

const staticFieldValues = { required: false, error: false };

const TaskTable = () => {
  const [allTasks, setAllTasks] = useState<Task[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTaskData, setSelectedTaskData] = useState<TaskFormData | null>(null);

  const gridRef = useRef<AgGridReact>(null);

  const columnDefs: ColDef<ColumnDefs>[] = useMemo(() => [
    { field: 'id', headerName: 'Task ID', filter: 'agTextColumnFilter' },
    { field: 'title', filter: 'agTextColumnFilter' },
    { field: 'dueDate', headerName: 'Due Date', filter: 'agTextColumnFilter' },
    { field: 'description', filter: 'agTextColumnFilter' },
    { field: 'isCompleted', headerName: 'Completed', filter: 'agTextColumnFilter' },
  ], []);

  const gridOptions = useMemo((): GridOptions => ({
    overlayNoRowsTemplate: getNoOverlayNoRowsTemplate({ entity: 'tasks' }),
    domLayout: 'normal',
    paginationPageSize: 20,
    suppressCellFocus: true,
    pagination: true,
    defaultColDef: {
      flex: 1,
      resizable: true,
    },
  }), []);

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
  }, []);

  const handleCellClick = useCallback((event: CellClickedEvent<Task>) => {
    const rowData = event.data;
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
  }, [])

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
          />
        </div>
      </Paper>
      <TaskFormModal
        open={modalOpen}
        onClose={handleCloseModal}
        initialData={selectedTaskData}
        onTaskComplete={refetchTasks}
      />
    </Box>
  );
};

export default TaskTable;
