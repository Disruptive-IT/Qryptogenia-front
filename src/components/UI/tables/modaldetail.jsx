import React from 'react';
import { useTranslation } from 'react-i18next';

/**
 * @Author : Cristian Escobar 
 * @date : 2024-09-04
 * @description : El componente `DetailModal` muestra un modal que presenta detalles de un código QR. Incluye una vista previa de la imagen del QR, el nombre del QR, el tipo de QR, el estado (activo/inactivo) y la fecha de creación. Utiliza `react-i18next` para la traducción de textos. El modal se cierra al hacer clic fuera del área del modal o al hacer clic en el botón de cerrar.
 * @Props : 
 *   - `isOpen` (boolean): Indica si el modal está abierto o cerrado.
 *   - `data` (object): Contiene la información del código QR a mostrar, incluyendo `qr_image_base64`, `name_qr`, `qrType`, `state`, y `createdAt`.
 *   - `onClose` (function): Función para cerrar el modal.
 * @return : Renderiza un modal con una vista previa del código QR, nombre, tipo, estado y fecha de creación. El modal se cierra al hacer clic fuera del área del modal o al presionar el botón de cerrar.
 */

const DetailModal = ({ isOpen, data, onClose }) => {
  if (!isOpen || !data) return null;

  const handleClickOutside = (event) => {
    if (event.target.id === 'modal-overlay') {
      onClose();
    }
  };
  const { t } = useTranslation();

  return (
    <div id="modal-overlay" onClick={handleClickOutside}  className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50
    ">
        
      <div className="bg-white p-4 rounded shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-center">{t('QR Code Details')}</h2>
        <div className="mb-2 text-center">
          <strong>Preview:</strong>
          <img
            src={`data:image/png;base64,${data.qr_image_base64}`}
            alt="QR Code Preview"
            className="w-45 h-44 object-contain mx-auto"
          />
        </div>
        <div className="mb-2 text-center">
          <strong>{t('QR Code Name')}:</strong> {data.name_qr}
        </div>
        <div className="mb-2 text-center">
          <strong>{t('QR Code Type')}:</strong> {data.qrType ? data.qrType.type : 'N/A'}
        </div>
        <div className="mb-2 text-center">
          <strong>{t('Status')}:</strong> {data.state ? 'Active' : 'Inactive'}
        </div>
        <div className="mb-2 text-center">
          <strong>{t('Date')}:</strong> {data.createdAt}
        </div>
        <div className="mt-4 flex justify-end">
          <button onClick={onClose} className="p-2 bg-red-500 text-white rounded">{t('Close')}</button>
        </div>
      </div>
    </div>
  );
};

export default DetailModal;