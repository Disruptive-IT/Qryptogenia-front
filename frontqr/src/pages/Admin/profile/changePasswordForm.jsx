import React, { useState, useContext, useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { AuthContext } from "../../../context/AuthContext";
import { Toaster, toast } from 'sonner'

const ChangePasswordForm = ({ formRef, setModalIsOpen }) => {
  let { changePassword } = useContext(AuthContext);

  const initialValues = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const validateForm = (values) => {
    const errors = {};
    if (values.newPassword !== values.confirmPassword) {
      errors.confirmPassword = "Las contraseñas no coinciden";
    }
    return errors;
  };

  const handlePasswordChange = async (values, actions) => {
    try {
      // Envía la solicitud para cambiar la contraseña incluyendo el token de autenticación
      const result = await changePassword(
        values.newPassword,
        values.oldPassword
      );

      if (result.success) {
        // Muestra el toast de éxito
        toast.success("Contraseña cambiada correctamente");
        // Cierra la modal
        actions.resetForm();
        setModalIsOpen(false);
      } else {
        // Si hay un error, establece el error de confirmación de contraseña en el estado de Formik
        if (
          result.error &&
          result.error.response &&
          result.error.response.status === 400
        ) {
          actions.setFieldError("oldPassword", "Contraseña incorrecta");
          toast.error("Contraseña i");
        } else {
          actions.setFieldError("confirmPassword", "Contraseña incorrecta");
          toast.error("Contraseña Incorrecta");
          actions.resetForm();
        }
      }
    } catch (error) {
      console.error("Error al cambiar la contraseña:", error);
      toastError("Hubo un problema al cambiar la contraseña. Por favor, inténtelo de nuevo más tarde.");
      actions.setFieldError(
        "confirmPassword",
        "Hubo un problema al cambiar la contraseña. Por favor, inténtelo de nuevo más tarde."
      );
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validate={validateForm}
      onSubmit={handlePasswordChange}
      innerRef={formRef}
    >
      {(formikProps) => (
        <Form className="gap-3 flex flex-col">
            <Field
              className="p-2 border-solid border-MyGray border rounded-md bg-MyGray text-black"
              type="password"
              placeholder="Old Password"
              name="oldPassword"
              required
            />
            <Field
              className="p-2 border-solid border-MyGray border rounded-md bg-MyGray text-black"
              type="password"
              placeholder="New Password"
              name="newPassword"
              required
            />
            <Field
              className="p-2 border-solid border-MyGray border rounded-md bg-MyGray text-black"
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              required
            />
            <ErrorMessage
              name="confirmPassword"
              component="div"
              className="text-red-500"
            />
        </Form>
      )}
    </Formik>
  );
};

export default ChangePasswordForm;