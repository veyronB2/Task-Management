import { ThemeProvider, createTheme } from '@mui/material';

import AppRoutes from './components/AppRoutes';
import { BrowserRouter } from 'react-router-dom';
import ErrorBoundary from './components/Pages/ErrorBoundry';
import Layout from './components/Layout';
import React from 'react';
import { SnackbarProvider } from 'notistack';

const App: React.FC = () => {
  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={3} autoHideDuration={3000}>
        <BrowserRouter>
          <ErrorBoundary>
            <Layout>
              <AppRoutes />
            </Layout>
          </ErrorBoundary>
        </BrowserRouter>
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default App;
