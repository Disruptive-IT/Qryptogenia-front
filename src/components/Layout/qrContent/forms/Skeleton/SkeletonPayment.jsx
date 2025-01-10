
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
<div className="flex items-center justify-center mt-10">
              <div className="w-full max-w-5xl justify-center bg-white p-4 sm:p-8 lg:p-12 rounded-lg shadow-lg flex flex-col lg:flex-row">
                {/* Columna 1: Detalles de l plan */}
                <div className="w-full lg:w-2/3 p-4">
                <div className="w-60">
                <Skeleton height={40} width="120%" baseColor="#D9D9D9" highlightColor="#f5f5f5" borderRadius={8} />
                </div>                  
                <div className="space-y-4">
                    <div className="flex justify-between items-center border-b pb-2">
                      <div>
                       
                    <div>
                      </div>
                    </div>
                    </div>
                    <div className="flex justify-between items-center border-b pb-2">
                      <div>
                      <div className="w-60">
                      <Skeleton height={40} width="100%" baseColor="#D9D9D9" highlightColor="#f5f5f5" borderRadius={8} />
                    </div>                        <p className="text-gray-600">
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center border-b pb-2">
                      <div>
                      <div className="w-60">
                      <Skeleton height={40} width="145%" baseColor="#D9D9D9" highlightColor="#f5f5f5" borderRadius={8} />
                    </div>                        <p className="text-gray-600">
                        </p>
                      </div>
                    </div>
                    <div>
                    <div className="w-60">
                    <Skeleton height={40} width="80%" baseColor="#D9D9D9" highlightColor="#f5f5f5" borderRadius={8} />
                  </div>                      <p className="text-gray-600">
                      </p>
                      <p className="text-gray-600">
                      </p>
                    </div>
                  </div>
                  <div className="mt-6">
                  <div className="w-60">
                    <Skeleton height={40} width="70%" baseColor="#D9D9D9" highlightColor="#f5f5f5" borderRadius={8} />
                  </div>
                  </div>
                </div>
        
                {/* Columna 2: User Info */}
                <div className="w-full lg:w-3/5 bg-dark-blue text-white p-6 rounded-lg shadow-lg">
                  <div className="w-60">
                      <Skeleton height={40} width="100%" baseColor="#D9D9D9" highlightColor="#f5f5f5" borderRadius={8} />
                    </div> 

                    <div className="w-60 mt-4">
                      <Skeleton height={40} width="80%" baseColor="#D9D9D9" highlightColor="#f5f5f5" borderRadius={8} />
                    </div> 

                    <div className="w-60 mt-4">
                      <Skeleton height={40} width="110%" baseColor="#D9D9D9" highlightColor="#f5f5f5" borderRadius={8} />
                    </div> 
                  <div className="mt-6 ">
                  <div className="w-60 mt-4">
                      <Skeleton height={40} width="100%" baseColor="#D9D9D9" highlightColor="#f5f5f5" borderRadius={8} />
                    </div> 
                  </div>
                </div>
              </div>
            </div>
  );
};

export default SkeletonPayment;


{/* <div className="w-60">
<Skeleton height={125} width="100%" baseColor="#D9D9D9" highlightColor="#f5f5f5" borderRadius={8} />
</div> */}