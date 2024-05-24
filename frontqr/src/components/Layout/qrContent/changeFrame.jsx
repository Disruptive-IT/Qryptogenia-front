import * as React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Zoom from '@mui/material/Zoom';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import UpIcon from '@mui/icons-material/KeyboardArrowUp';
import { green } from '@mui/material/colors';
import Box from '@mui/material/Box';
import CellBox from './cellBox';
import { PhoneContentSwitch} from '.';
import { contentTexts } from './contentData';
// import { WebLinkPhone } from './socialMedia/stylePhone';

import CustomQr from './customQr';
import { social_icons } from 'react-social-icons';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`action-tabpanel-${index}`}
            aria-labelledby={`action-tab-${index}`}
            {...other}
            sx={{ width: '100%' }}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `action-tab-${index}`,
        'aria-controls': `action-tabpanel-${index}`,
    };
}

const fabStyle = {
    position: 'absolute',
    bottom: 16,
    right: 16,
};

const fabGreenStyle = {
    color: 'common.white',
    bgcolor: green[500],
    '&:hover': {
        bgcolor: green[600],
    },
};

export default function ChangeFrame( {name, socialFormValues }) {
    const { contentName } = useParams();
    const theme = useTheme();
    const [value, setValue] = React.useState(0);
    console.log(socialFormValues)

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const content = contentTexts[contentName.toLowerCase().replace(/\s+/g, '-')];
    // const name = contentName.replace(/-/g, ' ');

    if (!content) {
        return <NotFoundPage />;
    }

    const transitionDuration = {
        enter: theme.transitions.duration.enteringScreen,
        exit: theme.transitions.duration.leavingScreen,
    };

    const fabs = [
        {
            color: 'primary',
            sx: fabStyle,
            icon: <AddIcon />,
            label: 'Add',
        },
        {
            color: 'secondary',
            sx: fabStyle,
            icon: <EditIcon />,
            label: 'Edit',
        },
        {
            color: 'inherit',
            sx: { ...fabStyle, ...fabGreenStyle },
            icon: <UpIcon />,
            label: 'Expand',
        },
    ];

    return (
        <section className="relative w-full h-full bg-white shadow-xl rounded-xl">
            <Box className="flex justify-center flex-col items-center">
                <AppBar position="static" sx={{ background: "transparent", textAlign: "center", borderRadius: "20px 20px 0 0", boxShadow: "0 0 10px 0 #ccc" }} >
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        variant="fullWidth"
                        aria-label="action tabs"
                        sx={{
                            '.MuiTabs-indicator': {
                                display: 'block',
                            },
                            '.MuiTab-root.Mui-selected': {
                                color: '#284B63',
                                fontWeight: 'bold',
                            },
                        }}
                    >
                        <Tab label="Phone" {...a11yProps(0)} />
                        <Tab label="QR" {...a11yProps(1)} />
                    </Tabs>
                </AppBar>
                <TabPanel value={value} index={0} dir={theme.direction} className="w-[450px]">
                    <h2 className="text-center text-2xl font-bold mb-8">Preview CellPhone</h2>
                    <CellBox>
                         <PhoneContentSwitch contentName={name} socialFormValues={socialFormValues}/>
                    </CellBox>
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction} sx={{ width: '100%', maxWidth: '500px' }}>
                    <h2 className="text-center text-2xl font-bold mb-8">Preview QRytogenia</h2>
                    <CustomQr />
                </TabPanel>

                {/* {fabs.map((fab, index) => (
                    <Zoom
                        key={fab.color}
                        in={value === index}
                        timeout={transitionDuration}
                        style={{
                            position: "absolute",
                            top:60,
                            transitionDelay: `${value === index ? transitionDuration.exit : 0}ms`,
                        }}
                        unmountOnExit
                    >
                        <Fab sx={fab.sx} aria-label={fab.label} color={fab.color}>
                            {fab.icon}
                        </Fab>
                    </Zoom>
                ))} */}
            </Box>
        </section >
    );
}