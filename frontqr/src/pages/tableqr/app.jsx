import React, { useState } from 'react';
import QRTable from './QRTable';
import './app.css';

const App = () => {
    const [qrCodes, setQRCodes] = useState([
        { name: 'Essay', type: 'Website URL', scans: 540, status: 'Active', date: '10.03.2024' },
        { name: 'QWE', type: 'Music', scans: 536, status: 'Active', date: '05.01.2024' },
        { name: 'Finance', type: 'Wi-fi', scans: 877, status: 'Active', date: '02.01.2024' },
        { name: 'Photos', type: 'App', scans: 1000, status: 'Inactive', date: '01.01.2024' }
    ]);
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredQRCodes = qrCodes.filter(code =>
        code.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        code.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        code.status.toLowerCase().includes(searchQuery.toLowerCase())
    );

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
                <QRTable qrCodes={filteredQRCodes} />
            </div>
        </div>
    );
};

export default App;