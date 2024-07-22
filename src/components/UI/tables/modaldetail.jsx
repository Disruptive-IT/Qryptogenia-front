import React from 'react';

const DetailModal = ({ isOpen, data, onClose }) => {
  if (!isOpen || !data) return null;

  const handleClickOutside = (event) => {
    if (event.target.id === 'modal-overlay') {
      onClose();
    }
  };

  return (
    <div id="modal-overlay" onClick={handleClickOutside}  className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50
    ">
        
      <div className="bg-white p-4 rounded shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-center">QR Code Details</h2>
        <div className="mb-2 text-center">
          <strong>Preview:</strong>
          <img
            src={`data:image/png;base64,${data.qr_image_base64}`}
            alt="QR Code Preview"
            className="w-45 h-44 object-contain mx-auto"
          />
        </div>
        <div className="mb-2 text-center">
          <strong>QR Code Name:</strong> {data.name_qr}
        </div>
        <div className="mb-2 text-center">
          <strong>QR Code Type:</strong> {data.qrType ? data.qrType.type : 'N/A'}
        </div>
        <div className="mb-2 text-center">
          <strong>Status:</strong> {data.state ? 'Active' : 'Inactive'}
        </div>
        <div className="mb-2 text-center">
          <strong>Date:</strong> {data.createdAt}
        </div>
        <div className="mt-4 flex justify-end">
          <button onClick={onClose} className="p-2 bg-red-500 text-white rounded">Close</button>
        </div>
      </div>
    </div>
  );
};

export default DetailModal;