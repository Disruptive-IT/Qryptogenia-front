import React from 'react';
import { StoreLayout } from '../../Layout/qrContent/LayoutsQr/stylePhoneStoreLayout';
import CellBox from '../../Layout/qrContent/cellBox'; // Ajusta la ruta según corresponda
import { MdClose } from 'react-icons/md';
import './scroll.css'
import { PhoneContentSwitch } from '../../Layout/qrContent';

const StoreModal = ({ open, handleClose, storeData, codeType}) => {
  if (!open) return null;

  const handleOutsideClick = (e) => {
    if (e.target.id === 'modal-container') {
      handleClose();
    }
  };
  console.log(storeData)
  const contentName = codeType.replace(/-/g, ' ');
  return (
    <div 
      id="modal-container" 
      className="fixed inset-0 flex items-center justify-center z-40 bg-black bg-opacity-50"  
      onClick={handleOutsideClick}
    >
      <div className="relative bg-transparent  rounded-[10px] p-6  max-h-[80%] mt-[5%]  scroll-mt-[50%] custom-scrollbar transform -translate-y-20">
        <CellBox>
          <button 
            onClick={handleClose} 
            style={{ position: 'absolute', top: '0px', right: '0px' }} 
            className=" bg-red-600 text-white mb-[1%] rounded-[20px] "
          >
            <MdClose size={30} />
          </button>
          {storeData ? (
            <PhoneContentSwitch 
            contentName={contentName}
            appFormValues={storeData}
            musicFormValues={storeData}
            socialFormValues={storeData}/>
          ) : (
            <div>Loading...</div>
          )}
        </CellBox>
      </div>
    </div>
  );
};

export default StoreModal;