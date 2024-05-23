import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';

export default function ScrollableChipText({ onTabSelect }) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        onTabSelect(fontStyles[newValue]);
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
                    '&.MuiTabs-scrollButtons': {
                        width: '20px',
                        color: '#284B63',
                    },
                }}
            >
                {Array(10).fill().map((_, index) => (
                    <Tab
                        key={index}
                        label={
                            <Chip 
                                label={`Tab ${index + 1}`} 
                                style={{
                                    backgroundColor: 'gray', 
                                    color: 'black', 
                                }} 
                            />
                        }
                    />
                ))}
            </Tabs>
        </Box>
    );
}