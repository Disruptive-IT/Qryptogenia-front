import React from 'react';
import { Toaster } from 'sonner';
import AppRoutes from './routes/index';
import { LoaderProvider } from './context/LoaderContext';
import { Store } from "./context/store";

function App() {

  return (
    <LoaderProvider>
      <Store>
        <AppRoutes />
        <Toaster expand={false} richColors autoClose={2000} closeButton={true}/>
      </Store>
    </LoaderProvider>
  );
}

export default App;
