import React, { useEffect, useRef } from 'react';
import QRCodeStyling from 'qr-code-styling';
import '../styles/qrCode.css';
import { useQr } from '../../../context/QrContext';

const QR = () => {
    const { qrType, qrProps, qrImageInfo, qrTextProps, setQrColor, qrBgColor, setDotsColor, setCornersSquareColor, setCornersDotColor } = useQr();
    const { logoImage, dotsType, cornersSquareType, cornersDotType, dotsColor, cornersSquareColor, cornersDotColor } = qrProps;
    const qrRef = useRef(null);
    const qrCode = useRef(null);

    const handleColorChange = (color) => {
        setQrColor(color.hex);
    };

    useEffect(() => {
        if (!qrCode.current) {
            qrCode.current = new QRCodeStyling({
                width: 250,
                height: 250,
                data: 'www.qryptogenia.com',
                dotsOptions: {
                    color: dotsColor,
                    type: dotsType || 'rounded'
                },
                cornersSquareOptions: {
                    color: cornersSquareColor,
                    type: cornersSquareType || 'extra-rounded'
                },
                cornersDotOptions: {
                    color: cornersDotColor,
                    type: cornersDotType || 'dot'
                },
                backgroundOptions: {
                    color: "#ffffff",
                },
                imageOptions: {
                    crossOrigin: "anonymous",
                    hideBackgroundDots: true,
                    margin: 0,
                },
            });
            qrCode.current.append(qrRef.current);
        }
    }, [qrBgColor, dotsColor, cornersSquareColor, cornersDotColor, dotsType, cornersSquareType, cornersDotType]); // Añade qrBgColor a la lista de dependencias

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
            data: value ? value : 'www.qryptogenia.com',
            margin: 10,
            dotsOptions: {
                color: dotsColor,
                type: dotsType || 'rounded'
            },
            cornersSquareOptions: {
                color: cornersSquareColor,
                type: cornersSquareType || 'extra-rounded'
            },
            cornersDotOptions: {
                color: cornersDotColor,
                type: cornersDotType || 'dot'
            },
            backgroundOptions: {
                color: qrBgColor || "#ffffff",
            },
            image: qrImageInfo.qrImage,
            imageOptions: {
                crossOrigin: "anonymous",
                hideBackgroundDots: true,
                margin: 0,
                // size: Number(qrImageInfo.qrImageSize)
                size: 0.2

            },
        });
    }, [qrType, qrProps, qrImageInfo, dotsColor, cornersSquareColor, cornersDotColor, dotsType, cornersSquareType, cornersDotType, logoImage, qrBgColor]); // Añade qrBgColor a la lista de dependencias

    return (
        <>
            <div className="flex items-center justify-center w-full" ref={qrRef} ></div>
            <div className='absolute top-5 right-5'>
            </div>
            {qrTextProps.qrText && (
                <span
                    style={{
                        position: 'absolute',
                        top: `${qrTextProps.qrTextPositionY}px`,
                        left: `${qrTextProps.qrTextPositionX}px`,
                        color: qrTextProps.qrTextColor,
                        ...qrTextProps.qrTextFontStyle
                    }}
                >
                    {qrTextProps.qrText}
                </span>
            )}
        </>
    );
};

export default QR;
