import React from 'react';
import QRCodeRow from './QRCodeRow';
import Pagination from '../../UI/tables/Pagination';

const QRTable = ({ data, columns, actions, currentPage, totalPages, onPageChange }) => {
    return (
        <div className="overflow-hidden shadow-lg rounded-lg mb-6 bg-white">
            
        <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
                <tr>
                    {columns.map((column) => (
                        <th
                            key={column.header}
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            {column.header}
                        </th>
                    ))}
                    <th
                        scope="col"
                        className="relative px-6 py-3"
                    >
                        <span className="sr-only">Actions</span>
                    </th>
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                {data.map((item) => (
                    <tr key={item.id}>
                        {columns.map((column) => (
                            <td key={column.accessor} className="px-6 py-4 whitespace-nowrap">
                                {column.render ? column.render(item) : item[column.accessor]}
                            </td>
                        ))}
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            {actions.map((ActionIcon, index) => (
                                <ActionIcon key={index} className="text-gray-500 hover:text-gray-900 cursor-pointer mx-1" />
                            ))}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
        </div>
            
    );
};

export default QRTable;
