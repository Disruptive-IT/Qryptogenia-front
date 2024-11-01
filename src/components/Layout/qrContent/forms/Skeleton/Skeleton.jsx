import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonLoader = () => {
  return (
    <div>

<div className="grid grid-cols-1 md:grid-cols-[1fr_auto] w-full mr-6 mb-4 md:mb-0 mt-16 gap-4">{/* Skeleton titulo*/}
    <Skeleton height={40} width="76%" baseColor="#D9D9D9" highlightColor="#f5f5f5" />
</div>
        
<div className="grid grid-cols-1 md:grid-cols-[1fr_auto] w-full mr-6 mb-4 md:mb-0 mt-16 gap-4">
    <Skeleton height={140} width="76%" baseColor="#D9D9D9" highlightColor="#f5f5f5" />    {/* Descripcion */}
</div>

    
    <div className='flex flex-col w-full md:w-3/4 mr-6 mb-4 md:mb-0 mt-14 ml-20'>
  {/* En pantallas medianas (md) y superiores, los botones estarán en fila */}
  <div className='flex flex-row space-x-4 md:space-x-48 justify-start'>
    <Skeleton height={43.5} width={42} baseColor="#D9D9D9" highlightColor="#f5f5f5" /> {/* Background Color */}
    <Skeleton height={43} width={42} baseColor="#D9D9D9" highlightColor="#f5f5f5" /> {/* Box Color */}
    <Skeleton height={43} width={42} baseColor="#D9D9D9" highlightColor="#f5f5f5" /> {/* Border Color */}
  </div>
</div>

        
        <div className="flex flex-col w-full md:w-3/4 mr-6 mb-4 md:mb-0 mt-16">                
        <Skeleton height={40} width="50%" baseColor="#D9D9D9" highlightColor="#f5f5f5" /> 
        </div>

        <div className="flex flex-col w-full md:w-3/4 mr-6 mb-4 md:mb-0 mt-10">                
        <Skeleton height={40} width="100%" baseColor="#D9D9D9" highlightColor="#f5f5f5" />
        </div>

        <div className="flex flex-col w-full md:w-3/4 mr-6 mb-4 md:mb-0 mt-10">                
        <Skeleton height={40} width="15%" baseColor="#D9D9D9" highlightColor="#f5f5f5" /> 
        </div>
</div>
  );
};

export default SkeletonLoader;
