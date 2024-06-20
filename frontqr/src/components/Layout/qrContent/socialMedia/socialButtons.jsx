
import react from 'react'
import { SocialIcon } from 'react-social-icons'
import { Link } from 'react-router-dom'

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const SocialButton = ({ data }) => {
  console.log(data);
  return (
    <div className='flex gap-3 justify-center flex-wrap w-full mt-8 mb-5 relative'>
      {data && data.map((social, index) => (
        <a
          key={index}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 min-w-16 h-16 rounded-lg flex items-center justify-center hover:bg-gray-300"
          style={{ cursor: "pointer", minWidth: '4rem' }} // Ajusta el tamaño mínimo aquí
        >
          {social.icon}
          <span className="hidden lg:inline ml-2">{capitalizeFirstLetter(social.name)}</span>
        </a>
      ))}
    </div>
  );
};

export const SocialButtonM = ({data}) => {
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