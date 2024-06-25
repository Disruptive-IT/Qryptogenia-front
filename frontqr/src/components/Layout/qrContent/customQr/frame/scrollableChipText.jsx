import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import { useQr } from '../../../../../context/QrContext';
import { ColorPicker } from '../colorPicker';
import useQrState from '../../../../../hooks/useQr';

const style = [
    { id: 1, bubbleStyles: { borderRadius: '0', padding: '0', backgroundColor: "transparent" } },
    { id: 2, bubbleStyles: { borderRadius: '50%', padding: '8px 12px' } },
    { id: 3, bubbleStyles: { borderRadius: '25% 75% / 75% 25%', padding: '6px 14px' } },
    { id: 4, bubbleStyles: { borderRadius: '30% 70% / 70% 30%', padding: '7px 13px' } },
    { id: 5, bubbleStyles: { borderRadius: '40% 60% / 60% 40%', padding: '9px 11px' } },
    { id: 6, bubbleStyles: { borderRadius: '100% 0% / 0% 100%', padding: '10px 15px' } },
    { id: 7, bubbleStyles: { borderRadius: '50% 50% 0 0 / 50% 50% 0 0', padding: '12px 18px' } },
    { id: 8, bubbleStyles: { borderRadius: '0 0 50% 50% / 0 0 50% 50%', padding: '14px 16px' } },
    { id: 9, bubbleStyles: { borderRadius: '50% 0 0 50% / 50% 0 0 50%', padding: '15px 17px' } },
    { id: 10, bubbleStyles: { borderRadius: '0 50% 50% 0 / 0 50% 50% 0', padding: '16px 18px' } },
    { id: 11, bubbleStyles: { borderRadius: '20% 80% 30% 70% / 60% 40% 60% 40%', padding: '17px 19px' } },
];



export default function ScrollableChipText() {
    const [value, setValue] = React.useState(0);
    const { setTextChip } = useQr();
    const { setTextChipColor, qrTextProps } = useQr();

    const handleChange = (event, newValue) => {
        setTextChip(bubbleStyles[newValue])
        setValue(newValue);
    };

    const handleColorChange = (color) => {
        setTextChipColor(color);
    };

    const tabLabels = ['Default', 'Stay positive', 'Work hard', 'Make it happen', 'Focus on goal', 'Believe in yourself', 'Keep moving', 'Never give up', 'Stay strong', 'Be humble', 'Embrace change'];

    return (
        <Box sx={{ width: 'auto', bgcolor: 'background.paper', marginTop: "10px" }}>
            <Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="auto"
                aria-label="scrollable auto tabs example"
                sx={{
                    '&.MuiTabs-scrollButtons': {
                        width: '20px',
                        color: '#284B63',
                    },
                }}
                TabIndicatorProps={{
                    style: {
                        backgroundColor: "",
                        height: '4px'
                    }
                }}
            >
                {Array.from({ length: 10 }).map((_, index) => (
                    <Tab
                        key={index}
                        label={
                            <Chip
                                label={tabLabels[index]}
                                style={{
                                    backgroundColor: index === value ? qrTextProps.qrTextChipColor : 'gray',
                                    color: index === 0 ? 'black' : 'white',
                                    ...bubbleStyles[index % bubbleStyles.length],
                                    margin: "10px"
                                }}
                            />
                        }
                    />
                ))}
            </Tabs>
            <div className='pl-4 flex items-center gap-4'>
                <p className='mt-4'>Color Bubble</p>
                <div className="flex items-center p-3 mt-4 gap-2 w-2/3 bg-white border border-gray-300 rounded shadow-md" >
                    <ColorPicker setColor={handleColorChange} initialColor={qrTextProps.qrTextChipColor} position={"top-[-380px] left-[100px]"} />
                    <span>{qrTextProps.qrTextChipColor}</span>
                </div>
            </div>
        </Box>
    );
}