import React from 'react';

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
  <div className="flex flex-col sm:flex-row justify-between items-center mt-4">
    <button
      onClick={() => onPageChange(currentPage - 1)}
      disabled={currentPage === 1}
      className="px-4 py-2 mb-2 sm:mb-0 sm:mr-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
    >
      Previous
    </button>
    <span className="text-xs sm:text-sm">
      Page {currentPage} of {totalPages}
    </span>
    <button
      onClick={() => onPageChange(currentPage + 1)}
      disabled={1 >= totalPages || currentPage === totalPages}
      className="px-4 py-2 mt-2 sm:mt-0 sm:ml-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
    >
      Next
    </button>
  </div>
</div>
  );
};

export default QRTable;