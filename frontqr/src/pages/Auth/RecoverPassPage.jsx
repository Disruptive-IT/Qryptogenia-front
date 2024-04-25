import { useLocation, Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import React, { useContext } from 'react';
import { SubmitButton } from "../../components/auth/pure/submitButton";
import { IconsRight } from "../../components/auth/pure/iconsRight";
import logo from "../../assets/imgs/logoForms.png"
import { AuthContext } from "../../context/AuthContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useParams } from 'react-router-dom';
// import toast from 'react-hot-toast';
import { Toaster, toast } from 'sonner'

export const RecoverPassForm = () => {
  const { register, handleSubmit, setError } = useForm();
  const params = new URLSearchParams(location.search);
  const token = params.get('token');
  const { recoverPassword } = useContext(AuthContext);
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  const [showPassword, setShowPassword] = useState({
    newPassword: false,
    confirmPassword: false,
  });
  const [error, setErrorState] = useState('');

  const onSubmit = async (data) => {
    try {
      console.log('Formulario de recuperación de contraseña enviado:', data);
      console.log('Valor de token:', token);
      const { success } = await recoverPassword(data.confirmPassword, token); // Acceder al token desde data.token
      if (!data.token) { // Verificar si el token está presente en los datos del formulario
        setError('token', { type: 'manual', message: 'Token no válido. Por favor, asegúrate de tener el enlace correcto.' });
        return;
      }
  
      console.log('Token enviado al servidor:', data.token); // Mostrar el token enviado al servidor
  
      console.log('Respuesta del servidor:', success);
  
      if (success) {
        toast.success("¡Tu contraseña ha sido cambiada con éxito!", {
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
        toast.error('Error al cambiar la contraseña.', {
          position: "bottom-right",
          style: {
            fontSize: '15px',
            padding: '25px',
          },
        });
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  const handleTogglePassword = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <div className="authFormsContainer">
      <div className="fullWidth">
        <div className="boxContainer">
        {redirectToLogin && <Navigate to="/login" />}
        <Formik
        initialValues={{
          password: "",
          confirmPassword: "",
          token: token // Agregar el token como un campo oculto en el formulario
        }}
        validate={(values) => {
          const errors = {};
          
          if (!values.password) {
            errors.password = "La contraseña es requerida";
          }

          if (!values.confirmPassword) {
            errors.confirmPassword = "Confirmar la contraseña es requerido";
          } else if (values.password !== values.confirmPassword) {
            errors.confirmPassword = "Las contraseñas no coinciden";
          }
          return errors;
        }}
        onSubmit={onSubmit}
      >
        <Form className="authFormContainer">
          <div className="formContainer">
            <div className="inputsGroupsStart fullWidth">
              <h1 className="authTittle">
                <span className="text-[#284B63]">QR</span>yptogenia
              </h1>
              <span className="fullWidth">
                Ingresa tu nueva contraseña
              </span>
              <div className="inputGroup">
                <Field
                  className="authInputs emailIcon"
                  type="password"
                  title="Nueva Contraseña"
                  name="password"
                  placeholder="Nueva Contraseña"
                />
              </div>
              <ErrorMessage name="password" component='span' className="errorMessaje" style={{ marginBottom: '10px', color: 'red' }} />
              <div className="inputGroup">
                <Field
                  className="authInputs candado"
                  type="password"
                  title="Confirmar Contraseña"
                  name="confirmPassword"
                  placeholder="Confirmar Contraseña"
                />
              </div>
              <ErrorMessage name="confirmPassword" component='span' className="errorMessaje" style={{ marginBottom: '10px', color: 'red' }} />
              {/* Campo oculto para enviar el token */}
              <Field type="hidden" name="token" value={token} />
              <SubmitButton text="Recuperar Contraseña" />
            </div>
            <img src={logo} className="elLogoRigth" alt="" />
            <IconsRight />
          </div>
        </Form>
      </Formik>
        </div>
      </div>
    </div>
  );
};