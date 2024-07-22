import { createContext, useContext, useState } from 'react';
import useQrState from '../hooks/useQr';

const QrContext = createContext();

export const QrProvider = ({ children }) => {
    const qrState = useQrState();
    const [appFormValues, setAppFormValues] = useState({});
    const [musicFormValues, setMusicFormValues] = useState({});
    const [socialFormValues, setSocialFormValues] = useState({});
    const [currentContentType, setCurrentContentType] = useState({});
    console.log(socialFormValues)

    return (
        <QrContext.Provider value={{ 
            ...qrState, 
            appFormValues, 
            setAppFormValues,
            musicFormValues, 
            setMusicFormValues,
            socialFormValues, 
            setSocialFormValues,
            currentContentType,
            setCurrentContentType 
        }}>
            {children}
        </QrContext.Provider>
    );
};

export const useQr = () => useContext(QrContext);