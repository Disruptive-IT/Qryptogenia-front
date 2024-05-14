import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import imgQr from '../../../../assets/imgs/qr.png';
import './style.css';

export default function ScrollableFrameQrs() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
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
                <Tab label={<div className='tab'>
                    <img src={imgQr} alt="" className='w-10 m-auto' />
                    <span className='absolute top-0 w-full tab-span'>Top Text</span>
                </div>} />
                <Tab label={<div className='tab'>
                    <img src={imgQr} alt="" className='w-10 m-auto' />
                    <span className='absolute w-full tab-span'>Cent Text</span>
                </div>} />
                <Tab label={<div className='tab'>
                    <img src={imgQr} alt="" className='w-10 m-auto' />
                    <span className='absolute bottom-0 tab-span'>Bott Text</span>
                </div>} />

                <Tab label={<div className='tab'>
                    <img src={imgQr} alt="" className='w-10 m-auto' />
                    <span className='absolute top-0 left-0 tab-span'>Top Left</span>
                </div>} />
                <Tab label={<div className='tab'>
                    <img src={imgQr} alt="" className='w-10 m-auto' />
                    <span className='absolute top-0 right-0 tab-span'>Top Right</span>
                </div>} />
                <Tab label={<div className='tab'>
                    <img src={imgQr} alt="" className='w-10 m-auto' />
                    <span className='absolute bottom-0 left-0 tab-span'>Bott Left</span>
                </div>} />
                <Tab label={<div className='tab'>
                    <img src={imgQr} alt="" className='w-10 m-auto' />
                    <span className='absolute bottom-0 right-0 tab-span'>Bott Right</span>
                </div>} />
            </Tabs>
        </Box>
    );
}
