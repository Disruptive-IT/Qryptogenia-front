import React, { useState, useContext, useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { AuthContext } from "../../../context/AuthContext";
import { Toaster, toast } from 'sonner'
import { MdLockOutline } from "react-icons/md";
import { RiRotateLockLine } from "react-icons/ri";

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
          <div className="flex md:w-64 ">
                  <span className="inline-flex items-center px-2 text-lg text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md dark:bg-my-gray dark:text-black dark:border-gray-600">
                    <MdLockOutline />
                  </span>
            <Field
              className="rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-my-gray dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="password"
              placeholder="Old Password"
              name="oldPassword"
              required
            />
          </div>
          <div className="flex md:w-64 ">
                  <span className="inline-flex items-center px-2 text-lg text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md dark:bg-my-gray dark:text-black dark:border-gray-600">
                    <RiRotateLockLine />
                  </span>
            <Field
              className="rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-my-gray dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="password"
              placeholder="New Password"
              name="newPassword"
              required
            />
          </div>
          <div className="flex md:w-64 ">
                  <span className="inline-flex items-center px-2 text-lg text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md dark:bg-my-gray dark:text-black dark:border-gray-600">
                    <RiRotateLockLine />
                  </span>
            <Field
              className="rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-my-gray dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              required
            />
          </div>
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