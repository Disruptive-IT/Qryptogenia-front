import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

export default function ScrollableFrameQrs({ onTabSelect }) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        onTabSelect(fontStyles[newValue]);
    };

    const fontStyles = [
        { width: "50px", background: "#f2f2f2", padding: "0.5rem", borderRadius: "5px" },
        { fontFamily: 'Arial, sans-serif', fontWeight: 'bold', fontSize: '16px', textAlign: 'center' },
        { fontFamily: 'Verdana, serif', fontStyle: 'italic', fontSize: '16px', textAlign: 'center' },
        { fontFamily: 'Courier New, monospace', fontWeight: 'normal', fontSize: '16px', textAlign: 'justify' },
        { fontFamily: 'Times New Roman, Times, serif', fontWeight: 'bold', fontSize: '16px', textAlign: 'left' },
        { fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: '16px', textAlign: 'right' },
        { fontFamily: 'Lucida Console, Monaco, monospace', fontWeight: 'normal', fontSize: '16px', textAlign: 'left' },
        { fontFamily: 'Tahoma, Geneva, sans-serif', fontStyle: 'normal', fontSize: '16px', textAlign: 'right' },
        { fontFamily: 'Impact, Charcoal, sans-serif', fontWeight: 'bold', fontSize: '16px', textAlign: 'center' },
        { fontFamily: 'Comic Sans MS, Chalkboard SE, sans-serif', fontStyle: 'italic', fontSize: '16px', textAlign: 'left' },
        { fontFamily: 'Brush Script MT, Brush Script, cursive', fontStyle: 'normal', fontSize: '16px', textAlign: 'right' }
    ];

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
                {fontStyles.map((style, index) => {
                    const fontName = style.fontFamily ? style.fontFamily.split(',')[0] : 'x';
                    return <Tab key={index} label={<span style={style}>{fontName}</span>} />;
                })}
            </Tabs>
        </Box>
    );
}