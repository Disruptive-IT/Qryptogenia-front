import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import logo from "../../public/Logo.png";
import { QrContentSwitch } from '../components/Layout/qrContent';
import NotFoundPage from './NotFoundPage';
import { useStepper } from '../context/StepperContext';

const AppContent = () => {
    const { contentName } = useParams();
    const { setActiveStep } = useStepper();

    useEffect(() => {
        setActiveStep(0);
    }, []); 

    const contentTexts = {
        "app-store": "Descubre cómo enlazar tu aplicación en todas las tiendas.",
        "social-media": "Conecta con tus seguidores en todas las redes sociales.",
        "website-url": "Enlaza a tu sitio web y hazlo accesible para todos.",
        "pdf": "Muestra o descarga tu PDF con facilidad.",
        "news": "Mantente al día con las últimas noticias.",
        "music": "Enlaza tu canción en todas las aplicaciones de música.",
        "wifi": "Conéctate a una red inalámbrica con facilidad.",
        "curriculum": "Comparte tu currículum electrónico con facilidad.",
        "food-menu": "Crea un menú digital para tu restaurante.",
    };

    const content = contentTexts[contentName.toLowerCase().replace(/\s+/g, '-')];
    const title = contentName.replace(/-/g, ' ')
    
    if (!content) {
        return <NotFoundPage/>
    }
    return (
        <>
            <section className=''>
                <div className='text-center'>
                    <h1>{title}</h1>
                    <p>{content}</p>
                </div>
                <div className='grid grid-cols-4 gap-10 w-11/12 m-auto py-10'>
                    <div className='col-span-3 bg-red-50'>
                        <QrContentSwitch contentName={title} />
                    </div>
                    <div className='col-span-1 grid '>
                        <div className=" md:h-[490px] lg:max-h-[690px] lg:max-w-60 cellPhone">
                            <div className="flex flex-col h-full text-center items-center jutify-center">
                                <div className="w-full h-full py-9 flex flex-col gap-2 items-center">
                                    <div className='shadow w-full pb-2'>
                                        <img src={logo} alt="" className="w-20 m-auto" />
                                        <h1>{title}</h1>
                                    </div>
                                    <div className='h-full w-full'>
                                        <p className='text-sm'>ACÁ VA EL COMO SE VE EL QR</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default AppContent;
