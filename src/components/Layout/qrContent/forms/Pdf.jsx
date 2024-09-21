import React, { useEffect, useState } from 'react';
import pdf from '../../../../assets/imgs/QR-types/pdf.png'
import useQrState from '../../../../hooks/useQr';
import { useQr } from '../../../../context/QrContext';
import { useFormik } from 'formik';
import { useValidate } from '../../../../context/validateFormContext';
import * as Yup from 'yup'

export const PdfUploadComponent = () => {
  const { setQrData,qrProps } = useQr();

  const {validateFormPdf,setValidateFormPdf}=useValidate();

  // Formik hook con validación usando Yup
  const formik = useFormik({
    initialValues: {
      pdfFile: null, // Campo para el archivo PDF
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
    formik.setFieldValue('pdfFile', file); // Setea el archivo en Formik
    setQrData(file); // Actualiza el estado en tu contexto personalizado
  };

  useEffect(() => {
    validateFormFields();
  }, [formik.errors]);

  return (
    <div className="flex flex-col items-center justify-center">
      <form onSubmit={formik.handleSubmit} className="flex flex-col items-center">
        <div className="text-5xl text-gray-700">
          <img src={pdf} className='w-36' alt="PDF Icon" />
        </div>
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="hidden"
          id="pdf-upload"
          value={qrProps.data}
        />
        <label
          htmlFor="pdf-upload"
          className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none cursor-pointer"
        >
          UPLOAD PDF
        </label>
        {formik.errors.pdfFile ? (
          <div className="text-red-600 text-sm mt-2">{formik.errors.pdfFile}</div>
        ) : null}
      </form>
    </div>
  );
};

export const LinkInput = ({ onSubmit }) => {
  const { qrData, qrProps, setQrData } = useQr();
  const { validateFormWifi, setValidateFormWifi } = useValidate();

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

  useEffect(() => {
    validateFormFields();
  }, [formik.errors]);

  return (
    <div className="max-w-md mx-auto bg-gray-100 rounded-lg shadow-md">
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
  );
};
