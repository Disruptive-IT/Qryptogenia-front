import { createContext, useContext, useState } from 'react';
import useQrState from '../hooks/useQr';

const QrContext = createContext();

export const QrProvider = ({ children }) => {
    const qrState = useQrState();
    const [appFormValues, setAppFormValues] = useState({
        
    });

    console.log('QrProvider initial state:', appFormValues);

    return (
        <QrContext.Provider value={{ ...qrState, appFormValues, setAppFormValues }}>
            {children}
        </QrContext.Provider>
    );
};

export const useQr = () => useContext(QrContext);