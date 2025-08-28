import { ThemeProvider, createTheme } from '@mui/material';

import AppRoutes from './components/AppRoutes';
import { BrowserRouter } from 'react-router-dom';
import ErrorBoundary from './components/Pages/ErrorBoundry';
import Layout from './components/Layout';
import { SnackbarProvider } from 'notistack';
import { useMemo } from 'react';

const App = () => {

  return (
      <ErrorBoundary>
        <Layout>
          <AppRoutes />
        </Layout>
      </ErrorBoundary>
  );
};

export default App;
