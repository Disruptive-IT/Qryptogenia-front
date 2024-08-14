import React, { useState } from "react";
import { motion } from "framer-motion";
import { Modal, Backdrop, Box, Fade } from "@mui/material";
import CreateDiscount from "./formDiscount";
import ModalComponent from "./modal";

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

function AddDiscount({reload}) {

    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return(
                <div className="w-full h-auto p-4  mx-auto flex justify-center">
                <motion.button
                    className="text-[13px] text-white font-bold p-2 bg-[#007bff] rounded-lg hover:bg-[#0056b3] focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    whileHover={{ backgroundColor: "#2783e4" }}
                    whileTap={{ scale: "0.9", transitionDuration: ".2s" }}
                    onClick={handleOpen}
                >
                    Create Discount
                </motion.button>
                <ModalComponent 
            isOpen={open}
            onClose={handleClose}
        >
            <CreateDiscount event={handleClose} efect={reload}/>
        </ModalComponent>
            </div>
    )
}

export default AddDiscount
