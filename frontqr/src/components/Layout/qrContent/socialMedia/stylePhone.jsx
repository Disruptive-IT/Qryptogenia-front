import react from 'react';
import logot from "../../../../assets/imgs/google.png"
import { SocialButton } from './socialButtons';

export const WebLinkPhone = ({title, logo, textColor}) => {
     const data=[
        {
            name:'Facebook',
            icon:logot
        },
        {
            name:'Instagram',
            icon:logot
        },
        {
            name:'Twiter',
            icon:logot
        },
        {
            name:'Tick-Tock',
            icon:logot
        },
     ]
    return(
        <div className='bg-gradient-to-b ml-2 from-blue-400 to-sky-800  flex flex-col h-full items-center rounded-t-[52px] rounded-b-[50px]  w-full p-5'>
            
            <div className=' flex flex-col items-center  mt-28 w-[97%]  bg-white rounded-2xl shadow-2xl '>
                <div className='bg-white p-3 rounded-2xl  m-[-70px] border-4 border-sky-800  shadow-lg'>
                    <img className='w-20' src={logot} alt="" />
                </div>
                <div className='m-[90px] w-[90%] text-center'>
                    <h1 className='text-2xl  mb-4' style={{color:textColor}}>{title}</h1>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Atque suscipit ut dolores eveniet similique maiores doloribus soluta neque blanditiis totam, nihil distinctio eligendi assumenda animi corporis quo ipsa eius mollitia!</p>
                </div>
            </div>
            <SocialButton data={data}/>
        </div>
    )
}