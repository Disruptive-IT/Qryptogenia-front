import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import { NavLink } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Mails, Menu as MenuIcon, Users, LayoutDashboard, ScanLine, Orbit } from 'lucide-react';
import UserProfileMenu from '../../../components/Admin/Profile';
import logo from "../../../assets/imgs/logoForms.png"
import UseSwitchesCustom from '../../../components/UI/theme/SwitchesTheme';

const drawerWidth = 180;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.easeInOut,
        duration: theme.transitions.duration.enteringScreen * 2,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.easeInOut,
        duration: theme.transitions.duration.leavingScreen * 2,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(10)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme, open }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: "10px 0",
    position: 'relative',
    ...theme.mixins.toolbar,
    '& img': {
        width: open ? '90px' : '45px',
        height: 'auto',
        margin: '10px auto',
        marginBottom: '0',
        transition: 'width 0.3s ease',
    },
}));

const AppBar = styled('div', {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.easeInOut,
        duration: theme.transitions.duration.leavingScreen * 2,
    }),
    backgroundColor: '#284B63',
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.enteringScreen * 2,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        '& .MuiDrawer-paper': {
            width: drawerWidth,
            flexShrink: 0,
            whiteSpace: 'nowrap',
            boxSizing: 'border-box',
            ...(open ? openedMixin(theme) : closedMixin(theme)),
            '& .MuiListItemIcon-root': {
                color: 'black',
            },
            '& .MuiListItemText-root': {
                color: 'black',
            },
        },
        ...(open ? openedMixin(theme) : closedMixin(theme)),
    }),
);

const menuItems = [
    {
        title: "Dashboard",
        icon: <LayoutDashboard />,
        path: "/admin/dashboard"
    },
    {
        title: "Usuarios",
        icon: <Users />,
        path: "/admin/users"
    },
    {
        title: "QRs",
        icon: <ScanLine />,
        path: "/admin/qrs"
    },
    {
        title: "Planes",
        icon: <Orbit />,
        path: "/admin/planes"
    }
];

export default function MiniDrawer() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    return (
        <>
            <CssBaseline />
            <AppBar open={open} className="fixed inset-x-0 z-20 w-full ">
                <div className="bg-white backdrop-blur-xl backdrop-filter md:items-center md:justify-between md:flex-row">
                    <div className="w-full flex flex-row items-center justify-between">
                        <Toolbar>
                            <Typography variant="h5" noWrap component="div">
                                <span className='text-dark-blue'>Qry</span>ptogenia
                            </Typography>
                        </Toolbar>
                        <Toolbar>
                            <Box>
                                <UseSwitchesCustom />
                                <UserProfileMenu />
                            </Box>
                        </Toolbar>
                    </div>
                </div>
            </AppBar>
            <Drawer
                variant="permanent"
                open={open}
                onMouseEnter={handleDrawerOpen}
                onMouseLeave={handleDrawerClose}
            >
                <DrawerHeader open={open}>
                    <img src={logo} alt="Logo" />
                </DrawerHeader>
                <List>
                    {menuItems.map((item, index) => (
                        <ListItem disablePadding sx={{
                            display: 'block',
                            justifyContent: 'center',
                            '&:hover': {
                                backgroundColor: '#ccc',
                                '.MuiListItemIcon-root': {
                                    color: '#284B63'
                                }
                            },
                        }}>
                            <ListItemButton
                                component={NavLink}
                                to={item.path}
                                sx={{
                                    minHeight: 50,
                                    justifyContent: 'center',
                                    px: 2.5,
                                    margin: 1,
                                    '&:hover': {
                                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                        '.MuiListItemText-root': {
                                            color: '#284B63', // Cambia el color del texto al hacer hover
                                        },
                                    },
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        margin: 'auto',
                                    }}
                                >
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText primary={item.title} sx={{ opacity: open ? 1 : 0, marginLeft: "10px" }} /> {/* Centra el texto */}
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </>
    );
}