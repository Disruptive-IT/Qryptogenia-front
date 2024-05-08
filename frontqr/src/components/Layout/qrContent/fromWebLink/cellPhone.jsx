import react from 'react';


export const WebLinkPhone = ({title, logo}) => {

    return(
        <div className='bg-red-400 flex flex-col justify-end items-center h-48 rounded-t-[50px] rounded-b-[25px] w-full p-5'>
            <h1>{title}</h1>
        </div>
    )
}