import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import imgQr from '../../../../../assets/imgs/dots1.png';
import dots2 from '../../../../../assets/imgs/dots2.png';
import dots4 from '../../../../../assets/imgs/dots4.png';
import dots5 from '../../../../../assets/imgs/dots5.png';
import dots6 from '../../../../../assets/imgs/dots6.png';
import dots3 from '../../../../../assets/imgs/dots3.png';
import pattern1 from '../../../../../assets/imgs/patter1.avif';
import pattern2 from '../../../../../assets/imgs/patter1.avif';

const qrStyles = [
    { id: 1, type: 'rounded', color: '#284B63', borderColor: '#284B63', shape: 'rounded', backgroundType: 'none', patternImage: imgQr },
    { id: 2, type: 'dots', color: '#284B63', borderColor: '#284B63', shape: 'rounded', backgroundType: 'none', patternImage: dots2 },
    
    { id: 4, type: 'classy-rounded', color: '#284B63', borderColor: '#284B63', shape: 'rounded', backgroundType: 'none', patternImage: dots4 },
    { id: 5, type: 'square', color: '#284B63', borderColor: '#284B63', shape: 'rounded', backgroundType: 'none', patternImage: dots5 },
    { id: 6, type: 'extra-rounded', color: '#284B63', borderColor: '#284B63', shape: 'rounded', backgroundType: 'none', patternImage: dots6 },
    { id: 3, type: 'classy', color: '#284B63', borderColor: '#284B63', shape: 'rounded', backgroundType: 'none', patternImage: dots3  },
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

export default function ScrollableDesignQrs({ onStyleClick, value, onChange }) {
    return (
        <Box sx={{ width: 'auto', bgcolor: 'background.paper' }}>
            <Tabs
                value={value}
                onChange={onChange}
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