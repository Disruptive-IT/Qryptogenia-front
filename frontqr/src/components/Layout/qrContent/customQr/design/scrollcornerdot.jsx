import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import imgQr from '../../../../../assets/imgs/qr.png';
import pattern1 from '../../../../../assets/imgs/patter1.avif';
import pattern2 from '../../../../../assets/imgs/patter1.avif';



const qrStyles = [
    { id: 1, type: 'dot', color: 'transparent', borderColor: 'transparent', shape: 'none', backgroundType: 'none' },
    { id: 2, type: 'square', color: '#284B63', borderColor: '#284B63', shape: 'circle', backgroundType: 'solid' },
   
    
];

// const getShapeStyle = (shape) => {
//     switch (shape) {
//         case 'circle':
//             return { borderRadius: '50%' };
//         case 'rounded':
//             return { borderRadius: '1px' };
//         case 'square':
//             return { borderRadius: '0' };
//         case 'hexagon':
//             return { clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' };
//         case 'octagon':
//             return { clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)' };
//         default:
//             return {};
//     }
// };

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

export default function Scrollcornerdot({ onStyleClick }) {
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
                                    padding: '10px'
                                }}
                                onClick={() => onStyleClick(style.type)}
                            >
                                <img src={imgQr} alt="" className='w-10 m-auto' />
                            </div>
                        }
                    />
                ))}
            </Tabs>
        </Box>
    );
}