import { useState } from 'react';
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

const options = [
    { name: 'Frame', component: Frame },
    { name: 'Design', component: Design },
    { name: 'Logo', component: Logo },
];

const CustomQr = ({location, qrId}) => {
    const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);
    const { qrType, qrData, qrColor, qrBgColor, qrProps, qrImageInfo, qrTextProps, appFormValues, socialFormValues, musicFormValues, qrBase64, currentContentType} = useQr();
    console.log(musicFormValues)
    const handleOptionSelect = (index) => {
        setSelectedOptionIndex(index);
    };

    const Dowload = async () => {
        const { value: qrName, isConfirmed } = await Swal.fire({
            title: 'Save QR Code',
            html: `
                <input 
            id="swal-input1" 
            class="swal2-input" 
            placeholder="Enter QR code name..."
            style="width: 60%; padding: 10px; border: 1px solid #ccc; border-radius: 6px; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);"
        >
        <div style="margin: 2em 0;">
            <p style="font-size: 1em; color: #888; margin-top: 10px;">Please enter a name for your QR code. If you do not set a name, the system will provide one for you.</p>
            <p style="font-size: 0.8em; margin: 10px 0 0 0;">Click "Save" to finalize the creation of your QR code.</p>
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
            confirmButtonColor:'#007bff',
            confirmButtonText: 'Save',
            cancelButtonColor:"#d33",
            cancelButtonText: 'Cancel',
            customClass: {
                actions: 'swal2-actions-no-margin'
            }
        });

        if (isConfirmed) {
            console.log("Data: ", qrData + " Type: ", qrType)
            if ((qrType === 'website-url' || qrType === 'pdf') && qrData === "") {
                await Swal.fire({
                    icon: 'error',
                    title: 'Incomplete QR Information',
                    text: 'Please provide the URL or corresponding information for the QR code.',
                    confirmButtonText: 'OK'
                });
            } else {
                console.log(musicFormValues)
                console.log(qrType)
                await saveQrData(qrName, qrData, qrType, qrColor, qrBgColor, qrProps, qrImageInfo, qrTextProps, appFormValues, socialFormValues, musicFormValues,  qrBase64, currentContentType, location, qrId);
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
                <QR />
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
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={Dowload}
                    >
                        Finish
                    </Button>
                </div>
                <div className='pt-5'>
                    <OptionComponent onTabSelect={handleOptionSelect} />
                </div>
            </div>
        </div>
    );
}

export default CustomQr;