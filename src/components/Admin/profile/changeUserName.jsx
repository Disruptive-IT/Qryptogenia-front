import React, { useState, useContext, useRef, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { AuthContext } from "../../../context/AuthContext";
import { Toaster, toast } from 'sonner'
import { MdLockOutline } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";

const ChangeInfo = ({ formRef, setModalIsOpen, handleCloseModal }) => {
  const { fetchUserData } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  
    const { changeUsername } = useContext(AuthContext); // Renombramos a changeUserInfo para manejar cambio de usuario
  
    const initialValues = {
      new_username: "", // Campo para el nuevo nombre de usuario
      password: "", // Campo para la contraseña actual
    };

    useEffect(() => {
      async function fetchData() {
        try {
          const userData = await fetchUserData();
          setUser(userData);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }

      fetchData();
    }, [fetchUserData]);
  
    const handleChangeInfo = async (values, actions) => {
  
      try {
        // Envía la solicitud para cambiar la información de usuario (nombre de usuario) incluyendo la contraseña actual
        const result = await changeUsername(values.new_username, values.password);
        console.log(result);
        if (result.success) {
          // Muestra un toast de éxito
          toast.success("Username changed successfully");
          // Cierra la modal
          user.info.username = values.new_username
          handleCloseModal()
        } else {
          // Si hay un error, establece los errores de formulario apropiados
          if (result.error && result.error.response) {
            const status = result.error.response.status;
            if (status === 400) {
              actions.setFieldError("password", "Incorrect password");
              toast.error("Incorrect password");
            } else {
              actions.setFieldError("newUsername", "Username change error");
              toast.error("Username change error");
            }
          } else {
            toast.error("There was an unexpected problem");
          }
        }
      } catch (error) {
        console.error("Error changing user information:", error);
        toast.error("There was a problem changing the information. Please try again later.");
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
            <div className="flex md:w-64 ">
                  <span className="inline-flex items-center px-2 text-lg text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md dark:bg-my-gray dark:text-black dark:border-gray-600">
                    <FaRegUser />
                  </span>
              <Field
                className="rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-my-gray dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="text"
                placeholder="New username"
                name="new_username"
                required
              />
              </div>
              <div className="flex md:w-64 ">
                  <span className="inline-flex items-center px-2 text-lg text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md dark:bg-my-gray dark:text-black dark:border-gray-600">
                    <MdLockOutline />
                  </span>
              <Field
                className="rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-my-gray dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="password"
                placeholder="Current password"
                name="password"
                required
              />
              </div>
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