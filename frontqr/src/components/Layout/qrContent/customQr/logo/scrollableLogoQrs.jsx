import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import img from '../../../../../assets/imgs/qr.png';
import '../style.css';
export default function ScrollableLogoQrs({ onTabSelect }) {
    const [value, setValue] = React.useState(0);

    const positions = {
        'background': {background: true},
        'noLogo': null,
        'topLeft': {x: 80, y: 80},
        'topRight': {x: 0, y: 0},
        'bottomLeft': {x: 150, y: 0},
        'bottomRight': {x: 0, y: 150},
        'center': {x: 150, y: 150}
    };

    const positionKeys = Object.keys(positions); 
    
    const handleChange = (event, newValue) => {
        setValue(newValue);
        onTabSelect(positions[positionKeys[newValue]]); 
    };

    return (
        <Box sx={{ width: 'auto', bgcolor: 'background.paper' }}>
            <Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="auto"
                aria-label="scrollable auto tabs example"
                sx={{
                    '& .MuiTabs-scrollButtons': {
                        width: '20px',
                        color: '#284B63',
                    },
                }}
            >
                <Tab label={<div className='tab'><img src={img} alt="" className='w-10 m-auto' /></div>} />
                <Tab label={<div className='tab'><img src={img} alt="" className='w-10 m-auto' /></div>} />
                <Tab label={<div className='tab'><img src={img} alt="" className='w-10 m-auto' /></div>} />
                <Tab label={<div className='tab'><img src={img} alt="" className='w-10 m-auto' /></div>} />
                <Tab label={<div className='tab'><img src={img} alt="" className='w-10 m-auto' /></div>} />
                <Tab label={<div className='tab'><img src={img} alt="" className='w-10 m-auto' /></div>} />
                <Tab label={<div className='tab'><img src={img} alt="" className='w-10 m-auto' /></div>} />
            </Tabs>
        </Box>
    );
}