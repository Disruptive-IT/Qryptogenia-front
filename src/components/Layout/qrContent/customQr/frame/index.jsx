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

/**
 * @Author : Jobserd Julián Ocampo,   @date 2024-08-01 14:12:28
 * @description : Contenido principal de la seccion de frame
 * @return : Retorna los tabs con las opciones del frame o texto: InputText(contiene el input y su posicion), Fuente(contiene las fuentes del texto y su color), Burbujas(contiene las formas o burbujas del texto y su color)
**/

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

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
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
                        backgroundColor: "#FF001F",
                        height: '4px'
                    }
                }}
                sx={{
                    '& .MuiTabs-scrollButtons': {
                        width: '20px',
                        color: '#284B63',
                    },
                    '& .Mui-selected': {
                        color: '#FF001F',
                    },
                    '& .MuiTab-root': {
                        color: '#808080',
                        '&.Mui-selected': {
                            color: '#FF001F',
                        }
                    },
                }}
            >
                <Tab label="Input Text" icon={<LuTextCursorInput />} sx={{
                    fontSize: '14px', fontWeight: 'bold',
                }} />
                <Tab label="Styles" icon={<FaFont />} sx={{
                    fontSize: '14px', fontWeight: 'bold',
                }} />
                <Tab label="Text Bubbles" icon={<MdBubbleChart />} sx={{
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

