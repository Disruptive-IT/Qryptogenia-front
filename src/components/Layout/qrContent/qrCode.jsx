import React, { useEffect, useRef, useState } from 'react';
import QRCodeStyling from 'qr-code-styling';
import '../styles/qrCode.css';
import { useQr } from '../../../context/QrContext';
import axios from "../../../libs/axios";
import { toast } from 'sonner';
import Swal from 'sweetalert2';

export const saveQrData = async (qrName, data, qrType, qrColor, qrBgColor, qrProps, qrImageInfo, qrTextProps, appFormValues, socialFormValues, musicFormValues, qrBase64, currentContentType) => {
    console.log(musicFormValues)
    const qrData = {
        qr: {
            qrName: qrName || '',
            data,
            qrType,
            qrColor,
            qrBgColor,
        },
        qrPreview: {
            title: currentContentType === 'social-media' ? socialFormValues.title : currentContentType === 'music' ? musicFormValues.title : appFormValues.title,
            colorTitle: currentContentType === 'social-media' ? socialFormValues.titleColor : currentContentType === 'music' ? musicFormValues.titleColor : appFormValues.titleColor,
            description: currentContentType === 'social-media' ? socialFormValues.description : currentContentType === 'music' ? musicFormValues.description : appFormValues.description,
            descriptionColor: currentContentType === 'social-media' ? socialFormValues.descriptionColor : currentContentType === 'music' ? musicFormValues.descriptionColor : appFormValues.descriptionColor,
            boxColor: currentContentType === 'social-media' ? socialFormValues.boxColor : currentContentType === 'music' ? musicFormValues.boxColor : appFormValues.boxColor,
            borderImg: currentContentType === 'social-media' ? socialFormValues.borderColor : currentContentType === 'music' ? musicFormValues.borderColor : appFormValues.borderColor,
            imgBoxBackgroud: currentContentType === 'social-media' ? socialFormValues.image : currentContentType === 'music' ? musicFormValues.image : appFormValues.image,
            backgroudColor: currentContentType === 'social-media' ? socialFormValues.backgroundColor : currentContentType === 'music' ? musicFormValues.backgroundColor : appFormValues.backgroundColor,
            SelectOptions: currentContentType === 'social-media' ? socialFormValues.selectedOptions : currentContentType === 'music' ? musicFormValues.selectedOptions : appFormValues.selectedOptions,
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
            burbble: qrTextProps.qrTextChip || {},
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
        },
        qrBase64: qrBase64 // Asegúrate de que qrBase64 esté pasando correctamente
    };

    try {
        const res = await axios.post('/qr', { qrData });
        console.log('Server response:', res.data);
            window.location.href = 'http://localhost:5173/user/qr';
        return true;
    } catch (err) {
        const errorMessage = err.response && err.response.data && err.response.data.msg 
            ? err.response.data.msg 
            : 'An unknown error occurred';
    
        console.error('Error from server:', errorMessage);
    
        if (err.response && err.response.status === 401) {
            await Swal.fire({
                title: 'Authentication Required',
                text: 'You must be authenticated to create a QR code. Please log in to continue.',
                icon: 'info',
                showCancelButton: true,
                confirmButtonText: 'Go to login',
                cancelButtonText: 'Cancel'
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = 'http://localhost:5173/login';
                }
            });
        } else {
            toast.error(errorMessage);
        }
        return false;
    }
};

const QR = () => {
    const { qrType, qrData, qrBgColor, qrProps, qrImageInfo, qrTextProps, appFormValues, musicFormValues, socialFormValues, qrBase64, setQrBase64 } = useQr();
    const qrRef = useRef(null);
    const qrCode = useRef(null);

    const generateQrBase64 = async () => {
        try {
            if (!qrCode.current) {
                throw new Error('QR code instance is not initialized');
            }
    
            const qrCanvasBlob = await qrCode.current.getRawData('canvas');
    
            if (!(qrCanvasBlob instanceof Blob)) {
                throw new Error('Invalid canvas data returned');
            }
    
            const reader = new FileReader();
            reader.readAsDataURL(qrCanvasBlob);
    
            reader.onloadend = () => {
                const qrDataUrl = reader.result;
                if (typeof qrDataUrl === 'string') {
                    setQrBase64(qrDataUrl.split(',')[1]); // Obtener la parte base64
                } else {
                    throw new Error('Failed to convert Blob to base64');
                }
            };
        } catch (error) {
            console.error('Error generating QR base64:', error);
            // Manejar el error de manera adecuada, por ejemplo, mostrar un mensaje al usuario o registrar el error
        }
    };

    useEffect(() => {
        const createOrUpdateQRCode = () => {
            if (!qrCode.current) {
                qrCode.current = new QRCodeStyling({
                    width: 250,
                    height: 250,
                    data: qrData || 'www.qryptogenia.com',
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
            } else {
                qrCode.current.update({
                    data: qrData || 'www.qryptogenia.com',
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
            }
        };

        createOrUpdateQRCode();
        generateQrBase64();

    }, [qrData, qrProps, qrImageInfo]);

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
