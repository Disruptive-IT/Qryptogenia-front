/**
 * @Author : Cristian Escobar,   @date 2024-07-24 08:29:16
 * @description : Este componente permite a los usuarios cambiar su correo electrónico verificando un código enviado al correo actual y al nuevo correo. Muestra formularios dinámicos para la entrada de códigos y correos según el estado de la verificación.
 * @Props : formRef: Referencia para el formulario, setModalIsOpen: Función para cerrar el modal, handleCloseEmail: Función para manejar el cierre del modal al completar el cambio de correo.
 * @return : Un componente Formik que maneja el formulario de cambio de correo electrónico con campos dinámicos para la verificación del código y entrada del nuevo correo, y varios estados que gestionan el flujo del proceso de cambio de correo.
 */


import React, { useState, useContext, useEffect, useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Toaster, toast } from "sonner";
import { AuthContext } from "../../../context/AuthContext";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { IoIosMail } from "react-icons/io";

const ChangeEmail = ({ formRef, setModalIsOpen, handleCloseEmail }) => {
  let {
    handleChangeEmail,
    handleVerifyCode,
    handleChangeNewEmail,
    handleVerifyNewCode,
  } = useContext(AuthContext);
  const [verificationCode, setVerificationCode] = useState("");
  const [newVerificationCode, setNewVerificationCode] = useState("");
  const [message, setMessage] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [newEmailSent, setNewEmailSent] = useState(false);
  const [codeVerified, setCodeVerified] = useState(false);
  const [newCodeVerified, setNewCodeVerified] = useState(false);
  const { fetchUserData } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [confirmChangeEmail, setConfirmChangeEmail] = useState(false);
  const [code, setCode] = useState(["", "", "", ""]);
  const inputRefs = [useRef(), useRef(), useRef(), useRef()]; // Referencias a los inputss
  const [code1, setCode1] = useState(["", "", "", ""]);
  const inputRefs1 = [useRef(), useRef(), useRef(), useRef()]; // Referencias a los inputss

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

  const emaill = user?.info?.email;
  const initialValues = {
    email: "",
    newEmail: "",
  };

  const ChangeEmail = async () => {
    try {
      const response = await handleChangeEmail({ email: emaill });
      setEmailSent(true);
      setMessage("Se ha enviado un correo de verificación");
      setConfirmChangeEmail(true);
    } catch (error) {
      console.error("Error changing email:", error);
      toast.error("Error cambiando correo electrónico");
    }
  };

  const handleChange = (index, value) => {
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Mueve el foco al siguiente campo
    if (value !== "" && index < inputRefs.length - 1) {
      inputRefs[index + 1].current.focus();
    }
  };


  const VerifyCode = async (e) => {
    e.preventDefault();
    const combinedCode = code.join("");
    try {
      const response = await handleVerifyCode(combinedCode);
      setMessage("Código verificado correctamente");
      if (response) {
        setCodeVerified(true);
      } else {
        toast.error("El codigo ingresado es incorrecto");
      }
    } catch (error) {
      toast.error("Error verifying code");
      toast.error("Codigo de verificacion incorrecto");
    }
  };

  const ChangeNewEmail = async (values) => {
    try {
      const response = await handleChangeNewEmail(values);
      setNewEmailSent(true);
      setMessage(
        "Se ha enviado un correo de verificación para el nuevo correo"
      );
    } catch (error) {
      console.error("Error changing email:", error);
      toast.error("Error cambiando correo electrónico");
    }
  };

  const handleChange1 = (index, value) => {
    const newCode1 = [...code1];
    newCode1[index] = value;
    setCode1(newCode1);

    // Mueve el foco al siguiente campo
    if (value !== "" && index < inputRefs1.length - 1) {
      inputRefs1[index + 1].current.focus();
    }
  };


  const VerifyNewCode = async (e) => {
    e.preventDefault();
    const combinedCode = code1.join("");
    try {
      const response = await handleVerifyNewCode(combinedCode);
      if (response) {
        setNewCodeVerified(true);
        handleCloseEmail();
        toast.success("El cambio de correo ha sido exitoso");
      } else {
        toast.error("El codigo ingresado es incorrecto");
      }
    } catch (error) {
      console.error("Error verifying new code:", error);
      toast.error("Error verificando nuevo código");
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={ChangeEmail}
      innerRef={formRef}
    >
      {(formikProps) => (
        <Form className="gap-3 flex flex-col">
          {!confirmChangeEmail &&
            !confirmChangeEmail && ( // Mostrar mensaje de confirmación si no se ha confirmado el cambio de correo
              <div className="flex flex-col items-center">
                <p className="mb-3">
                Are you sure to change your email?
                </p>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                  Confirm change
                </button>
              </div>
            )}

          {emailSent && !codeVerified && (
            <div className="flex flex-col"> {/* Contenedor para el campo de código de verificación, el botón y el mensaje */}
            <div className="flex flex-row items-center"> {/* Contenedor para el campo de código de verificación y el botón */}
            {code.map((code, index) => (
              <Field key={index} name={`code${index}`}>
              {({ field }) => (
                <input
                  {...field}
                  ref={inputRefs[index]} // Asigna la referencia al input
                  className="w-12 h-12 text-center rounded-lg mr-2 bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 text-sm border-gray-300 p-2.5  dark:bg-my-gray dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:dark-blue dark:focus:border-blue-500"
                  type="text"
                  maxLength="1"
                  value={code}
                  onChange={(e) => handleChange(index, e.target.value)}
                />
              )}
            </Field>
            ))}
              <button type="button" onClick={VerifyCode} className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md"><ArrowForwardIcon/></button>

            </div>
            <div className="mt-2"> {/* Contenedor para el mensaje */}
              <p className="text-gray-500 text-sm">A verification code has been sent to the email.</p>
            </div>
          </div>

          )}

          {codeVerified && !newEmailSent && (
            <div className="flex flex-row items-center">
              {" "}
              {/* Contenedor para el campo de nuevo correo y el botón */}
              <div className="flex md:w-64 ">
              <span className="inline-flex items-center px-2 text-lg text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md dark:bg-my-gray dark:text-black dark:border-gray-600">
                    <IoIosMail />
                  </span>
              <Field
                className="rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-my-gray dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:dark-blue dark:focus:border-blue-500"
                type="text"
                placeholder="Ingrese su nuevo correo"
                name="newEmail"
                required
              />
              </div>
              <button
                type="button"
                onClick={() => ChangeNewEmail(formikProps.values)}
                className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                <ArrowForwardIcon />
              </button>
            </div>
          )}

          {newEmailSent && !newCodeVerified && (
            <div className="flex flex-col">
            <div className="flex flex-row items-center">
            {code1.map((code, index) => (
              <Field key={index} name={`code1${index}`}>
              {({ field }) => (
                <input
                  {...field}
                  ref={inputRefs1[index]} // Asigna la referencia al input
                  className="w-12 h-12 text-cente rounded-lg mr-2 bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 text-sm border-gray-300 p-2.5  dark:bg-my-gray dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:dark-blue dark:focus:border-blue-500"
                  type="text"
                  maxLength="1"
                  value={code}
                  onChange={(e) => handleChange1(index, e.target.value)}
                />
              )}
            </Field>
            ))}
              <button
                type="button"
                onClick={VerifyNewCode}
                className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                <ArrowForwardIcon />
              </button>
            </div>
            <div className="mt-2"> {/* Contenedor para el mensaje */}
              <p className="text-gray-500 text-sm">A verification code has been sent to the new email.</p>
            </div>
          </div>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default ChangeEmail;