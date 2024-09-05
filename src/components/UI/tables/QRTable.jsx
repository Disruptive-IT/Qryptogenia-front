import React from 'react';
import { motion } from 'framer-motion';
import Paginator from './paginator.jsx'; // Asegúrate de ajustar la ruta según tu estructura de archivos

/**
 * @Author : Cristian Escobar
 * @date : 2024-09-04
 * @description : El componente `QRTable` renderiza una tabla paginada que muestra datos sobre códigos QR. Utiliza el componente `Paginator` para manejar la paginación de los datos. La tabla muestra columnas definidas por el usuario y maneja la paginación de los datos según la página actual.
 * @Props :
 *   - `data` (array): Un array de objetos que representa los registros de códigos QR a mostrar en la tabla.
 *   - `columns` (array): Una lista de objetos que representan las columnas de la tabla. Cada objeto puede tener una propiedad `header` para el encabezado de la columna y una propiedad `accessor` o `render` para definir qué dato mostrar en cada celda.
 *   - `currentPage` (number): El número de la página actual que se está mostrando en la tabla.
 *   - `totalPages` (number): El número total de páginas disponibles para la paginación.
 *   - `onPageChange` (function): Una función que se llama cuando el usuario cambia de página. Se pasa el nuevo número de página como argumento.
 * @return : Renderiza una tabla (`<table>`) con encabezados de columna (`<th>`) y filas (`<tr>`) que muestran los datos paginados. Cada celda (`<td>`) muestra el dato correspondiente según la configuración de la columna. La tabla utiliza `motion.tr` de `framer-motion` para animar la fila al pasar el cursor sobre ella. Al final de la tabla, se renderiza el componente `Paginator` para manejar la paginación.
 */

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
        <motion.tr key={item.id} whileHover={{backgroundColor:'#D5DBDB'}}>
          {columns.map((column) => (
            <td
              key={column.header}
              className="py-2 px-4 border-b border-gray-300 text-xs sm:text-sm leading-5 text-gray-700"
            >
              {column.render ? column.render(item) : item[column.accessor]}
            </td>
          ))}
        </motion.tr>
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