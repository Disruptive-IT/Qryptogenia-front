import * as React from 'react';
import ScrollableChipText from './scrollableChipText';
import { useQr } from '../../../../../context/QrContext';
import ScrollableFontText from './scrollableFontText';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

function Fuentes() {
    return <ScrollableFontText />;
}

function Burbujas() {
    return <ScrollableChipText />;
}

function ScrollableMain() {
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
                centered
                aria-label="tabs text"
                TabProps={{
                    dir: 'rtl', 
                }}
            >
                <Tab label="Fuentes" />
                <Tab label="Burbujas" />
            </Tabs>
            {value === 0 && <Fuentes />}
            {value === 1 && <Burbujas />}
        </Box>
    );
}

export default ScrollableMain;
