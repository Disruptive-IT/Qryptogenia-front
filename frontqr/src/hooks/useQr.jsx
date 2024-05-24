import { useState } from 'react';

const useQrState = (initialQrType = '', initialQrProps = {}) => {
    const [qrState, setQrState] = useState({
        qrType: initialQrType,
        qrText: '',
        qrFontStyle: {},
        qrColor: '#000000', 
        textColor: '#000000', 
        qrProps: {
            ...initialQrProps,
            backgroundImage: null,
            logoImage: null,
            logoPosition: { background: true },
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

    const setBackgroundImage = (image) => {
        setQrState(prevState => ({
            ...prevState,
            qrProps: {
                ...prevState.qrProps,
                backgroundImage: image,
            },
        }));
    };

    const setLogoImage = (image) => {
        setQrState(prevState => ({
            ...prevState,
            qrProps: {
                ...prevState.qrProps,
                logoImage: image,
                logoPosition: prevState.qrProps.logoPosition || { background: true },
            },
        }));
    };

    const setLogoPosition = (position) => {
        setQrState(prevState => ({
            ...prevState,
            qrProps: {
                ...prevState.qrProps,
                logoPosition: position,
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
    const setTextColor = (color) => { 
        setQrState(prevState => ({
            ...prevState,
            textColor: color,
        }));
    };

    return { ...qrState, setQrData, setBackgroundImage, setLogoImage, setLogoPosition, setQrText, setQrFontStyle, setQrColor, setTextColor }; 
};

export default useQrState;