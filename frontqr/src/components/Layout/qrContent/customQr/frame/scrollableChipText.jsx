import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';

const bubbleStyles = [
    { borderRadius: '50%', padding: '8px 12px' },
    { borderRadius: '25% 75% / 75% 25%', padding: '6px 14px' },
    { borderRadius: '30% 70% / 70% 30%', padding: '7px 13px' },
    { borderRadius: '40% 60% / 60% 40%', padding: '9px 11px' },
    { borderRadius: '100% 0% / 0% 100%', padding: '10px 15px' },
    { borderRadius: '50% 50% 0 0 / 50% 50% 0 0', padding: '12px 18px' },
    { borderRadius: '0 0 50% 50% / 0 0 50% 50%', padding: '14px 16px' },
    { borderRadius: '50% 0 0 50% / 50% 0 0 50%', padding: '15px 17px' },
    { borderRadius: '0 50% 50% 0 / 0 50% 50% 0', padding: '16px 18px' },
    { borderRadius: '20% 80% 30% 70% / 60% 40% 60% 40%', padding: '17px 19px' },
];

export default function ScrollableChipText({ onTabSelect }) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        onTabSelect(bubbleStyles[newValue]);
    };

    const tabLabels = ['Stay positive', 'Work hard', 'Make it happen', 'Focus on goal', 'Believe in yourself', 'Keep moving', 'Never give up', 'Stay strong', 'Be humble', 'Embrace change'];

    return (
        <Box sx={{ width: 'auto', bgcolor: 'background.paper' }}>
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
            >
                {Array.from({ length: 10 }).map((_, index) => (
                    <Tab
                        key={index}
                        label={
                            <Chip
                                label={tabLabels[index]}
                                style={{
                                    backgroundColor: index === value ? '#284B63' : 'gray',
                                    color: 'white',
                                    ...bubbleStyles[index % bubbleStyles.length],
                                }}
                            />
                        }
                    />
                ))}
            </Tabs>
        </Box>
    );
}