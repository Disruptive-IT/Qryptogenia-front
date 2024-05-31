import * as React from 'react';
import ScrollableChipText from './scrollableChipText';
import { useQr } from '../../../../../context/QrContext';
import ScrollableFontText from './scrollableFontText';
import { ScrollableStyleText } from './scrollableStyleText';

function Fuentes() {
    return <ScrollableFontText />
}

function Estilos() {
    return <ScrollableStyleText />;
}

function Burbujas() {
    return <ScrollableChipText />
}

function ScrollableMain() {
    const [tab, setTab] = React.useState('Fuentes');

    const getButtonClass = (buttonTab) => {
        return `bg-[${tab === buttonTab ? '#d2d2d2' : '#f2f2f2'}] w-full text-dark-blue py-2 rounded-md shadow-md`;
    }

    return (
        <div>
            <div className='flex justify-between gap-4 my-6'>
                <button
                    className={getButtonClass('Fuentes')}
                    onClick={() => setTab('Fuentes')}
                >
                    Fuentes
                </button>
                <button
                    className={getButtonClass('Estilos')}
                    onClick={() => setTab('Estilos')}
                >
                    Estilos
                </button>
                <button
                    className={getButtonClass('Burbujas')}
                    onClick={() => setTab('Burbujas')}
                >
                    Burbujas
                </button>
            </div>
            {tab === 'Fuentes' && <Fuentes />}
            {tab === 'Estilos' && <Estilos />}
            {tab === 'Burbujas' && <Burbujas />}
        </div>
    );
}

export default ScrollableMain;