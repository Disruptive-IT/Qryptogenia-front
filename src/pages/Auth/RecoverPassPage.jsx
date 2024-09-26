/**
 * @Author : Cristian Rueda,   @date 2024-09-18 19:47:33
 * @description : Se crea formato de validación utilizando la herramienta Yup
 * @Props :
 * @return :
 */

import { useLocation, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import React, { useContext } from "react";
import { SubmitButton } from "../../components/auth/pure/submitButton";
import logo from "../../../public/Logo.png";
import { AuthContext } from "../../context/AuthContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useTranslation } from "react-i18next";
import { Toaster, toast } from "sonner";
import { FaLock, FaLockOpen } from "react-icons/fa";
import * as Yup from "yup";



export const RecoverPassForm = () => {
  const { register, handleSubmit, setError } = useForm();
  const params = new URLSearchParams(location.search);
  const token = params.get("token");
  const { recoverPassword } = useContext(AuthContext);
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  const [showPassword, setShowPassword] = useState({
    newPassword: false,
    confirmPassword: false,
  });
  const { t } = useTranslation();


  const validationSchema = Yup.object().shape({ //Manejo de validaciones 
    password: Yup.string()
      .min(8, t('Password is too short - should be 8 chars minimum'))
      .matches(/[a-zA-Z]/, t('The password cannot contain only numbers'))
      .matches(/[A-Z]/, t('Password must contain at least one uppercase letter'))
      .matches(/[a-z]/, t('Password must contain at least one lowercase letter'))
      .matches(/[0-9]/, t('Password must contain at least one number'))
      .matches(/[!@#$%^&*(),.?":{}|<>]/, t('Password must contain at least one special character'))
      .required(t('Password is required')),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], t('Passwords must match'))
      .required(t('Confirm Password is required')),
  });

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);

  };
  const onSubmit = async (data) => {
    try {
      console.log("Formulario de recuperación de contraseña enviado:", data);
      console.log("Valor de token:", token);
      const { success } = await recoverPassword(data.confirmPassword, token); // Acceder al token desde data.token
      if (!data.token) {
        // Verificar si el token está presente en los datos del formulario
        setError("token", {
          type: "manual",
          message:
            "Token no válido. Por favor, asegúrate de tener el enlace correcto.",
        });
        return;
      }

      console.log("Token enviado al servidor:", data.token); // Mostrar el token enviado al servidor

      console.log("Respuesta del servidor:", success);

      if (success) {
        toast.success("¡Tu contraseña ha sido cambiada con éxito!", {
          position: "bottom-right",
          style: {
            fontSize: "15px",
            padding: "25px",
          },
        });
        setTimeout(() => {
          setRedirectToLogin(true);
        }, 3000);
      } else {
        toast.error("Error al cambiar la contraseña.", {
          position: "bottom-right",
          style: {
            fontSize: "15px",
            padding: "25px",
          },
        });
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  const handleTogglePassword = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <div>
      {redirectToLogin && <Navigate to="/login" />}
      <Formik
        initialValues={{
          password: "",
          confirmPassword: "",
          token: token, // Agregar el token como un campo oculto en el formulario
        }}
        validationSchema={validationSchema} //Traemos el schema de Yup
        onSubmit={onSubmit}

      >
        <section className="flex w-full h-screen justify-center items-center bg-gradient-to-r from-dark-blue to-light-blue  ">
          <Form className="flex flex-col gap-4 flex-nowrap border-2 border-white rounded-xl w-[calc(100%-20px)] md:w-[700px] p-5 shadow-2xl bg-gray-200">
           

            <div className="flex flex-col items-center justify-center sm:mt-14 transition-all duration-500">
              <img src={logo} alt="logo" className="w-20 h-20 drop-shadow-lg " />
              <h1 className="text-[30px] font-bold tex-center cursor-default">
                <span className="text-[#284B63]">{t("Recover")}</span> {t("Password")}
              </h1>
            </div> 
            <span className="w-full text-center text-gray-400">
              {t("Set your new password")}
            </span>

            <div className="flex flex-col h-14 w-full sm:w-[100%] px-10">
              {/*  //?box input Password */}
              <div className="flex md:w-full ">
                <span
                  className="inline-flex items-center px-2 text-lg text-my-gray cursor-pointer bg-dark-blue border rounded-e-0 border-gray-300 border-e-0 rounded-s-md dark:bg-my-gray dark:text-black dark:border-gray-600"
                  onClick={toggleShowPassword}
                >
                  {showPassword ? <FaLockOpen /> : <FaLock />}
                </span>
                <Field
                  className={`rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 text-sm border-gray-300 p-2.5  dark:bg-my-gray dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 `}
                  type={showPassword ? "text" : "password"}
                  title={t("Password")}
                  name="password"
                  placeholder={t("Password")}
                  maxLength="64"
                />
                <br />
              </div>
              <ErrorMessage
                name="password"
                className="text-red-600 font-semibold"
                component="span"
              />
            </div>

            <div className="flex flex-col h-14 w-full sm:w-[100%] px-10">
              {/*  //?box input Password */}
              <div className="flex md:w-full ">
                <span
                  className="inline-flex items-center px-2 text-lg text-my-gray cursor-pointer bg-dark-blue border rounded-e-0 border-gray-300 border-e-0 rounded-s-md dark:bg-my-gray dark:text-black dark:border-gray-600"
                  onClick={toggleShowPassword}
                >
                  {showPassword ? <FaLockOpen /> : <FaLock />}
                </span>
                <Field
                  className={`rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 text-sm border-gray-300 p-2.5  dark:bg-my-gray dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 `}
                  type={showPassword ? "text" : "password"}
                  title={t("Confirm Password")}
                  name="confirmPassword"
                  placeholder={t("Confirm Password")}
                  maxLength="64"
                />
                <br />
              </div>
              <ErrorMessage
                name="confirmPassword"
                className="text-red-600 font-semibold"
                component="span"
              />
            </div>

            {/* Campo oculto para enviar el token */}
            <Field type="hidden" name="token" value={token} />
            <SubmitButton text={t("Recover Password")} />
          </Form>
        </section>
      </Formik>
    </div>
  );
};
