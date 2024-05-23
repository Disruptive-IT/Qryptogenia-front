import { createContext, useContext } from 'react';
import useQrState from '../hooks/useQr';

const QrContext = createContext();

export const QrProvider = ({ children }) => {
    const qrState = useQrState();
    return <QrContext.Provider value={qrState}>{children}</QrContext.Provider>;
};

export const useQr = () => useContext(QrContext);