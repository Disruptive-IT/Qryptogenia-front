import { useState } from 'react';

const useQrState = (initialQrType = '', initialQrProps = {}) => {
    const [qrState, setQrState] = useState({
        qrType: initialQrType,
        qrText: '',
        qrFontStyle: {},
        qrColor: '#000000',
        qrBgColor: '#fff',
        textColor: '#000000',
        textSize: 16,
        qrProps: {
            ...initialQrProps,
        },
    });

    const setQrData = (type, props) => {
        setQrState(prevState => ({
            ...prevState,
            qrType: type,
            qrProps: {
                ...prevState.qrProps,
                ...props,
            },
        }));
    };

    const setQrText = (text) => {
        setQrState(prevState => ({
            ...prevState,
            qrText: text,
        }));
    };

    const setQrFontStyle = (style) => {
        setQrState(prevState => ({
            ...prevState,
            qrFontStyle: style,
        }));
    };
    const setQrColor = (color) => {
        setQrState(prevState => ({
            ...prevState,
            qrColor: color,
        }));
    };
    const setQrBgColor = (color) => {
        setQrState(prevState => ({
            ...prevState,
            qrBgColor: color,
        }));
    };
    
    const setTextColor = (color) => {
        setQrState(prevState => ({
            ...prevState,
            textColor: color,
        }));
    };

    const setTextSize = (size) => {
        setQrState(prevState => ({
            ...prevState,
            textSize: size,
        }));
    };

    return { ...qrState, setQrData, setQrText, setQrFontStyle, setQrColor, setQrBgColor, setTextColor, setTextSize };
};

export default useQrState;