import React from 'react';
import { FaDownload } from 'react-icons/fa';

const QRCodeRow = ({ item, columns, actions }) => {
  return (
    <tr>
      {columns.map((column, index) => (
        <td key={index} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
          {column.render ? column.render(item) : item[column.accessor]}
        </td>
      ))}
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {actions.map((Action, index) => (
          <Action.Icon
            key={index}
            className="cursor-pointer mx-2"
            onClick={() => Action.onClick(item.qr_image_base64)}
          />
        ))}
      </td>
    </tr>
  );
};

export default QRCodeRow;
