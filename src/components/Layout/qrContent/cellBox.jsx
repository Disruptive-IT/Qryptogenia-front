import React from 'react'
import cell from "../../../assets/imgs/Celular.png"
import './index.css'

const CellBox = ({children}) =>{

    return(
        <div className='min-w-[350px] min-h-[680px] max-w-[360px] max-h-[680px] rounded-[55px] overflow-x-hidden border-container '>
            <div className='inner-content'>
                <div className='flex flex-col rounded-t-[52px] rounded-b-[50px] w-full h-[full] items-center scroll-my-1'>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default CellBox;