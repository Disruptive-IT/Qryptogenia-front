import React from 'react';
import { StoreLayout } from '../../Layout/qrContent/LayoutsQr/stylePhoneStoreLayout';
import CellBox from '../../Layout/qrContent/cellBox'; // Ajusta la ruta según corresponda
import { MdClose } from 'react-icons/md';
import './scroll.css'
import Modal from 'react-modal';
import { PhoneContentSwitch } from '../../Layout/qrContent';
import { animate, motion } from 'framer-motion';

const StoreModal = ({ open, handleClose, storeData, codeType }) => {
  if (!open) return null;

  const handleOutsideClick = (e) => {
    if (e.target.id === 'modal-container') {
      handleClose();
    }
  };
  console.log(storeData)
  const contentName = codeType.replace(/-/g, ' ');
  return (
    <>
      <Modal
        isOpen={open}
        onRequestClose={handleClose}
        contentLabel="Vista Previa del Móvil"
        className="fixed inset-0 flex items-center justify-center p-4 bg-transparent"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 overflow-auto"
      >
        <div onClick={handleClose} className="bg-transparent p-0 rounded-lg border-none shadow-none flex justify-center items-center w-full h-full">
        <div className="relative flex justify-center items-start" style={{ maxHeight: 'calc(100vh - 40px)', maxWidth: 'calc(100vw - 40px)' }}>
          <motion.button whileTap={{scale:0}} onClick={handleClose} className="absolute bg-white p-1 tracking-wider rounded-[10px] hover:bg-red-600 hover:text-white top-0 left-50 text-red-500">Cerrar</motion.button>
            <div className="relative scale-wrapper" style={{ marginTop: '40px' }}>
              <CellBox>
                <PhoneContentSwitch
                  contentName={contentName}
                  appFormValues={storeData}
                  socialFormValues={storeData}
                  musicFormValues={storeData}
                />
              </CellBox>
            </div>
          </div>
        </div>
      </Modal>

      <style jsx>{`
        .scale-wrapper {
          transform: scale(0.9);
          transform-origin: top center;
        }

        @media (max-width: 1200px) {
          .scale-wrapper {
            transform: scale(0.9);
          }
        }

        @media (max-width: 992px) {
          .scale-wrapper {
            transform: scale(0.9);
          }
        }

        @media (max-width: 768px) {
          .scale-wrapper {
            transform: scale(0.8);
          }
        }

        @media (max-width: 576px) {
          .scale-wrapper {
            transform: scale(0.7);
          }
        }

        @media (max-width: 360px) {
          .scale-wrapper {
            transform: scale(0.6);
          }
        }
      `}</style>
    </>

  );


};

export default StoreModal;