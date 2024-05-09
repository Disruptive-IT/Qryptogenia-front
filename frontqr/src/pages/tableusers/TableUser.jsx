import React, { useState, useEffect } from 'react';
import MUIDataTable from "mui-datatables";
import { useContext } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from "axios";
import { AuthContext } from '../../context/AuthContext';
import HeaderModule from './HeaderModule';
import IconButton from '@mui/material/IconButton';
import UserModal from './ModalUser';
import { ScanEye } from 'lucide-react';

const App2 = () => {
    const [users, setUsers] = useState([]);
    const { getUsersData } = useContext(AuthContext);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { success, data } = await getUsersData();
                if (success) {
                    setUsers(data);
                } else {
                    console.log('Error al cargar los datos');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
    
        fetchData();
    }, []);

    const handleViewDetails = (userId) => {
        const user = users.find(user => user.id === userId);
        setSelectedUser(user);
        setOpenDialog(true);
    };

    
    const columns = [
        
        {
            name: "id",
            label: "ID",
            options: {
                display: false,
            },
        },
        {
            name: "username",
            label: "USERNAME",
            options: {
                customBodyRender: (value) => <div className="pl-10">{value}</div>,
            },
        },
        {
            name: "email",
            label: "E-MAIL",
            options: {
            },
        },
        {
            name: "state",
            label: "STATUS",
            options: {
                customBodyRender: (value) => (
                    <div>
                        <p className={`capitalize px-3 py-1 inline-block rounded-full ${value === true ? 'bg-green-500' : 'bg-red-500'}`}>
                            {value ? 'Activo' : 'Inactivo'}
                        </p>
                    </div>
                ),
            },
        },
        {
            name: "id",
            label: "ACTIONS",
            options: {
                customBodyRender: (value, tableMeta) => {
                    const userId = tableMeta.rowData[0];
                    return (
                        <div className="pl-10">
                            <IconButton onClick={() => handleViewDetails(userId)} >
                                <ScanEye style={{ color: '#602eb8' }} />
                            </IconButton>
                        </div>
                    );
                },
                width: 100,
            },
        },
    ];

    const options = {
        responsive: 'standard',
        selectableRows: 'none',
        elevation: 0,
        rowsPerPage: 5,
        rowsPerPageOptions: [5, 10, 20, 30],
        tableBodyMaxHeight: '400px',
        setColumnWidth: 'auto',
    };

    return (
        <div className="py-15 min-h-screen grid place-items-center">
            <div className="w-11/12 max-w-4x2 relative">
                <div className='mb-1 dark:text-white'>
                    <HeaderModule />
                </div>
                

                
                <ThemeProvider  theme={createTheme({
                    components: {
                        MuiTableCell: {
                            styleOverrides: {
                                head: {
                                    padding: "11px 11px",
                                    textAlign: 'center',
                                    
                                },
                                body: {
                                    padding: "9px 5px",
                                    className:"dark:text-white"
                                }
                            }
                        },
                        
                        MuiTableHead: {
                            styleOverrides: {
                                root: {
                                    '& th:nth-of-type(1)': {
                                        paddingLeft: '25px',
                                    },
                                },
                            },
                        },
                    },
                })}>
                    <MUIDataTable className="dark:bg-slate-900"
                        data={users}
                        columns={columns}
                        options={options}
                    />
                </ThemeProvider>
            </div>
                
    
            <UserModal
                openDialog={openDialog}
                setOpenDialog={setOpenDialog}
                selectedUser={selectedUser}
            />
        </div>
    );
};

export default App2;