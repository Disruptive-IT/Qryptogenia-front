/*
 * @Author : Jaider cuartas,   @date 2024-07-15 20:13:14
 * @description : Componente para mostrar contenido dinámico de una aplicación basado en la ruta actual. 
 * Incluye formularios para configurar valores de aplicación, redes sociales y música, así como un modal para ver una vista previa en un dispositivo móvil.
 * @return : Retorna un componente React que muestra contenido dinámico y permite la configuración de formularios.
 */

import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { PhoneContentSwitch, QrContentSwitch } from '../components/Layout/qrContent';
import NotFoundPage from './NotFoundPage';
import { useStepper } from '../context/StepperContext';
import ChangeFrame from '../components/Layout/qrContent/changeFrame';
import { UseContentTexts} from '../components/Layout/qrContent/contentData';
import Valuesjson from '../pages/user/Valuesjson.json';
import Modal from 'react-modal';
import CellBox from '../components/Layout/qrContent/cellBox';
import axios from 'axios';
import { OptionBarTwo } from '../components/Layout/optionBar';
import { useQr } from '../context/QrContext';
import { useTranslation } from 'react-i18next';
import { UseMenu } from '../components/Layout/qrContent/forms/menu/menuContext';
Modal.setAppElement('#root');

const initialAppFormValues = Valuesjson.appFormValues;
const initialSocialFormValues = Valuesjson.socialFormValues;
const initialMusicFormValues = Valuesjson.musicFormValues;

