import React, { useEffect, useRef } from 'react';
import QRCodeStyling from 'qr-code-styling';
import '../styles/qrCode.css';
import { useQr } from '../../../context/QrContext';
import InputColor from 'react-input-color'

const QR = () => {
    const { qrType, qrProps, qrImageInfo, qrTextProps, setQrColor, setDotsColor, setCornersSquareColor, setCornersDotColor } = useQr();
    const { logoImage, dotsType, cornersSquareType, cornersDotType, dotsColor, cornersSquareColor, cornersDotColor } = qrProps;
    const { qrImage, qrImageCentered, qrImagePositionX, qrImagePositionY, qrIncludeMargin } = qrImageInfo;
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
                    // position: "absolute",
                    // right: '10px',
                    // top: '10px'
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
            imageOptions: {
                crossOrigin: "anonymous",
                imageSize: qrImageCentered ? 0.4 : undefined,
                x: qrImageCentered ? undefined : qrImagePositionX,
                y: qrImageCentered ? undefined : qrImagePositionY,
                // position: "absolute",
                // right: '10px',
                // top: '10px'
            },
        });
    }, [qrType, qrProps, qrImageInfo, dotsColor, cornersSquareColor, cornersDotColor, dotsType, cornersSquareType, cornersDotType, logoImage]);

    useEffect(() => {
        qrCode.current.append(qrRef.current);
    }, []);

    return (
        <>
            <div className="flex items-center justify-center w-full" ref={qrRef}></div>
            <div className='absolute top-5 right-5'>
                <InputColor initialValue="#000" onChange={handleColorChange} placement="right" />
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