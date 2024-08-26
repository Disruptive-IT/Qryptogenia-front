/**
 * @Author : Daniel Salazar,   @date 2024-07-30 10:38:09
 * @description :
 * @Props :
 * @return :
 */


import React from 'react';
import { useTranslation } from 'react-i18next';
export const PricingsCards = ({ data, onCardClick, isSelectionMode }) => {
    const { t } = useTranslation();
  
    const sortedData = [...data].sort((a, b) => {
      const priceA = parseFloat(a.pricings.replace('$', ''));
      const priceB = parseFloat(b.pricings.replace('$', ''));
      return priceA - priceB;
    });
  
    return (
      <div className='flex w-full gap-4 justify-center items-center flex-wrap'>
        {sortedData.map((item, index) => (
          <div 
            key={index} 
            className={`w-full sm:w-[300px] md:w-[300px] lg:w-[300px] xl:w-[300px] transition-transform duration-300 ${isSelectionMode ? 'hover:scale-105 cursor-pointer' : ''}`}
            onClick={() => onCardClick(item)}
          >
            <div className='flex justify-center'>
              {item.name === "ADVANCED" ? (
                <div className='h-8 bg-light-blue rounded-t-lg w-[90%] text-white flex items-center justify-center cursor-default'>
                  <span>{t("MOST POPULAR")}</span>
                </div>
              ) : (
                <div className='h-10'></div>
              )}
            </div>
            <div className={`flex flex-col items-center justify-center w-full md:w-[300px] gap-4 rounded-lg shadow-2xl bg-white p-5 text-center ${item.name === "ADVANCED" ? "border-4 border-light-blue" : ""}`}>
              <h1 className="text-2xl font-bold text-dark-blue">{item.name}</h1>
              <div className='border-t-2 border-gray-300 w-full'></div>
              <p>
                <strong className='font-bold text-3xl text-dark-blue'>{item.pricings}</strong>/{t('Month')}
              </p>
              <span className='text-sm text-slate-400'>{t('Billed Annually Included VAT')}</span>
              <span className='text-slate-300 text-sm'>
                <strong className='line-through text-base'>{item.pricingsMonthly}</strong> {t('month to month')}
              </span>
              <button className='bg-dark-blue text-white rounded-lg w-[90%] md:w-2/3 h-10 flex items-center justify-center transition-all duration-300 hover:scale-105 shadow-lg'>
                <span>{t('Check out now')}</span>
              </button>
              <span className='font-bold text-slate-500'>{t('Includes')}</span>
              <div className='flex w-full gap-2 justify-between'>
                <p className="font-bold">{t('Active Qrs')}</p>
                <p>{item.ActivateQrs}</p>
              </div>
              <div className='flex w-full gap-2 justify-between'>
                <p className="text-sm"><strong className='text-base font-bold'>{t('Scans Qrs')}</strong>/{t('Month')}</p>
                <p>{item.scansXqr}</p>
              </div>
              <div className='flex w-full gap-2 justify-between'>
                <p className="font-bold">{t('Premium Support')}</p>
                <p>{item.sopport}</p>
              </div>
              <div className='flex w-full gap-2 justify-between'>
                <p className="font-bold">{t('Unlimited Static Qrs')}</p>
                <p>{item.staticQrs}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };