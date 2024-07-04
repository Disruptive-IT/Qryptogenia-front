import React, { useState, useEffect } from 'react';
import axios from 'axios';
import QRTable from './QRTable';
import './app.css';
import { FaDownload } from 'react-icons/fa';
import { MdOutlineEdit, MdDelete, MdVisibility } from "react-icons/md";

const App = () => {
    const [qrCodes, setQRCodes] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchQRCodes = async () => {
            try {
                const token = localStorage.getItem('token');
                const userId = 'ec375a6b-22f7-46b5-8325-2e86880fed49';

                const response = await axios.get(`http://localhost:3000/api/auth/qrcodes?userId=${userId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                console.log('API response:', response.data);

                setQRCodes(response.data);
            } catch (error) {
                console.error('Error fetching QR codes:', error);
                setError('Error fetching QR codes');
            }
        };

        fetchQRCodes();
    }, []);

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
        setCurrentPage(1);
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

    const columns = [
        { header: 'Preview', accessor: 'preview' },
        { header: 'QR Code Name', accessor: 'name_qr' },
        {
            header: 'QR Code Type',
            accessor: 'qrType.id',
            render: (item) => item.qrType ? item.qrType.type : 'N/A'
        },
        { header: 'Status', accessor: 'state', render: (item) => (
            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${item.state ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {item.state ? 'Active' : 'Inactive'}
            </span>
        ) },
        { header: 'Date', accessor: 'createdAt' },
    ];

    const tableqr = [FaDownload, MdOutlineEdit, MdDelete, MdVisibility];

    return (
        <div className="flex h-screen">
            <div className="w-64 bg-gray-800 text-white flex flex-col p-6">
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
                    actions={tableqr} 
                    currentPage={currentPage} 
                    totalPages={totalPages} 
                    onPageChange={handlePageChange} 
                />
            </div>
        </div>
    );
};

export default App;