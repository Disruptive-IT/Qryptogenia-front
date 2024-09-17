import { useState } from "react";
import React, { useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { SubmitButton } from "../../components/auth/pure/submitButton";
import { toast } from "sonner";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { IoIosMail } from "react-icons/io";
import AuthSwitcher from "../../components/auth/pure/AuthSwitcher";
import { RecoverPassForm } from "./RecoverPassPage";
import logo from "../../../public/Logo.png";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import { useTranslation } from "react-i18next";

/**
 * @Author : Daniel Salazar,   @date 2024-07-29 12:21:16
 * @description :
 * @Props :null
 * @return :component <ForgotPassForm />
 */

export const ForgotPassForm = () => {
  const [backendError, setBackendError] = useState(null);
  const [redirectToLogin, setRedirectToLogin] = useState(false); // Estado para controlar la redirección
  const { forgotPassword } = useContext(AuthContext);
  const { t } = useTranslation();


  const onSubmit = async (data) => {
    try {
      const loadingToast = toast.loading("Sending recovery e-mail...", {
        position: "bottom-right",
      });

      const result = await forgotPassword(data.email);

      toast.dismiss(loadingToast);

      if (result.success) {
        toast.success("Recovery email sent successfully", {
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
        toast.error("E-mail not registered in our system", {
          position: "bottom-right",
          style: {
            fontSize: "15px",
            padding: "25px",
          },
        });
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      // Manejar el error aquí, puedes mostrar un toast de error genérico
      toast.error("An error occurred, please try again later", {
        position: "bottom-right",
        style: {
          fontSize: "15px",
          padding: "25px",
        },
      });
    }
  };

  return (
    <div>
      {redirectToLogin && <Navigate to="/login" />}{" "}
      {/* Redirecciona si redirectToLogin es verdadero */}
      <Formik
        initialValues={{
          email: "",
        }}
        validate={(values) => {
          const errors = {};
          if (!values.email) {
            errors.email = t("Email is required");
          } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
            errors.email = t("Please enter a valid e-mail");
          }
          return errors;
        }}
        onSubmit={onSubmit}
      >
        {({ isSubmitting, values, errors, setErrors }) => (
          <section className="flex w-full h-screen justify-center items-center bg-gradient-to-r from-dark-blue to-light-blue ">
            <Link to="/" className="text-my-gray flex gap-2 absolute top-1 left-2 w-48 transition-all duration-300 hover:scale-105 hover:underline">
              <FaArrowLeft className="text-2xl" />
              <p>{t("Back Home")}</p>
            </Link>
            <Form className="flex flex-col flex-nowrap border-2 border-white rounded-xl w-[calc(100%-20px)] md:w-[700px] p-5 shadow-2xl bg-gray-200">
              

              <div className="flex flex-col items-center justify-center sm:mt-14 transition-all duration-500">
                <img src={logo} alt="logo" className="w-20 h-20 drop-shadow-lg " />
                <h1 className="text-[30px] font-bold tex-center cursor-default">
                  <span className="text-dark-blue">{t("Forgot")}</span> {t("Password")}

                </h1>
              </div> 

              <span className="fullWidth text-center text-gray-400 py-3">
                {t("Enter your email adress to send you a password recovery email")}
              </span>

              <div className="flex w-full flex-col h-14 mb-3">
                <div className="flex  ">
                  <span className="inline-flex items-center px-2 text-lg text-my-gray bg-dark-blue border rounded-e-0 border-gray-300 border-e-0 rounded-s-md dark:bg-my-gray dark:text-black dark:border-gray-600">
                    <IoIosMail />
                  </span>
                  <Field
                    className="rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-my-gray dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:dark-blue dark:focus:border-blue-500"
                    type="email"
                    title="Email"
                    name="email"
                    placeholder={t("Email")}
                    autoComplete="off"
                    onFocus={() => {
                      // Limpiar el mensaje de error del backend cuando se enfoca en el campo de correo electrónico
                      if (backendError) {
                        setBackendError(null);
                      }
                    }}
                    maxLength="255"
                  />
                </div>
                <div className="errorMessageContainer">
                  {errors.email && (
                    <span className="text-red-600 font-semibold">
                      {errors.email}
                    </span>
                  )}
                  {backendError && (
                    <span className="text-red-600 font-semibold">
                      {backendError}
                    </span>
                  )}
                </div>
              </div>
              <SubmitButton text={t("Send Email")} disabled={isSubmitting} />
              <AuthSwitcher text={t("Sign Up")} to="/login" />
            </Form>
          </section>
        )}
      </Formik>
    </div>
  );
};
