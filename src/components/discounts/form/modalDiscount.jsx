import React, { useState } from "react";
import { motion } from "framer-motion";
import { Modal, Backdrop, Box, Fade } from "@mui/material";
import CreateDiscount from "./formDiscount";
import {Formik} from 'formik'

/*
 * @Author : Nicolas Barrios,   @date 2024-08-05 18:45:58
 * @description : creacionn de modal que abre formulario de creacion de descuentos
 * @Props :
 * @return :
 */

function DiscountModal() {
    const [modal, setModal] = useState(false);

    const handleOpen = () => {
        setModal(true);
        console.log(`modal is ${modal ? "open" : "close"}`);
    };

    const handleClose = () => {
        setModal(false);
        console.log(`modal is ${modal ? "open" : "close"}`);
    };

    const style = {
        position: "absolute",
        top: "10%",
        left: "30%",
        width: "40%",
        bgcolor: "#trasnparent",
        border: "2px solid #transparent",
        p:1,
        borderRadius: "10px"
    };

    return (
        <div className="w-full h-auto p-1 my-[2%] mx-4">
            <motion.button
                className="text-[13px] text-white font-bold hover:cursor-pointer p-2 bg-[#007bff] rounded-[8px]"
                whileHover={{ backgroundColor: "#2783e4" }}
                whileTap={{scale:"0.9",transitionDuration:".2s"}}
                onClick={handleOpen}
            >
                Create Discount
            </motion.button>
            <Modal
                open={modal}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Box sx={style}>
                    <CreateDiscount 
                        event={handleClose}
                    />
                </Box>
            </Modal>
        </div>
    );
}

export default DiscountModal;
