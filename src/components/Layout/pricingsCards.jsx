/**
 * @Author : Daniel Salazar,   @date 2024-07-30 10:38:09
 * @description :
 * @Props :
 * @return :
 */


import React from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
/*
 * @UpdatedBy : Cristian Escobar,   @date 2024-09-03 15:05:11
 * @description : Se configuro para que se hiciera un mapeo de las membresias en orden de precio
 */
export const PricingsCards = ({ data, userId, isSelectionMode }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handlePlanSelection = async (membershipId) => {
    if (isSelectionMode) { // Solo procede si está en la ruta '/selectPlan'
      try {
        const response = await axios.post('http://localhost:3000/api/user/assign-membership', {
          userId: userId,
          membershipId: membershipId,
        }, {
          withCredentials: true,
        });
        
        console.log('Membership assigned:', response.data);
        navigate('/')
        toast.success(response.data.msg)
      } catch (error) {
        console.error('Error assigning membership:', error);
        alert('Failed to assign membership');
      }
    } else {
      alert('Plan selection is only available in the selectPlan route.');
    }
  };

  const sortedData = [...data].sort((a, b) => {
    const priceA = parseFloat(a.pricings.replace('$', ''));
    const priceB = parseFloat(b.pricings.replace('$', ''));
    return priceA - priceB;
  });

  return (
    <div className='flex w-full gap-4 justify-center items-center flex-wrap'>
      {sortedData.map((item, index) => (
        <div key={index} className='w-full sm:w-[300px] md:w-[300px] lg:w-[300px] xl:w-[300px]'>
          <div className='flex justify-center'>
            {item.name === "ADVANCED" ? (
              <div className='h-8 bg-light-blue rounded-t-lg w-[90%] text-white flex items-center justify-center cursor-default'>
                <span>{t("MOST POPULAR")}</span>
              </div>
            ) : (
              <div className='h-10'></div>
            )}
          </div>
          <div className={`flex flex-col items-center cursor-default justify-center w-full md:w-[300px] gap-4 rounded-lg shadow-2xl bg-white p-5 text-center ${item.name === "ADVANCED" ? "border-4 border-light-blue" : ""}`}>
            <h1 className="text-2xl font-bold text-dark-blue">{item.name}</h1>
            <div className='border-t-2 border-gray-300 w-full'></div>
            <p><strong className='font-bold text-3xl text-dark-blue'>{item.pricings}</strong>/{t('Month')}</p>
            <span className='text-sm text-slate-400'>{t('Billed Annually Included VAT')}</span>
            <span className='text-slate-300 text-sm'><strong className='line-through text-base'>{item.pricingsMonthly}</strong> {t('month to month')}</span>
            <button
              onClick={() => handlePlanSelection(item.id)}
              className='bg-dark-blue text-white rounded-lg w-[90%] md:w-2/3 h-10 flex items-center justify-center transition-all duration-300 hover:scale-105 shadow-lg'>
              <span>{t('Check out now')}</span>
            </button>
            <span className='font-bold text-slate-500'>{t('Includes')}</span>
            <div className='flex w-full gap-2 justify-between'>
              <p className="font-bold">{t('Active Qrs')}</p>
              <p className="">{item.ActivateQrs}</p>
            </div>
            <div className='flex w-full gap-2 justify-between'>
              <p className="text-sm"><strong className='text-base font-bold'>{t('Scans Qrs')}</strong>/{t('Month')}</p>
              <p className="">{item.scansXqr}</p>
            </div>
            <div className='flex w-full gap-2 justify-between'>
              <p className="font-bold">{t('Premium Support')}</p>
              <p className="">{item.sopport}</p>
            </div>
            <div className='flex w-full gap-2 justify-between'>
              <p className="font-bold">{t('Unlimited Static Qrs')}</p>
              <p className="">{item.staticQrs}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};