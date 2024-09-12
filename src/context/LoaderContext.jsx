import { createContext, useContext, useState } from 'react';

/**
 * @Author : Jobserd Julián Ocampo,   @date 2024-08-13 09:54:39
 * @description : Este archivo define el contexto `LoaderContext` y el hook `useLoader` para gestionar el estado de carga (loader) en la aplicación. Proporciona un contexto que permite a los componentes acceder y modificar el estado de carga globalmente.
**/

export const LoaderContext = createContext();

export const useLoader = () => {
    const context = useContext(LoaderContext);
    if (!context) {
        throw new Error('useLoader must be used within a LoaderProvider');
    }
    return context;
};

export const LoaderProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);

    const startLoading = () => setIsLoading(true);
    const stopLoading = () => setIsLoading(false);

    return (
        <LoaderContext.Provider value={{ isLoading, setIsLoading, startLoading, stopLoading }}>
            {children}
        </LoaderContext.Provider>
    );
};
