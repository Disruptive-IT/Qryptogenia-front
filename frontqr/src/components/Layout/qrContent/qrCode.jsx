import React, { useEffect, useRef } from 'react';
import QRCodeStyling from 'qr-code-styling';
import '../styles/qrCode.css';
import { useQr } from '../../../context/QrContext';
import axios from "../../../libs/axios";
import { toast } from 'sonner';

export const saveQrData = async (qrType, qrColor, qrBgColor, qrProps, qrImageInfo, qrTextProps, appFormValues) => {
    const qrData = {
        qr: {
            data: qrProps.link || 'default qr data',
            qrType,
            qrColor,
            qrBgColor,
        },
        qrPreview: {
            title: appFormValues.title || '',
            colorTitle: appFormValues.titleColor || '',
            description: appFormValues.description || '',
            descriptionColor: appFormValues.descriptionColor || '',
            boxColor: appFormValues.boxColor || '',
            borderImg: appFormValues.borderColor || '',
            imgBoxBackgroud: appFormValues.image || '',
            backgroudColor: appFormValues.backgroundColor || '',
            SelectOptions: appFormValues.selectedOptions || '[]',
        },
        qrText: {
            text: qrTextProps.qrText,
            positionX: qrTextProps.qrTextPositionX,
            positionY: qrTextProps.qrTextPositionY,
            colorText: qrTextProps.qrTextColor,
            fontSize: qrTextProps.qrTextSize
        },
        qrTextFont: {
            fontFamily: qrTextProps.qrTextFontStyle || 'Arial, sans-serif'
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
            size: qrImageInfo.qrImageSize.toString()
        }
    };

    console.log('Sending qrData to server:', qrData);

    try {
        const res = await axios.post('/qr/save', { qrData });
        console.log('Server response:', res.data);
        toast.success(res.data.msg);
        return true;
    } catch (err) {
        const errorMessage = err.response && err.response.data && err.response.data.msg 
            ? err.response.data.msg 
            : 'An unknown error occurred';

        console.error('Error from server:', errorMessage);
        toast.error(errorMessage);
        return false;
    }
};

const QR = () => {
    const { qrType, qrBgColor, qrProps, qrImageInfo, qrTextProps, appFormValues } = useQr();

    const qrRef = useRef(null);
    const qrCode = useRef(null);

    useEffect(() => {
        if (!qrCode.current) {
            qrCode.current = new QRCodeStyling({
                width: 250,
                height: 250,
                data: 'www.qryptogenia.com',
                dotsOptions: {
                    color: qrProps.dotsColor,
                    type: qrProps.dotsType || 'rounded'
                },
                cornersSquareOptions: {
                    color: qrProps.cornersSquareColor,
                    type: qrProps.cornersSquareType || 'extra-rounded'
                },
                cornersDotOptions: {
                    color: qrProps.cornersDotColor,
                    type: qrProps.cornersDotType || 'dot'
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
    }, [qrProps, qrImageInfo]);

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
                color: qrProps.dotsColor,
                type: qrProps.dotsType || 'rounded'
            },
            cornersSquareOptions: {
                color: qrProps.cornersSquareColor,
                type: qrProps.cornersSquareType || 'extra-rounded'
            },
            cornersDotOptions: {
                color: qrProps.cornersDotColor,
                type: qrProps.cornersDotType || 'dot'
            },
            image: qrImageInfo.qrImage,
            imageOptions: {
                crossOrigin: "anonymous",
                hideBackgroundDots: true,
                margin: 2,
                imageSize: qrImageInfo.qrImageSize
            },
        });
    }, [qrType, qrProps, qrImageInfo]);

    return (
        <>
            <div className='m-auto border-4' style={{ ...qrProps.marcoType.style, backgroundColor: qrProps.marcoType.type === 'default' ? 'transparent' : qrBgColor, transition: 'all 0.5s ease', }}>
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