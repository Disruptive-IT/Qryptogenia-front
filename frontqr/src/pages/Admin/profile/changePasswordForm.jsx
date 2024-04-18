
import React, { useState, useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { AuthContext } from "../../../context/AuthContext";

const ChangePasswordForm = ({ formRef }) => {
    let { changePassword } = useContext(AuthContext);

    const initialValues = {
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    };
    const [successMessage, setSuccessMessage] = useState(""); // Estado para manejar el mensaje de éxito

    const validateForm = (values) => {
        const errors = {};
        if (values.newPassword !== values.confirmPassword) {
            errors.confirmPassword = "Las contraseñas no coinciden";
        }
        return errors;
    };

    const handlePasswordChange = async (values, actions) => {
        try {
            // Obtener el token de autenticación del almacenamiento local del navegador
            const authTokenObject = JSON.parse(localStorage.getItem("authTokens"));
            const accessToken = authTokenObject.access;

            // Envía la solicitud para cambiar la contraseña incluyendo el token de autenticación
            const result = await changePassword(values.newPassword, values.oldPassword, accessToken);

            if (result.success) {
                // Si la solicitud se realiza con éxito, establece un mensaje de éxito
                setSuccessMessage("Contraseña cambiada correctamente");
            } else {
                // Si hay un error, establece el error de confirmación de contraseña en el estado de Formik
                if (result.error && result.error.response && result.error.response.status === 400) {
                    actions.setFieldError("oldPassword", "Contraseña incorrecta");
                } else {
                    actions.setFieldError("confirmPassword", "Contraseña incorrecta");
                }
            }
        } catch (error) {
            console.error('Error al cambiar la contraseña:', error);
            actions.setFieldError("confirmPassword", "Hubo un problema al cambiar la contraseña. Por favor, inténtelo de nuevo más tarde.");
        }
    };


    return (

        <Formik initialValues={initialValues} validate={validateForm} onSubmit={handlePasswordChange} innerRef={formRef} >
            {(formikProps) => (
                <Form>
                    <div className="gap-3 flex flex-col">
                        <Field className="p-2 border-solid border-MyGray border rounded-md bg-MyGray text-black" type="password" placeholder="Old Password" name="oldPassword" required />
                        <Field className="p-2 border-solid border-MyGray border rounded-md bg-MyGray text-black" type="password" placeholder="New Password" name="newPassword" required />
                        <Field className="p-2 border-solid border-MyGray border rounded-md bg-MyGray text-black" type="password" placeholder="Confirm Password" name="confirmPassword" required />
                        <ErrorMessage name="confirmPassword" component="div" className="text-red-500" />
                    </div>
                    {successMessage && ( // Mostrar mensaje de éxito si existe
                        <div className="text-green-500">{successMessage}</div>
                    )}

                </Form>
            )}
        </Formik>
    );
};

export default ChangePasswordForm;