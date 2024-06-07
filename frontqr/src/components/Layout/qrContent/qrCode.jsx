import React, { useEffect, useRef } from 'react';
import QRCodeStyling from 'qr-code-styling';
import Draggable from 'react-draggable';
import '../styles/qrCode.css';
import { useQr } from '../../../context/QrContext';
import GradientColorPicker from 'react-gcolor-picker';

const QR = () => {
    const { qrType, qrProps, qrFontStyle, qrText, textColor, setQrColor, setDotsColor, setCornersSquareColor, setCornersDotColor } = useQr();
    const { logoImage, dotsType, cornersSquareType, cornersDotType, dotsColor, cornersSquareColor, cornersDotColor } = qrProps;
    const qrRef = useRef(null);
    const qrCode = useRef(null);

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
        });
    }, [qrType, qrProps, dotsColor, cornersSquareColor, cornersDotColor, dotsType, cornersSquareType, cornersDotType, logoImage]);

    useEffect(() => {
        qrCode.current.append(qrRef.current);
    }, []);

    return (
        <>
            <div className="flex items-center justify-center w-full" ref={qrRef}></div>
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