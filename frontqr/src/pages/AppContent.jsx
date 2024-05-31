import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { PhoneContentSwitch, QrContentSwitch } from '../components/Layout/qrContent';
import NotFoundPage from './NotFoundPage';
import { useStepper } from '../context/StepperContext';
import ChangeFrame from '../components/Layout/qrContent/changeFrame';
import { contentTexts, dataTypeQr } from '../components/Layout/qrContent/contentData';
import { OptionBarTwo } from '../components/Layout/optionBar';
import Valuesjson from '../pages/user/Valuesjson.json'
import Modal from 'react-modal';
import CellBox from '../components/Layout/qrContent/cellBox';

Modal.setAppElement('#root');

const AppContent = () => {
    const { contentName } = useParams();
    const { setActiveStep } = useStepper();
    const navigate = useNavigate();
    const location = useLocation();

    const { appFormValues: initialAppFormValues, socialFormValues: initialSocialFormValues, musicFormValues: initialMusicFormValues } = Valuesjson;
    const [appFormValues, setAppFormValues] = useState(initialAppFormValues);
    const [socialFormValues, setSocialFormValues] = useState(initialSocialFormValues);
    const [musicFormValues, setMusicFormValues] = useState(initialMusicFormValues);
    const [isModalOpen, setIsModalOpen] = useState(false);

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
                        <QrContentSwitch contentName={name} onFormChangeApp={setAppFormValues} onFormChange={setSocialFormValues} onFormChangeMusic={setMusicFormValues} />
                    </div>
                    {/* Componente de vista previa visible solo en pantallas grandes */}
                    <div className='col-span-1 lg:col-span-2'>
                        <ChangeFrame name={name} appFormValues={appFormValues} socialFormValues={socialFormValues} musicFormValues={musicFormValues} />
                    </div>
                </div>
            </section>

            {/* Botón para abrir el modal visible solo en pantallas pequeñas */}
            <button onClick={openModal} className='block lg:hidden px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 fixed bottom-16 right-4 z-50'>
                Ver Vista Previa
            </button>

            {/* Modal para mostrar la vista previa en pantallas pequeñas */}
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Vista Previa del Móvil"
                className='fixed inset-0 flex items-center justify-center p-4 mt-24'
                overlayClassName='fixed inset-0 bg-black bg-opacity-50 overflow-auto'
            >
                <div className='bg-white p-4 rounded-lg w-full max-w-sm h-3/5'>
                    <button onClick={closeModal} className='text-right text-red-500 mb-2'>Cerrar</button>
                    <div className='relative' style={{ transform: 'scale(0.5)', transformOrigin: 'top center', maxHeight: 'calc(100vh - 100px)' }}>
                    <CellBox>
                            <PhoneContentSwitch
                                contentName={name}
                                appFormValues={appFormValues}
                                socialFormValues={socialFormValues}
                                musicFormValues={musicFormValues}
                            />
                        </CellBox>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default AppContent;
