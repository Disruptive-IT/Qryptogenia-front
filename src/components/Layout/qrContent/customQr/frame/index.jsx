import * as React from 'react';
import ScrollableChipText from './scrollableChipText';
import { useQr } from '../../../../../context/QrContext';
import ScrollableFontText from './scrollableFontText';
import ScrollableInputText from './scrollableInputText';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { LuTextCursorInput } from "react-icons/lu";
import { FaFont } from "react-icons/fa";
import { MdBubbleChart } from "react-icons/md";
import { useTranslation } from 'react-i18next';
/**
 * @Author : Jobserd Julián Ocampo,   @date 2024-08-01 14:12:28
 * @description : Contenido principal de la seccion de frame
 * @return : Retorna los tabs con las opciones del frame o texto: InputText(contiene el input y su posicion), Fuente(contiene las fuentes del texto y su color), Burbujas(contiene las formas o burbujas del texto y su color)
**/
/**
 @UpdatedBy : Cristian Rueda,   @date 2024-09-17 16:15:06
 * @description : Se cambian los colores del color de la letra, linea scroll y cuadro seleccionado acorde al formato manejado, tambien se adecúa 
 con mayor espacio el apartado para personalizar el QR
 */


function InputText() {
    return <ScrollableInputText />;
}

function Fuentes() {
    return <ScrollableFontText />;
}

function Burbujas() {
    return <ScrollableChipText />;
}

const Frame = () => {
    const [value, setValue] = React.useState(0);
    const { t } = useTranslation();
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{  width: { // Manejo de breakpoints para ampliar el area de personalización del QR
            xs:200,
            sm:350,
            md:325,
            lg:300,
            xl:400

        },
            position: 'relative', 
            left: '50%',              // 50% hacia la derecha desde su posicion original
            transform: 'translateX(-50%)', // ajusta la posicion para centrarlo 
             }}>
            <Tabs
                value={value}
                onChange={handleChange}
                variant="fullWidth"
                scrollButtons="auto"
                aria-label="scrollable tabs text"
                centered
                TabProps={{
                    dir: 'rtl',
                }}
                TabIndicatorProps={{
                    style: {
                        backgroundColor: "#CC2905", //Linea scroll
                        height: '4px'
                    }
                }}
                sx={{
                    '& .MuiTabs-scrollButtons': {
                        width: '20px',
                        color: '',
                    },
                    '& .Mui-selected': {
                        color: '#CC2905',
                    },
                    '& .MuiTab-root': {
                        color: '#808080', // Color texto no seleccionado
                        '&.Mui-selected': {
                            color: '#CC2905', // Color letra scroll (Input text, Styles, Text )
                        }
                    },
                }}
            >
                <Tab label={t("INPUT TEXT")} icon={<LuTextCursorInput />} sx={{
                    fontSize: '14px', fontWeight: 'bold',
                }} />
                <Tab label={t("STYLES")} icon={<FaFont />} sx={{
                    fontSize: '14px', fontWeight: 'bold',
                }} />
                <Tab label={t("TEXT BUBBLES")} icon={<MdBubbleChart />} sx={{
                    fontSize: '14px', fontWeight: 'bold',
                }} />
            </Tabs>
            {value === 0 && <InputText />}
            {value === 1 && <Fuentes />}
            {value === 2 && <Burbujas />}
        </Box >
    );
}

export default Frame;

