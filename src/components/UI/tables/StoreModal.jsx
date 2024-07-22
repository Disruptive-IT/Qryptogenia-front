import React from 'react';
import { StoreLayout } from '../../Layout/qrContent/LayoutsQr/stylePhoneStoreLayout';
import CellBox from '../../Layout/qrContent/cellBox'; // Ajusta la ruta según corresponda
import { MdClose } from 'react-icons/md';

const StoreModal = ({ open, handleClose, storeData }) => {
  if (!open) return null;

  const handleOutsideClick = (e) => {
    if (e.target.id === 'modal-container') {
      handleClose();
    }
  };

  return (
    <div 
      id="modal-container" 
      className="fixed inset-0 flex items-center justify-center z-40 bg-black bg-opacity-50" 
      onClick={handleOutsideClick}
    >
      <div className="relative bg-white rounded-lg p-8 shadow-lg max-w-[440px] max-h-[720px]">
        <CellBox>
          <button 
            onClick={handleClose} 
            style={{ position: 'absolute', top: '8px', right: '4px' }} 
            className="text-red-600 hover:text-red-800"
          >
            <MdClose size={30} />
          </button>
          {storeData ? (
            <StoreLayout appFormValues={storeData} />
          ) : (
            <div>Loading...</div>
          )}
        </CellBox>
      </div>
    </div>
  );
};

export default StoreModal;