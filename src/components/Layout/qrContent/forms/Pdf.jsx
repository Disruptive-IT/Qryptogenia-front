import React, { useEffect, useState } from 'react';
import pdf from '../../../../assets/imgs/QR-types/pdf.png'
import useQrState from '../../../../hooks/useQr';
import { useQr } from '../../../../context/QrContext';
import { useFormik } from 'formik';
import { useValidate } from '../../../../context/validateFormContext';
import * as Yup from 'yup'
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import SkeletonPdf from './Skeleton/SkeletonPdf';
import SkeletonWeb from './Skeleton/SkeletonWeb';

export const PdfUploadComponent = () => {
  const { setQrData,qrProps } = useQr();
  const { validateFormPdf, setValidateFormPdf } = useValidate();
  const { pdfFormValues, setPdfFormValues } = useQr();

  // Estado para manejar la URL del archivo PDF y su nombre
  const [pdfUrl, setPdfUrl] = useState('');
  const [pdfName, setPdfName] = useState('');  // Para guardar el nombre del archivo
  const [qrCodeUrl, setQrCodeUrl] = useState(''); // Estado para la URL del QR
  const [loading, setLoading] = useState(true); // Por defecto está cargando


const handleLoadType = (event) => {
  const loadType = event.target.value;
  setPdfFormValues((prevValues)=>({...prevValues, loadType }));
};

const handlePdfFile = (event) => {
  const pdfFile = event.target.files[0];
  setQrData(pdfFile);
};  
  // Formik hook con validación usando Yup
  const formik = useFormik({
    initialValues: {
      pdfFile: null, // Campo para el archivo PDF
      loadType:null,
    },
    validationSchema: Yup.object({
      pdfFile: Yup.mixed()
        .required('A PDF file is required')
        .test(
          'fileFormat',
          'Only PDF files are allowed',
          (value) => value && value.type === 'application/pdf'
        ),
    }),
    onSubmit: (values) => {
      console.log("Archivo PDF enviado:", values.pdfFile);
    },
    validateOnChange:true,
    validateOnBlur:true
  });

  const validateFormFields = () => {
    if (Object.keys(formik.errors).length > 0) {
      setValidateFormPdf(false);
      return false;
    } else {
      setValidateFormPdf(true);
      return true;
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
        // Verificar que sea un archivo PDF
        if (file.type === 'application/pdf') {
            // Setea el archivo en Formik
            formik.setFieldValue('pdfFile', file);
            
            // Guardar el archivo en el estado
            setPdfFormValues((prevValues) => ({
                ...prevValues,
                pdfFile: file, // Almacenar el objeto File en lugar de la URL
            }));
            
            // Crear una URL temporal para la vista previa
            const url = URL.createObjectURL(file);
            setPdfUrl(url); // Guardar la URL para la vista previa
            setPdfName(file.name); 
            
            // Si necesitas generar la URL para el QR, usa el archivo directamente
            // setQrCodeUrl(url); // Esto es solo para la vista previa, no para la carga
        } else {
            console.error('Por favor, selecciona un archivo PDF válido.');
        }
    }
};


  const loadPdfOptions = {
    download: 'download',
    view: 'view'
  }

 console.log('Valores pdf', pdfFormValues);

  useEffect(() => {
    validateFormFields();
  }, [formik.errors]);

      // Skeleton Loader
      useEffect(() => {
        setTimeout(() => {
          setLoading(false); // Cambia a false una vez que los datos hayan cargado
        }, 300); // Tiempo simulado de carga
      }, []); 
      return (
        <>
          {/* Mostrar el Skeleton mientras loading sea verdadero */}
          {loading ? (
            <SkeletonPdf />
          ) : (
            <div>
              <div className="flex flex-col items-center justify-center">
                <form onSubmit={formik.handleSubmit} className="flex flex-col items-center">
                  <div className="text-5xl text-gray-700">
                    <img src={pdf} className='w-36' alt="PDF Icon" />
                  </div>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => {handleFileChange(e); handlePdfFile(e)}}
                    className="hidden"
                    id="pdf-upload"
                    value={qrProps.data}
                  />
                  <label
                    htmlFor="pdf-upload"
                    className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none cursor-pointer"
                    style={{ backgroundColor: '#284B63', color: '' }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#3C6E71'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = '#284B63'}
                  >
                    UPLOAD PDF
                  </label>
                  <div className="flex flex-col space-y-4">
                    <label className="text-lg font-semibold" htmlFor="loadType">LOAD TYPE</label>
      
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="loadType"
                        id="download-buttom"
                        value={loadPdfOptions.download}
                        onChange={handleLoadType}
                        className="hidden peer"
                      />
                      <span className="w-5 h-5 mr-2 rounded-full border-2 border-gray-500 flex items-center justify-center peer-checked:bg-gray-700 peer-checked:border-transparent">
                        <span className="w-2 h-2 rounded-full bg-white hidden peer-checked:block"></span>
                      </span>
                      Download
                    </label>
      
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="loadType"
                        id="view-buttom"
                        value={loadPdfOptions.view}
                        onChange={handleLoadType}
                        className="hidden peer"
                      />
                      <span className="w-5 h-5 mr-2 rounded-full border-2 border-gray-500 flex items-center justify-center peer-checked:bg-gray-700 peer-checked:border-transparent">
                        <span className="w-2 h-2 rounded-full bg-white hidden peer-checked:block"></span>
                      </span>
                      View
                    </label>
                  </div>
      
                  {formik.errors.pdfFile && (
                    <div className="text-red-600 text-sm mt-2">{formik.errors.pdfFile}</div>
                  )}
                </form>
      
                {/* Mostrar el nombre del archivo PDF seleccionado */}
                {pdfName && (
                  <div className="mt-2 text-gray-600">
                    <strong>Archivo seleccionado:</strong> {pdfName}
                  </div>
                )}
      
                {/* Vista previa del PDF */}
                {pdfUrl && (
                  <div className="mt-4">
                    <h4 className="text-lg font-semibold">Vista previa:</h4>
                    <iframe
                      src={`${pdfUrl}#toolbar=0`} // Agrega #toolbar=0 al final de la URL para ocultar la barra de herramientas
                      width="850"
                      height="600"
                      title="Vista previa del PDF"
                      style={{ border: '10px solid #353535' }} // COLOR Y BORDE
                    />
                  </div>
                )}
              </div>  
            </div>
          )}
        </>
      );  
};    

