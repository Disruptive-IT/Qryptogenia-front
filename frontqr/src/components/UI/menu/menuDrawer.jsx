import * as React from 'react';
import PropTypes from 'prop-types';
import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { grey } from '@mui/material/colors';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import CustomLink from '../../../components/Layout/CustomLink';
import UseSwitchesCustom from '../../../components/UI/theme/SwitchesTheme';
import { Link, useLocation } from 'react-router-dom';

const drawerBleeding = 56;

const Root = styled('div')(({ theme }) => ({
    height: '100%',
    backgroundColor:
        theme.palette.mode === 'light' ? grey[100] : theme.palette.background.default,
}));

const StyledBox = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'light' ? '#fff' : grey[800],
}));

const Puller = styled('div')(({ theme }) => ({
    width: 30,
    height: 6,
    backgroundColor: theme.palette.mode === 'light' ? grey[300] : grey[900],
    borderRadius: 3,
    position: 'absolute',
    top: 8,
    left: 'calc(50% - 15px)',
}));

function MenuDrawer(props) {
    const { window } = props;
    const [open, setOpen] = React.useState(false);
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path;
    };

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const container = window !== undefined ? () => window().document.body : undefined;

    React.useEffect(() => {
        setOpen(false);
    }, [location]);

    return (
        <Root sx={{
            '@media (min-width:768px)': {
                display: 'none',
            }
        }}>
            <CssBaseline />
            <Global
                styles={{
                    '.MuiDrawer-root >.MuiPaper-root': {
                        height: `calc(50% - ${drawerBleeding}px)`,
                        overflow: 'visible',
                    },
                }}
            />
            <Box sx={{
                position: 'absolute',
                top: 15,
                right: 15,
                zIndex: 99,
                borderRadius: '100%',
                width: 45,
                height: 45,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#284B63',
            }}>
                <Button
                    onClick={toggleDrawer(!open)}
                    sx={{ color: 'white' }}>
                    {open ? <CloseIcon /> : <MenuIcon />}
                </Button>
            </Box>
            <SwipeableDrawer
                container={container}
                anchor="bottom"
                open={open}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
                swipeAreaWidth={drawerBleeding}
                disableSwipeToOpen={false}
                ModalProps={{
                    keepMounted: true,
                    style: { zIndex: 90 },
                }}
                sx={{
                    '@media (min-width:768px)': {
                        display: 'none',
                    }
                }}
            >
                <StyledBox
                    sx={{
                        position: 'absolute',
                        top: -drawerBleeding,
                        borderTopLeftRadius: 8,
                        borderTopRightRadius: 8,
                        visibility: 'visible',
                        right: 0,
                        left: 0,
                        textAlign: 'center',
                    }}
                >
                    <Puller />
                    <Typography sx={{ p: 2, color: "#3c6e71", fontWeight: "bold" }}>Menú</Typography>
                </StyledBox>
                <StyledBox
                    sx={{
                        px: 2,
                        pb: 2,
                    }}
                >
                    <List>
                        <ListItem button>
                            <CustomLink to="/" isActive={isActive('/home')}>Home</CustomLink>
                        </ListItem>
                        <ListItem button>
                            <CustomLink to="#" isActive={isActive('/about')}>About us</CustomLink>
                        </ListItem>
                        <ListItem button>
                            <CustomLink to="#" isActive={isActive('/plans')}>Plans</CustomLink>
                        </ListItem>
                        <ListItem button>
                            <CustomLink to="#" isActive={isActive('/faq')}>FAQ</CustomLink>
                        </ListItem>
                        <ListItem>
                            <Link to="/login" className="py-1 w-full mx-auto text-center px-4 border-2 border-dark-blue h-8 rounded-md bg-black/5 hover:bg-transparent text-dark-blue duration-200">CUENTA</Link>
                        </ListItem>
                    </List>
                </StyledBox>
            </SwipeableDrawer>
        </Root>
    );
}

MenuDrawer.propTypes = {
    window: PropTypes.func,
};

export default MenuDrawer;
