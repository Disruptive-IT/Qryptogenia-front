import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { SubmitButton } from '../../components/auth/pure/submitButton';
import { GoogleButton } from '../../components/auth/pure/googleButton';
import { useAuthContext } from "../../context/AuthContext";
import { useLoader } from '../../context/LoaderContext';
import { SchemaRegisterValidate } from '../../helpers/validate/auth.validate';
import PinVerificationForm from '../../components/auth/PinVerificationForm';
import logo from "../../assets/imgs/logoForms.png";
import { IconsLeft } from '../../components/auth/pure/iconsLeft';
import CompleteRegisterForm from '../../components/auth/CompleteRegisterForm';
import AuthSwitcher from '../../components/auth/pure/AuthSwitcher';
import { IoIosMail } from "react-icons/io";


const RegisterForm = () => {
  const { registerUser } = useAuthContext();
  const { startLoading, stopLoading } = useLoader();
  const [showPinVerification, setShowPinVerification] = useState(false);
  const [showCompleteRegister, setShowCompleteRegister] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubmit = async (values, { resetForm }) => {
    startLoading();
    try {
      const result = await registerUser(values.email);
      stopLoading();
      if (result.success) {
        resetForm();
        setEmail(values.email);
        setShowPinVerification(true);
      }
    } finally {
      stopLoading();
    }
  };

  const handlePinVerificationSuccess = () => {
    setShowCompleteRegister(true);
  };

  const handleSendVerification = () => {
    setShowPinVerification(false);
  };

  // Función para manejar el inicio de sesión con Google
  function navigate(url){
    window.location.href = url
  }

  async function auth() {
    try {
      const response = await fetch('http://localhost:3000/api/auth', {
        method: 'POST'
      });
      const data = await response.json();
      if (response.ok) {
        navigate(data.url);
      } else {
        console.error('Error:', data.error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }


  return (
    <>
      <AuthSwitcher text="Ir al Login" to="/login" />
      <div className="authFormContainer m-auto">
        <div className="formContainer">
          <div className="otherSide"></div>
          <div className="inputsGroupsEnd fullWidth">
            {!showPinVerification && !showCompleteRegister ? (
              <Formik
                initialValues={{ email: '' }}
                validationSchema={SchemaRegisterValidate}
                onSubmit={handleSubmit}
              >
                <Form>
                  <div className='mb-5'>
                    <h1 className="authTittle mb-4"><span className='text-[#284B63]'>QR</span>yptogenia</h1>
                    <p>Enter your email address and you will receive a verification code to complete your registration.</p>
                  </div>

                  <div className='flex flex-col h-14'>
                    <div className="flex  ">
                      <span className="inline-flex items-center px-2 text-lg text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md dark:bg-my-gray dark:text-black dark:border-gray-600">
                        <IoIosMail/>
                      </span>
                      <Field className="rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-my-gray dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:dark-blue dark:focus:border-blue-500" type="email" title="Email" name="email" placeholder="Email" maxLength="255" /><br />
                    </div>
                    <ErrorMessage name="email" className="text-red-600 font-semibold" component='span' />
                  </div>

                 
                  <div className='flex flex-col gap-4 pt-4'>
                    <SubmitButton text="Sing up" />
                    <GoogleButton text="Sing up with Google" onClick={auth} />
                  </div>
                </Form>
              </Formik>
            ) : showPinVerification && !showCompleteRegister ? (
              <PinVerificationForm onSuccess={handlePinVerificationSuccess} onSendVerification={handleSendVerification} email={email} />
            ) : (
              <CompleteRegisterForm email={email} />
            )}
          </div>
          <img src={logo} className="elLogoLeft" alt="Logo" />
          <IconsLeft />
        </div>
      </div>
    </>
  );
};

export default RegisterForm;
