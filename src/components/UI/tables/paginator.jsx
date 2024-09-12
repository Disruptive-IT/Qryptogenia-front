import React from 'react';
import { useTranslation } from 'react-i18next';

/**
 * @Author : Cristian Escobar
 * @date : 2024-09-04
 * @description : El componente `Paginator` se encarga de mostrar controles de paginación para navegar entre las páginas de un conjunto de datos. Permite al usuario avanzar o retroceder entre páginas y muestra información sobre la página actual y el total de páginas. Utiliza `react-i18next` para la traducción del texto.
 * @Props :
 *   - `currentPage` (number): La página actual en la paginación.
 *   - `totalPages` (number): El número total de páginas disponibles.
 *   - `onPageChange` (function): Función que se llama cuando se cambia la página, recibe el número de la nueva página como argumento.
 * @return : Renderiza un control de paginación con botones para avanzar o retroceder de página y una etiqueta que muestra la página actual y el total de páginas. Los botones se desactivan cuando no es posible avanzar o retroceder más allá de los límites.
 */

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