import React, { useState, useEffect } from 'react';
import axios from 'axios';
import QRTable from './QRTable';
import DetailModal from './modaldetail';
import StoreModal from './StoreModal';
import './app.css';
import { FaDownload } from 'react-icons/fa';
import { MdOutlineEdit, MdVisibility } from "react-icons/md";
import Swal from 'sweetalert2';
import { saveAs } from 'file-saver';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import { useAuth } from '../../../hooks/useAuth';

const formatDate = (isoDate) => {
  const date = new Date(isoDate);
  return date.toLocaleDateString('es-US');
};

const App = () => {
  const [qrCodes, setQRCodes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const [selectedQRCode, setSelectedQRCode] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [storeData, setStoreData] = useState(null);
  const [codeType, setCodeType] = useState(null);
  const { getStoreData } = useAuth();
  const navigate = useNavigate(); // Usa useNavigate

  useEffect(() => {
    const fetchQRCodes = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/qr/getqrs`, {
          withCredentials: true,
        });

        const formattedData = response.data.map(qr => ({
          ...qr,
          createdAt: formatDate(qr.createdAt),
        }));

        setQRCodes(formattedData);
      } catch (error) {
        console.error('Error fetching QR codes:', error);
        setError('Error fetching QR codes');
      }
    };

    fetchQRCodes();
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // Reiniciar la página actual a 1 en una nueva búsqueda
  };

  const handleStateClick = async (item) => {
    const newState = !item.state;
    const confirmationText = newState
      ? 'Are you sure you want to activate this QR code?'
      : 'Are you sure you want to deactivate this QR code?';

    Swal.fire({
      title: 'Confirmation',
      text: confirmationText,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      scrollbarPadding: true
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.patch(`http://localhost:3000/api/qr/patchqrs/${item.id}`, {
            state: newState
          }, {
            withCredentials: true,
          });

          console.log('API response:', response.data);
          setQRCodes(qrCodes.map(qr => qr.id === item.id ? { ...qr, state: newState } : qr));
        } catch (error) {
          console.error('Error updating QR code state:', error);
          Swal.fire('Error', 'Failed to update QR code state', 'error');
        }
      }
    });
  };

  const handleImageClick = (imageBase64) => {
    setSelectedImage(`data:image/png;base64,${imageBase64}`);
  };

  /*
   * @UpdatedBy : Nicolas Barrios,   @date 2024-07-25 08:44:23
   * @description : se agrego el nombre del qr a los props para que se descargue el QR con ese nombre
   */

  const handleDownloadClick = (imageBase64,name) => {
    Swal.fire({
      title: 'Select Download Format and Size',
      html: `
        <div style="margin-bottom: 10px;">
      <label for="format-select" style="display: inline-block; width: 100px;">Format:</label>
      <select id="format-select" class="swal2-select" style="width: 200px;">
        <option value="png">PNG</option>
        <option value="jpeg">JPG</option>
        <option value="svg">SVG</option>
      </select>
    </div>
    <div>
      <label for="size-select" style="display: inline-block; width: 100px;">Size:</label>
      <select id="size-select" class="swal2-select" style="width: 200px;">
        <option value="250">250x250</option>
        <option value="500">500x500</option>
        <option value="1000">1000x1000</option>
      </select>
    </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'Download',
      customClass: {
        cancelButton: 'swal2-red-button',
        confirmButton: 'swal2-blue-button'
      },
      preConfirm: () => {
        const format = document.getElementById('format-select').value;
        const size = document.getElementById('size-select').value;
        return { format, size };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const { format, size } = result.value;
        if (format === 'svg') {
          // Obtener el SVG en formato texto
          const svgCode = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">
            <image xlink:href="data:image/png;base64,${imageBase64}" x="0" y="0" width="${size}" height="${size}"/>
          </svg>`;

          // Función para escapar caracteres HTML
          const escapeHtml = (unsafe) => {
            return unsafe
              .replace(/&/g, "&amp;")
              .replace(/</g, "&lt;")
              .replace(/>/g, "&gt;")
              .replace(/"/g, "&quot;")
              .replace(/'/g, "&#039;");
          }

          // Función para copiar el texto al portapapeles
          const copyToClipboard = (text) => {
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
          }

          // Mostrar el SVG en la modal utilizando SweetAlert2 con scroll y botón de copiar
          Swal.fire({
            title: 'SVG Preview',
            html: `
              <pre class="max-h-80 overflow-auto p-4 bg-gray-100 text-xs whitespace-pre-wrap">
                <code>${escapeHtml(svgCode)}</code>
              </pre>
              <button id="copy-svg" class="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
                Copy SVG
              </button>
            `,
            showCancelButton: true,
            showConfirmButton: false,
            cancelButtonText: 'Close',
            allowOutsideClick: false,
            customClass: {
              cancelButton: 'swal2-red-button',
              confirmButton: 'swal2-blue-button'
            },
            didRender: () => {
              const copyButton = Swal.getHtmlContainer().querySelector('#copy-svg');
              copyButton.addEventListener('click', () => {
                copyToClipboard(svgCode);
                Swal.fire({
                  icon: 'success',
                  title: 'Copied!',
                  text: 'SVG code has been copied to clipboard',
                  timer: 1500,
                  showConfirmButton: false
                });
              });
            }
          });
        } else {
          // Descargar como PNG o JPG
          const canvas = document.createElement('canvas');
          canvas.width = size;
          canvas.height = size;
          const ctx = canvas.getContext('2d');
          const img = new Image();
          img.src = `data:image/${format};base64,${imageBase64}`;
          img.onload = () => {
            ctx.drawImage(img, 0, 0, size, size);
            canvas.toBlob((blob) => {
              saveAs(blob, `${name}QR.${format}`);
            }, `image/${format}`);
          };
        }
      }
    });
  };

  const handleOpenModal = async (id, codeType) => {
    const result = await getStoreData(id);
    if (result.success) {
      setStoreData(result.data);
      console.log(result.data);
      setModalOpen(true);
      setCodeType(codeType)
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setStoreData(null);
  };

  const handleDetailModalClose = () => {
    setIsDetailModalOpen(false);
    setSelectedQRCode(null);
  };

  const handleDetailModalOpen = (item) => {
    setSelectedQRCode(item);
    setIsDetailModalOpen(true);
  };



  const filteredQRCodes = qrCodes.filter(code =>
    code.name_qr.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (code.qrType && code.qrType.type.toLowerCase().includes(searchQuery.toLowerCase())) ||
    code.state.toString().toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredQRCodes.length / 7);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleActionClick = (action, item) => {
    if (action === 'view') {
      handleDetailModalOpen(item);
    } else if (action === 'edit') {
      navigate(`/edit/${item.qrType ? item.qrType.type : 'N/A'}/${item.id}`);
    }
    console.log(`Action: ${action} on item:`, item);
  };


  const columns = [
    {
      header: 'Preview', accessor: 'preview', render: (item) => (
        <img
          src={`data:image/png;base64,${item.qr_image_base64}`}
          alt="QR Code Preview"
          className="w-16 h-16 object-contain cursor-pointer"
          onClick={() => handleActionClick('view', item)}
        />
      )
    },
    { header: 'QR Code Name', accessor: 'name_qr' },
    {
      header: 'QR Code Type',
      accessor: 'qrType.id',
      render: (item) => item.qrType ? item.qrType.type : 'N/A'
    },
    {
      header: 'Status', accessor: 'state', render: (item) => (
        <span
          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${item.state ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'} w-20 text-center justify-center items-center`}
          onClick={() => handleStateClick(item)}
          style={{ cursor: 'pointer' }}
        >
          {item.state ? 'Active' : 'Inactive'}
        </span>
      )
    },
    { header: 'Date', accessor: 'createdAt' },
    {
      header: 'Actions',
      accessor: 'actions',
      render: (item) => (
        <div className="flex space-x-2">
          <FaDownload
            className="cursor-pointer text-xl text-blue-500"
            onClick={() => handleDownloadClick(item.qr_image_base64,item.name_qr)}
          />
          <MdOutlineEdit
            className="cursor-pointer text-xl text-yellow-500"
            onClick={() => handleActionClick('edit', item)}
          />
          {item.qrType && item.qrType.type !== 'website-url' && (
          <MdVisibility
            className="cursor-pointer text-xl"
            onClick={() => handleOpenModal(item.id, item.qrType ? item.qrType.type : 'N/A')}
          />
        )}
        </div>
      )
    }
  ];

  return (
    <div className="flex h-screen overflow-hidden">
  <div className="w-full sm:w-64 bg-gray-800 text-white flex flex-col p-6">
    <h2 className="text-xl font-semibold mb-6">QR codes</h2>
    <ul className="flex-grow">
      <li className="mb-4 cursor-pointer hover:text-teal-400">My QR Codes</li>
      <li className="mb-4 cursor-pointer hover:text-teal-400">Analytics</li>
      <li className="cursor-pointer hover:text-teal-400">Settings</li>
    </ul>
  </div>
  <div className="flex-grow p-6 bg-gray-100 overflow-auto">
    {error && <div className="mb-4 text-red-500">{error}</div>}
    <div className="mb-4">
      <input
        type="text"
        className="p-2 border border-gray-300 rounded w-full"
        placeholder="Search QR codes..."
        value={searchQuery}
        onChange={handleSearch}
      />
    </div>
    <QRTable
      data={filteredQRCodes}
      columns={columns}
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={handlePageChange}
    />
  </div>
  <StoreModal open={modalOpen} handleClose={handleCloseModal} storeData={storeData} codeType={codeType} />
  <DetailModal
    isOpen={isDetailModalOpen}
    data={selectedQRCode}
    onClose={handleDetailModalClose}
  />
</div>
  );
};

export default App;