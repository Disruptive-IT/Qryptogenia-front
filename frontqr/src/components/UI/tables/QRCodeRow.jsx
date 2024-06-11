import React from 'react';

const QRCodeRow = ({ item, columns, actions = [], onViewUser }) => {
  return (
    <tr className="hover:bg-gray-100 cursor-pointer">
      {columns.map((column, index) => (
        <td key={index} className="px-7 py-4 whitespace-nowrap text-sm">
          {column.accessor === 'actions'
            ? (
              <div className="flex space-x-2">
                {actions.map((ActionComponent, actionIndex) => (
                  <ActionComponent key={actionIndex} item={item} onViewUser={onViewUser} /> // Pasar la función onViewUser como prop
                ))}
              </div>
            )
            : (column.render ? column.render(item) : item[column.accessor])
          }
        </td>
      ))}
    </tr>
  );
};

export default QRCodeRow;