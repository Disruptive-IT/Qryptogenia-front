import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { MdOutlineEdit, MdVisibility } from "react-icons/md";
import { Modal } from '@mui/material';
import axios from 'axios';

const QRCodeList = () => {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [viewItem, setViewItem] = useState(null);
  const [formValues, setFormValues] = useState({});
  const [selectedDiscounts, setSelectedDiscounts] = useState([]);
  const [discounts, setDiscounts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/memberships', {
          withCredentials: true,
        });
        setData(response.data.memberships);
        setDiscounts(response.data.discounts);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const openModal = (item) => {
    setEditItem(item);
    setFormValues(item);
    setSelectedDiscounts(item.discounts || []); // Inicializa con descuentos existentes
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditItem(null);
    setFormValues({});
    setSelectedDiscounts([]);
  };

  const openViewModal = (item) => {
    setViewItem(item);
    setViewModalOpen(true);
  };

  const closeViewModal = () => {
    setViewModalOpen(false);
    setViewItem(null);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormValues(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleDiscountChange = (event) => {
    const { options } = event.target;
    const selectedValues = Array.from(options).filter(option => option.selected).map(option => option.value);
    setSelectedDiscounts(selectedValues);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const id = editItem.id;
      const updatedData = {
        ...formValues,
        discounts: selectedDiscounts // Incluye los descuentos seleccionados
      };
      await axios.patch(`http://localhost:3000/api/admin/editmemberships/${id}`, updatedData, {
        withCredentials: true,
      });
      setData(data.map(d => d.id === editItem.id ? { ...d, ...updatedData } : d));
      closeModal();
    } catch (error) {
      console.error('Error al actualizar los datos:', error);
      Swal.fire({
        title: '¡Error!',
        text: 'No se pudo actualizar el ítem',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  const handleActionClick = (action, item) => {
    if (action === 'edit') {
      openModal(item);
    } else if (action === 'view') {
      openViewModal(item);
    }
  };

  const columns = [
    { header: 'Type Membership', accessor: 'type_membership' },
    { header: 'Price', accessor: 'price' },
    { header: 'Active QRs', accessor: 'active_qrs' },
    { header: 'Scan QRs', accessor: 'scan_qrs' },
    { header: 'Discount', accessor: 'discount',
      render: (item) => {
        if (!item.discounts || item.discounts.length === 0) {
          return 'No Discounts'; // Mensaje alternativo si no hay descuentos
        }
        const discountNames = item.discounts.map(discountId => {
          const discount = discounts.find(d => d.id === discountId);
          return discount ? ` ${discount.description}${'-'}${discount.discount}` : 'N/A'; // 'N/A' si no se encuentra el descuento
        });
        return discountNames.join(', '); // Une los nombres de los descuentos con coma
      }
    },
    {
      header: 'Premium Support',
      accessor: 'premium_support',
      render: (item) => (
        <button
          className={`p-2 rounded-full ${item.premium_support ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}
        >
          {item.premium_support ? <FaCheck /> : <FaTimes />}
        </button>
      )
    },
    {
      header: 'Unlimited Static',
      accessor: 'unlimited_static',
      render: (item) => (
        <button
          className={`p-2 rounded-full ${item.unlimited_static ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}
        >
          {item.unlimited_static ? <FaCheck /> : <FaTimes />}
        </button>
      )
    },
    {
      header: 'Actions',
      accessor: 'actions',
      render: (item) => (
        <div className="flex space-x-2">
          <MdOutlineEdit
            className="cursor-pointer text-xl text-yellow-500"
            onClick={() => handleActionClick('edit', item)}
          />
          <MdVisibility
            className="cursor-pointer text-xl"
            onClick={() => handleActionClick('view', item)}
          />
        </div>
      )
    }
    
  ];

  return (
    <div className="p-4">
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.header}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((item) => (
              <tr key={item.id}>
                {columns.map((column) => (
                  <td
                    key={column.accessor}
                    className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                  >
                    {column.render ? column.render(item) : item[column.accessor]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal de edición */}
      <Modal open={isModalOpen} onClose={closeModal} aria-labelledby="modal-title" aria-describedby="modal-description">
        <div className="modal-content p-6 bg-white rounded-lg shadow-lg mx-auto mt-10 max-w-lg">
          <h2 id="modal-title" className="text-2xl font-bold mb-4">Edit Item</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1" htmlFor="type_membership">Type Membership:</label>
              <input
                id="type_membership"
                type="text"
                name="type_membership"
                value={formValues.type_membership || ''}
                onChange={handleInputChange}
                className="p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1" htmlFor="discounts">Discounts:</label>
              <select
                id="discounts"
                name="discounts"
                value={selectedDiscounts}
                onChange={handleDiscountChange}
                className="p-2 border border-gray-300 rounded-md"
              >
                {discounts.map(discount => (
                  <option key={discount.id} value={discount.id}>
                    {discount.description}{'-'}{discount.discount}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1" htmlFor="price">Price:</label>
              <input
                id="price"
                type="number"
                step="0.01"
                name="price"
                value={formValues.price || ''}
                onChange={handleInputChange}
                className="p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1" htmlFor="active_qrs">Active QRs:</label>
              <input
                id="active_qrs"
                type="number"
                name="active_qrs"
                value={formValues.active_qrs || ''}
                onChange={handleInputChange}
                className="p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1" htmlFor="scan_qrs">Scan QRs:</label>
              <input
                id="scan_qrs"
                type="number"
                name="scan_qrs"
                value={formValues.scan_qrs || ''}
                onChange={handleInputChange}
                className="p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="flex justify-end mt-4">
              <button
                type="button"
                onClick={closeModal}
                className="px-4 py-2 mr-2 border border-gray-300 rounded-md bg-gray-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-gray-300 rounded-md bg-blue-500 text-white"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </Modal>

      {/* Modal de vista previa */}
      <Modal open={viewModalOpen} onClose={closeViewModal} aria-labelledby="view-modal-title" aria-describedby="view-modal-description">
        <div className="modal-content p-6 bg-white rounded-lg shadow-lg mx-auto mt-10 max-w-lg">
          <h2 id="view-modal-title" className="text-2xl font-bold mb-4">View Item</h2>
          {viewItem && (
            <div className="space-y-4">
              <div className="flex flex-col">
                <span className="text-sm font-medium">Type Membership:</span>
                <span>{viewItem.type_membership}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium">Price:</span>
                <span>{viewItem.price}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium">Active QRs:</span>
                <span>{viewItem.active_qrs}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium">Scan QRs:</span>
                <span>{viewItem.scan_qrs}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium">Discounts:</span>
                {viewItem.discounts && viewItem.discounts.length > 0 ? (
                  viewItem.discounts.map(discountId => {
                    const discount = discounts.find(d => d.id === discountId);
                    return discount ? <span key={discount.id}>{discount.discount}</span> : null;
                  })
                ) : (
                  <span>No Discounts</span>
                )}
              </div>
            </div>
          )}
          <div className="flex justify-end mt-4">
            <button
              type="button"
              onClick={closeViewModal}
              className="px-4 py-2 border border-gray-300 rounded-md bg-gray-200"
            >
              Close
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default QRCodeList;