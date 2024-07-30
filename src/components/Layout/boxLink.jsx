import React from 'react';
import { useNavigate } from 'react-router-dom';
import { dataTypeQr } from './qrContent/contentData';
import { useQr } from '../../context/QrContext';
import {animate, easeIn, motion} from 'framer-motion'
import { Scale } from 'lucide-react';

export const BoxLink = () => {
  const { setQrType } = useQr()
  const navigate = useNavigate();

  const handleItemClick = (item) => {
    let title = item.name.toLowerCase().replace(/\s+/g, '-')
    navigate(`/qr/${title}`);
    setQrType(title)
  };

  return (
    <div  className="flex flex-wrap justify-center gap-3">
      {dataTypeQr.map((item, index) => (
        <motion.button
          animate={{initial:0}}
          whileHover={{y:-5,transition:2,scale:1}}
          whileTap={{scale:0.8,transition:3}}
          onClick={() => handleItemClick(item)}
          className="w-[300px] h-[100px] bg-slate-300 flex items-center p-3 justify-center gap-3 rounded-lg text-black hover:bg-teal-800 hover:border-spacing-48 hover:text-neutral-100"
        >
          <img className="h-[60px]" src={item.img} alt="" />
          <div className="flex flex-col text-start">
            <p className="font-bold">{item.name}</p>
            <span>{item.description}</span>
          </div>
        </motion.button>
      ))}
    </div>
  );
};

export const BoxLinkIcons =({data})=>{

  return(
    <></>
  )
}
