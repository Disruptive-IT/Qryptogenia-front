import React from 'react';

const QRCodeRow = ({ item, columns, actions, onViewUser }) => {
    return (
        <tr>
            {columns.map((column, index) => (
                <td key={index} className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item[column.accessor]}
                </td>
            ))}
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-right">
                {actions.map((ActionComponent, index) => (
                    <ActionComponent key={index} item={item} />
                ))}
                <button onClick={() => onViewUser(item)} className="text-indigo-600 hover:text-indigo-900 ml-3">
                    View
                </button>
            </td>
        </tr>
    );
};

export default QRCodeRow;