import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { PhoneContentSwitch, QrContentSwitch } from '../components/Layout/qrContent';
import NotFoundPage from './NotFoundPage';
import { useStepper } from '../context/StepperContext';
import ChangeFrame from '../components/Layout/qrContent/changeFrame';
import { contentTexts } from '../components/Layout/qrContent/contentData';
import { OptionBarTwo } from '../components/Layout/optionBar';
import Valuesjson from '../pages/user/Valuesjson.json';
import Modal from 'react-modal';
import CellBox from '../components/Layout/qrContent/cellBox';

Modal.setAppElement('#root');

const initialAppFormValues = Valuesjson.appFormValues;
const initialSocialFormValues = Valuesjson.socialFormValues;
const initialMusicFormValues = Valuesjson.musicFormValues;

const AppContent = () => {
    const { contentName } = useParams();
    const { setActiveStep } = useStepper();
    const navigate = useNavigate();
    const location = useLocation();

    const [appFormValues, setAppFormValues] = useState(initialAppFormValues);
    const [socialFormValues, setSocialFormValues] = useState(initialSocialFormValues);
    const [musicFormValues, setMusicFormValues] = useState(initialMusicFormValues);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        // Restablecer los valores de los formularios al cambiar de ruta
        setAppFormValues(initialAppFormValues);
        setSocialFormValues(initialSocialFormValues);
        setMusicFormValues(initialMusicFormValues);
        setActiveStep(1);
    }, [setActiveStep]);

    useEffect(() => {
        setAppFormValues(initialAppFormValues);
        setSocialFormValues(initialSocialFormValues);
        setMusicFormValues(initialMusicFormValues);
    }, [location]);

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

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <OptionBarTwo contentName={contentName} name={name} />
            <section id='qr-content'>
                <div className='text-center'>
                    <h1>{name}</h1>
                    <p>{content}</p>
                </div>
                <div className='grid grid-cols-1 lg:grid-cols-5 gap-10 w-11/12 m-auto py-10'>
                    <div className='col-span-1 lg:col-span-3 bg-white shadow-xl rounded-xl p-6'>
                        <QrContentSwitch
                            contentName={name}
                            onFormChangeApp={setAppFormValues}
                            onFormChange={setSocialFormValues}
                            onFormChangeMusic={setMusicFormValues}
                        />
                    </div>
                    <div className='col-span-1 lg:col-span-2'>
                        <ChangeFrame
                            name={name}
                            appFormValues={appFormValues}
                            socialFormValues={socialFormValues}
                            musicFormValues={musicFormValues}
                        />
                    </div>
                </div>
            </section>

            <button onClick={openModal} className='block lg:hidden px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 fixed bottom-16 right-4 z-50'>
                Ver Vista Previa
            </button>

            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Vista Previa del Móvil"
                className='fixed inset-0 flex items-center justify-center'
                overlayClassName='fixed inset-0 bg-black bg-opacity-50 overflow-auto'
            >
                {/* Contenedor del modal */}
                <div className='absolute inset-0 flex items-center justify-center'>
                    {/* Contenedor para el componente CellBox */}
                    <div className='relative'>
                        {/* Renderiza el componente CellBox */}
                        <CellBox>
                            <PhoneContentSwitch
                                contentName={name}
                                appFormValues={appFormValues}
                                socialFormValues={socialFormValues}
                                musicFormValues={musicFormValues}
                            />
                        </CellBox>

                        {/* Botón de cerrar */}
                        <button
                            onClick={closeModal}
                            className='absolute top-[-30px] right-[-60px] right-2 bg-red-500 text-white p-2 rounded-md shadow-md z-10'
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            </Modal>



        </>
    );
};

export default AppContent;
