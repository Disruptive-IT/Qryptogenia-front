import { useState } from 'react';

const useQrState = (initialQrType = '', initialQrProps = {}) => {
    const [qrState, setQrState] = useState({
        qrType: initialQrType,
        qrColor: '#000000',
        qrProps: {
            ...initialQrProps,
            backgroundImage: null,
            logoImage: null,
            logoPosition: { background: true },
            dotsType: 'rounded',
            cornersSquareType: 'extra-rounded',
            cornersDotType: 'dot',
        },
        qrImageInfo: {
            qrImage: null,
            qrImageCentered: true,
            qrImagePositionX: 0,
            qrImagePositionY: 0,
        },
        qrTextProps: {
            qrText: '',
            qrTextColor: '#000000',
            qrTextFontStyle: {},
            qrTextPositionX: 0,
            qrTextPositionY: 0,
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

    const setDotsType = (type) => {
        setQrState(prevState => ({
            ...prevState,
            qrProps: {
                ...prevState.qrProps,
                dotsType: type,
            },
        }));
    };

    const setQrColor = (color) => {
        setQrState(prevState => ({
            ...prevState,
            qrColor: color,
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

    const setQrTextPositionX = (x) => {
        updateQrTextProps({ qrTextPositionX: x });
    };

    const setQrTextPositionY = (y) => {
        updateQrTextProps({ qrTextPositionY: y });
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

    const setQrImage = (image) => {
        updateQrImageInfo({ qrImage: image });
    };

    const setQrImageCentered = (centered) => {
        updateQrImageInfo({ qrImageCentered: centered });
    };

    const setQrImagePositionX = (x) => {
        updateQrImageInfo({ qrImagePositionX: x });
    };

    const setQrImagePositionY = (y) => {
        updateQrImageInfo({ qrImagePositionY: y });
    };


    return {
        ...qrState,
        setQrData,
        setBackgroundImage,
        setLogoImage,
        setLogoPosition,
        setQrText,
        setQrFontStyle,
        setQrColor,
        setTextColor,
        setQrTextPositionX,
        setQrTextPositionY,
        setDotsType,
        setCornersSquareType,
        setCornersDotType,
        setQrImage,
        setQrImageCentered,
        setQrImagePositionX,
        setQrImagePositionY,
    };
};

export default useQrState;
