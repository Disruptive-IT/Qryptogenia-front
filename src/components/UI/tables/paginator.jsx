import React from 'react';
import { useTranslation } from 'react-i18next';

const Paginator = ({ currentPage, totalPages, onPageChange }) => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col sm:flex-row justify-center items-center  gap-3 mt-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="bg-light-blue w-8 h-8 rounded-full cursor-pointer text-white transition-all duration-200 hover:bg-dark-blue hover:scale-110"
      >
        {"<"}
      </button>
      <p className="text-xs sm:text-sm text-slate-600">
      {t("Page")} <span className='font-bold text-md '>{currentPage}</span> of {totalPages}
      </p>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="bg-light-blue w-8 h-8 rounded-full cursor-pointer text-white transition-all duration-200 hover:bg-dark-blue hover:scale-110"
      >
        {">"}
      </button>
    </div>
  );
};

export default Paginator;