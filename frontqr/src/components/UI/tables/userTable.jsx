import React from 'react';
import QRTable from './QRTable';

const UserTable = () => {
    const userData = [
        { username: 'johndoe', email: 'johndoe@example.com', role: 'Admin', status: 'Active', joined: '01.01.2024' },
        { username: 'janedoe', email: 'janedoe@example.com', role: 'User', status: 'Inactive', joined: '02.02.2024' },
        { username: 'jacksmith', email: 'jacksmith@example.com', role: 'Moderator', status: 'Active', joined: '03.03.2024' }
    ];

    const userColumns = [
        { header: 'Username', accessor: 'username' },
        { header: 'Email', accessor: 'email' },
        { header: 'Role', accessor: 'role' },
        { header: 'Status', accessor: 'status', render: (item) => (
            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${item.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {item.status}
            </span>
        ) },
        { header: 'Joined', accessor: 'joined' },
    ];

    return <QRTable data={userData} columns={userColumns} />;
};

export default UserTable;