import React, { useState } from "react";
import { motion } from "framer-motion";
import { Modal, Backdrop, Box, Fade } from "@mui/material";
import CreateDiscount from "./formDiscount";

/*
 * @Author : Nicolas Barrios,   @date 2024-08-05 18:45:58
 * @description : creación de modal que abre formulario de creación de descuentos
 * @Props :
 * @return :
 */

/*
 * @UpdatedBy : Nicolas Barrios,   @date 2024-08-08 15:14:11
 * @description : se pusieron estilos responsive para la modal del formulario
 */

function DiscountModal() {
    const [modal, setModal] = useState(false);

    const handleOpen = () => {
        setModal(true);
        console.log("Modal is open");
    };

    const handleClose = () => {
        setModal(false);
        console.log("Modal is closed");
    };

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
        <div className="w-full h-auto p-4  mx-auto flex justify-center">
            <motion.button
                className="text-[13px] text-white font-bold p-2 bg-[#007bff] rounded-lg hover:bg-[#0056b3] focus:outline-none focus:ring-2 focus:ring-cyan-500"
                whileHover={{ backgroundColor: "#2783e4" }}
                whileTap={{ scale: "0.9", transitionDuration: ".2s" }}
                onClick={handleOpen}
            >
                Create Discount
            </motion.button>
            <Modal
                open={modal}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={modal}>
                    <Box sx={style}>
                        <CreateDiscount event={handleClose} />
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}

export default DiscountModal;
