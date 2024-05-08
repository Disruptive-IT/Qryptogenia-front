import React from 'react'
import cell from "../../../assets/imgs/Celular.png"

const CellBox = ({children}) =>{

    return(
        <div className='w-[360px] h-[680px] rounded-[55px]'>
            <img className='absolute w-[370px] h-[684px]' src={cell} alt="cell-box" />
            <div className='w-full h-full rounded-[55px] p-5 '>
                <div className='flex flex-col w-[330px] h-full items-center'>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default CellBox;