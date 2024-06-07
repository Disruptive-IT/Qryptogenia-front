import React, { useEffect, useRef } from 'react';
import QRCodeStyling from 'qr-code-styling';
<<<<<<< HEAD
=======
import Draggable from 'react-draggable';
>>>>>>> styledark
import '../styles/qrCode.css';
import { useQr } from '../../../context/QrContext';
import InputColor from 'react-input-color';

const QR = () => {
<<<<<<< HEAD
    const { qrType, qrProps, qrImageInfo, qrTextProps, qrColor, setQrColor } = useQr();
    const { logoImage, dotsType, cornersSquareType, cornersDotType } = qrProps;
    const { qrImage, qrImageCentered, qrImagePositionX, qrImagePositionY, qrIncludeMargin } = qrImageInfo;
    const qrRef = useRef(null);
    const qrCode = useRef(null);
=======
    const { qrType, qrProps, qrFontStyle, qrColor, qrText, textColor, setQrColor } = useQr();
    const { logoPosition, logoImage, dotsType, cornersSquareType, cornersDotType } = qrProps;
    const qrRef = useRef(null);
    const qrCode = useRef(new QRCodeStyling({
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
    }));

    const handleColorChange = (color) => {
        setQrColor(color.hex);
    };
>>>>>>> styledark

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
<<<<<<< HEAD
            image: qrImage,
=======
            image: logoImage,
>>>>>>> styledark
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
<<<<<<< HEAD
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
    }, [qrType, qrImageInfo, qrProps, qrColor, dotsType, cornersSquareType, cornersDotType, qrImage]);
=======
        });
    }, [qrType, qrProps, qrColor, dotsType, cornersSquareType, cornersDotType, logoImage]);
>>>>>>> styledark

    useEffect(() => {
        qrCode.current.append(qrRef.current);
    }, []);

    return (
        <>
<<<<<<< HEAD
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
=======
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
>>>>>>> styledark
        </>
    );
};

export default QR;
