import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { Box, Button, Paper } from '@mui/material';
import { ColDef, GridOptions } from 'ag-grid-community';
import { Task, getTasks } from '../../mock-api';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { AgGridReact } from 'ag-grid-react';
import HeroBanner from '../HeroBanner';
import { enqueueSnackbar } from "notistack";
import { getNoOverlayNoRowsTemplate } from '../../utilities/utitlities';
import { useNavigate } from "react-router-dom";

ModuleRegistry.registerModules([ AllCommunityModule ]);

interface ColumnDefs {
    id: string;
    title: string;
    dueDate: Date;
    isCompleted: boolean;
    description: string;
}

const TaskTable = () => {
    const navigate = useNavigate()
    const [allTasks, setAllTasks] = useState<Task[] | null>(null)
    const [loading, setLoading] = useState<boolean>(false);

    const gridRef = useRef<AgGridReact>(null);

    const columnDefs: ColDef<ColumnDefs>[] = useMemo(() => ([
        {
            field: "id",
            headerName: "Task ID",

        },
        {
            field: "title",
            filter: "agTextColumnFilter"
        },
        {
            field: "dueDate",
            headerName: "Due Date",
            filter: "agTextColumnFilter"
        },
        {
            field: "description",
            filter: "agTextColumnFilter",
        },
        {
            field: "isCompleted",
            headerName: "Completed",
            filter: "agTextColumnFilter",
        },
    ]), []);

        const gridOptions = useMemo((): GridOptions => ({
            overlayNoRowsTemplate: getNoOverlayNoRowsTemplate({ entity: "tasks" }),
            domLayout: "normal",
            paginationPageSize: 20,
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
    }, []);


    useEffect(() => {
        loadTasks();
    }, [])

    const handleBackBtnClick = useCallback(() => {
        navigate(-1)
    }, [])

    const handleRefreshClick = useCallback(() => {
        loadTasks();
    } ,[])

  return (
    <Box display="flex" flexDirection="column" width="100%" paddingLeft="3rem" paddingRight="3rem">
        <HeroBanner title='View All Tasks'/>
        <Box display="flex" justifyContent="flex-start" gap={2} mt={2}>
            <Button variant="contained" color="primary" onClick={handleBackBtnClick}>
                Go Back
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleRefreshClick}>
                Refresh
            </Button>
        </Box>
        <Paper sx={{ mt: 4, padding: "4rem" }}>
            <div className="ag-theme-alpine" style={{ height: 500, width: '100%' }}>
                <AgGridReact
                    ref={gridRef}
                    gridOptions={gridOptions}
                    columnDefs={columnDefs}
                    loading={loading}
                    rowData={allTasks}
                />
            </div>
        </Paper>
    </Box>
  );
};

export default TaskTable;
