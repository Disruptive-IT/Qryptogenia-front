import { useState } from 'react';
import axios from 'axios';
import React, { useContext } from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import { SubmitButton } from "../../components/auth/pure/submitButton";
import { IconsLeft } from "../../components/auth/pure/iconsLeft";
import logo from "../../assets/imgs/logoForms.png"
import { Toaster, toast } from 'sonner'
import { Navigate } from 'react-router-dom';
import { AuthContext } from "../../context/AuthContext";


export const ForgotPassForm = () => {
  const [backendError, setBackendError] = useState(null);
  const [redirectToLogin, setRedirectToLogin] = useState(false); // Estado para controlar la redirección
  const { forgotPassword } = useContext(AuthContext);
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
            fontSize: '15px',
            padding: '25px',
          },
        });
        setTimeout(() => {
          setRedirectToLogin(true);
        }, 3000);
      } else {
        toast.error('E-mail not registered in our system', {
          position: "bottom-right",
          style: {
            fontSize: '15px',
            padding: '25px',
          },
        });
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      // Manejar el error aquí, puedes mostrar un toast de error genérico
      toast.error('An error occurred, please try again later', {
        position: "bottom-right",
        style: {
          fontSize: '15px',
          padding: '25px',
        },
      });
    }
  };

  return (
    <div className="authFormsContainer">
      <div className="fullWidth">
        <div className="boxContainer">
          {redirectToLogin && <Navigate to="/login" />} {/* Redirecciona si redirectToLogin es verdadero */}
          <Formik
            initialValues={{
              email: "",
            }}
            validate={(values) => {
              const errors = {};
              if (!values.email) {
                errors.email = "El correo es requerido";
              } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
                errors.email = "Please enter a valid e-mail";
              }
              return errors;
            }}
            onSubmit={onSubmit}
          >
            {({ isSubmitting, values, errors, setErrors }) => (
              <Form className="authFormContainer">
                <div className="formContainer">
                  <div className="otherSide"></div>
                  <img src={logo} className="elLogoLeft" alt="" />
                  <IconsLeft />
                  <div className="inputsGroupsEnd fullWidth">
                    <h1 className="authTittle">
                      <span className="negrita">QR</span>yptogenia
                    </h1>
                    <span className="fullWidth" style={{ color: "black" }}>Ingrese tu Email para enviarte un{" "}</span>
                    <span className="fullWidth" style={{ color: "black" }}>correo de recuperacion de contraseña{" "}</span>
                    <div className="inputGroup">
                      <Field
                        className="authInputs emailIcon"
                        type="email"
                        title="Correo electrónico"
                        name="email"
                        placeholder="Correo Electrónico"
                        autoComplete="off"
                        onFocus={() => {
                          // Limpiar el mensaje de error del backend cuando se enfoca en el campo de correo electrónico
                          if (backendError) {
                            setBackendError(null);
                          }
                        }}
                      />
                      <div className="errorMessageContainer">
                        {errors.email && <span className="errorMessaje" style={{ color: 'red' }}>{errors.email}</span>}
                        {backendError && <span className="errorMessaje" style={{ color: 'red' }}>{backendError}</span>}
                      </div>
                    </div>
                    <SubmitButton text="Recuperar contraseña" disabled={isSubmitting} />
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};