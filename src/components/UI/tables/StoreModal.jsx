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
  className="fixed  inset-0 flex items-center justify-center z-40 bg-black bg-opacity-50 overflow-auto"
  onClick={handleOutsideClick}
>
  <div 
    className="relative h-[94vh] bg-transparent max-w-[98vw] max-h-[100vh] min-w-[150px] min-h-[400px] rounded-lg flex flex-col items-center mx-3"
  >
    <button 
      onClick={handleClose} 
      className="absolute top-0 text-white  rounded-[10px] text-[20px] tracking-wider text- m-[-8%] hover:underline"
    >cerrar</button>
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