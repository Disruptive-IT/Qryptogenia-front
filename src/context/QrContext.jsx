import { createContext, useContext, useState } from 'react';
import useQrState from '../hooks/useQr';

const QrContext = createContext();

export const QrProvider = ({ children }) => {
    const qrState = useQrState();
    const [appFormValues, setAppFormValues] = useState({});
    const [musicFormValues, setMusicFormValues] = useState({});
    const [socialFormValues, setSocialFormValues] = useState({});
    const [menuFormValues,setMenuFormValues]=useState({});
    const [currentContentType, setCurrentContentType] = useState({});
    const [pdfFormValues, setPdfFormValues] = useState({});
   // console.log(socialFormValues)



 const uploadPdfToCloudinary = async (file) => {
    const url = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME}/raw/upload`;
  
    const formData = new FormData();
    formData.append('file', file); // El archivo de pdf a subir
    formData.append('upload_preset', import.meta.env.VITE_UPLOAD_PRESET_PDF); // Upload preset
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      });
  
      const data = await response.json();
  
      if (response.ok) {
        return data.secure_url; // Retorna la URL de la imagen subida
      } else {
        console.error('Error al subir la imagen:', data.error.message);
      }
    } catch (error) {
      console.error('Error en la petición:', error);
    }
}

function addAttachmentParameter(url) {
    if (url.includes('?')) {
        return `${url}&attachment=true`;
    } else {
        return `${url}?attachment=true`;
    }
}



    return (
        <QrContext.Provider value={{ 
            ...qrState, 
            appFormValues, 
            setAppFormValues,
            musicFormValues, 
            setMusicFormValues,
            socialFormValues, 
            setSocialFormValues,
            menuFormValues,
            setMenuFormValues,
            currentContentType,
            setCurrentContentType,
            pdfFormValues,
            setPdfFormValues,
}}>
            {children}
        </QrContext.Provider>
    );
};

export const useQr = () => useContext(QrContext);