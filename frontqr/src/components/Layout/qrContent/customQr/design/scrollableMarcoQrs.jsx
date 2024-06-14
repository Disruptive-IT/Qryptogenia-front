import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import imgQr from '../../../../../assets/imgs/qr.png';
import pattern1 from '../../../../../assets/imgs/patter1.avif';
import pattern2 from '../../../../../assets/imgs/patter1.avif';
import { ColorPicker } from '../colorPicker';
import { useQr } from '../../../../../context/QrContext';

const qrStyles = [
    { id: 1, type: 'default', style: { borderColor: 'transparent', border: 0 }, shape: 'none', backgroundType: 'none' },
    { id: 2, type: 'circle', style: { borderRadius: '50%', borderColor: '#284B63', padding: '50px' }, shape: 'circle', backgroundType: 'solid' },
    { id: 3, type: 'square', style: { borderRadius: '0', borderColor: '#284B63' }, shape: 'square', backgroundType: 'pattern', patternImage: pattern1 },
    { id: 4, type: 'rounded', style: { borderRadius: '15px', borderColor: '#284B63' }, shape: 'rounded', backgroundType: 'solid' },
    { id: 5, type: 'hexagon', style: { clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)', borderColor: '#284B63', padding: '50px' }, backgroundType: 'pattern', patternImage: pattern2 },
    { id: 6, type: 'octagon', style: { clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)', borderColor: '#284B63', padding: '40px' }, shape: 'octagon', backgroundType: 'none' },
];


const getShapeStyle = (shape) => {
    switch (shape) {
        case 'circle':
            return { borderRadius: '50%' };
        case 'rounded':
            return { borderRadius: '15px' };
        case 'square':
            return { borderRadius: '0' };
        case 'hexagon':
            return { clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' };
        case 'octagon':
            return { clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)' };
        default:
            return {};
    }
};

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



export default function ScrollableMarcoQrs({ onStyleClick }) {
    const [value, setValue] = React.useState(0);
    const { setQrBgColor } = useQr()

    const handleColorBgQr = (color) => {
        setQrBgColor(color);
    };

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
                {qrStyles.map((style) => (
                    <Tab
                        key={style.id}
                        label={
                            <div
                                className='tab'
                                style={{
                                    ...getShapeStyle(style.shape),
                                    ...getBackgroundStyle(style.backgroundType, style.style.backgroundColor, style.patternImage),
                                    borderColor: style.style.borderColor,
                                    borderWidth: style.shape !== 'none' ? '2px' : '0px',
                                    borderStyle: 'solid',
                                    padding: '10px'
                                }}
                                onClick={() => onStyleClick(style)}
                            >
                                <img src={imgQr} alt="" className='w-10 m-auto' />
                            </div>
                        }
                    />
                ))}
            </Tabs>
            <div className='flex gap-3 mt-4 items-center'>
                <span>Background color:</span>
                <ColorPicker setColor={handleColorBgQr} />
            </div>
        </Box>
    );
}