import { ThemeProvider, createTheme } from '@mui/material';

import AppRoutes from './components/AppRoutes';
import { BrowserRouter } from 'react-router-dom';
import ErrorBoundary from './components/Pages/ErrorBoundry';
import Layout from './components/Layout';
import React from 'react';

const App: React.FC = () => {
  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <ErrorBoundary>
          <Layout>
            <AppRoutes />
          </Layout>
        </ErrorBoundary>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
