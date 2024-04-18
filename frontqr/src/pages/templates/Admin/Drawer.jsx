import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
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
import UseSwitchesCustom from '../../../components/Admin/SwitchesTheme';
import UserProfileMenu from '../../../components/Admin/Profile';
import logo from "../../../assets/imgs/logoForms.png"
import Tooltip from '@mui/material/Tooltip';

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

const AppBar = styled(MuiAppBar, {
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
            backgroundColor: '#284B63',
            flexShrink: 0,
            whiteSpace: 'nowrap',
            boxSizing: 'border-box',
            ...(open ? openedMixin(theme) : closedMixin(theme)),
            '& .MuiListItemIcon-root': {
                color: 'white',
            },
            '& .MuiListItemText-root': {
                color: 'white',
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
        path: "/admin/app2"
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

    const handleDrawerToggle = () => {
        setOpen(!open);
    };

    return (
        <>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerToggle}
                        edge="start"
                        sx={{
                            margin: 0.2,
                            marginRight: 5,
                            '&:hover': {
                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            },
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h5" noWrap component="div">
                        Qryptogenia
                    </Typography>
                    <Box sx={{ flexGrow: 0, marginLeft: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <UseSwitchesCustom />
                        <UserProfileMenu />
                    </Box>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <DrawerHeader open={open}>
                    <img src={logo} alt="Logo" />
                </DrawerHeader>
                <List>
                    {menuItems.map((item, index) => (
                        <ListItem key={item.title} disablePadding sx={{ display: 'block' }}>
                            <Tooltip title={item.title} placement="right" disableHoverListener={open}>
                                <ListItemButton
                                    component={NavLink}
                                    to={item.path}
                                    sx={{
                                        minHeight: 50,
                                        justifyContent: 'center',
                                        justifyContent: open ? 'initial' : 'center',
                                        px: 2.5,
                                        margin: 1,
                                        '&:hover': {
                                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                        },
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            margin: 'auto',
                                            mr: open ? 3 : 'auto',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        {item.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={item.title} sx={{ opacity: open ? 1 : 0 }} />
                                </ListItemButton>
                            </Tooltip>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </>
    );
}