import React from 'react';
import { FaDownload } from 'react-icons/fa';
import { MdOutlineEdit } from "react-icons/md";

const QRCodeRow = ({ item, columns }) => {
    return (
        <tr className="hover:bg-gray-100 cursor-pointer">
            {columns.map((column, index) => (
                <td key={index} className="px-6 py-4 whitespace-nowrap text-sm">
                    {column.render ? column.render(item) : item[column.accessor]}
                </td>
            ))}
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex">
                <FaDownload className="text-gray-500 hover:text-gray-700 cursor-pointer mr-3" />
                <MdOutlineEdit className="text-gray-500 hover:text-gray-700 cursor-pointer" />
            </td>
        </tr>
    );
};

export default QRCodeRow;
