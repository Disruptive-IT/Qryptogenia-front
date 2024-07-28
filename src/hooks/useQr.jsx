/*
 * @Author : Jaider cuartas,   @date 2024-07-15 20:13:14
 * @description : Hook personalizado para gestionar el estado de un código QR, incluyendo datos, tipo, propiedades visuales, texto y configuración de imagen.
 * @Props :
 *   - initialQrType: Tipo inicial del código QR (opcional, por defecto vacío).
 *   - initialQrProps: Propiedades iniciales del código QR (opcional, por defecto vacío).
 * @return : Retorna un objeto con métodos para actualizar y gestionar el estado del código QR.
 */

import { useState, useEffect } from 'react';

const useQrState = (initialQrType = '', initialQrProps = {}) => {
    
    const initialState = {
        qrData: "",
        qrType: initialQrType,
        qrColor: '#000000',
        qrBgColor: 'Transparent',
        qrProps: {
            ...initialQrProps,
            backgroundImage: null,
            logoImage: null,
            logoPosition: { background: true },
            marcoType: 'square',
            dotsType: 'rounded',
            cornersSquareType: 'extra-rounded',
            cornersDotType: 'dot',
            dotsColor: '#000000',
            cornersSquareColor: '#000000',
            cornersDotColor: '#000000'
        },
        qrImageInfo: {
            qrImage: null,
            qrImageSize: 0.5
        },
        qrTextProps: {
            qrText: '',
            qrTextColor: '#000000',
            qrTextFontStyle: { fontFamily: 'Arial, sans-serif', fontWeight: 'bold', textAlign: 'center' },
            qrTextPosition: {
                key: 'topCenter',
                style: {
                    position: 'absolute',
                    top: '2%',
                    left: '50%',
                    transform: 'translate(-50%, 0)',
                },
            },
            qrTextChip: { borderRadius: '0', padding: '0', backgroundColor: "transparent" },
            qrTextChipColor: "#284B63"
        },
    };
    const [qrState, setQrState] = useState(initialState)

    useEffect(() => {
        const path = window.location.pathname;
        if (path.startsWith('/qr/')) {
            const qrTypeFromUrl = path.split('/')[2];
            setQrState(prevState => ({
                ...prevState,
                qrType: qrTypeFromUrl,
            }));
        }
    }, []);

    const resetQrData = () => {
        setQrState(prevState => ({
            ...initialState,
            qrType: prevState.qrType,
        }));
    };

    const setQrData = (data) => {
        setQrState((prevState) => ({
            ...prevState,
            qrData: data,
        }));
    };

    const setQrType = (type) => {
        setQrState((prevState) => ({
            ...prevState,
            qrType: type,
        }));
    };

    const setQrBase64 = (base64) => {
        setQrState(prevState => ({
            ...prevState,
            qrBase64: base64,
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


    const setQrProps = (newProps) => {
        setQrState(prevState => ({
            ...prevState,
            qrProps: {
                ...prevState.qrProps,
                ...newProps,
            },
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

    const setMarcoType = (type) => {
        setQrState(prevState => ({
            ...prevState,
            qrProps: {
                ...prevState.qrProps,
                marcoType: type,
            },
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

    // ----------------------------- TEXT

    const updateQrTextProps = (newInfo) => {
        setQrState(prevState => ({
            ...prevState,
            qrTextProps: {
                ...prevState.qrTextProps,
                ...newInfo,
            },
        }));
    };

    const setQrText = (text) => {
        updateQrTextProps({ qrText: text });
    };


    const setQrFontStyle = (style) => {
        updateQrTextProps({ qrTextFontStyle: style });
    };

    const setTextColor = (color) => {
        updateQrTextProps({ qrTextColor: color });
    };

    const setQrTextPosition = (position) => {
        updateQrTextProps({ qrTextPosition: position });
    };

    const setTextChip = (shape) => {
        updateQrTextProps({ qrTextChip: shape });
    };

    const setTextChipColor = (color) => {
        updateQrTextProps({ qrTextChipColor: color });
    };

    // ----------------------------- IMG

    const updateQrImageInfo = (newInfo) => {
        setQrState(prevState => ({
            ...prevState,
            qrImageInfo: {
                ...prevState.qrImageInfo,
                ...newInfo,
            },
        }));
    };

    const setQrImageSize = (size) => {
        updateQrImageInfo({ qrImageSize: size });
    };

    const setQrImage = (image) => {
        updateQrImageInfo({ qrImage: image });
    };


    return {
        ...qrState,
        setQrType,
        setQrData,
        setQrText,
        setQrFontStyle,
        setQrColor,
        setQrBgColor,
        setTextColor,
        setMarcoType,
        setDotsType,
        setCornersSquareType,
        setCornersDotType,
        setDotsColor,
        setCornersSquareColor,
        setCornersDotColor,
        setBackgroundImage,
        setQrTextPosition,
        setTextChip,
        setTextChipColor,
        setQrImage,
        setQrImageSize,
        setQrBase64,
        resetQrData
    };

};

export default useQrState;