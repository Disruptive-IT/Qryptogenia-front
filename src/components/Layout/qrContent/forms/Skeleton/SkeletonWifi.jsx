import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonWifi = () => {
  return (
    <div className="flex flex-col items-start w-full mt-16 space-y-6 md:w-3/4 lg:w-2/3"> {/* Control del ancho y alineación */}
      
      <div className="w-full md:w-7/8 ml-10"> 
        <Skeleton height={40} width="25%" baseColor="#D9D9D9" highlightColor="#f5f5f5" />
      </div>

      {/* Descripción */}
      <div className="w-full md:w-7/8 ml-10"> 
        <Skeleton height={40} width="80%" baseColor="#D9D9D9" highlightColor="#f5f5f5" />
      </div>

      {/* Form fields */}
      <div className="w-full md:w-7/8 ml-10"> 
        <Skeleton height={40} width="75%" baseColor="#D9D9D9" highlightColor="#f5f5f5" />
      </div>

      <div className="w-full md:w-7/8 ml-10"> 
        <Skeleton height={40} width="70%" baseColor="#D9D9D9" highlightColor="#f5f5f5" />
      </div>

      <div className="w-full md:w-7/8 ml-10"> 
        <Skeleton height={40} width="15%" baseColor="#D9D9D9" highlightColor="#f5f5f5" />
      </div>
      
    </div>
  );
};

export default SkeletonWifi;
