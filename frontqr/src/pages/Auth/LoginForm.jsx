import { useContext, useEffect, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { Link } from 'react-router-dom';
import { SubmitButton } from '../../components/auth/pure/submitButton';
import { GoogleButton } from '../../components/auth/pure/googleButton';
import { IconsRight } from '../../components/auth/pure/iconsRight';
import logo from "../../assets/imgs/logoForms.png"
import { useAuthContext } from "../../context/AuthContext";
import { useLoader } from '../../context/LoaderContext';
import { SchemaLoginValidate } from '../../helpers/validate/auth.validate';
import AuthSwitcher from '../../components/auth/pure/AuthSwitcher';

const LoginForm = () => {
  const { loginUser } = useAuthContext();
  const { startLoading, stopLoading } = useLoader();

  const handleSubmit = async (values, { resetForm }) => {
    startLoading()
    try {
      const result = await loginUser(values);
      stopLoading();
      if (result.success) {
        resetForm();
      }
    } finally {
      stopLoading();
    }
  };

  return (
    <Formik
      initialValues={{ email: '', password: '', terms: false }}
      validationSchema={SchemaLoginValidate}
      onSubmit={handleSubmit}
    >
      {({ values, errors, touched }) => (
        <section>
          <AuthSwitcher text="Ir al Registro" to="/register" />
          <Form className="authFormContainer m-auto">
            <div className="formContainer">
              <div className="inputsGroupsStart fullWidth">
                <h1 className="authTittle"><span className='text-[#284B63]'>QR</span>yptogenia</h1>
                <span className="fullWidth">Enter your details to access</span>
                <div className="inputGroup relative">
                  <Field className="authInputs emailIcon" type="email" title="Email" name="email" placeholder="Email" maxLength="255" /><br />
                  <ErrorMessage name="email" className="errorMessaje absolute left-7" component='span' />
                </div>
                <div className="inputGroup relative" style={{ marginBottom: 0 }}>
                  <Field className="authInputs candado" type="password" title="Password" name="password" placeholder="Password" maxLength="64" /><br />
                  <ErrorMessage name="password" className="errorMessaje absolute left-7" component='span' />
                </div>
                <div className='mt-2 flex flex-col items-start'>
                  <div>
                    <Field type="checkbox" name="remember" className="mr-2" />
                    <label htmlFor="remember">Remember me</label>
                  </div>
                  <div>
                    <Field type="checkbox" name="terms" className="mr-2" />
                    <label htmlFor="terms" className={`${touched.terms && !values.terms ? 'text-red-500' : ''}`}>I accept the Terms and Conditions</label>
                  </div>
                </div>
                <Link className='text-[#103b79]' to="/forgotPassword">Forgot your password?</Link>
                <SubmitButton text="Log in" />
                <GoogleButton text="Log in with Google" />
              </div>
              <img src={logo} className="elLogoRigth" alt="" />
              <IconsRight />
            </div>
          </Form>
        </section>
      )}
    </Formik>
  );
}

export default LoginForm;
