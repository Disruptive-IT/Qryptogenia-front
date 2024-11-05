import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonPhone = () => {

    return (
        <div className="flex flex-col items-center w-full max-w-xs mx-auto p-4 mt-9 rounded-lg">
          {/* Skeleton para la imagen redonda */}
          <div className="flex justify-center mb-4">
            <Skeleton circle={true} height={100} width={100} baseColor="#D9D9D9" highlightColor="#f5f5f5" />
          </div>
          
          {/* Skeleton para el título */}
          <div className="mb-4 w-3/4">
            <Skeleton height={40} width="100%" baseColor="#D9D9D9" highlightColor="#f5f5f5" />
          </div>
          <div className="mb-4 w-3/4">
            <Skeleton height={40} width="100%" baseColor="#D9D9D9" highlightColor="#f5f5f5" />
          </div>
    
          {/* Skeleton para la sección de contenido */}
          <div className="flex w-full mb-4">
            <div className="w-2/3 mr-2">
              <Skeleton height={120} width="100%" baseColor="#D9D9D9" highlightColor="#f5f5f5" />
            </div>
            <div className="flex-1">
              <Skeleton height={120} width="100%" baseColor="#D9D9D9" highlightColor="#f5f5f5" />
            </div>
          </div>
          <div className="mb-4 w-3/4">
            <Skeleton height={40} width="100%" baseColor="#D9D9D9" highlightColor="#f5f5f5" />
          </div>
          <div className="mb-4 w-3/4">
            <Skeleton height={40} width="100%" baseColor="#D9D9D9" highlightColor="#f5f5f5" />
          </div>
        </div>
      );
    };

export default SkeletonPhone;
