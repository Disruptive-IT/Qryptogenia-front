import React from 'react';
import { Toaster } from 'sonner';
import { LoaderProvider } from './context/LoaderContext';
import { Store } from "./context/store";
import { PageRouter } from './router/PageRouter';
import { StepperProvider } from './context/StepperContext';

function App() {

  return (
    <LoaderProvider>
      <StepperProvider>
        <Store>
          <PageRouter />
          <Toaster expand={false} richColors autoClose={2000} closeButton={true} />
        </Store>
      </StepperProvider>

    </LoaderProvider>
  );
}

export default App;
