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
            dotsType: 'rounded',
            cornersSquareType: 'extra-rounded',
            cornersDotType: 'dot',
            dotsColor: '#000000',
            cornersSquareColor: '#000000',
            cornersDotColor: '#000000'
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

    const setQrProps = (newProps) => {
        setQrState(prevState => ({
            ...prevState,
            qrProps: {
                ...prevState.qrProps,
                ...newProps,
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

    const setDotsType = (type) => {
        setQrState(prevState => ({
            ...prevState,
            qrProps: {
                ...prevState.qrProps,
                dotsType: type,
            },
        }));
    };

    const setCornersSquareType = (type) => {
        setQrState(prevState => ({
            ...prevState,
            qrProps: {
                ...prevState.qrProps,
                cornersSquareType: type,
            },
        }));
    };

    const setCornersDotType = (type) => {
        setQrState(prevState => ({
            ...prevState,
            qrProps: {
                ...prevState.qrProps,
                cornersDotType: type,
            },
        }));
    };

    const setDotsColor = (color) => {
        setQrProps({ dotsColor: color });
    };

    const setCornersSquareColor = (color) => {
        setQrProps({ cornersSquareColor: color });
    };

    const setCornersDotColor = (color) => {
        setQrProps({ cornersDotColor: color });
    };

    return { 
        ...qrState, 
        setQrData, 
        setQrText, 
        setQrFontStyle, 
        setQrColor, 
        setTextColor, 
        setDotsType, 
        setCornersSquareType, 
        setCornersDotType,
        setDotsColor,
        setCornersSquareColor,
        setCornersDotColor
    };
};

export default useQrState;