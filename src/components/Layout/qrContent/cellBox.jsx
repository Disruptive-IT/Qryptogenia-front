import React from 'react'
import cell from "../../../assets/imgs/Celular.png"

const CellBox = ({children}) => {
    return (
        <div className='relative min-w-[360px] min-h-[680px] max-w-[360px] max-h-[680px] rounded-[55px]'>
            <div className='absolute inset-0 w-full h-full flex flex-col items-center overflow-hidden rounded-[55px] z-10'>
                <div className='relative w-full h-full flex flex-col items-center overflow-y-auto scroll-my-1'>
                    {children}
                </div>
            </div>
            <img className='absolute inset-0 w-full h-full rounded-[55px] z-20 pointer-events-none' src={cell} alt="cell-box" />
        </div>
    );
}

export default CellBox;