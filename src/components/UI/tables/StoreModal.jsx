import React from 'react';
import { StoreLayout } from '../../Layout/qrContent/LayoutsQr/stylePhoneStoreLayout';
import CellBox from '../../Layout/qrContent/cellBox'; // Ajusta la ruta según corresponda
import { MdClose } from 'react-icons/md';
import './scroll.css'

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
  className="fixed inset-0 flex items-center justify-center z-40 bg-black bg-opacity-50 overflow-auto"
  onClick={handleOutsideClick}
>
  <div 
    className="relative bg-transparent m-4 max-w-[100%] max-h-[90%] min-w-[200px] min-h-[400px] rounded-lg overflow-hiiden flex flex-col items-center"
  >
    <button 
      onClick={handleClose} 
      className="absolute top-0 right-0 bg-white text-red-600 rounded-full p-2 m-[-6%] hover:bg-red-600 hover:text-white"
    >
      <MdClose size={20} />
    </button>
    <CellBox className="w-full h-full overflow-auto">
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