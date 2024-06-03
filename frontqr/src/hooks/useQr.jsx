import { useState } from 'react';

const useQrState = (initialQrType = '', initialQrProps = {}) => {
    const [qrState, setQrState] = useState({
        qrType: initialQrType,
        qrText: '',
        qrFontStyle: {},
        qrColor: '#000000',
        qrBgColor: null,
        textColor: '#000000',
        qrImageInfo: {
            qrImage: null, 
            qrImageCentered: false,
            qrImagePositionX: 0,
            qrImagePositionY: 0, 
            qrIncludeMargin: false
        },
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

    const setQrIncludeMargin = (margin) => {
        updateQrImageInfo({ qrIncludeMargin: margin });
    };
    
    return { 
      ...qrState, 
        setQrData, 
        setQrText, 
        setQrFontStyle, 
        setQrImage, 
        setQrColor, 
        setQrBgColor, 
        setTextColor, 
        setTextSize, 
        setQrImageCentered, 
        setQrImagePositionX, 
        setQrImagePositionY,
        setQrIncludeMargin
    };
};

export default useQrState;
