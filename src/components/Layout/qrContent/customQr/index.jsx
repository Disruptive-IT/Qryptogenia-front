import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Frame from './frame';
import Logo from './logo';
import Design from './design';
import QR, { saveQrData } from '../qrCode';
import '../../../../../src/assets/style/index.css'
import '../../styles/qrCode.css'
import { useQr } from '../../../../context/QrContext';
import Swal from 'sweetalert2';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import axios from '../../../../libs/axios';

/*
 * @UpdatedBy : Cristian Escobar,   @date 2024-09-03 15:05:11
 * @description : Se implemento una funcion para generar una llave unica y pasarla como prop a los componente saveQrData y QR
 */

const generateUniqueKey = async () => {
    let uniquekey = uuidv4();
    let isUnique = false;

    while (!isUnique) {
        try {
            const response = await axios.get(`/qr/check-key/${uniquekey}`);
            console.log(uniquekey);
            if (!response.data.exists) {
                isUnique = true;
            } else {
                uniquekey = uuidv4();  // Generar un nuevo uniquekey si ya existe
            }
        } catch (error) {
            console.error('Error checking unique key:', error);
            throw new Error('Failed to verify the unique key.');
        }
    }
    return uniquekey;
};

const CustomQr = ({ location, qrId }) => {
    const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);
    const [uniqueKey, setUniqueKey] = useState('');
    const { qrType, qrData, qrColor, qrBgColor, qrProps, qrImageInfo, qrTextProps, appFormValues, socialFormValues, musicFormValues, qrBase64, currentContentType } = useQr();

    useEffect(() => {
        const fetchUniqueKey = async () => {
            try {
                const key = await generateUniqueKey();
                setUniqueKey(key);
            } catch (error) {
                console.error('Error generating unique key:', error);
            }
        };

        fetchUniqueKey();
    }, [qrData, appFormValues, socialFormValues, musicFormValues]);

    useEffect(() => {
        console.log('Unique key updated:', uniqueKey);
    }, [uniqueKey]); // Este useEffect se ejecutará cada vez que uniqueKey cambie


    const handleOptionSelect = (index) => {
        setSelectedOptionIndex(index);
    };
    const { t } = useTranslation();
    const options = [
        { name: t("FRAME"), component: Frame },
        { name: t("DESIGN"), component: Design },
        { name: t("LOGO"), component: Logo },
    ];

    const Dowload = async () => {
        const { value: qrName, isConfirmed } = await Swal.fire({
            title: t("Save QR Code"),
            html: `
                <input 
            id="swal-input1" 
            class="swal2-input" 
            placeholder="${t("Enter QR code name")}"
            style="width: 60%; padding: 10px; border: 1px solid #ccc; border-radius: 6px; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);"
        >
        <div style="margin: 2em 0;">
            <p style="font-size: 1em; color: #888; margin-top: 10px;">${t("Please enter a name for your QR code. If you do not set a name, the system will provide one for you.")}</p>
            <p style="font-size: 0.8em; margin: 10px 0 0 0;">${t("Click Save to finalize the creation of your QR code.")}</p>
        </div>
            `,
            focusConfirm: false,
            preConfirm: () => {
                const input = document.getElementById('swal-input1').value;
                if (input.length > 30) {
                    Swal.showValidationMessage('The QR code name must be less than 30 characters');
                    return false;
                }
                return input;
            },
            showCancelButton: true,
            confirmButtonColor: '#007bff',
            confirmButtonText: t('Save'),
            cancelButtonColor: "#d33",
            cancelButtonText: t('Cancel'),
            customClass: {
                actions: 'swal2-actions-no-margin'
            }
        });

        if (isConfirmed) {
            console.log("Data: ", qrData + " Type: ", qrType)
            if ((qrType === 'website-url' || qrType === 'pdf' || qrType==="wifi") && qrData === "") {
                await Swal.fire({
                    icon: 'error',
                    title: 'Incomplete QR Information',
                    text: 'Please provide the URL or corresponding information for the QR code.',
                    confirmButtonText: 'OK'
                });
            } else {
                console.log(musicFormValues)
                console.log(uniqueKey)
                await saveQrData(qrName, qrData, qrType, qrColor, qrBgColor, qrProps, qrImageInfo, qrTextProps, appFormValues, socialFormValues, musicFormValues, qrBase64, currentContentType, location, qrId, uniqueKey);
            }
        } else {
            toast.info('QR code saving was cancelled.');
        }
    }

    const style = document.createElement('style');
    style.innerHTML = `
        .swal2-actions-no-margin {
            margin-top: 0 !important;
        }
    `;
    document.head.appendChild(style);


    const OptionComponent = options[selectedOptionIndex].component;

    return (
        <div className='w-full rounded-md flex flex-col justify-between pb-4 font-sans'>
            <div className={`flex relative mb-4 py-8 max-h-[400px] ${qrTextProps.qrText ? 'min-h-[380px]' : ''}`}>
                <QR uniqueKey={uniqueKey}/>
            </div>
            <div className='flex flex-col h-[400px] w-full px-8'>
                <div className='space-x-3 mx-auto flex flex-row items-center overflow-x-auto'>
                    {options.map((option, index) => (
                        <Button
                            variant="outlined"

                            onClick={() => handleOptionSelect(index)}
                            key={index}
                            sx={{
                                fontFamily: 'Arial',
                                fontSize: '14px',
                                fontWeight: selectedOptionIndex === index ? 'bold' : 'bold',
                                color: selectedOptionIndex === index ? '#ffffff' : 'primary',
                                backgroundColor: selectedOptionIndex === index ? '#007bff' : 'transparent',
                                '&:hover': {
                                    backgroundColor: selectedOptionIndex === index ? '#007bff' : '#f0f0f0',
                                },
                            }}
                        >
                            {option.name}
                        </Button>
                    ))}
                </div>
                <div className='pt-5'>
                    <OptionComponent onTabSelect={handleOptionSelect} />
                </div>
            </div>
            <Button
                variant="contained"
                color="primary"
                onClick={Dowload}
                className='absolute bottom-0 left-8 w-4/5 md:left-0 md:w-full'
            >
                {t("CREATE MY QR")}
            </Button>
        </div>
    );
}

export default CustomQr;