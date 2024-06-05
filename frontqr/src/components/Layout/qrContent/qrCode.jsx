import React, { useEffect, useRef } from 'react';
import QRCodeStyling from 'qr-code-styling';
import Draggable from 'react-draggable';
import '../styles/qrCode.css';
import { useQr } from '../../../context/QrContext';
import InputColor from 'react-input-color';


const QR = () => {
    const { qrType, qrProps, qrFontStyle, qrColor, qrText, textColor, setQrColor } = useQr();
    const { logoPosition, logoImage, dotsType, cornersSquareType, cornersDotType } = qrProps;
    const qrRef = useRef(null);
    const qrCode = useRef(null);

    const handleColorChange = (color) => {
        setQrColor(color.hex);
    };

    useEffect(() => {
        if (!qrCode.current) {
            qrCode.current = new QRCodeStyling({
                width: 300,
                height: 300,
                data: '',
                image: logoImage,
                dotsOptions: {
                    color: qrColor,
                    type: dotsType || 'rounded'
                },
                cornersSquareOptions: {
                    color: qrColor,
                    type: cornersSquareType || 'extra-rounded'
                },
                cornersDotOptions: {
                    color: qrColor,
                    type: cornersDotType || 'dot'
                },
                backgroundOptions: {
                    color: "#ffffff",
                },
                imageOptions: {
                    crossOrigin: "anonymous",
                    margin: 20,
                },
            });
        }
    }, []);

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
        qrCode.current.update({
            data: value,
            image: logoImage,
            dotsOptions: {
                color: qrColor,
                type: dotsType || 'rounded'
            },
            cornersSquareOptions: {
                color: qrColor,
                type: cornersSquareType || 'extra-rounded'
            },
            cornersDotOptions: {
                color: qrColor,
                type: cornersDotType || 'dot'
            },
        });
    }, [qrType, qrProps, qrColor, dotsType, cornersSquareType, cornersDotType, logoImage]);

    useEffect(() => {
        qrCode.current.append(qrRef.current);
    }, []);

    return (
        <>
            <div className="qr-wrapper m-auto" ref={qrRef}></div>
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