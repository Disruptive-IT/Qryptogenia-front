import { useContext, useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
import { SubmitButton } from "../../components/auth/pure/submitButton";
import { GoogleButton } from "../../components/auth/pure/googleButton";
import { IconsRight } from "../../components/auth/pure/iconsRight";
import logo from "../../../public/Logo.png";
import { useAuthContext } from "../../context/AuthContext";
import { useLoader } from "../../context/LoaderContext";
import { SchemaLoginValidate } from "../../helpers/validate/auth.validate";
import AuthSwitcher from "../../components/auth/pure/AuthSwitcher";
import ReCAPTCHA from "react-google-recaptcha";
import { IoIosMail } from "react-icons/io";
import { FaLock, FaLockOpen } from "react-icons/fa";
import axios from "../../libs/axios";
import { useTranslation } from "react-i18next";
import { FaArrowLeft } from "react-icons/fa6";
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
  const { t } = useTranslation();
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
  const validationSchema = SchemaLoginValidate();

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <section className="flex w-full h-screen justify-center items-center bg-gradient-to-r from-dark-blue to-light-blue ">

<Link to="/" className="text-my-gray flex gap-2 absolute top-1 left-2 w-48 transition-all duration-300 hover:scale-105 hover:underline">
  <FaArrowLeft className="text-2xl"/>
  <p>{t("Back Home")}</p>
</Link>

        <Form className="flex flex-col flex-nowrap justify-between  border-white  w-[90%] h-[90%] md:w-[60%] lg:w-[40%] md:h-full rounded-lg md:rounded-none p-5 shadow-3xl bg-slate-200 transition-all duration-1000 ">
          <div className="flex flex-col items-center justify-center sm:mt-14 transition-all duration-500">
            <img src={logo} alt="logo" className="w-20 h-20 drop-shadow-lg " />
            <h1 className="text-[30px] font-bold tex-center cursor-default">
              <span className="text-dark-blue">{t("Sign")}</span>
              {t("-In")}
            </h1>
          </div>         
          {/* <div className="border-t-2 border-gray-300 mb-2"></div> */}
          <div className="flex flex-nowrap">
            <div className="flex flex-col gap-2 justify-center items-center w-full tansition-all duration-500">
              <span className="w-full text-center text-gray-400 cursor-default">
                {t("Enter your details to access")}
              </span>

              <div className="flex flex-col h-14 w-full sm:w-[90%]  ">
                {/*  //?box input User */}
                <div className="flex w-full  ">
                  <span className="inline-flex items-center px-2 text-lg text-gray-900 bg-dark-blue border rounded-e-0 border-gray-600 border-e-0 rounded-s-md ">
                    <IoIosMail className="text-my-gray " />
                  </span>
                  <Field
                    className={`rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-my-gray dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:dark-blue dark:focus:border-blue-500 ${
                      showCaptcha ? "cursor-not-allowed" : ""
                    }`}
                    type="email"
                    title="Email"
                    name="email"
                    placeholder={t("Email")}
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

              <div className="flex flex-col h-14 w-full sm:w-[90%] ">
                {/*  //?box input Password */}
                <div className="flex md:w-full ">
                  <span
                    className="inline-flex items-center px-2 text-lg text-gray-900 cursor-pointer bg-dark-blue border rounded-e-0  border-e-0 rounded-s-md border-gray-600"
                    onClick={toggleShowPassword}
                  >
                    {showPassword ? (
                      <FaLockOpen
                        className="text-my-gray"
                        title="Press to hide password"
                      />
                    ) : (
                      <FaLock
                        className="text-my-gray"
                        title="Press to show password"
                      />
                    )}
                  </span>
                  <Field
                    className={`rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 text-sm border-gray-300 p-2.5  dark:bg-my-gray dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                      showCaptcha ? "cursor-not-allowed" : ""
                    }`}
                    type={showPassword ? "text" : "password"}
                    title="Password"
                    name="password"
                    placeholder={t("Password")}
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

              <div className="flex flex-col items-start w-full ml-20 mt-5">
                {/*  //?box Remember me */}
                <div>
                  <Field type="checkbox" name="remember" className="mr-2" />
                  <label htmlFor="remember">{t("Remember me")}</label>
                </div>
                <Link className="text-dark-blue" to="/forgotPassword">
                  {t("Forgot your password?")}
                </Link>
              </div>

              {showCaptcha && (
                <ReCAPTCHA
                  sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                  onChange={setRecaptchaValue}
                />
              )}

              <SubmitButton text={t("Log In")} />

              <GoogleButton
                action={handleGoogleLogin}
                text={t("Sign in with Google")}
                method="get"
              />
            </div>
          </div>
          <AuthSwitcher text={t("Sign Up")} to="/register" />
        </Form>
      </section>
    </Formik>
  );
};

export default LoginForm;
