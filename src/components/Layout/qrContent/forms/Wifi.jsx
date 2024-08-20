import { useFormik } from "formik";
import { useState } from "react";
import instance from "../../../../libs/axios";
import Swal from "sweetalert2";

function FormWifi() {
    const [initialValues, setInitialValues] = useState({
        ssid: "",
        security_type: "",
        password: ""
    });

    const getWifi = async () => {
        try {
            const result = await Swal.fire({
                title: "<strong>STATE ALERT</strong>",
                icon: "question",
                html: `<h1>Are you sure you want to generate data of the current wifi connection</h1>`,
                showConfirmButton: true,
                confirmButtonColor: "#3C6E71",
                showCancelButton: true,
                cancelButtonColor: "#dc2626",
              });
              if(result.isConfirmed){
                const getDataWifi = await instance("/getWifi");
                if (getDataWifi.status === 200) {
                    const wifiData = getDataWifi.data[0];
                    const security = securityOptions.find(
                        (option) => option === wifiData.security_type
                    );
                    setInitialValues(prevValues => ({
                        ...prevValues,
                        ssid: wifiData?.wifi_name || prevValues.ssid,
                        security_type: security || prevValues.security_type,
                        password: prevValues.password
                    }));
                    formik.setValues({
                        ssid: wifiData?.wifi_name || "",
                        security_type: wifiData?.security_type || "",
                        password: ""
                    });
                }
              }
            } catch (error) {
                console.error("Error al obtener los datos WiFi:", error);
            }
    };

    const securityOptions = [
        "OPEN", "WEP", "WPA-Personal", "WPA2-Personal", "WPA3-Personal",
        "WPA-Enterprise", "WPA2-Enterprise", "WPA3-Enterprise"
    ];

    const validate = (values) => {
        const errors = {};

        if (!values.ssid) {
            errors.ssid = "SSID is required";
        }

        if (!values.security_type) {
            errors.security_type = "Security type is required";
        }

        if (values.security_type !== "OPEN" && !values.password) {
            errors.password = "Password is required for secured networks";
        }

        return errors;
    };

    const formik = useFormik({
        initialValues,
        validate,
        enableReinitialize: true,
        validateOnChange: false,
        validateOnBlur: true,
        onSubmit: (values, { setSubmitting, resetForm }) => {
            setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                resetForm();
                setSubmitting(false);
            }, 400);
        }
    });

    return (
        <div>
            <div className="flex items-center mt-6 mb-4">
                <button type="button" onClick={getWifi} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" disabled={formik.isSubmitting}>
                    Generate Data
                </button>
            </div>
            <form className="max-w-4xl mx-auto mt-8 relative" onSubmit={formik.handleSubmit}>
                <div className="flex flex-col w-full md:w-2/3 mr-6 mb-6 md:mb-0">
                    <label htmlFor="ssid" className="mb-3">SSID o Nombre de la Red</label>
                    <input
                        type="text"
                        id="ssid"
                        name="ssid"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.ssid}
                        className="border w-full border-gray-300 rounded p-2 mb-9"
                    />
                    {formik.touched.ssid && formik.errors.ssid ? (
                        <div className="text-red-500 text-sm">{formik.errors.ssid}</div>
                    ) : null}
                </div>
                <div className="flex flex-col w-full md:w-2/3 mr-6 mb-4 md:mb-0">
                    <label htmlFor="security_type" className="mb-3">Tipo de Seguridad</label>
                    <select
                        name="security_type"
                        id="security_type"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.security_type}
                        className="border w-full border-gray-300 rounded p-2 mb-9"
                    >
                        <option value="">Selecciona</option>
                        {securityOptions.map(option => (
                            <option key={option} value={option}>
                                {option.replace(/_/g, ' ').toUpperCase()}
                            </option>
                        ))}
                    </select>
                    {formik.touched.security_type && formik.errors.security_type ? (
                        <div className="text-red-500 text-sm">{formik.errors.security_type}</div>
                    ) : null}
                </div>
                <div className="flex flex-col w-full md:w-2/3 mr-6 mb-4 md:mb-0">
                    <label htmlFor="password" className="mb-3">Contraseña</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                        className="border w-full border-gray-300 rounded p-2 mb-9"
                    />
                    {formik.touched.password && formik.errors.password ? (
                        <div className="text-red-500 text-sm">{formik.errors.password}</div>
                    ) : null}
                </div>
                <button type="submit" className="px-4 py-2  bg-blue-500 text-white rounded hover:bg-blue-600" disabled={formik.isSubmitting}>
                    Submit
                </button>
            </form>
        </div>
    );
}

export default FormWifi;
