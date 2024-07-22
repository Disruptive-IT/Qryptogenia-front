// LoaderContext.js
import { createContext, useContext, useState } from 'react';

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