const AppContent = () => {
    const { contentName, id } = useParams(); // Asegúrate de que qrId está presente en la ruta
    const { setActiveStep } = useStepper();
    const navigate = useNavigate();
    const location = useLocation();
    const [selectedTab, setSelectedTab] = useState(0);
    const handleSocialFormSubmit = () => {
        setSelectedTab(1); // Cambia al tab "Preview QRytogenia"
    };
    const { t } = useTranslation();
    const contentTexts = UseContentTexts();

    const {
        appFormValues,
        setAppFormValues,
        musicFormValues,
        setMusicFormValues,
        socialFormValues,
        setSocialFormValues,
        currentContentType,
        setCurrentContentType,
        resetQrData,
        setQrBgColor,
        setMarcoType,
        setDotsType,
        setCornersSquareType,
        setCornersDotType,
        setQrText,
        setTextColor,
        setQrTextPosition,
        setTextChip,
        qrTextProps,
        setQrFontStyle,
        setTextChipColor,
        setQrImage
    } = useQr();
    const {formData}=UseMenu();
    const [valuesLoaded, setValuesLoaded] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    setCurrentContentType(contentName);
    console.log(selectedTab)
    console.log(qrTextProps);

    useEffect(() => {
        const fetchQRData = async () => {
            if (location.pathname.includes('/edit')) {
                try {
                    const response = await axios.get(`http://localhost:3000/api/qr/getpreview/${id}`, {
                        withCredentials: true,
                    });
    
                    const {
                        title, colorTitle, description, descriptionColor, boxColor, borderImg, image, backgroundColor, selectedOptions, frame, frameColor, dots, cornerSquare, cornerDot, text, colorText, position, qrTextBubble = {}, qrTextFont = {}, logo
                    } = response.data;
    
                    const setMarcoTypes = (frame) => {
                        let marcoData;
    
                        if (frame === 'circle') {
                            marcoData = { id: 2, type: 'circle', icon: 'MdOutlineQrCode2', style: { borderRadius: '50%', borderColor: '#000000', padding: '35px' }, shape: 'circle', backgroundType: 'pattern' };
                        } else if (frame === 'square') {
                            marcoData = { id: 3, type: 'square', icon: 'MdOutlineQrCode2', style: { borderRadius: '0', borderColor: '#000000', padding: '25px' }, shape: 'square', backgroundType: 'pattern' };
                        } else if (frame === 'rounded') {
                            marcoData = { id: 4, type: 'rounded', icon: 'MdOutlineQrCode2', style: { borderRadius: '15px', borderColor: '#000000', padding: '25px' }, shape: 'rounded', backgroundType: 'pattern' };
                        } else if (frame === 'hexagon') {
                            marcoData = { id: 5, type: 'hexagon', icon: 'MdOutlineQrCode2', style: { clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 24%)', borderColor: '#000000 ', padding: '35px' }, shape: 'hexagon', backgroundType: 'pattern' };
                        } else if (frame === 'octagon') {
                            marcoData = { id: 6, type: 'octagon', icon: 'MdOutlineQrCode2', style: { clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)', borderColor: '#000000', padding: '35px' }, shape: 'octagon', backgroundType: 'pattern' };
                        } else {
                            marcoData = { id: 1, type: 'default', icon: 'TbLetterX', style: { borderColor: 'transparent', border: 0, padding: '37px' }, shape: 'none', backgroundType: 'pattern' };
                        }
    
                        // Aquí envías el marcoData a la función que corresponda
                        setMarcoType(marcoData);
                    };
    
                    setMarcoTypes(frame);
    
                    // Verifica si las propiedades no son undefined antes de actualizar los estados
                    if (colorText !== undefined) setTextColor(colorText);
                    if (text !== undefined) setQrText(text);
                    if (position !== undefined) setQrTextPosition(position);
                    if (qrTextBubble.burbble !== undefined) setTextChip(qrTextBubble.burbble);
                    if (qrTextBubble.color !== undefined) setTextChipColor(qrTextBubble.color);
                    if (cornerDot !== undefined) setCornersDotType(cornerDot);
                    if (cornerSquare !== undefined) setCornersSquareType(cornerSquare);
                    if (dots !== undefined) setDotsType(dots);
                    if (frameColor !== undefined) setQrBgColor(frameColor);
                    if (qrTextFont.fontFamily !== undefined) setQrFontStyle(qrTextFont.fontFamily);
                    if (logo !== undefined) setQrImage(logo);
    
                    const appValues = {
                        title,
                        colorTitle,
                        description,
                        descriptionColor,
                        boxColor,
                        borderImg,
                        image,
                        backgroundColor,
                        selectedOptions,
                    };
                    console.log(appFormValues);
                    
    
                    // Actualiza los valores del formulario solo si no son undefined
                    if (Object.values(appValues).every(value => value !== undefined)) {
                        setAppFormValues(appValues);
                        setSocialFormValues(appValues);
                        setMusicFormValues(appValues);
                    }
    
                    setValuesLoaded(true); // Indicar que los valores se han cargado
                } catch (error) {
                    console.error('Error fetching QR data:', error);
                }
            } else {
                // Restablecer los valores de los formularios al cambiar de ruta
                setAppFormValues(initialAppFormValues);
                setSocialFormValues(initialSocialFormValues);
                setMusicFormValues(initialMusicFormValues);
                setValuesLoaded(true); // Indicar que los valores se han cargado
            }
            setActiveStep(1);
        };
    
        fetchQRData();
    }, [location, id, setActiveStep, setAppFormValues, setSocialFormValues, setMusicFormValues]);

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

        resetQrData()

        scrollToSection();
    }, [location]);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleTabChange = (newTab) => {
        setSelectedTab(newTab);
    };

    const isQrRoute = location.pathname.startsWith('/qr/');
    console.log(name)
    return (
        <>
            {isQrRoute && <OptionBarTwo contentName={contentName} name={name} />}
            <section id='qr-content'>
                <div className='pl-14 flex flex-col gap-1'>
                    <h1 className='font-bold text-dark-blue text-3xl'>{name.toUpperCase()}</h1>
                    <p className='text-sm text-slate-400'>{content}</p>
                </div>
                <div className='grid grid-cols-1 lg:grid-cols-5 gap-10 w-11/12 m-auto py-10'>
                    <div className='col-span-1 lg:col-span-3 bg-white shadow-xl rounded-xl p-6'>
                        <QrContentSwitch
                            contentName={name}
                            onFormChangeApp={setAppFormValues}
                            onFormChange={setSocialFormValues}
                            onFormChangeMusic={setMusicFormValues}
                            onSocialFormSubmit={handleSocialFormSubmit}
                            location={location}
                            appFormValues={appFormValues}
                            socialFormValues={socialFormValues}
                            musicFormValues={musicFormValues}
                        />
                    </div>
                    <div className='col-span-1 lg:col-span-2'>
                        {valuesLoaded && (
                            <ChangeFrame
                                name={name}
                                appFormValues={appFormValues}
                                socialFormValues={socialFormValues}
                                musicFormValues={musicFormValues}
                                menuFormValues={formData}
                                selectedTab={selectedTab}
                                onTabChange={handleTabChange}
                                location={location}
                                qrId={id}
                            />
                        )}
                    </div>
                </div>
            </section>

            <button onClick={openModal} className='block lg:hidden px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 fixed bottom-16 right-4 z-50'>
                {t("Show Preview")}
            </button>

            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Vista Previa del Móvil"
                className="fixed inset-0 flex items-center justify-center p-4 bg-transparent"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50 overflow-auto"
            >
                <div className="bg-transparent p-0 rounded-lg border-none shadow-none flex justify-center items-center w-full h-full">
                    <div className="relative flex justify-center items-start" style={{ maxHeight: 'calc(100vh - 40px)', maxWidth: 'calc(100vw - 40px)' }}>
                        <button onClick={closeModal} className="absolute top-4 right-4 text-red-500 z-10">Cerrar</button>
                        <div className="relative scale-wrapper" style={{ marginTop: '40px' }}>
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
                </div>
            </Modal>
            <style jsx>{`
        .scale-wrapper {
          transform: scale(0.9);
          transform-origin: top center;
        }

        @media (max-width: 1200px) {
          .scale-wrapper {
            transform: scale(0.9);
          }
        }

        @media (max-width: 992px) {
          .scale-wrapper {
            transform: scale(0.9);
          }
        }

        @media (max-width: 768px) {
          .scale-wrapper {
            transform: scale(0.8);
          }
        }

        @media (max-width: 576px) {
          .scale-wrapper {
            transform: scale(0.7);
          }
        }

        @media (max-width: 360px) {
          .scale-wrapper {
            transform: scale(0.6);
          }
        }
      `}</style>
        </>
    );
};

export default AppContent;
