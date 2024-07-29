import { useContext, useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
import { SubmitButton } from "../../components/auth/pure/submitButton";
import { GoogleButton } from "../../components/auth/pure/googleButton";
import { IconsRight } from "../../components/auth/pure/iconsRight";
import logo from "../../assets/imgs/logoForms.png";
import { useAuthContext } from "../../context/AuthContext";
import { useLoader } from "../../context/LoaderContext";
import { SchemaLoginValidate } from "../../helpers/validate/auth.validate";
import AuthSwitcher from "../../components/auth/pure/AuthSwitcher";
import ReCAPTCHA from "react-google-recaptcha";
import { IoIosMail } from "react-icons/io";
import { FaLock, FaLockOpen } from "react-icons/fa";
import axios from "../../libs/axios";

/**
 * @Author : Daniel Salazar,   @date 2024-07-26 11:25:43
 * @description :form login implementation with recaptcha, google login and email and password validation.
 * @Props :null
 * @return :component <LoginForm />
 */

const LoginForm = () => {
  const { loginUser } = useAuthContext();
  const { startLoading, stopLoading } = useLoader();
  const [recaptchaValue, setRecaptchaValue] = useState(null);
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false); //? estate to changge the password to show/hide

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      const result = await loginUser(values);
      if (result.success) {
        resetForm();
        setRecaptchaValue(null);
      } else if (result.showCaptcha === true) {
        setEmail(values.email);
        setShowCaptcha(true);
      }
    } catch (error) {
      console.log("Error ", error);
    } finally {
      setSubmitting(false);
    }
  };

  async function handleGoogleLogin() {
    try {
      console.log("entrando al login2");
      const response = (window.location.href =
        "http://localhost:3000/api/auth/google");
      console.log("entrando al login3");
      if (response.status === 200) {
        setUser(response.data.info.user);
        localStorage.setItem("token", response.data.info.user.token);
        console.log("entrando al login");
      } else {
        console.error("Error:", response.data.error);
      }
    } catch (error) {
      console.err("Error:", err);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      if (recaptchaValue) {
        const res = await axios.post("/auth/verifyRecaptcha", {
          recaptchaToken: recaptchaValue,
          email,
        });
        if (res.data.success) {
          setShowCaptcha(false);
          setRecaptchaValue(null);
        } else {
          setShowCaptcha(true);
        }
      }
    };

    fetchData();
  }, [recaptchaValue, email]);

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={SchemaLoginValidate}
      onSubmit={handleSubmit}
    >
      <section className="w-full mt-24 flex flex-col justify-center items-center ">
        <Form className="flex flex-col flex-nowrap border-2 border-white rounded-xl w-[calc(100%-20px)] md:w-[700px] p-5 shadow-2xl bg-gray-200">
              <h1 className="text-[30px] font-bold tex-center">
                <span className="text-dark-blue">Sing</span>-in
              </h1>
        <div className='border-t-2 border-gray-300 mb-2'></div>
          <div className="flex flex-nowrap">

            <div className="flex flex-col gap-2 justify-center items-center w-full tansition-all duration-500">
             
              <span className="fullWidth text-center text-gray-400">Enter your details to access</span>

              <div className="flex flex-col h-14 w-full sm:w-[90%]  ">{/*  //?box input User */}
                <div className="flex w-full  ">
                  <span className="inline-flex items-center px-2 text-lg text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md dark:bg-my-gray dark:text-black dark:border-gray-600">
                    <IoIosMail />
                  </span>
                  <Field
                    className={`rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-my-gray dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:dark-blue dark:focus:border-blue-500 ${
                      showCaptcha ? "cursor-not-allowed" : ""
                    }`}
                    type="email"
                    title="Email"
                    name="email"
                    placeholder="Email"
                    maxLength="255"
                    disabled={showCaptcha}
                  />
                </div>
                <ErrorMessage
                  name="email"
                  className="text-red-600 font-semibold "
                  component="span"
                />
              </div>

              <div className="flex flex-col h-14 w-full sm:w-[90%] ">{/*  //?box input Password */}
                <div className="flex md:w-full ">
                  <span
                    className="inline-flex items-center px-2 text-lg text-gray-900 cursor-pointer bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md dark:bg-my-gray dark:text-black dark:border-gray-600"
                    onClick={toggleShowPassword}
                  >
                    {showPassword ? <FaLockOpen /> : <FaLock />}
                  </span>
                  <Field
                    className={`rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 text-sm border-gray-300 p-2.5  dark:bg-my-gray dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                      showCaptcha ? "cursor-not-allowed" : ""
                    }`}
                    type={showPassword ? "text" : "password"}
                    title="Password"
                    name="password"
                    placeholder="Password"
                    maxLength="64"
                    disabled={showCaptcha}
                  />
                  <br />
                </div>
                <ErrorMessage
                  name="password"
                  className="text-red-600 font-semibold"
                  component="span"
                />
              </div>

              <div className="flex flex-col items-start w-full ml-20 mt-5">{/*  //?box Remember me */}
                <div>
                  <Field type="checkbox" name="remember" className="mr-2" />
                  <label htmlFor="remember">Remember me</label>
                </div>
                <Link className="text-[#103b79]" to="/forgotPassword">
                  Forgot your password?
                </Link>
              </div>

              {showCaptcha && (
                <ReCAPTCHA
                  sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                  onChange={setRecaptchaValue}
                />
              )}

              <SubmitButton text="Log in" />

              <GoogleButton
                action={handleGoogleLogin}
                text="Sign in with Google"
                method="get"
              />
            </div>
            
            
            
          </div>
        
          <AuthSwitcher text="Sing Up" to="/register" />

        </Form>
      </section>
    </Formik>
  );
};

export default LoginForm;
