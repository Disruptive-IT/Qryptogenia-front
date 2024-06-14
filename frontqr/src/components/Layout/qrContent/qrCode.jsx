import React, { useEffect, useRef } from 'react';
import QRCodeStyling from 'qr-code-styling';
import '../styles/qrCode.css';
import { useQr } from '../../../context/QrContext';

const QR = () => {
    const { qrType, qrBgColor, qrProps, qrImageInfo, qrTextProps } = useQr();
    const { logoImage, marcoType, dotsType, cornersSquareType, cornersDotType, dotsColor, cornersSquareColor, cornersDotColor } = qrProps;
    const qrRef = useRef(null);
    const qrCode = useRef(null);

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
                    color: "transparent",
                },
                imageOptions: {
                    crossOrigin: "anonymous",
                    hideBackgroundDots: true,
                    margin: 2,
                    imageSize: qrImageInfo.qrImageSize
                },
            });
            qrCode.current.append(qrRef.current);
        }
    }, [dotsColor, cornersSquareColor, cornersDotColor, dotsType, cornersSquareType, cornersDotType]);

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
            backgroundOptions: {
                color: "transparent",
            },
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
            image: qrImageInfo.qrImage,
            imageOptions: {
                crossOrigin: "anonymous",
                hideBackgroundDots: true,
                margin: 2,
                imageSize: qrImageInfo.qrImageSize
            },
        });
    }, [qrType, qrProps, qrImageInfo, dotsColor, cornersSquareColor, cornersDotColor, dotsType, cornersSquareType, cornersDotType, logoImage]);

    return (
        <>
            <div className='m-auto border-4' style={{ ...marcoType.style, backgroundColor: marcoType.type === 'default' ? 'transparent' : qrBgColor, transition: 'all 0.5s ease', }}>
                <div className="flex items-center justify-center w-full" ref={qrRef}></div>
            </div>
            {qrTextProps.qrText && (
                <span
                    style={{
                        position: 'absolute',
                        top: `${qrTextProps.qrTextPositionY}%`,
                        left: `${qrTextProps.qrTextPositionX}%`,
                        color: qrTextProps.qrTextColor,
                        fontSize: qrTextProps.qrTextSize,
                        whiteSpace: 'pre-wrap',
                        overflowWrap: 'break-word',
                        width: '100px',
                        ...(qrTextProps.qrTextChip ? { backgroundColor: "gray" } : {}),
                        ...qrTextProps.qrTextChip,
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
