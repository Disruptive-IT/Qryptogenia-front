import React from 'react';
import { Toaster } from 'sonner';
import { Store } from "./context/store";
import { PageRouter } from './router/PageRouter';

function App() {

  return (
    <Store>
      <div className='font-custom'>

        <PageRouter />
        <Toaster expand={false} richColors autoClose={2000} closeButton={true} />
      </div>
    </Store>
  );
}

export default App;