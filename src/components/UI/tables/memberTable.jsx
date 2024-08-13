import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { MdOutlineEdit, MdVisibility } from "react-icons/md";
import { Modal } from '@mui/material';
import axios from 'axios';

const QRCodeList = () => {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false); // Nuevo estado para la vista previa
  const [editItem, setEditItem] = useState(null);
  const [viewItem, setViewItem] = useState(null); // Nuevo estado para los datos de la vista previa
  const [formValues, setFormValues] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/admin/memberships', {
          withCredentials: true,
        });
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const openModal = (item) => {
    setEditItem(item);
    setFormValues(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditItem(null);
    setFormValues({});
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

  const updatedData = {
    type_membership: formValues.type_membership,
    price: parseFloat(formValues.price),
    active_qrs: parseInt(formValues.active_qrs),
    scan_qrs: formValues.scan_qrs,
    premium_support: Boolean(formValues.premium_support),
    unlimited_static: Boolean(formValues.unlimited_static)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const id = editItem.id;
      await axios.patch(`http://localhost:3000/api/admin/editmemberships/${id}`, updatedData, {
        withCredentials: true,
      });
      setData(data.map(d => d.id === editItem.id ? { ...d, ...formValues } : d));
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
    { header: 'Discount', accessor: 'discount' },
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
              <label className="text-sm font-medium mb-1" htmlFor="price">Price:</label>
              <input
                id="price"
                type="text"
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
                type="text"
                name="scan_qrs"
                value={formValues.scan_qrs || ''}
                onChange={handleInputChange}
                className="p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium" htmlFor="premium_support">Premium Support:</label>
              <input
                id="premium_support"
                type="checkbox"
                name="premium_support"
                checked={formValues.premium_support || false}
                onChange={e => setFormValues(prev => ({ ...prev, premium_support: e.target.checked }))}
                className="h-4 w-4"
              />
            </div>
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium" htmlFor="unlimited_static">Unlimited Static:</label>
              <input
                id="unlimited_static"
                type="checkbox"
                name="unlimited_static"
                checked={formValues.unlimited_static || false}
                onChange={e => setFormValues(prev => ({ ...prev, unlimited_static: e.target.checked }))}
                className="h-4 w-4"
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button type="button" onClick={closeModal} className="bg-gray-300 p-2 rounded-md">Cancel</button>
              <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">Save</button>
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
              <p><strong>Type Membership:</strong> {viewItem.type_membership}</p>
              <p><strong>Price:</strong> {viewItem.price}</p>
              <p><strong>Active QRs:</strong> {viewItem.active_qrs}</p>
              <p><strong>Scan QRs:</strong> {viewItem.scan_qrs}</p>
              <p><strong>Discount:</strong> {viewItem.discount}</p>
              <p><strong>Premium Support:</strong> {viewItem.premium_support ? 'Yes' : 'No'}</p>
              <p><strong>Unlimited Static:</strong> {viewItem.unlimited_static ? 'Yes' : 'No'}</p>
            </div>
          )}
          <div className="flex justify-end space-x-4 mt-4">
            <button type="button" onClick={closeViewModal} className="bg-gray-300 p-2 rounded-md">Close</button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default QRCodeList;