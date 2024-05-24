
import react from 'react'
import { SocialIcon } from 'react-social-icons'
import { Link } from 'react-router-dom'


export const SocialButton = ({data}) => {
console.log(data)
    return (
        <div className='flex gap-3 justify-center flex-wrap w-full mt-5 mb-5'>
            {data && data.map((social,index)=>(
                
                <a target="_blank" rel="noopener noreferrer" href={social.url} key={index} type="button" className="relative bg-gray-100 p-2 min-w-32 h-12 rounded-lg flex gap-2 items-center" style={{cursor:"pointer"}}>
                    <SocialIcon network={social.name.toLowerCase()} style={{ width: 30, height: 30 }}/>
                    <span className={`font-bold`}>{social.name}</span>
                </a>
                
                
            ))}
        </div>
    )
}