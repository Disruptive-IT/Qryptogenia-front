import { useFormik } from "formik";
import { motion } from "framer-motion";
import './formStyle.css'
/*
 * @Author : Nicolas Barrios,   @date 2024-08-05 18:45:26
 * @description : formulario de crear descuento
 * @Props :
 * @return : 
 */

const CreateDiscount = ({ event }) => {
    const initialValues = {
        discount: 0,
        description: "",
        limit_date: new Date().toISOString().split('T')[0], // Se establece en formato de fecha
        user_quantity: 0 // Añadido campo user_quantity a los valores iniciales
    };

    const validate = (values) => {
        const errors = {};

        if (!values.discount) {
            errors.discount = "Required discount value";
        } else if (values.discount <= 0) {
            errors.discount = "You cannot create a discount equal to zero";
        }

        if (!values.description) {
            errors.description = "Required";
        }

        if (values.limit_date === new Date().toISOString().split('T')[0]) {
            errors.limit_date = "The limit date cannot be the current one, please change the date";
        }

        if (values.user_quantity <= 0) {
            errors.user_quantity = "Quantity must be greater than zero";
        }

        return errors;
    };

    const formik = useFormik({
        initialValues,
        validate,
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    return (
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
                    type="number"
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
                    name="user_quantity"
                    id="user_quantity"
                    onChange={formik.handleChange}
                    value={formik.values.user_quantity}
                />
                {formik.errors.user_quantity ? (
                    <div className="text-red-500 text-xs mt-1">{formik.errors.user_quantity}</div>
                ) : null}
            </div>

            <div className="flex justify-around flex-wrap">
                <motion.button
                    whileTap={{ scale: "0.9", transition: ".2s" }}
                    type="submit"
                    className="px-6 py-2 bg-[#007bff] text-white text-sm font-semibold rounded-lg"
                >
                    Submit
                </motion.button>
                <motion.button
                    whileTap={{ scale: "0.9", transition: ".2s" }}
                    onClick={event}
                    className="px-6 py-2 bg-red-600 hover:bg-red-500 text-white text-sm font-semibold rounded-lg"
                >
                    Cancel
                </motion.button>
            </div>
        </form>
    );
};

export default CreateDiscount;
