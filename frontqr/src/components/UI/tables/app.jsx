import React, { useState } from 'react';
import QRTable from './QRTable';
import './app.css';
import UserTable from './userTable';
import { FaDownload } from 'react-icons/fa';
import { MdOutlineEdit, MdDelete, MdVisibility } from "react-icons/md";

const DownloadAction = ({ item }) => (
    <FaDownload className="text-gray-500 hover:text-gray-700 cursor-pointer mr-3" />
);

const EditAction = ({ item }) => (
    <MdOutlineEdit className="text-gray-500 hover:text-gray-700 cursor-pointer mr-3" />
);

const App = () => {
    const [qrCodes, setQRCodes] = useState([
        { name: 'Essay', type: 'Website URL', scans: 540, status: 'Active', date: '10.03.2024' },
        { name: 'QWE', type: 'Music', scans: 536, status: 'Active', date: '05.01.2024' },
        { name: 'Finance', type: 'Wi-fi', scans: 877, status: 'Active', date: '02.01.2024' },
        { name: 'Photos', type: 'App', scans: 1000, status: 'Inactive', date: '01.01.2024' },
        { name: 'New QR', type: 'Website URL', scans: 120, status: 'Active', date: '12.03.2024' },
        { name: 'Old QR', type: 'App', scans: 1500, status: 'Inactive', date: '15.01.2024' },
        { name: 'Sample QR', type: 'Wi-fi', scans: 200, status: 'Active', date: '18.02.2024' },
        
    ]);

    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
        setCurrentPage(1); // Reset current page to 1 on new search
    };

    const filteredQRCodes = qrCodes.filter(code =>
        code.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        code.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        code.status.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalPages = Math.ceil(filteredQRCodes.length / 7);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const columns = [
        { header: 'QR Code Name', accessor: 'name' },
        { header: 'QR Code Type', accessor: 'type' },
        { header: 'Scans', accessor: 'scans' },
        { header: 'Status', accessor: 'status', render: (item) => (
            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${item.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {item.status}
            </span>
        ) },
        { header: 'Date', accessor: 'date' },
        { header: 'Actions', accessor: 'actions' },
    ];

    const tableqr = [DownloadAction, EditAction];

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
                {/* <UserTable /> */}
            </div>
        </div>
    );
};

export default App;