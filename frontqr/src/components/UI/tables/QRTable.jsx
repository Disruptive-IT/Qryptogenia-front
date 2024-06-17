import React from 'react';
import QRCodeRow from './QRCodeRow';
import Pagination from '../../pagination/pagination'

const QRTable = ({ data, columns, actions = [], currentPage, totalPages, onPageChange, onViewUser }) => {
    const startIndex = (currentPage - 1) * 7;
    const paginatedData = data.slice(startIndex, startIndex + 7);

    return (
        <div className="overflow-hidden shadow-lg rounded-lg mb-6 bg-white">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        {columns.map((column, index) => (
                            <th key={index} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                {column.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {paginatedData.map((item, index) => (
                        <QRCodeRow 
                            key={index} 
                            item={item} 
                            columns={columns} 
                            actions={actions} 
                            onViewUser={onViewUser}// Pasamos las acciones como prop
                        />
                    ))}
                </tbody>
            </table>
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
        </div>
    );
};

export default QRTable;