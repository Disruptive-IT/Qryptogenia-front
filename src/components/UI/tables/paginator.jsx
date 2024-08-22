import React from 'react';

const Paginator = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center mt-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 mb-2 sm:mb-0 sm:mr-2 bg-light-blue hover:bg-dark-blue text-white rounded disabled:bg-gray-300"
      >
        Previous
      </button>
      <span className="text-xs sm:text-sm">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="px-4 py-2 mt-2 sm:mt-0 sm:ml-2 bg-light-blue hover:bg-dark-blue text-white rounded disabled:bg-gray-300"
      >
        Next
      </button>
    </div>
  );
};

export default Paginator;