import React, { useState, useEffect } from 'react';
import MUIDataTable from "mui-datatables";
import { useContext } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from "axios";
import { AuthContext } from '../../context/AuthContext';
import IconButton from '@mui/material/IconButton';
import UserModal from './ModalUser';
import { ScanEye } from 'lucide-react';

const App2 = () => {
    const [users, setUsers] = useState([]);
    const [theme, setTheme] = useState('dark');
    const { getUsersData } = useContext(AuthContext);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        applyRowStyles(newTheme);
    };

    const applyRowStyles = (theme) => {
        const table = document.querySelector('.MuiTable-root');
        if (table) {
            const rows = table.querySelectorAll('.MuiTableRow-root');
            rows.forEach((row, index) => {
                if (theme === 'dark') {
                    row.style.backgroundColor = index % 2 === 0 ? '#141516  ' : '#040505   ';
                    row.style.color = 'white';
                } else {
                    row.style.backgroundColor = index % 2 === 0 ? '#FDFEFE ' : '#F7F9F9   ';
                    row.style.color = 'black';
                }
            });
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const { success, data } = await getUsersData();
            if (success) {
                setUsers(data);
                applyRowStyles(theme);
            } else {
                console.log('error al cargar los datos')
            }
        };

        fetchData();
    }, []);

    const handleViewDetails = (userId) => {
        const user = users.find(user => user.user_id === userId);
        setSelectedUser(user);
        setOpenDialog(true);
    };

    const themeColors = {
        dark: {

            mode: "dark",
            textColor: "#e2e8f0",
            primaryColor: "#34D399",

        },
        light: {

            mode: "light",
            textColor: "#000000",
            primaryColor: "#F7F9F9 ",
            secondaryColor: "#EF4444"
        }
    };

    const currentTheme = themeColors[theme];

    const columns = [
        {
            name: "user_id",
            label: "id",
            options: {
                display: false,
            },
        },
        {
            name: "username",
            label: "Username",
            options: {
                customBodyRender: (value) => <div style={{ paddingLeft: '15px' }}>{value}</div>,
                width: 100,
            },
        },
        {
            name: "email",
            label: "E-mail",
            options: {
                width: 100,
            },
        },
        {
            name: "is_active",
            label: "Status",
            options: {
                customBodyRender: (value) => (
                    <div style={{ paddingLeft: '' }}>
                        <p className={`capitalize px-3 py-1 inline-block rounded-full ${value === true ? 'bg-green-500' : 'bg-red-500'}`}>
                            {value ? 'Activo' : 'Inactivo'}
                        </p>
                    </div>
                ),
                width: 100,
            },
        },
        {
            name: "user_id",
            label: "Actions",
            options: {
                customBodyRender: (value, tableMeta) => {
                    const userId = tableMeta.rowData[0];
                    return (
                        <div style={{ paddingLeft: '9px' }}>
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

                <ThemeProvider theme={createTheme({
                    typography: {
                        fontFamily: "Verdana, sans-serif"
                    },
                    palette: {
                        ...currentTheme.background,
                        mode: currentTheme.mode,
                    },
                    components: {
                        MuiTableCell: {
                            styleOverrides: {
                                head: {
                                    padding: "10px 4px",
                                    textAlign: 'center',
                                },
                                body: {
                                    padding: "9px 5px",
                                    color: currentTheme.textColor,
                                }
                            }
                        },
                        MuiTableHead: {
                            styleOverrides: {
                                root: {
                                    textAlign: 'center' // centrar las celdas de encabezado
                                }
                            }
                        },

                        MuiTableHeadCell: {
                            styleOverrides: {
                                root: {
                                    textAlign: 'center', // Ajusta la alineaciÃ³n de las columnas centradas
                                },
                            },
                        },
                    }
                })}>

                    <MUIDataTable

                        title={"Users List"}
                        data={users}
                        columns={columns}
                        options={options}
                    />

                </ThemeProvider>
                <div>
                    <button onClick={toggleTheme} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ">
                        Change theme
                    </button>
                </div>
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