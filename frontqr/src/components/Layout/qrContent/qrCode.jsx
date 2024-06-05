import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode.react';
import Draggable from 'react-draggable';
import '../styles/qrCode.css';
import { useQr } from '../../../context/QrContext';

const QR = () => {
    const { qrType, qrImageInfo, qrProps, qrBgColor, textSize, qrColor, qrText, textColor, qrFontStyle } = useQr();
    const [qrValue, setQrValue] = useState('');

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

    const imageSettings = qrImageInfo.qrImage? {
        src: qrImageInfo.qrImage,
        x: qrImageInfo.qrImageCentered? undefined : qrImageInfo.qrImagePositionX,
        y: qrImageInfo.qrImageCentered? undefined : qrImageInfo.qrImagePositionY,
        height: 50,
        width: 50,
        excavate: true,
    } : null;

    return (
        <>
            <div className="qr-wrapper m-auto"  style={{ backgroundColor: qrBgColor }}>
                <QRCode
                    value={qrValue}
                    size={200}
                    imageSettings={imageSettings}
                    bgColor={"transparent"}
                    fgColor={qrColor}
                    includeMargin={qrImageInfo.qrIncludeMargin}
                />
            </div>
            {qrText &&
                <Draggable bounds="parent">
                    <span className='px-4 rounded-lg text-center cursor-pointer'
                        style={{
                            fontSize: textSize,
                            color: textColor,
                            background: '#ccc',
                            opacity: 1,
                            position: 'absolute',
                            fontFamily: qrFontStyle.fontFamily,
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
