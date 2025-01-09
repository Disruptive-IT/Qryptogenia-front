
/**
 * @Author : Cristian Rueda
 * @date : 2025-01-07
 * @description : Componente para mostrar el skeleton de la vista de pago de membresía mientras se cargan los datos.
 * @Props : Ninguna
 * @return : Renderiza un skeleton mientras se obtiene la información de la membresía.
 **/
import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';



const SkeletonPayment = () => {
  return (
    <div className="flex flex-col justify-start items-center w-full h-screen pt-8">
      {/* Skeleton del contenedor principal */}
      <div className="w-full flex justify-center mb-4">
        <div className="w-60">
          <Skeleton height={125} width="100%" baseColor="#D9D9D9" highlightColor="#f5f5f5" borderRadius={8} />
        </div>
      </div>

      {/* Skeleton para el tipo de membresía */}
      <div className="w-full flex justify-center mb-4">
        <div className="w-60">
          <Skeleton height={40} width="100%" baseColor="#D9D9D9" highlightColor="#f5f5f5" borderRadius={8} />
        </div>
      </div>

      {/* Skeleton para las fechas de inicio y vencimiento */}
      <div className="w-full flex justify-center mb-4">
        <div className="w-60">
          <Skeleton height={40} width="80%" baseColor="#D9D9D9" highlightColor="#f5f5f5" borderRadius={8} />
        </div>
      </div>
      
      {/* Skeleton para los beneficios */}
      <div className="w-full flex justify-center mb-4">
        <div className="w-60">
          <Skeleton height={40} width="100%" baseColor="#D9D9D9" highlightColor="#f5f5f5" borderRadius={8} />
        </div>
      </div>

      {/* Skeleton para los botones de acción */}
      <div className="w-full flex justify-center mb-4">
        <div className="w-60">
          <Skeleton height={40} width="100%" baseColor="#D9D9D9" highlightColor="#f5f5f5" borderRadius={8} />
        </div>
      </div>
      
      <div className="w-full flex justify-center mb-4">
        <div className="w-60">
          <Skeleton height={40} width="100%" baseColor="#D9D9D9" highlightColor="#f5f5f5" borderRadius={8} />
        </div>
      </div>
      
      {/* Skeleton para los detalles de la membresía */}
      <div className="w-full flex justify-center mb-4">
        <div className="w-60">
          <Skeleton height={50} width="100%" baseColor="#D9D9D9" highlightColor="#f5f5f5" borderRadius={8} />
        </div>
      </div>
      
      {/* Skeleton para los detalles de usuario */}
      <div className="w-full flex justify-center mb-4">
        <div className="w-60">
          <Skeleton height={200} width="100%" baseColor="#D9D9D9" highlightColor="#f5f5f5" borderRadius={8} />
        </div>
      </div>
      
      {/* Skeleton para el botón de continuar */}
      <div className="w-full flex justify-center mb-4">
        <div className="w-60">
          <Skeleton height={40} width="100%" baseColor="#D9D9D9" highlightColor="#f5f5f5" borderRadius={8} />
        </div>
      </div>
    </div>
  );
};

export default SkeletonPayment;
