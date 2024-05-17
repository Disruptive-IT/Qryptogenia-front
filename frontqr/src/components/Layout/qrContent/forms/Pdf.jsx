import React, {useState} from 'react';
import pdf from '../../../../assets/imgs/QR-types/pdf.png'

export const PdfUploadComponent = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-5xl text-gray-700">
        <img src={pdf} className='w-36'/>
      </div>
      <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none">
        UPLOAD PDF
      </button>
    </div>
  );
};

export const LinkInput = ({ onSubmit }) => {
    const [link, setLink] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(link);
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
            <form onSubmit={handleSubmit} className="flex flex-col items-center">
                <label className="mb-4 text-lg font-semibold">Write the URL:</label>
                <input
                    type="text"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    placeholder="Ejemplo: https://www.ejemplo.com"
                />
                <button
                    type="submit"
                    className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};
