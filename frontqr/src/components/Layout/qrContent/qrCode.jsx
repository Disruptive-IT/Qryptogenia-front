import React, { useEffect, useRef } from 'react';
import QRCodeStyling from 'qr-code-styling';
import '../styles/qrCode.css';
import { useQr } from '../../../context/QrContext';
import axios from 'axios';

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

    const saveQrData = async () => {
        const qrData = {
            description: qrType,
            qr: qrProps.link || 'default qr data',
            qrPreview: {
                title: qrProps.title || '',
                colorTitle: qrProps.colorTitle || '',
                description: qrProps.description || '',
                descriptionColor: qrProps.descriptionColor || '',
                boxColor: qrProps.boxColor || '',
                borderImg: qrProps.borderImg || '',
                imgBoxBackgroud: qrProps.imgBoxBackgroud || '',
                backgroudColor: qrProps.backgroudColor || '',
                SelectOptions: '{}'
            },
            qrText: {
                text: qrTextProps.qrText || '',
                positionX: qrTextProps.qrTextPositionX || 0,
                positionY: qrTextProps.qrTextPositionY || 0,
                colorText: qrTextProps.qrTextColor || '#000000',
                fontSize: parseInt(qrTextProps.qrTextSize, 10) || 14 // Asegúrate de que sea un número entero
            },
            qrTextFont: {
                fontFamily: qrTextProps.qrTextFontStyle.fontFamily || 'Arial'
            },
            qrTextBubble: {
                burbble: qrTextProps.qrTextChip || 'chip',
                color: qrTextProps.qrTextChipColor || 'gray'
            },
            qrDesign: {
                frame: qrProps.frame || 'classic',
                frameColor: qrProps.frameColor || '#ffffff',
                dots: qrProps.dots || 'rounded',
                dotsColor: qrProps.dotsColor || '#000000',
                cornerSquare: qrProps.cornerSquare || 'extra-rounded',
                cornerSquareColor: qrProps.cornerSquareColor || '#000000',
                cornerDot: qrProps.cornerDot || 'dot',
                cornerDotColor: qrProps.cornerDotColor || '#000000'
            },
            qrLogo: {
                logo: qrImageInfo.qrImage || 'logo image url',
                size: qrImageInfo.qrImageSize || 0.2
            }
        };

        try {
            const response = await axios.post('http://localhost:3000/api/auth/save', {
                userId: 'dc3562ca-7621-4924-bda9-82d887c16a5d', // replace with actual userId
                qrData: qrData
            });
            console.log(response.data);
        } catch (error) {
            console.error(error.response.data);
        }
    };

    return (
        <>
            <div className='m-auto border-4' style={{ ...marcoType.style, backgroundColor: marcoType.type === 'default' ? 'transparent' : qrBgColor, transition: 'all 0.5s ease', }}>
                <div className="flex items-center justify-center w-full" ref={qrRef}></div>
            </div>
            {qrTextProps.qrText && (
                <div
                    style={{
                        position: 'absolute',
                        top: `${qrTextProps.qrTextPositionY}%`,
                        left: `${qrTextProps.qrTextPositionX}%`,
                        color: qrTextProps.qrTextColor,
                        fontSize: qrTextProps.qrTextSize,
                        maxWidth: '180px',
                        ...(qrTextProps.qrTextChip ? { backgroundColor: qrTextProps.qrTextChipColor } : {}),
                        ...qrTextProps.qrTextChip,
                        ...qrTextProps.qrTextFontStyle
                    }}
                >
                    <span className='m-4 text-center' style={{
                        whiteSpace: 'pre-wrap',
                        overflowWrap: 'break-word',
                    }}>
                        {qrTextProps.qrText}
                    </span>
                </div>
            )}
            <button onClick={saveQrData}>Save QR</button>
        </>
    );
};

export default QR;