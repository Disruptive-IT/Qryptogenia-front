import React from 'react'
import cell from "../../../assets/imgs/Celular.png"
import './index.css'

const CellBox = ({children}) =>{

    return(
        // <div className='min-w-[350px] min-h-[680px] max-w-[360px] max-h-[680px] rounded-[55px] overflow-x-hidden border-container '>
        //     <div className='inner-content'>
        //         <div className='flex flex-col rounded-t-[52px] rounded-b-[50px] w-full h-[full] items-center overflow-y-auto'>
        //             {children}
        //         </div>
        //     </div>
        // </div>

        <div className='relative min-w-[360px] min-h-[680px] max-w-[360px] max-h-[680px] rounded-[55px]'>
            <div className='absolute inset-0 w-full h-full flex flex-col items-center overflow-hidden rounded-[55px] z-10'>
                <div className='relative w-full h-full flex flex-col items-center overflow-y-auto scroll-my-1'>
                    {children}
                </div>
            </div>
            <img className='absolute inset-0 w-full h-full rounded-[55px] z-20 pointer-events-none' src={cell} alt="cell-box" />
        </div>
    )
}

export default CellBox;