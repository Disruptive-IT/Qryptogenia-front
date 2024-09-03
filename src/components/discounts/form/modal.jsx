import { Modal, Backdrop, Fade, Box } from "@mui/material";
import { useEffect } from "react";

function ModalComponent({ children, isOpen, onClose }) {

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '90vw',
        maxWidth: '90vw',
        minWidth: '320px',
        maxHeight: '90vh',
        p: 2,
        overflow: 'auto',
        borderRadius: '8px',
        '@media (max-width: 600px)': {
            top: '10%',
            left: '5%',
            transform: 'translate(0, 0)',
        },
        '@media (max-width: 430px)': {
            top: '7%',
            left: '25px',
            width: '96vw',
        },
    };

    return (
        <Modal
            open={isOpen}
            onClose={onClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={isOpen}>
                <Box sx={style}>
                    {children}
                </Box>
            </Fade>
        </Modal>
    );
}

export default ModalComponent;