export const LinkInput = ({ onSubmit }) => {
  const { qrData, qrProps, setQrData } = useQr();
  const { validateFormWifi, setValidateFormWifi } = useValidate();
  const [loading, setLoading] = useState(true);  // Estado de carga para LinkInput

  const formik = useFormik({
    initialValues: { url: '' },
    validate: (values) => {
      const errors = {};
      if (!values.url) {
        errors.url = 'Required';
      } else if (!/^https?:\/\/.+/i.test(values.url)) {
        errors.url = 'Invalid URL format';
      }
      return errors;
    },
    validateOnChange: true,
    validateOnBlur: true,
  });

  const handleInputChange = (e) => {
    setQrData(e.target.value); // Actualiza el valor en tu contexto personalizado
    formik.handleChange(e); // Llama también al handleChange de Formik
  };

  const validateFormFields = () => {
    if (Object.keys(formik.errors).length > 0) {
      setValidateFormWifi(false);
      return false;
    } else {
      setValidateFormWifi(true);
      return true;
    }
  };

  console.log(formik.values);

  useEffect(() => {
    validateFormFields();
  }, [formik.errors]);
  
      // Skeleton Loader
      useEffect(() => {
        setTimeout(() => {
          setLoading(false); // Cambia a false una vez que los datos hayan cargado
        }, 300); // Tiempo simulado de carga
      }, []); 
  return (

  <div>
          
{/* Mostrar el Skeleton mientras loading sea verdadero */}
  {loading ? (

<SkeletonWeb />

) : (
    <div className="max-w-md bg-gray-100 rounded-lg shadow-md p-4 mx-auto w-90">
      <form className="flex flex-col items-center">
        <label className="mb-4 text-lg font-semibold">Write the URL:</label>
        <input
          type="text"
          name="url"
          value={formik.values.url}
          onChange={handleInputChange}
          onBlur={formik.handleBlur}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          placeholder="Ejemplo: https://www.ejemplo.com"
        />
      </form>
      {formik.touched.url && formik.errors.url && (
        <div className='text-red-600 text-[15px]'>{formik.errors.url}</div>
      )}
    </div>
  )}
  {!formik.values.url=='' && (
    <div className='text-center my-5 p-3 text-2xl font-bold text-dark-blue hover:underline'>
      <a href={formik.values.url} target='_blank'>check web site from the url</a>
    </div>
  )}
</div>
  );
};
