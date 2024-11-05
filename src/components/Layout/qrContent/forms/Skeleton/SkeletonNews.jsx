import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonNews = () => {
  return (
    <div>

<div className="grid grid-cols-1 md:grid-cols-[1fr_auto] w-full mr-6 mb-4 md:mb-0 mt-16 gap-4 text-center">{/* Skeleton titulo*/}
    <Skeleton height={40} width="76%" baseColor="#D9D9D9" highlightColor="#f5f5f5" />
</div>
        
<div className="grid grid-cols-1 md:grid-cols-[1fr_auto] w-full mr-6 mb-4 md:mb-0 mt-16 gap-4 text-center">
    <Skeleton height={140} width="76%" baseColor="#D9D9D9" highlightColor="#f5f5f5" />    {/* Descripcion */}
</div>

<div className="grid grid-cols-1 md:grid-cols-[1fr_auto] w-full mr-6 mb-4 md:mb-0 mt-16 gap-4 text-center">{/* Skeleton titulo*/}
    <Skeleton height={40} width="76%" baseColor="#D9D9D9" highlightColor="#f5f5f5" />
</div>

<div className="grid grid-cols-1 md:grid-cols-[1fr_auto] w-full mr-6 mb-4 md:mb-0 mt-16 gap-4 text-center">{/* Skeleton titulo*/}
    <Skeleton height={40} width="76%" baseColor="#D9D9D9" highlightColor="#f5f5f5" />
</div>

<div className="grid grid-cols-1 md:grid-cols-[1fr_auto] w-full mr-6 mb-4 md:mb-0 mt-16 gap-4 text-center">
    <Skeleton height={140} width="76%" baseColor="#D9D9D9" highlightColor="#f5f5f5" />    {/* Descripcion */}
</div>
    



</div>
  );
};

export default SkeletonNews;
