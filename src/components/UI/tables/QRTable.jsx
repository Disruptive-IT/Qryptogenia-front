import React from 'react';
import Paginator from './paginator.jsx'; // Asegúrate de ajustar la ruta según tu estructura de archivos

const QRTable = ({ data, columns, currentPage, totalPages, onPageChange }) => {
  const itemsPerPage = 7;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = data.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.header}
                className="py-2 px-4 border-b border-gray-300 text-left text-xs sm:text-sm leading-4 font-medium text-gray-600 tracking-wider"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((item) => (
            <tr key={item.id}>
              {columns.map((column) => (
                <td
                  key={column.header}
                  className="py-2 px-4 border-b border-gray-300 text-xs sm:text-sm leading-5 text-gray-700"
                >
                  {column.render ? column.render(item) : item[column.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <Paginator
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default QRTable;