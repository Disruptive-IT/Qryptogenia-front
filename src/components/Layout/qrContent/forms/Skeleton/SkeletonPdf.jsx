import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonPdf = () => {
  return (

<div className="flex flex-col justify-start items-center w-full h-screen pt-8">
      {/* Contenedor del Skeleton centrado */}
      <div className="w-full flex justify-center mb-4">
        <div className="w-60">
          <Skeleton height={125} width="100%" baseColor="#D9D9D9" highlightColor="#f5f5f5" borderRadius={8} />
        </div>
      </div>
      
      {/* Skeleton para el input */}
      <div className="w-full flex justify-center mb-4">
        <div className="w-60">
          <Skeleton height={40} width="100%" baseColor="#D9D9D9" highlightColor="#f5f5f5" borderRadius={8} />
        </div>
      </div>
      <div className="w-full flex justify-center mb-4">
        <div className="w-60">
          <Skeleton height={40} width="20%" baseColor="#D9D9D9" highlightColor="#f5f5f5" borderRadius={8} />
        </div>
      </div>
      <div className="w-full flex justify-center mb-4">
        <div className="w-60">
          <Skeleton height={40} width="20%" baseColor="#D9D9D9" highlightColor="#f5f5f5" borderRadius={8} />
        </div>
      </div>
      
</div>

  );
};

export default SkeletonPdf;
