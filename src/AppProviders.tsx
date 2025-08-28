import { ReactNode, useMemo } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack';
import { store } from '../redux/store';

interface Props {
  children: ReactNode;
}

const AppProviders = ({ children }: Props) => {
const theme = useMemo(() => createTheme(), []);
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <SnackbarProvider maxSnack={3} autoHideDuration={3000}>
          <BrowserRouter>
            {children}
          </BrowserRouter>
        </SnackbarProvider>
      </ThemeProvider>
    </Provider>
  );
};

export default AppProviders;
