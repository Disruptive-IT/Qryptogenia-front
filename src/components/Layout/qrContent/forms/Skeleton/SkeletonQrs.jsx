import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonQrs = () => {
  return (
    <div>

<div className="grid grid-cols-1 md:grid-cols-[1fr_auto] w-full mr-6 mb-4 md:mb-0 mt-10  gap-4">{/* Skeleton titulo*/}
    <Skeleton height={40} width="22%" baseColor="#D9D9D9" highlightColor="#f5f5f5" />
</div>

<div className="grid grid-cols-1 md:grid-cols-[1fr_auto] w-full mr-6 mb-4 md:mb-0 mt-10  gap-4">{/* Skeleton titulo*/}
    <Skeleton height={40} width="100%" baseColor="#D9D9D9" highlightColor="#f5f5f5" />
</div>

<div className="grid grid-cols-1 md:grid-cols-[1fr_auto] w-full mr-6 mb-4 md:mb-0 mt-10  gap-4">{/* Skeleton titulo*/}
    <Skeleton height={40} width="100%" baseColor="#D9D9D9" highlightColor="#f5f5f5" />
</div>

<div className="grid grid-cols-1 md:grid-cols-[1fr_auto] w-full mr-6 mb-4 md:mb-0 mt-10  gap-4">{/* Skeleton titulo*/}
    <Skeleton height={40} width="100%" baseColor="#D9D9D9" highlightColor="#f5f5f5" />
</div>

<div className="grid grid-cols-1 md:grid-cols-[1fr_auto] w-full mr-6 mb-4 md:mb-0 mt-10  gap-4">{/* Skeleton titulo*/}
    <Skeleton height={40} width="100%" baseColor="#D9D9D9" highlightColor="#f5f5f5" />
</div>

<div className="grid grid-cols-1 md:grid-cols-[1fr_auto] w-full mr-6 mb-4 md:mb-0 mt-10  gap-4">{/* Skeleton titulo*/}
    <Skeleton height={40} width="100%" baseColor="#D9D9D9" highlightColor="#f5f5f5" />
</div>

<div className="grid grid-cols-1 md:grid-cols-[1fr_auto] w-full mr-6 mb-4 md:mb-0 mt-10  gap-4">{/* Skeleton titulo*/}
    <Skeleton height={40} width="100%" baseColor="#D9D9D9" highlightColor="#f5f5f5" />
</div>

<div className="w-full flex justify-center mb-4 mt-9">
        <div className="w-60">
          <Skeleton height={40} width="100%" baseColor="#D9D9D9" highlightColor="#f5f5f5" borderRadius={8} />
        </div>
</div>












{/* <div className='mt-10 text-gray-600 text-base'>
<label scope="col" className="w-16 h-16 object-contain cursor-pointer items-center mt-20">
Preview
</label>
<label scope="col" className="px-20 w-16 h-16 object-contain cursor-pointer items-center">
QR Code Name
</label>
<label scope="col" className="px-20 w-16 h-16 object-contain cursor-pointer items-center">
QR Code Type	
</label>
<label scope="col" className="px-20 w-16 h-16 object-contain cursor-pointer items-center">
Status
</label>
<label scope="col" className="px-20 w-16 h-16 object-contain cursor-pointer items-center">
Date
</label>
<label scope="col" className="px-20 w-16 h-16 object-contain cursor-pointer items-center">
Scans
</label>
<label scope="col" className="px-20 w-16 h-16 object-contain cursor-pointer items-center">
Scans Restantes	
</label>
<label scope="col" className="px-20 w-16 h-16 object-contain cursor-pointer items-center">
Actions
</label>
</div> */}
</div>
  );
};

export default SkeletonQrs;
