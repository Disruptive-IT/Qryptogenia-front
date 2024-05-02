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
import ReCAPTCHA from "react-google-recaptcha";
import { IoIosMail } from "react-icons/io";
import { FaLock } from "react-icons/fa";


const LoginForm = () => {
  const { loginUser } = useAuthContext();
  const { startLoading, stopLoading } = useLoader();
  const [recaptchaValue, setRecaptchaValue] = useState(null);
  const [failedAttempts, setFailedAttempts] = useState(0);

  const handleSubmit = async (values, { resetForm }) => {
    startLoading()
    try {
      if (failedAttempts < 5 || recaptchaValue) {
        const result = await loginUser(values);
        if (result.success) {
          resetForm();
          setFailedAttempts(0);
        }
      }
    } catch (error) {
      setFailedAttempts(prevAttempts => prevAttempts + 1);
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
                
                <div className='flex flex-col h-14'>
                  <div className="flex md:w-64 ">
                    <span className="inline-flex items-center px-2 text-lg text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md dark:bg-my-gray dark:text-black dark:border-gray-600">
                      <IoIosMail/>
                    </span>
                    <Field className="rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-my-gray dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:dark-blue dark:focus:border-blue-500" type="email" title="Email" name="email" placeholder="Email" maxLength="255" /><br />
                  </div>
                  <ErrorMessage name="email" className="text-red-600 font-semibold" component='span' />
                </div>

                <div className="flex flex-col h-14">
                  <div className="flex md:w-64 ">
                    <span className="inline-flex items-center px-2 text-lg text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md dark:bg-my-gray dark:text-black dark:border-gray-600">
                      <FaLock />
                    </span>
                    <Field className="rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-my-gray dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" type="password" title="Password" name="password" placeholder="Password" maxLength="64" /><br />
                  </div>
                  <ErrorMessage name="password" className="text-red-600 font-semibold" component='span' />
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
                {failedAttempts >= 5 && (
                  <ReCAPTCHA
                    sitekey="6Le7X8gpAAAAADgQuIP6xfechyro8XdS6vpDH93T"
                    onChange={value => setRecaptchaValue(value)}
                  />
                )}
                <Link className='text-[#103b79]' to="/forgotPassword">Forgot your password?</Link>
                <SubmitButton text="Log in" />
                <GoogleButton text="Sing in with Google" />
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
