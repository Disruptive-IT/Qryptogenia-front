import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { MdOutlineEdit, MdVisibility } from "react-icons/md";
import { Modal } from '@mui/material';

const QRCodeList = () => {
  const [data, setData] = useState([
    { id: 1, type_membership: 'Free', price: 'Free', active_qrs: 2, scan_qrs: 100, premium_support: false, unlimited_static: false, state: true },
    { id: 2, type_membership: 'Basic', price: '$9.99', active_qrs: 5, scan_qrs: 10000, premium_support: false, unlimited_static: false, state: true },
    { id: 3, type_membership: 'Advanced', price: '$20.99', active_qrs: 50, scan_qrs: 'unlimited', premium_support: false, unlimited_static: true, state: true },
    { id: 4, type_membership: 'Professional', price: '$45.99', active_qrs: 250, scan_qrs: 'unlimited', premium_support: true, unlimited_static: true, state: true }
    // Agrega más objetos según sea necesario
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [formValues, setFormValues] = useState({});

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

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormValues(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setData(data.map(d => d.id === editItem.id ? { ...d, ...formValues } : d));
    closeModal();
  };

  const handleActionClick = (action, item) => {
    if (action === 'edit') {
      openModal(item);
    }
    // Implementar otras acciones si es necesario
  };


  const toggleFeature = async (item, feature) => {
    const newStatus = !item[feature];
    const result = await Swal.fire({
      title: `Are you sure you want to ${newStatus ? 'enable' : 'disable'} ${feature.replace('_', ' ')}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    });

    if (result.isConfirmed) {
      setData(data.map(d => d.id === item.id ? { ...d, [feature]: newStatus } : d));
    }
  };

  const columns = [
    { header: 'Type Membership', accessor: 'type_membership' },
    { header: 'Price', accessor: 'price' },
    { header: 'Active QRs', accessor: 'active_qrs' },
    { header: 'Scan QRs', accessor: 'scan_qrs' },
    {
      header: 'Premium Support',
      accessor: 'premium_support',
      render: (item) => (
        <button
          onClick={() => toggleFeature(item, 'premium_support')}
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
          onClick={() => toggleFeature(item, 'unlimited_static')}
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
            onClick={() => handleOpenModal(item.id, item.qrType ? item.qrType.type : 'N/A')}
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
            <div className="flex justify-end space-x-2 mt-4">
              <button
                type="submit"
                className="px-4 py-2 bg-light-blue text-white rounded-md hover:bg-dark-blue"
              >
                Save
              </button>
              <button
                type="button"
                onClick={closeModal}
                className="px-4 py-2 bg-my-red text-white rounded-md hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default QRCodeList;
