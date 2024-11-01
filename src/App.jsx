import React from 'react';
import { Toaster } from 'sonner';
import { Store } from "./context/store";
import { PageRouter } from './router/PageRouter';
import { NextUIProvider } from '@nextui-org/react';

function App() {

  return (
    <NextUIProvider>
          <Store>
      <div className='font-custom'>

        <PageRouter />
        <Toaster expand={false} richColors autoClose={2000} closeButton={true} />
      </div>
    </Store>
    </NextUIProvider>
  );
}

export default App;