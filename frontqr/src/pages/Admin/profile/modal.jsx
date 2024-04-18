import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

function CustomModal({ open, onClose, title, children, actions }) {
    return (
        <Modal open={open} onClose={onClose} aria-labelledby="modal-title" aria-describedby="modal-description">
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: '#353535',
                    boxShadow: 24,
                    p: 4,
                    gap: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 3,
                    color: '#D9D9D9'
                }}
            >
                <h2 id="modal-title">{title}</h2>
                {children}

                <div className='flex gap-x-3'>
                    {Array.isArray(actions) && actions.map((action, index) => (
                        <Button key={index} onClick={action.onClick} color={action.color || "primary"} variant={action.variant || "contained"}>
                            {action.label}
                        </Button>
                    ))}
                </div>
            </Box>
        </Modal>
    );
}

export default CustomModal;