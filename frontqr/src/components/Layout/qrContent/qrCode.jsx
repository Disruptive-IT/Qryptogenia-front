import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode.react';
import Draggable from 'react-draggable';
import '../styles/qrCode.css';
import { useQr } from '../../../context/QrContext';
import InputColor from 'react-input-color';

const QR = () => {
    const { qrType, qrProps, qrFontStyle, qrColor, qrText, textColor, setQrColor } = useQr();
    const { logoPosition, logoImage } = qrProps;
    const [qrValue, setQrValue] = useState('');

    const handleColorChange = (color) => {
        setQrColor(color.hex);
    };

    useEffect(() => {
        let value = "";
        switch (qrType) {
            case "app store":
                value = qrProps.appUrl;
                break;
            case "social media":
                value = qrProps.socialUrl;
                break;
            case "website url":
                value = qrProps.link;
                break;
            case "pdf":
                value = qrProps.pdf;
                break;
            default:
                value = "";
        }
        setQrValue(value);
    }, [qrType, qrProps]);

    const imageSettings = logoPosition && !logoPosition.background ? {
        src: logoImage,
        x: logoPosition.x,
        y: logoPosition.y,
        height: 50,
        width: 50,
        excavate: true,
    } : null;

    return (
        <>
            <div className="qr-wrapper m-auto">
                {logoPosition && logoPosition.background && <img src={logoImage} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0.6 }} />}
                <QRCode
                    value={qrValue}
                    size={200}
                    imageSettings={imageSettings}
                    bgColor={"transparent"}
                    fgColor={qrColor}
                />
            </div>
            <div className='absolute top-5 right-5'>
                <InputColor initialValue="#000" onChange={handleColorChange} placement="right" />
            </div>
            {qrText &&
                <Draggable bounds="parent">
                    <span className='px-4 rounded-lg text-center cursor-pointer'
                        style={{
                            ...qrFontStyle,
                            color: textColor,
                            background: '#ccc',
                            opacity: 1,
                            position: 'absolute',
                        }}
                    >
                        {qrText}
                    </span>
                </Draggable>
            }
        </>
    );
};

export default QR;