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
      className="fixed inset-0 flex items-center justify-center z-40 bg-black bg-opacity-50"  
      onClick={handleOutsideClick}
    >
      <div className="relative bg-transparent  rounded-[10px] p-5  max-h-[80%] mt-[5%] overflow-auto scroll-mt-[50%] custom-scrollbar">
        <CellBox>
          <button 
            onClick={handleClose} 
            style={{ position: 'absolute', top: '0px', right: '0px' }} 
            className=" bg-red-600 text-white mb-[2%] rounded-[20px] "
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