import React from 'react';
import QRCodeRow from './QRCodeRow';

const QRTable = ({ data, columns }) => {
    return (
        <div className="overflow-hidden shadow-lg rounded-lg mb-6 bg-white">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        {columns.map((column, index) => (
                            <th key={index} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{column.header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {data.map((item, index) => (
                        <QRCodeRow key={index} item={item} columns={columns} />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default QRTable;
