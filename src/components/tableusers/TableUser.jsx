/*
 * @Author : Jaider cuartas,   @date 2024-07-15 20:13:14
 * @description : Componente que muestra una tabla de usuarios con funcionalidades de búsqueda y acciones como ver, editar, eliminar y descargar. 
 *                También permite paginación y apertura de un modal para ver detalles del usuario.
 * @Props : null
 * @return : Retorna un componente que renderiza una tabla de usuarios y un modal para ver los detalles del usuario.
 */

import React, { useState, useEffect, useContext } from "react";
import QRTable from '../UI/tables/QRTable';
import { AuthContext } from "../../context/AuthContext";
import SearchBar from '../searchbar/searchbar';
import UserModal from './ModalUser'
import { FaDownload } from 'react-icons/fa';
import { MdOutlineEdit, MdDelete, MdVisibility } from "react-icons/md";

const DownloadAction = ({ item }) => (
    <FaDownload className="text-gray-500 hover:text-gray-700 cursor-pointer mr-3" />
);

const EditAction = ({ item }) => (
    <MdOutlineEdit className="text-gray-500 hover:text-gray-700 cursor-pointer mr-3" />
);

const DeleteAction = ({ item }) => (
    <MdDelete className="text-gray-500 hover:text-gray-700 cursor-pointer mr-3" />
);

const ViewAction = ({ item, onViewUser }) => (
  <MdVisibility 
    className="text-gray-500 hover:text-gray-700 cursor-pointer mr-3 text-xl" 
    onClick={() => onViewUser(item)}
  />
);

const UserTable = () => {
  const { getUsersData } = useContext(AuthContext);
  const [userData, setUserData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getUsersData();
      if (result.success) {
        setUserData(result.data);
      } else {
        setError(result.error);
      }
      setLoading(false);
    };

    fetchData();
  }, [getUsersData]);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleViewUserModal = (user) => {
    setSelectedUser(user);
    setOpenDialog(true);
  };

  const filteredUserData = userData.filter(user =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.rol.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (user.state ? 'active' : 'inactive').includes(searchQuery.toLowerCase())
  );

  const userColumns = [
    { header: 'Username', accessor: 'username' },
    { header: 'Email', accessor: 'email' },
    { header: 'Rol', accessor: 'rol' },
    { header: 'Status', accessor: 'state', render: (item) => (
      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${item.state ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
        {item.state ? 'Active' : 'Inactive'}
      </span>
    )},
    { header: 'Actions', accessor: 'actions' },
    
  ];

  const userActions = [ViewAction];
  const adminActions = [EditAction, DeleteAction];
  const anotherModuleActions = [DownloadAction, EditAction];

  const totalPages = Math.ceil(filteredUserData.length / 7);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data: {error.message}</p>;

  return (
    <div className="flex-grow p-12 bg-gray-100 overflow-auto">
      <div className="mb-4">
        <SearchBar 
          searchQuery={searchQuery} 
          handleSearch={handleSearch} 
          placeholder="Search users..." 
        />
      </div>
      <QRTable 
        data={filteredUserData} 
        columns={userColumns} 
        actions={userActions}
        onViewUser={handleViewUserModal}
        currentPage={currentPage} 
        totalPages={totalPages} 
        onPageChange={handlePageChange} 
      />
      {openDialog && selectedUser && (
        <UserModal 
        selectedUser={selectedUser} 
        openDialog={openDialog}
        setOpenDialog={() => setOpenDialog(false)} 
        />
      )}
    </div>
  );
};

export default UserTable;