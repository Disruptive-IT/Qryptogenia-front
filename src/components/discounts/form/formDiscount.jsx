import { useFormik } from "formik";
import { motion } from "framer-motion";
import './formStyle.css'
import instance from "../../../libs/axios";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";

/*
 * @Author : Nicolas Barrios,   @date 2024-08-05 18:45:26
 * @description : formulario de crear descuento
 * @Props :
 * @return : 
 */

const CreateDiscount = ({event, efect}) => {

    const [isAdd,setIsAdd]=useState(false);

    const handleIsAdd=(bool)=>{
        setIsAdd(bool);
        console.log(isAdd);
    }

    const handlePostDiscount = async (data,evento) => {
        try {
            const response = await instance.post("/admin/addDiscount", data);
            if (response.status === 200) {
                console.log("Discount added successfully");
                if (typeof evento === 'function') {
                    await evento();
                }
                handleIsAdd(true);
                await Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Discount added successfully!',
                    confirmButtonColor:"#3C6E71"
                });
            }
        } catch (error) {
            console.error("Error: ", error.message);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error to send data'
            })
            ;
        }
    }

    const initialValues = {
        discount: "",
        description: "",
        limit_date: new Date().toISOString().split('T')[0],
        use_quantity: 0
    };

    const validate = (values) => {
        const errors = {};

        if (!values.discount) {
            errors.discount = "Required discount value";
        }

        if (!values.description) {
            errors.description = "Required";
        }

        if (values.limit_date === new Date().toISOString().split('T')[0]) {
            errors.limit_date = "The limit date cannot be the current one, please change the date";
        }

        if (values.use_quantity <= 0) {
            errors.use_quantity = "Quantity must be greater than zero";
        }

        return errors;
    };
    
    const formik = useFormik({
        initialValues,
        validate,
        onSubmit: async (values, { setSubmitting}) => {
            try {
                await handlePostDiscount(values,event);
            } catch (error) {
                setStatus(false);
                console.error(error);
            } finally {
                setSubmitting(false);
            }
        },
    });

    useEffect(() => {
        const handleEffect=async()=>{
            await efect();
            handleIsAdd(false);
        }

        handleEffect();
    },[isAdd]);
    


    return (
        <div>
            <form
                className="relative bg-slate-100 my-3 mx-auto p-6 max-w-md rounded-lg shadow-md"
                onSubmit={formik.handleSubmit}
            >
                <div className="mb-6">
                    <label className="block text-sm font-semibold mb-2" htmlFor="discount">
                        Discount
                    </label>
                    <input
                        className="w-full p-3 text-sm text-gray-800 border border-cyan-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        type="text"
                        name="discount"
                        id="discount"
                        onChange={formik.handleChange}
                        value={formik.values.discount}
                    />
                    {formik.errors.discount ? (
                        <div className="text-red-500 text-xs mt-1">{formik.errors.discount}</div>
                    ) : null}
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-semibold mb-2" htmlFor="description">
                        Description
                    </label>
                    <input
                        className="w-full p-3 text-sm text-gray-800 border border-cyan-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        type="text"
                        name="description"
                        id="description"
                        onChange={formik.handleChange}
                        value={formik.values.description}
                    />
                    {formik.errors.description ? (
                        <div className="text-red-500 text-xs mt-1">{formik.errors.description}</div>
                    ) : null}
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-semibold mb-2" htmlFor="limit_date">
                        Limit Date
                    </label>
                    <input
                        className="w-full p-3 text-sm text-gray-800 border border-cyan-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        type="date"
                        name="limit_date"
                        id="limit_date"
                        onChange={formik.handleChange}
                        value={formik.values.limit_date}
                    />
                    {formik.errors.limit_date ? (
                        <div className="text-red-500 text-xs mt-1">{formik.errors.limit_date}</div>
                    ) : null}
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-semibold mb-2" htmlFor="user_quantity">
                        Quantity
                    </label>
                    <input
                        className="w-full p-3 text-sm text-gray-800 border border-cyan-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        type="number"
                        name="use_quantity"
                        id="use_quantity"
                        onChange={formik.handleChange}
                        value={formik.values.use_quantity}
                    />
                    {formik.errors.use_quantity ? (
                        <div className="text-red-500 text-xs mt-1">{formik.errors.user_quantity}</div>
                    ) : null}
                </div>

                <div className="flex justify-end flex-wrap">
                    <motion.button
                        whileTap={{ scale: "0.9", transition: ".2s" }}
                        type="submit"
                        className="px-6 py-2 mx-3 my-2 bg-light-blue hover:bg-dark-blue text-white text-sm font-semibold rounded-lg"
                    >
                        Submit
                    </motion.button>
                    <motion.button
                        whileTap={{ scale: "0.9", transition: ".2s" }}
                        type="button"
                        onClick={event}
                        className="px-6 py-2 my-2 bg-my-red hover:bg-red-500 text-white text-sm font-semibold rounded-lg"
                    >
                        Cancel
                    </motion.button>
                </div>
            </form>
        </div>
    );
};

export default CreateDiscount;
