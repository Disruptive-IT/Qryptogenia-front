import React from 'react';
import { Toaster } from 'sonner';
import { LoaderProvider } from './context/LoaderContext';
import { Store } from "./context/store";
import { PageRouter } from './router/PageRouter';

function App() {

  return (
    <LoaderProvider>
      <Store>
        <PageRouter />
        <Toaster expand={false} richColors autoClose={2000} closeButton={true}/>
      </Store>
    </LoaderProvider>
  );
}

export default App;