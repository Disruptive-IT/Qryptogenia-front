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
import { useTranslation } from 'react-i18next';
import { createTheme, ThemeProvider } from '@mui/material';
import { useValidate } from '../../../../context/validateFormContext';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';
import { UseMenu } from '../forms/menu/menuContext';
import { useLocation } from 'react-router-dom';
import instance from '../../../../libs/axios';
import axios from '../../../../libs/axios';

/*
 * @UpdatedBy : Cristian Escobar,   @date 2024-09-03 15:05:11
 * @description : Se implemento una funcion para generar una llave unica y pasarla como prop a los componente saveQrData y QR
 */

/**
 @UpdatedBy : Cristian Rueda,   @date 2024-09-17 14:11:06
 * @description : Se modifica el color de los botones, bordes y su respectivo hover
 */

 /**
  @UpdatedBy : Cristian Rueda,   @date 2024-11-04 20:00:00
  * @description :Se implementó una lógica para mantener el nombre del QR al editarlo. Si se está editando un QR, 
  se recupera su nombre original desde la API y se permite modificarlo antes de guardarlo nuevamente en la base de datos.
 */

const generateUniqueKey = async () => {
    let uniquekey = uuidv4();
    let isUnique = false;

    while (!isUnique) {
        try {
            const response = await instance.get(`/qr/check-key/${uniquekey}`);
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

const CustomQr = ({ qrId }) => {
    const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);
    const [uniqueKey, setUniqueKey] = useState('');
    const { qrType, qrData, qrColor, qrBgColor, qrProps, qrImageInfo, qrTextProps, appFormValues, socialFormValues, musicFormValues, qrBase64, currentContentType, setQrData, pdfFormValues } = useQr();
    const { formData, handleFileUpload, editFormData, editUploadFiles } = UseMenu();
    const location = useLocation();
    const { pathname } = location; // Accede a pathname directamente
    const isEditRoute = pathname.startsWith("/edit");
    const [qrName, setQrName] = useState(''); // Estado para el nombre del QR

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
    }, [qrData, appFormValues, socialFormValues, musicFormValues,formData]);

    useEffect(() => {
        console.log('Unique key updated:', uniqueKey);
    }, [uniqueKey]); // Este useEffect se ejecutará cada vez que uniqueKey cambie


    useEffect(() => {
        // Si estás en modo edición, obtén el nombre del QR existente
        if (isEditRoute && qrId) {
            const fetchQrData = async () => {
                try {
                    const response = await axios.get(`http://localhost:3000/api/qr/getPreviewUpdate/${qrId}`);
                    setQrName(response.data.qrName); // Suponiendo que la respuesta tiene un campo qrName
                } catch (error) {
                    console.error('Error fetching QR data:', error);
                }
            };
            fetchQrData();
        }
    }, [isEditRoute, qrId]);

    const handleOptionSelect = (index) => {
        setSelectedOptionIndex(index);
    };

    const uploadPdfToCloudinary = async (file) => {
        const url = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME}/raw/upload`;
    
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', import.meta.env.VITE_UPLOAD_PRESET_PDF);
    
        try {
            const response = await fetch(url, {
                method: 'POST',
                body: formData,
            });
    
            const data = await response.json();
            console.log('Response from Cloudinary:', data); // Añade esta línea
    
            if (response.ok) {
                return data.secure_url;
            } else {
                console.error('Error al subir la imagen:', data);
            }
        } catch (error) {
            console.error('Error en la petición:', error);
        }
    };
    
    
    function addAttachmentParameter (url) {
        // Agrega el parámetro `fl_attachment` para forzar la descarga desde Cloudinary
        if (url.includes('upload/')) {
            // Inserta `fl_attachment` antes del nombre del archivo en la URL
            return url.replace('/upload/', '/upload/fl_attachment/');
        }
        return url;
    }

    const PdfUpdateQrData = async (data) => {
        const { pdfFile, loadType } = pdfFormValues;
      
          try {
            const pdfUrl = await uploadPdfToCloudinary(pdfFile);
            if (loadType === 'view') {
                return pdfUrl; 
            }
            else if (loadType === 'download') {
                const qrCodeUrl = addAttachmentParameter(pdfUrl);
                return qrCodeUrl;
            }
            else {
            console.log('No se puede subir el archivo:'); }
            return pdfUrl;
          } catch (error) {
            console.error('Error updating QR data:', error);
          }
        
      
        }

    const { t } = useTranslation();
    const options = [
        { name: t("FRAME"), component: Frame },
        { name: t("DESIGN"), component: Design },
        { name: t("LOGO"), component: Logo },
    ];

    const themee = createTheme({
        palette:{
          primary:{
            main:'#3C6E71'
          },
          secondary:{
            main:'#284B63'
          }
        }
      });

    const CreateQr = async () => {
        const { value: inputQrName, isConfirmed } = await Swal.fire({
            title: t("Save QR Code"),
            html: `
                <input 
                    id="swal-input1" 
                    class="swal2-input" 
                    placeholder="${t("Enter QR code name")}"
                    value="${qrName}" // Establece el valor inicial del input
                    style="width: 60%; padding: 10px; border: 1px solid #ccc; border-radius: 6px; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);background-color: #fff; color: #000"
                >
                <div style="margin: 2em 0;">
                    <p style="font-size: 1em; color: #888; margin-top: 10px;">${t("Please enter a name for your QR code. If you do not set a name, the system will provide one for you.")}</p>
                    <p style="font-size: 0.8em; margin: 10px 0 0 0;">${t("Click Save to finalize the creation of your QR code.")}</p>
                </div>
            `,
            focusConfirm: false,
            preConfirm: () => {
                const input = document.getElementById('swal-input1').value;
                if (input.length > 20) {
                    Swal.showValidationMessage(t('The QR code name must be less than 20 characters'));
                    return false;
                }
                return input;
            },
            showCancelButton: true,
            confirmButtonColor: '#3C6E71',
            confirmButtonText: t('Save'),
            cancelButtonColor: "#CC2905",
            cancelButtonText: t('Cancel'),
            customClass: {
                actions: 'swal2-actions-no-margin'
            }
        });
        if (isConfirmed) {
            setQrName(inputQrName); // Actualiza el estado con el nombre ingresado

            // Validación de información requerida para ciertos tipos de QR
            if ((qrType === 'website-url' || qrType === 'pdf' || qrType === "wifi") && qrData === "") {
                await Swal.fire({
                    icon: 'error',
                    title: t('Incomplete QR Information'),
                    text: t('Please provide the URL or corresponding information for the QR code.'),
                    confirmButtonText: 'OK'
                });
                return; // Detener el flujo si falta la información requerida
            }
        
            console.log(musicFormValues);
            console.log(uniqueKey);
        
            let menuFormValues;
            let urlpdf;
        
            // Lógica para `food-menu`
            if (currentContentType === "food-menu") {
                if (isEditRoute) {
                    menuFormValues = await editUploadFiles();
                    if (!menuFormValues) {
                        console.error("Error: menuFormValues es undefined o null en editUploadFiles.");
                        return;
                    }
                } else {
                    menuFormValues = await handleFileUpload();
                    if (!menuFormValues) {
                        console.error("Error: menuFormValues es undefined o null en handleFileUpload.");
                        return;
                    }
                }
            } 
            
            // Lógica para `pdf`
            if (currentContentType === 'pdf') {
                try {
                    urlpdf = await PdfUpdateQrData(qrData); // Asegúrate de que qrData sea un File
                    setQrData(urlpdf);
                } catch (error) {
                    console.error('Error al subir el PDF:', error);
                    await Swal.fire({
                        icon: 'error',
                        title: t('Upload Failed'),
                        text: t('There was an error uploading the PDF. Please try again.'),
                        confirmButtonText: 'OK'
                    });
                    return; // Detener el flujo si hay un error al subir el PDF
                }
            }
        
            // Guardado final de datos de QR
            try {
                await saveQrData(
                    inputQrName, // Usa el nombre ingresado
                    currentContentType === 'pdf' ? urlpdf : qrData, // Usar urlPdf solo para PDFs
                    qrType, 
                    qrColor, 
                    qrBgColor, 
                    qrProps, 
                    qrImageInfo, 
                    qrTextProps,
                    appFormValues, 
                    socialFormValues, 
                    musicFormValues, 
                    menuFormValues, 
                    qrBase64,
                    currentContentType, 
                    qrId, 
                    uniqueKey,
                    location.pathname
                );
                console.log("Datos del QR guardados exitosamente.");
            } catch (error) {
                console.error('Error al guardar los datos del QR:', error);
                await Swal.fire({
                    icon: 'error',
                    title: t('Save Failed'),
                    text: t('There was an error saving the QR data. Please try again.'),
                    confirmButtonText: 'OK'
                });
            }
        } else {
            toast.info (t('QR code saving was cancelled.'));
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
                <div className='space-x-3 mx-auto flex flex-row items-center overflow-x-auto z-0'>
                    {options.map((option, index) => (
                        <Button
                            variant="outlined"

                            onClick={() => handleOptionSelect(index)}
                            key={index}
                            sx={{
                                fontFamily: 'Arial',
                                fontSize: '14px',
                                zIndex:'10',
                                fontWeight: selectedOptionIndex === index ? 'bold' : 'bold',
                                color: selectedOptionIndex === index ? '#ffffff' : '#284B63', // Color del texto
                                backgroundColor: selectedOptionIndex === index ? '#284B63' : '', // Color del fondo
                                borderColor : selectedOptionIndex === index ? '#284B63' : '#284B63', // Color del borde del boton
                                
                                '&:hover': {
                                    backgroundColor: selectedOptionIndex === index ? '#3C6E71' : '#3C6E71', //Color del boton al hacer hover
                                    borderColor : '#3C6E71', // Color del borde al hacer hover
                                    color : '#ffffff', // Color letra al hacer hover 
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
            <button
    onClick={CreateQr}
    className="bottom-0 left-0 w-full p-3 mt-4 rounded-md text-white font-semibold bg-light-blue hover:bg-dark-blue transition duration-300 ease-in-out shadow-lg flex items-center justify-center">
    <span>{!isEditRoute ? t("CREATE MY QR") : "SAVE CHANGES"}</span>
</button>

           
        </div>
    );
}

export default CustomQr;