import * as React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
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
import { PhoneContentSwitch } from '.';
import { contentTexts } from './contentData';
import CustomQr from './customQr';
import Button from '@mui/material/Button';
import './index.css'

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



export default function ChangeFrame({ name, appFormValues, socialFormValues, musicFormValues, location, qrId }) {
    const { contentName } = useParams();
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down(1023)); // Detecta si la pantalla es pequeña
    const isSpecialContent = ['pdf', 'website-url','wifi'].includes(contentName.toLowerCase()); // Verifica si contentName es "pdf" o "url"
    const [value, setValue] = React.useState((isSmallScreen || isSpecialContent) ? 1 : 0); // Inicializa en el tab de "QR" si la pantalla es pequeña o el contentName es especial
    const [isTabClickable, setIsTabClickable] = React.useState(true);

    console.log(contentName)
    console.log("ChangeFrame - appFormValues:", appFormValues);
    console.log("ChangeFrame - socialFormValues:", socialFormValues);
    console.log("ChangeFrame - musicFormValues:", musicFormValues);

    React.useEffect(() => {
        if (isSmallScreen || isSpecialContent) {
            setValue(1); // Cambia al tab de "QR" si la pantalla es pequeña o el contentName es especial
            setIsTabClickable(false); // Hace el tab "QR" no clickeable
        } else {
            setValue(0); // Cambia al tab de "Phone" si la pantalla es grande y el contentName no es especial
            setIsTabClickable(true); // Hace los tabs clickeables
        }
    }, [isSmallScreen, isSpecialContent]);

    React.useEffect(() => {
        // Esta función se ejecutará cada vez que cambie la prop `name`
        setValue((isSmallScreen || isSpecialContent) ? 1 : 0);
    }, [name, isSmallScreen, isSpecialContent]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const content = contentTexts[contentName.toLowerCase().replace(/\s+/g, '-')];
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
            <Box className="flex items-center flex-col w-full h-full">
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
                        {!(isSmallScreen || isSpecialContent) && <Tab label="Phone" />}  {/* Oculta el tab "Phone" en pantallas pequeñas o para contentName especial */}
                        <Tab label="QR" disabled={!isTabClickable} />
                    </Tabs>
                </AppBar>
                {!(isSmallScreen || isSpecialContent) && (
                    <TabPanel value={value} index={0} dir={theme.direction} className="w-full flex justify-center">
                        <div className="w-full max-w-[450px]">
                            <h2 className="text-center text-2xl font-bold mb-8">Preview CellPhone</h2>
                            <CellBox className="w-full">
                                <PhoneContentSwitch
                                    contentName={name}
                                    appFormValues={appFormValues}
                                    socialFormValues={socialFormValues}
                                    musicFormValues={musicFormValues}
                                />
                            </CellBox>
                        </div>
                    </TabPanel>
                )}
                <TabPanel value={value} index={1} dir={theme.direction} className="w-full flex justify-center">
                    <div className="w-[420px] max-w-[500px] px-5 relative">
                        <h2 className="text-center text-2xl font-bold mb-8">Preview QRytogenia</h2>
                        <CustomQr 
                        location={location}
                        qrId={qrId}
                        />
                    </div>
                </TabPanel>
            </Box>
        </section >
    );
}