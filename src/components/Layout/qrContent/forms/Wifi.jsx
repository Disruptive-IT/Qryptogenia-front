import { useFormik } from "formik";
import { useEffect, useState } from "react";
import instance from "../../../../libs/axios";
import Swal from "sweetalert2";
import { useQr } from "../../../../context/QrContext";
import { useValidate } from "../../../../context/validateFormContext";

function FormWifi() {
    const [initialValues, setInitialValues] = useState({
        ssid: "",
        security_type: "",
        password: ""
    });

    const { qrData, setQrData } = useQr();
    const {validateFormWifi,setValidateFormWifi}=useValidate();

    const handleWifiLink = (link) => {
        setQrData(link);
    };

    let wifiLink;

    const validateFormFields=()=>{
        if (Object.keys(formik.errors).length > 0) {
            setValidateFormWifi(false);
            return false;
          } else {
            setValidateFormWifi(true);
            return true;
          }
      }


    const getWifi = async () => {
        try {
            const result = await Swal.fire({
                title: "<strong>STATE ALERT</strong>",
                icon: "question",
                html: `<h1>Are you sure you want to get data of the current wifi connection</h1>`,
                showConfirmButton: true,
                confirmButtonColor: "#3C6E71",
                showCancelButton: true,
                cancelButtonColor: "#dc2626",
            });
            if (result.isConfirmed) {
                const getDataWifi = await instance("/getWifi");
                if (getDataWifi.status === 200) {
                    const wifiData = getDataWifi.data[0];
                    const security = securityOptions.find(
                        (option) => option === wifiData.security_type
                    );
                    setInitialValues((prevValues) => ({
                        ...prevValues,
                        ssid: wifiData?.wifi_name || prevValues.ssid,
                        security_type: security || prevValues.security_type,
                        password: prevValues.password,
                    }));
                    formik.setValues({
                        ssid: wifiData?.wifi_name || "",
                        security_type: wifiData?.security_type || "",
                        password: "",
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

        if (values.security_type=='selecciona') {
            errors.security_type = "Security type is required";
        }

        if (values.security_type !== "OPEN" && !values.password) {
            errors.password = "Password is required for secured networks";
        }

        return errors;
    };

    const handlerOnChange = (e, field, handler) => {
        setInitialValues((prevValues) => {
            const updatedValues = {
                ...prevValues,
                [field]: e.target.value,
            };
            
            const securityType = updatedValues.security_type === "OPEN" ? "nopass" : updatedValues.security_type;
            const wifiLink = `WIFI:T:${securityType};S:${updatedValues.ssid};P:${updatedValues.password};`;
    
            handleWifiLink(wifiLink);
    
            return updatedValues;
        });
        handler(e);
    };

    const formik = useFormik({
        initialValues,
        validate,
        enableReinitialize: true,
        validateOnChange: false,
        validateOnBlur: true,
        onSubmit: (values, { setSubmitting, resetForm }) => {
            setTimeout(() => {
                if (values) {
                    const securityType = initialValues.security_type === "OPEN" ? "nopass" : initialValues.security_type || values.security_type;
                    wifiLink = `WIFI:T:${securityType};S:${initialValues.ssid || values.ssid};P:${initialValues.password || values.password};`;
                    handleWifiLink(wifiLink);
                }                
                resetForm();
                setSubmitting(false);
                setInitialValues({
                    ssid: "",
                    security_type: "",
                    password: ""
                });
            }, 400);
        }
    });

    useEffect(()=>{
        validateFormFields();
    },[formik.errors])

    return (
        <div>
            <div className="flex items-center mt-6 mb-4">
                <button type="button" onClick={getWifi} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" 
                            style={{ backgroundColor: '#284B63', color: '#fff' }}
                            onMouseEnter={(e) => e.target.style.backgroundColor = '#3C6E71'} // Cambia el color al hacer hover
                            onMouseLeave={(e) => e.target.style.backgroundColor = '#284B63'} // Vuelve al color original al salir del hoover
                            disabled={formik.isSubmitting}>
                    Get Wifi Data
                </button>
            </div>
            <form className="max-w-4xl mx-auto mt-8 relative" onSubmit={formik.handleSubmit}>
                <div className="flex flex-col w-full md:w-2/3 mr-6 mb-[10px] md:mb-0">
                    <label htmlFor="ssid" className="mb-3">SSID o Nombre de la Red</label>
                    <input
                        type="text"
                        id="ssid"
                        name="ssid"
                        onChange={(e) => handlerOnChange(e, "ssid", formik.handleChange)}
                        onBlur={formik.handleBlur}
                        value={formik.values.ssid}
                        className="border w-full border-gray-300 rounded p-2 mb-4"
                    />
                    {formik.touched.ssid && formik.errors.ssid ? (
                        <div className="relative text-red-500 text-sm">{formik.errors.ssid}</div>
                    ) : null}
                </div>
                <div className="flex flex-col w-full md:w-2/3 mr-6 mb-[10px] md:mb-0">
                    <label htmlFor="security_type" className="mb-3">Tipo de Seguridad</label>
                    <select
                        name="security_type"
                        id="security_type"
                        onChange={(e) => handlerOnChange(e, "security_type", formik.handleChange)}
                        onBlur={formik.handleBlur}
                        value={formik.values.security_type}
                        className="border w-full border-gray-300 rounded p-2 mb-4"
                    >
                        <option value="">Selecciona</option>
                        {securityOptions.map(option => (
                            <option key={option} value={option}>
                                {option.replace(/_/g, ' ').toUpperCase()}
                            </option>
                        ))}
                    </select>
                    {formik.touched.security_type && formik.errors.security_type ? (
                        <div className="relative text-red-500 text-sm">{formik.errors.security_type}</div>
                    ) : null}
                </div>
                <div className="flex flex-col w-full md:w-2/3 mr-6 mb-[10px] md:mb-0">
                    <label htmlFor="password" className="mb-3">Contraseña</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        onChange={(e) => handlerOnChange(e, "password", formik.handleChange)}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                        className="border w-full border-gray-300 rounded p-2 mb-4"
                    />
                    {formik.touched.password && formik.errors.password ? (
                        <div className="relative text-red-500 text-sm">{formik.errors.password}</div>
                    ) : null}
                </div>
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" disabled={formik.isSubmitting}>
                    Submit
                </button>
            </form>
        </div>
    );
}

export default FormWifi;
