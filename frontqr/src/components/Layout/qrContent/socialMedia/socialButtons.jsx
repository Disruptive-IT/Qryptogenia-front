
import react from 'react'


export const SocialButton = ({data}) => {

    return (
        <div className='flex gap-3 justify-center flex-wrap w-full mt-5 mb-5'>
            {data && data.map((social,index)=>(
                <button key={index} type="button" className="bg-gray-100 p-2 min-w-32 h-12 rounded-lg flex gap-2 items-center" style={{cursor:"pointer"}}>
                    <img className="w-5" src={social.icon} alt="" />
                    <span className={`font-bold`}>{social.name}</span>
                </button>
            ))}
        </div>
    )
}