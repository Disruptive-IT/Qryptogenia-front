import React, { useState, useContext, useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { AuthContext } from "../../../context/AuthContext";
import { Toaster, toast } from 'sonner'

const ChangeInfo = ({ formRef, setModalIsOpen }) => {
    const { user } = useContext(AuthContext);
  
    const { changeUsername } = useContext(AuthContext); // Renombramos a changeUserInfo para manejar cambio de usuario
  
    const initialValues = {
      new_username: "", // Campo para el nuevo nombre de usuario
      password: "", // Campo para la contraseña actual
    };
  
    const handleChangeInfo = async (values, actions) => {
  
      try {
        // Envía la solicitud para cambiar la información de usuario (nombre de usuario) incluyendo la contraseña actual
        const result = await changeUsername(values.new_username, values.password);
        console.log(result);
        if (result.success) {
          // Muestra un toast de éxito
          toast.success("Nombre de usuario cambiado correctamente");
          // Cierra la modal
          user.username = values.new_username
          actions.resetForm();
          setModalIsOpen(false);
        } else {
          // Si hay un error, establece los errores de formulario apropiados
          if (result.error && result.error.response) {
            const status = result.error.response.status;
            if (status === 400) {
              actions.setFieldError("password", "Contraseña incorrecta");
              toast.error("Contraseña incorrecta");
            } else {
              actions.setFieldError("newUsername", "Error en el cambio de nombre de usuario");
              toast.error("Error en el cambio de nombre de usuario");
            }
          } else {
            toast.error("Hubo un problema inesperado");
          }
        }
      } catch (error) {
        console.error("Error al cambiar la información de usuario:", error);
        toast.error("Hubo un problema al cambiar la información. Por favor, inténtelo de nuevo más tarde.");
      }
    };
  
    return (
      <Formik
        initialValues={initialValues}
        onSubmit={handleChangeInfo}
        innerRef={formRef}
      >
        {(formikProps) => (
          <Form className="gap-3 flex flex-col">
              <Field
                className="p-2 border-solid border-MyGray border rounded-md bg-MyGray text-black"
                type="text"
                placeholder="Nuevo nombre de usuario"
                name="new_username"
                required
              />
              <Field
                className="p-2 border-solid border-MyGray border rounded-md bg-MyGray text-black"
                type="password"
                placeholder="Contraseña actual"
                name="password"
                required
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500"
              />
          </Form>
        )}
      </Formik>
    );
  };


  export default ChangeInfo;