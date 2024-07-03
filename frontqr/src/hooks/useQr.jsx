import { useState } from 'react';

const useQrState = (initialQrType = 'default', initialQrProps = {}) => {
    const [qrState, setQrState] = useState({
        qrType: initialQrType,
        qrColor: '#000000',
        qrBgColor: 'Transparent',
        qrProps: {
            ...initialQrProps,
            backgroundImage: null,
            logoImage: null,
            logoPosition: { background: true },
            marcoType: 'default',
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
            qrTextSize: 16,
            qrTextColor: '#000000',
            qrTextFontStyle: "",
            qrTextPositionX: 0,
            qrTextPositionY: 0,
            qrTextChip:  {},
            qrTextChipColor: "#284B63"
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

    const setQrType = (type) => {
        setQrState(prevState => ({
            ...prevState,
            qrType: type,
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

    const setTextSize = (size) => {
        updateQrTextProps({ qrTextSize: size });
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
        setTextSize,
        setQrTextPositionX,
        setQrTextPositionY,
        setTextChip,
        setTextChipColor,
        setQrImage,
        setQrImageSize,
    };

};

export default useQrState;