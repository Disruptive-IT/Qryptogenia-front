import React from 'react';

const SocialButton = ({ data }) => {
    return (
        <div className='grid grid-flow-row gap-3 justify-center w-full mt-6 relative'>
            {data && data.map((social, index) => (
                <a key={index} href={social.link} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                    <img className="w-6/6 h-5/6" src={social.icon} alt="" />
                </a>
            ))}
        </div>
    );
};

export default SocialButton;