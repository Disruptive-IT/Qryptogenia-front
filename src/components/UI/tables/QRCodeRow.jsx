import React from 'react';
import { FaDownload } from 'react-icons/fa';

/**
 * @Author : Cristian Escobar 
 * @date : 2024-09-04
 * @description : El componente `QRCodeRow` se encarga de renderizar una fila en una tabla que muestra información sobre un código QR. Este componente toma una lista de columnas y una lista de acciones. Cada columna se renderiza en una celda, y cada acción se representa con un ícono que ejecuta una función específica cuando se hace clic en él.
 * @Props :
 *   - `item` (object): Un objeto que representa un registro de código QR. Se utiliza para llenar las celdas de la fila.
 *   - `columns` (array): Una lista de objetos que representan las columnas de la tabla. Cada objeto de columna puede tener una propiedad `accessor` que define qué campo del `item` se debe mostrar, o una función `render` para personalizar la renderización.
 *   - `actions` (array): Una lista de objetos de acción. Cada objeto de acción debe tener una propiedad `Icon`, que es un componente de ícono, y una propiedad `onClick`, que es una función que se ejecuta cuando se hace clic en el ícono.
 * @return : Renderiza una fila (`<tr>`) en una tabla con celdas (`<td>`) para cada columna definida. La última celda contiene los íconos de acción que ejecutan las funciones definidas en `actions` cuando se hace clic en ellos.
 */

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
