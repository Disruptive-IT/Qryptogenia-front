import React from 'react';
import { FaDownload, FaShareAlt } from 'react-icons/fa';
import QRCode from 'qrcode.react';

const QRCodeRow = ({ code }) => {
    return (
        <tr className="hover:bg-gray-100 cursor-pointer">
            <td className="px-6 py-4 whitespace-nowrap">
                <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600" />
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <QRCode value={code.name} size={32} />
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{code.name}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{code.type}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{code.scans}</td>
            <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${code.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {code.status}
                </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{code.date}</td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <FaDownload className="text-gray-500 hover:text-gray-700 cursor-pointer mr-3" />
                <FaShareAlt className="text-gray-500 hover:text-gray-700 cursor-pointer" />
            </td>
        </tr>
    );
};

export default QRCodeRow;