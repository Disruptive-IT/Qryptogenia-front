import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import instance from "../../../libs/axios";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const UpdateDiscount = ({ event, id, reload }) => {
    const [discountData, setDiscountData] = useState(null);
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const [isUpdate,setIsUpdate]=useState(false);
    const { t } = useTranslation();
    const handleIsUpdate=(value)=>{
        setIsUpdate(value);
        console.log(value);
    }

    const formik = useFormik({
        initialValues: {
            discount: "",
            description: "",
            limit_date: new Date().toISOString().split('T')[0],
            use_quantity: 0
        },
        validate: (values) => {
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
        },
        onSubmit: async (values, { setSubmitting, setStatus }) => {
            try {
                await handlePutDiscount(values, id, event);
                setStatus({ success: true });
            } catch (error) {
                setStatus({ success: false, message: 'Error al enviar los datos' });
                console.error(error);
            } finally {
                setSubmitting(false);
            }
        },
    });

    const handlePutDiscount = async (data, id, evento) => {
        try {
            const response = await instance.put(`/admin/putDiscount/${id}`, data);
            if (response.status === 200) {
                console.log("Discount updated successfully");
                if (typeof evento === 'function') {
                    await evento();
                }
                handleIsUpdate(true);
                await Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Discount updated successfully!',
                    confirmButtonColor:"#3C6E71"
                });
            }
        } catch (error) {
            console.error("Error: ", error.message);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error to send data'
            });
        }
    };

    const recoverData = async (id) => {
        try {
            const getDiscount = await instance.get(`/admin/getDiscount/${id}`);
            if (getDiscount.status === 200) {
                setDiscountData(getDiscount.data);
                console.log(getDiscount.data);
            }
        } catch (error) {
            console.error("error: ", error.message);
        }
    };

    useEffect(() => {
        if (id) {
            recoverData(id);
        }
    }, [id]);

    //esta funcion configura la zona horaria para limit date
    const adjustDateToLocal = (dateString) => {
        const date = new Date(dateString);
        date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
        return date.toISOString().split('T')[0];
    };
    
    //este efecto establece los valores inciales del formik para actualizar el registro
    useEffect(() => {
        if (discountData) {
            const formattedDate = discountData.limit_date 
                ? adjustDateToLocal(discountData.limit_date) 
                : new Date().toISOString().split('T')[0];
            
            formik.setValues({
                discount: discountData.discount || "",
                description: discountData.description || "",
                limit_date: formattedDate,
                use_quantity: discountData.use_quantity || 0
            });
            setIsDataLoaded(true);
        }
    }, [discountData]);
    

    useEffect(() => {
        const handleUpdateEffect = async () => {
            await reload();
            handleIsUpdate(false);
        };

        handleUpdateEffect();
    }, [isUpdate]);

    if (!isDataLoaded) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <form
                className="relative bg-slate-100 my-3 mx-auto p-6 max-w-md rounded-lg shadow-md"
                onSubmit={formik.handleSubmit}
            >
                <div className="mb-6">
                    <label className="block text-sm font-semibold mb-2" htmlFor="discount">
                        {t("Discount")}
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
                    {t("Description")}
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
                    {t("Limit Date")}
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
                    <label className="block text-sm font-semibold mb-2" htmlFor="use_quantity">
                    {t("Quantity")}
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
                        <div className="text-red-500 text-xs mt-1">{formik.errors.use_quantity}</div>
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

export default UpdateDiscount;


