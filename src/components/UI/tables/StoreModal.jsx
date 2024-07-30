import React from 'react';
import { StoreLayout } from '../../Layout/qrContent/LayoutsQr/stylePhoneStoreLayout';
import CellBox from '../../Layout/qrContent/cellBox'; // Ajusta la ruta según corresponda
import { MdClose } from 'react-icons/md';
import './scroll.css'
import Modal from 'react-modal';
import { PhoneContentSwitch } from '../../Layout/qrContent';

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
        <div className="bg-transparent p-0 rounded-lg border-none shadow-none flex justify-center items-center w-full h-full">
        <div className="relative flex justify-center items-start" style={{ maxHeight: 'calc(100vh - 40px)', maxWidth: 'calc(100vw - 40px)' }}>
          <button onClick={handleClose} className="absolute top-4 right-4 text-red-500 z-10">Cerrar</button>
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