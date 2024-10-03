import React, { useEffect, useRef, useState } from 'react';
import QRCodeStyling from 'qr-code-styling';
import '../styles/qrCode.css';
import { useQr } from '../../../context/QrContext';
import axios from "../../../libs/axios";
import { toast } from 'sonner';
import Swal from 'sweetalert2';
import html2canvas from 'html2canvas';
import { useValidate } from '../../../context/validateFormContext';
/*
 * @UpdatedBy : Cristian Escobar,   @date 2024-09-03 15:05:11
 * @description : Se implemento la captura del qr con canvas y la transformacion a base64 para almacenarse en la base de datos.
 */
export const saveQrData = async (
    qrName, data, qrType, qrColor, qrBgColor, qrProps, qrImageInfo, qrTextProps, appFormValues, socialFormValues, musicFormValues, menuFormValues, qrBase64, currentContentType, location, qrId, uniqueKey
) => {
    

    const removeIconFromSelectOptions = (options) => {
        return options.map(option => {
            const { url, ...rest } = option; 
            return rest; 
        });
    };

    console.log(qrType);

    const qrData = {
        qr: {
            qrName: qrName || '',
            data: uniqueKey,
            qrType,
            qrColor,
            qrBgColor,
            url: data
        },
        qrPreview:currentContentType==='food-menu' ? {
            restaurantName:menuFormValues.restaurantName,
            restaurantLogo:menuFormValues.restaurantLogo,
            backgroundCard:menuFormValues.backgroundCard,
            colorMenu:menuFormValues.colorMenu,
            idFontPreview:menuFormValues.idFontPreview,
            idUserTemplate:menuFormValues.idUserTemplate,
            idImgTemplate:menuFormValues.idImgTemplate,
            category:menuFormValues.category
        } 
        : 
        {
            title: currentContentType === 'social-media' ? socialFormValues.title : currentContentType === 'music' ? musicFormValues.title : appFormValues.title,
            colorTitle: currentContentType === 'social-media' ? socialFormValues.colorTitle : currentContentType === 'music' ? musicFormValues.colorTitle : appFormValues.colorTitle,
            description: currentContentType === 'social-media' ? socialFormValues.description : currentContentType === 'music' ? musicFormValues.description : appFormValues.description,
            descriptionColor: currentContentType === 'social-media' ? socialFormValues.descriptionColor : currentContentType === 'music' ? musicFormValues.descriptionColor : appFormValues.descriptionColor,
            boxColor: currentContentType === 'social-media' ? socialFormValues.boxColor : currentContentType === 'music' ? musicFormValues.boxColor : appFormValues.boxColor,
            borderImg: currentContentType === 'social-media' ? socialFormValues.borderImg : currentContentType === 'music' ? musicFormValues.borderImg : appFormValues.borderImg,
            imgBoxBackgroud: currentContentType === 'social-media' ? socialFormValues.image : currentContentType === 'music' ? musicFormValues.image : appFormValues.image,
            backgroudColor: currentContentType === 'social-media' ? socialFormValues.backgroundColor : currentContentType === 'music' ? musicFormValues.backgroundColor : appFormValues.backgroundColor,
            SelectOptions: currentContentType === 'social-media' ? removeIconFromSelectOptions(socialFormValues.selectedOptions) : currentContentType === 'music' ? removeIconFromSelectOptions(musicFormValues.selectedOptions) : removeIconFromSelectOptions(appFormValues.selectedOptions),
        },
        qrText: {
            text: qrTextProps.qrText || '', 
            position: qrTextProps.qrTextPosition || {}, 
            colorText: qrTextProps.qrTextColor || '#000000'
        },
        qrTextFont: {
            fontFamily: qrTextProps.qrTextFontStyle || 'Arial, sans-serif'
        },
        qrTextBubble: {
            bubble: qrTextProps.qrTextChip || { 
                borderRadius: '5px',
                padding: '5px',
                backgroundColor: '#FFFFFF'
            },
            color: qrTextProps.qrTextChipColor || '#000000'
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
            logo:  qrImageInfo.includeImage ? qrImageInfo.qrImage : null || null,
        },
        qrBase64: qrBase64 || ''
    };

    const isEditRoute = location.pathname.startsWith('/edit')

    try {
        console.log(qrData);
        const res = await axios({
            method: isEditRoute ? 'patch' : 'post',
            url: isEditRoute ? `/qr/edit/${qrId}` : '/qr',
            data: isEditRoute ? { qrData } : qrData,
        });

        window.location.href = 'http://localhost:5173/user/qr';
        return false;

    } 
     catch (err) {
        const errorMessage = err.response && err.response.data && err.response.data.msg
            ? err.response.data.msg
            : 'An unknown error occurred';

        if (err.response && err.response.status === 401) {
            await Swal.fire({
                title: 'Authentication Required',
                text: 'You must be authenticated to create a QR code. Please log in to continue.',
                icon: 'info',
                showCancelButton: true,
                confirmButtonText: 'Go to login',
                cancelButtonText: 'Cancel',
                customClass: {
                    confirmButton: 'swal2-confirm',
                    cancelButton: 'swal2-cancel'
                  }
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


const QR = ({ uniqueKey }) => {
    const { qrData, qrBgColor, qrProps, qrImageInfo, qrTextProps, qrBase64, setQrBase64 } = useQr();
    const qrRef = useRef(null);
    const qrCode = useRef(null);
    const mario = useRef(null);

    useEffect(() => {
        console.log('Unique key updated:', uniqueKey);
    }, [uniqueKey]); // Este useEffect se ejecutará cada vez que uniqueKey cambie
    
    const generateBase64FromDiv = async () => {
        if (!mario.current) {
            console.log('mario.current is null');
            return;
        }

        try {
            const scaleFactor = 3;
            const rect = mario.current.getBoundingClientRect();

            const canvas = document.createElement('canvas');
            canvas.width = rect.width * scaleFactor;
            canvas.height = rect.height * scaleFactor;
            const ctx = canvas.getContext('2d');

            await html2canvas(mario.current, {
                canvas: canvas,
                scale: scaleFactor,
                useCORS: true,
                backgroundColor: null,
                logging: false,
                removeContainer: true,
            });

            const dataUrl = canvas.toDataURL('image/png', 1.0);
            const base64String = dataUrl.split(',')[1];
            setQrBase64(base64String);
        } catch (error) {
            console.error('Failed to convert div to base64', error);
        }
    };

    useEffect(() => {
        const createOrUpdateQRCode = () => {
            if (!qrCode.current) {
                qrCode.current = new QRCodeStyling({
                    width: 1000,
                    height: 1000,
                    data: `http://localhost:3000/qr/scan/${uniqueKey}`,
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
                    image: qrImageInfo.includeImage ? qrImageInfo.qrImage : null,
                    imageOptions: {
                        crossOrigin: "anonymous",
                        hideBackgroundDots: true,
                        margin: 2,
                        imageSize: '0.5'
                    },
                });
                qrCode.current.append(qrRef.current);
            } else {
                qrCode.current.update({
                    data: `http://localhost:3000/qr/scan/${uniqueKey}`,
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
                    image: qrImageInfo.includeImage ? qrImageInfo.qrImage : null,
                    imageOptions: {
                        crossOrigin: "anonymous",
                        hideBackgroundDots: true,
                        margin: 2,
                        imageSize: '0.5'
                    },
                });
            }
        };

        createOrUpdateQRCode();
        const timeoutId = setTimeout(() => {
            generateBase64FromDiv();
        }, 100);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [qrData, qrProps, qrImageInfo, qrTextProps.qrText, qrBgColor, qrTextProps.qrTextPosition, qrTextProps.qrTextColor, qrTextProps.qrTextSize, qrTextProps.qrTextChip, qrTextProps.qrTextChipColor, qrTextProps.qrTextFontStyle, uniqueKey]);

    return (
        <div className='m-auto'>
            <div ref={mario} style={{ position: "relative", width: '330px', height: '330px' }}>
                <div
                    className='m-auto'
                    style={{
                        ...qrProps.marcoType.style,
                        border: qrProps.marcoType.type && qrProps.marcoType.type !== 'default' ? '4px solid' : 'none',
                        backgroundColor: qrBgColor,
                        transition: 'all 0.5s ease',
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        boxSizing: 'border-box',
                        padding: '20px'
                    }}
                >
                    <div className="flex items-center justify-center w-full" ref={qrRef} style={{ width: '1000px', height: '1000px', transform: 'scale(0.25)' }}></div>
                </div>
                {qrTextProps.qrText && (
                    <div
                        style={{
                            color: qrTextProps.qrTextColor,
                            fontSize: "16px",
                            maxWidth: '200px',
                            ...(qrTextProps.qrTextChip ? { backgroundColor: qrTextProps.qrTextChipColor } : {}),
                            ...qrTextProps.qrTextChip,
                            ...qrTextProps.qrTextFontStyle,
                            ...qrTextProps.qrTextPosition.style
                        }}
                    >
                        <span className='text-center'>
                            {qrTextProps.qrText}
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default QR;
