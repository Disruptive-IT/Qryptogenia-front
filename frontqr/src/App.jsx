import React from 'react';
import { Toaster } from 'sonner';
import { LoaderProvider } from './context/LoaderContext';
import { Store } from "./context/store";
import { PageRouter } from './router/PageRouter';
import { StepperProvider } from './context/StepperContext';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Paper, Switch } from "@mui/material";
import { useState } from "react";
import useMediaQuery from '@mui/material/useMediaQuery';

  

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [mode, setMode] = useState(prefersDarkMode);

  const appTheme = createTheme({
    palette: {
      mode: mode ? "dark" : "light",
    },
  });

  const handleChange = () => {
    if (mode) {
      setMode(false);
    } else {
      setMode(true);
    }
  };

  return (
    
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
    <LoaderProvider>
      <StepperProvider>
        <Store>
          <PageRouter />
          <Toaster expand={false} richColors autoClose={2000} closeButton={true} />
          <Paper elevation={0} sx={{ height: "100vh" }} square>
        <h1>????????????????????????</h1>

        <Switch
          checked={mode}
          onChange={handleChange}
          
        />
      </Paper>
        </Store>
      </StepperProvider>

    </LoaderProvider>
    </ThemeProvider>
  );
}

export default App;
