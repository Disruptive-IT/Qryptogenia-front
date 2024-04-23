import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { SubmitButton } from '../../components/auth/pure/submitButton';
import { useAuthContext } from "../../context/AuthContext";
import { useLoader } from '../../context/LoaderContext';
import { SchemaRegisterValidate } from '../../helpers/validate/auth.validate';
import PinVerificationForm from '../../components/auth/PinVerificationForm';
import logo from "../../assets/imgs/logoForms.png"; // Asegúrate de que esta ruta sea correcta
import { IconsLeft } from '../../components/auth/pure/iconsLeft'; // Asegúrate de que esta ruta sea correcta
import CompleteRegisterForm from '../../components/auth/CompleteRegisterForm';

const RegisterForm = () => {
  const { registerUser } = useAuthContext();
  const { startLoading, stopLoading } = useLoader();
  const [showPinVerification, setShowPinVerification] = useState(false);
  const [showCompleteRegister, setShowCompleteRegister] = useState(false);
  const [email, setEmail] = useState(''); // Para almacenar el correo electrónico

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

  const handleCompleteRegisterSuccess = () => {
    setShowCompleteRegister(true);
  }


  return (
    <>
      <div className="authFormContainer my-20 m-auto">
        <div className="formContainer">
          <div className="otherSide"></div>
          <div className="inputsGroupsEnd fullWidth">
            <h1 className="authTittle"><span className='text-[#284B63]'>QR</span>yptogenia</h1>
            {!showPinVerification && !showCompleteRegister ? (
              <Formik
                initialValues={{ email: '' }}
                validationSchema={SchemaRegisterValidate}
                onSubmit={handleSubmit}
              >
                <Form>
                  <div className="inputGroup relative">
                    <Field className="authInputs" type="email" name="email" placeholder="Correo electrónico" />
                    <ErrorMessage name="email" className="errorMessaje absolute left-7" component='span' />
                  </div>
                  <SubmitButton text="Registrarse" />
                </Form>
              </Formik>
            ) : showPinVerification && !showCompleteRegister ? (
              <PinVerificationForm onSuccess={handlePinVerificationSuccess} email={email} />
            ) : (
              <CompleteRegisterForm onSuccess={handleCompleteRegisterSuccess} email={email}/>
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
