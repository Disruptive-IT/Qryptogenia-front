import React, { useEffect, useRef } from 'react';
import QRCodeStyling from 'qr-code-styling';
import '../styles/qrCode.css';
import { useQr } from '../../../context/QrContext';
import axios from "../../../libs/axios";
import { toast } from 'sonner';


export const saveQrData = async (qrType, qrColor, qrBgColor, qrProps, qrImageInfo, qrTextProps) => {
    

    const qrData = {
        qr: {
            data: qrProps.link || 'default qr data',
            qrType,
            description: qrType,
            qrColor,
            qrBgColor,
        },
        qrPreview: {
            title: qrProps.title || '',
            colorTitle: qrProps.colorTitle || '',
            description: qrProps.description || '',
            descriptionColor: qrProps.descriptionColor || '',
            boxColor: qrProps.boxColor || '',
            borderImg: qrProps.borderImg || '',
            imgBoxBackgroud: qrProps.imgBoxBackgroud || '',
            backgroudColor: qrProps.backgroudColor || '',
            SelectOptions: {}
        },
        qrText: {
            text: qrTextProps.qrText,
            positionX: qrTextProps.qrTextPositionX,
            positionY: qrTextProps.qrTextPositionY,
            colorText: qrTextProps.qrTextColor,
            fontSize: qrTextProps.qrTextSize
        },
        qrTextFont: {
            fontFamily: qrTextProps.qrTextFontStyle || "Arial"
        },
        qrTextBubble: {
            burbble: JSON.stringify(qrTextProps.qrTextChip),
            color: qrTextProps.qrTextChipColor
        },
        qrDesign: {
            frame: qrProps.marcoType.shape || 'default',
            frameColor: qrBgColor,
            dots: qrProps.dotsType,
            dotsColor: qrProps.dotsColor,
            cornerSquare: qrProps.cornersSquareType,
            cornerSquareColor: qrProps.cornersSquareColor,
            cornerDot: qrProps.cornersDotType,
            cornerDotColor: qrProps.cornersDotColor
        },
        qrLogo: {
            logo: qrImageInfo.qrImage || 'null',
            size: qrImageInfo.qrImageSize
        }
    };

    console.log('Sending qrData to server:', qrData);

    try {
        const res = await axios.post('/qr/save', { qrData });
        console.log('Server response:', res.data);
        toast.success(res.data.msg);
        return true;
    } catch (err) {
        console.error('Error from server:', err.response.data);
        toast.error(err.response.data.msg);
        return false;
    }
};


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
                <div
                    style={{
                        position: 'absolute',
                        top: `${qrTextProps.qrTextPositionY}%`,
                        left: `${qrTextProps.qrTextPositionX}%`,
                        color: qrTextProps.qrTextColor,
                        fontSize: `${qrTextProps.qrTextSize}px`,
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
        </>
    );
};

export default QR;