import React, { useState } from 'react';
import pdf from '../../../../assets/imgs/QR-types/pdf.png'
import useQrState from '../../../../hooks/useQr';
import { useQr } from '../../../../context/QrContext';
import axios from '../../../../libs/axios';

export const PdfUploadComponent = () => {
  const { qrType, qrProps, setQrData } = useQr();

  const handleFileChange = async (event) => {
    console.log(event.target.files[0]);
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-5xl text-gray-700">
        <img src={pdf} className='w-36' />
      </div>
      <input
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
        className="hidden"
        id="pdf-upload"
      />
      <label
        htmlFor="pdf-upload"
        className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none cursor-pointer"
      >
        UPLOAD PDF
      </label>
    </div>
  );
};

export const LinkInput = ({ onSubmit }) => {
  const { qrType, qrProps, setQrData } = useQr();

  const handleInputChange = (event) => {
    setQrData("website url", { ...qrProps, link: event.target.value });
  };

  return (
    <div className="max-w-md mx-auto bg-gray-100 rounded-lg shadow-md">
      <form className="flex flex-col items-center">
        <label className="mb-4 text-lg font-semibold">Write the URL:</label>
        <input
          type="text"
          value={qrProps.link || ''}
          onChange={handleInputChange}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          placeholder="Ejemplo: https://www.ejemplo.com"
        />
      </form>
    </div>
  );
};
