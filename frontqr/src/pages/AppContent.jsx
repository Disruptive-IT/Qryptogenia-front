import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { QrContentSwitch } from '../components/Layout/qrContent';
import NotFoundPage from './NotFoundPage';
import { useStepper } from '../context/StepperContext';
import ChangeFrame from '../components/Layout/qrContent/changeFrame';
import { contentTexts, dataTypeQr } from '../components/Layout/qrContent/contentData';
import { OptionBarTwo } from '../components/Layout/optionBar';
import { WebLinkPhone } from '../components/Layout/qrContent/socialMedia/stylePhone';
import Valuesjson from '../pages/user/Valuesjson.json'

const AppContent = () => {
    const { contentName } = useParams();
    const { setActiveStep } = useStepper();
    const navigate = useNavigate();
    const location = useLocation();

    // Desestructura los valores del JSON importado
    const { appFormValues: initialAppFormValues, socialFormValues: initialSocialFormValues } = Valuesjson;

    const [appFormValues, setAppFormValues] = useState(initialAppFormValues);
    // const [socialFormValues, setSocialFormValues] = useState(initialSocialFormValues);


    useEffect(() => {
        setActiveStep(0);
    }, []);


    const content = contentTexts[contentName.toLowerCase().replace(/\s+/g, '-')];
    const name = contentName.replace(/-/g, ' ');
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
            <OptionBarTwo contentName={contentName} name={name} />
            <section id='qr-content'>
                <div className='text-center'>
                    <h1>{name}</h1>
                    <h1>{name}</h1>
                    <p>{content}</p>
                </div>
                <div className='grid grid-cols-5 gap-10 w-11/12 m-auto py-10'>
                    <div className='col-span-3 bg-white shadow-xl rounded-xl'>
                        <QrContentSwitch contentName={name} onFormChangeApp={setAppFormValues}/>
                    </div>
                    <div className='col-span-2'>
                        <ChangeFrame name={name} appFormValues={appFormValues}/>
                    </div>
                </div>
            </section>
        </>
    );
};

export default AppContent;
