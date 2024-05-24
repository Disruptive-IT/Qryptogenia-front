import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { QrContentSwitch } from '../components/Layout/qrContent';
import NotFoundPage from './NotFoundPage';
import { useStepper } from '../context/StepperContext';
import ChangeFrame from '../components/Layout/qrContent/changeFrame';
import { contentTexts, dataTypeQr } from '../components/Layout/qrContent/contentData';
import { OptionBarTwo } from '../components/Layout/optionBar';


const AppContent = () => {
    const { contentName } = useParams();
    const { setActiveStep } = useStepper();
    const navigate = useNavigate();
    const [socialFormValues, setSocialFormValues] = useState({
        title: '',
        description: 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Ciceros De Finibus Bonorum et Malorum for use in a type specimen book. It usually begins with:',
        borderColor: '#ffffff',
        backgroundColor: '#E7473C',
        boxColor: '#F0F0F0',
        titleColor: '#820e0e',
        descriptionColor: '#E7473C',
        image: '',
        selectedOptions: ''
      });

      console.log(socialFormValues)

    useEffect(() => {
        setActiveStep(0);
    }, []);


    const content = contentTexts[contentName.toLowerCase().replace(/\s+/g, '-')];
    const name = contentName.replace(/-/g, ' ');

    if (!content) {
        return <NotFoundPage />;
    }


    useEffect(() => {
        const scrollToSection = () => {
            const section = document.getElementById('qr-content');
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
            }
        };

        scrollToSection();
    }, [location]);


    return (
        <>
            <OptionBarTwo contentName={contentName} name={name} />
            <section id='qr-content'>
                <div className='text-center'>
                    <h1>{name}</h1>
                    <p>{content}</p>
                </div>
                <div className='grid grid-cols-5 gap-10 w-11/12 m-auto py-10'>
                    <div className='col-span-3 bg-white shadow-xl rounded-xl'>
                        <QrContentSwitch contentName={name} onFormChange={setSocialFormValues} />
                    </div>
                    <div className='col-span-2'>
                        <ChangeFrame name={name} socialFormValues={socialFormValues}/>
                    </div>
                </div>
            </section>
        </>
    );
};

export default AppContent;
