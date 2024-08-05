import React, { useState } from "react";
import { motion } from "framer-motion";
import { Modal, Backdrop, Box, Fade } from "@mui/material";
import CreateDiscount from "./formDiscount";
import {Formik} from 'formik'

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
        bgcolor: "#dcdcdc",
        border: "2px solid #transparent",
        p:1,
        borderRadius: "10px"
    };

    return (
        <div className="w-[12%] h-auto p-1 my-[2%] bg-transparent">
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
                    <div className="p-2 text-red-600 bg-transparent text-[20px] relative top-0 text-center left-0 w-auto h-auto">
                        <h1 onClick={handleClose} className="hover:cursor-pointer font-medium hover:underline">CERRAR</h1>
                    </div>
                    <CreateDiscount />
                </Box>
            </Modal>
        </div>
    );
}

export default DiscountModal;
