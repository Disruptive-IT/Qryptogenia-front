import React from 'react';
import { useNavigate } from 'react-router-dom';
import  UseDataTypeQr  from './qrContent/contentData';
import { useQr } from '../../context/QrContext';
import {animate, easeIn, motion} from 'framer-motion'
import { Scale } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const BoxLink = () => {
  const { setQrType } = useQr()
  const navigate = useNavigate();
  const dataTypeQr = UseDataTypeQr();
  const { t } = useTranslation();
  const handleItemClick = (item) => {
    console.log(item.name);
    
    let title = item.name.toLowerCase().replace(/\s+/g, '-')
    navigate(`/qr/${title}`);
    setQrType(title)
  };

  const getTranslatedName = (name) => {
    switch (name.toLowerCase()) {
      case 'app store':
        return t("App Store");
      case 'social media':
        return t("Social Media");
      case 'music':
        return t("Music");
      case 'news':
        return t("News");
      case 'curriculum':
        return t("Curriculum");
      case 'food menu':
        return t("Food Menu");
      case 'website url':
        return t("Website Url");
      default:
        return name;
    }
  };

  return (
    <div  className="flex flex-wrap justify-center items-start md:pt-5 gap-3 max-w-[1300px]">
      {dataTypeQr.map((item, index) => (
        <motion.button
          animate={{initial:0}}
          whileHover={{y:-5,transition:2,scale:1}}
          whileTap={{scale:0.8,transition:3}}
          onClick={() => handleItemClick(item)}
          className=" w-[calc(100%-10px)] mt-5 sm:w-[280px] h-[150px] bg-slate-300 flex items-center p-2 justify-start gap-6 rounded-lg text-black hover:bg-teal-800 hover:border-spacing-48 hover:text-neutral-100"
        >
          <img className="h-20" src={item.img} alt="" />
          <div className="flex flex-col text-start">
            <p className="font-bold text-lg">{getTranslatedName(item.name)}</p>
            <span className='text-sm'>{item.description}</span>
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
