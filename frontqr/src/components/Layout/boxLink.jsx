import React from 'react';
import { useNavigate } from 'react-router-dom';

export const BoxLink = ({ data }) => {
  const navigate = useNavigate();

  const handleItemClick = (item) => {
    navigate(`/qr/${item.name.toLowerCase().replace(/\s+/g, '-')}`);
  };

  return (
    <div className="flex flex-wrap justify-center gap-3">
      {data &&
        data.map((item, index) => (
          <button 
            onClick={() => handleItemClick(item)}
            className="w-[300px] h-[100px] bg-slate-300 flex items-center p-3 justify-center gap-3 rounded-lg text-black hover:bg-teal-800 hover:border-spacing-48 hover:text-neutral-100"
          >
            <img className="h-[60px]" src={item.img} alt="" />
            <div className="flex flex-col text-start">
                <p className="font-bold">{item.name}</p>
                <span>{item.description}</span>
            </div>
          </button>
        ))}
    </div>
  );
};
