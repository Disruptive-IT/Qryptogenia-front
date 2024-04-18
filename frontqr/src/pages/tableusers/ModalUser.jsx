import React from 'react';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const UserModal = ({ openDialog, setOpenDialog, selectedUser }) => {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        height: 250,
        bgcolor: '#353535',
        boxShadow: 24,
        p: 4,
        gap: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3,
        color: '#D9D9D9'
    };

    const userInfoStyle = {
        marginTop: 40
    };


    return (
        <Modal open={openDialog} onClose={() => setOpenDialog(false)} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box sx={style}>
                    <div>
                        {selectedUser && (
                            <div className="flex justify-center w-full">
                                <div className="flex justify-center w-full">
                                    <div className="text-gray-1000 rounded-lg bg-indigo-500 p-2" style={{ width: '100%' }}>
                                        <p className="text-center">USER DETAILS: {selectedUser.username}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    {selectedUser && (
                        <div  style={userInfoStyle}>
                            <div >
                                <p className="text-gray-1000 mb-1">Username: {selectedUser.username}</p>
                                <p className="text-gray-1000 mb-1">Email: {selectedUser.email}</p>
                                <p className="text-gray-1000 mb-1">Status: {selectedUser.is_active ? 'Activo' : 'Inactivo'}</p>
                            </div>
                        </div>
                    )}
                    <div style={{ position: 'absolute', bottom: '10px', right: '10px' }}>
                        <Button variant="contained" color="error" onClick={() => setOpenDialog(false)}>CLOSE</Button>
                    </div>
                </Box>
            </Modal>
    );
};

export default UserModal;