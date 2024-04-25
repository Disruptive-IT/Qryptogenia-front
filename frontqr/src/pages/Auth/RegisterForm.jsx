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
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rem nihil necessitatibus quo, est alias perspiciatis.</p>
                  </div>
                  <div className="inputGroup relative">
                    <Field className="authInputs" type="email" name="email" placeholder="Correo electrónico" />
                    <ErrorMessage name="email" className="errorMessaje absolute left-4 top-8" component='span' />
                  </div>
                  <div className='flex flex-col gap-4 pt-4'>
                    <SubmitButton text="Registrarse" />
                    <GoogleButton text="Log in with Google" />
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
