import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import imgQr from '../../../../../assets/imgs/qr.png';
import dot1 from '../../../../../assets/imgs/cornerdot1.png';
import dot3 from '../../../../../assets/imgs/cornerdot2_1.png';

const qrStyles = [
    { id: 1, type: 'dot', color: '#284B63', borderColor: '#284B63', shape: 'rounded', backgroundType: 'none', patternImage: dot1 },
    { id: 2, type: 'square', color: '#284B63', borderColor: '#284B63', shape: 'rounded', backgroundType: 'none', patternImage: dot3 },
];

const getBackgroundStyle = (backgroundType, color, patternImage) => {
    switch (backgroundType) {
        case 'solid':
            return { backgroundColor: color };
        case 'pattern':
            return { backgroundImage: `url(${patternImage})`, backgroundSize: 'cover' };
        default:
            return { backgroundColor: 'transparent' };
    }
};

export default function Scrollcornerdot({ onStyleClick, value, onChange }) {
    return (
        <Box sx={{ width: 'auto', bgcolor: 'background.paper' }}>
            <Tabs
                value={value}
                onChange={onChange}
                variant="scrollable"
                scrollButtons="auto"
                aria-label="scrollable auto tabs example"
                TabIndicatorProps={{
                    style: {
                        backgroundColor: "",
                        height: '4px'
                    }
                }}
                sx={{
                    '& .MuiTabs-scrollButtons': {
                        width: '20px',
                        color: '#284B63',
                    },
                }}
            >
                {qrStyles.map((style) => (
                    <Tab
                        key={style.id}
                        label={
                            <div
                                className='tab'
                                style={{
                                    ...getBackgroundStyle(style.backgroundType, style.color, style.patternImage),
                                    borderColor: style.borderColor,
                                    borderWidth: style.shape !== 'none' ? '2px' : '0px',
                                    borderStyle: 'solid',
                                    padding: '14px'
                                }}
                                onClick={() => onStyleClick(style.type)}
                            >
                                <img src={style.patternImage} alt="" className='w-12 m-auto' />
                            </div>
                        }
                    />
                ))}
            </Tabs>
        </Box>
    );
}