import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { SubmitButton } from "../../components/auth/pure/submitButton";
import { useAuthContext } from "../../context/AuthContext";
import { useLoader } from "../../context/LoaderContext";
import { SchemaCompleteRegisterValidate } from "../../helpers/validate/auth.validate";
import { useState } from "react";
import { FaLock, FaLockOpen, FaUser } from "react-icons/fa";
import { useTranslation } from "react-i18next";
const CompleteRegisterForm = ({ email }) => {
  const { completeRegister, loginUser } = useAuthContext();
  const { startLoading, stopLoading } = useLoader();
  const [showPassword, setShowPassword] = useState(false); //? estate to changge the password to show/hide
  const { t } = useTranslation();
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (values, { resetForm }) => {
    startLoading();
    const completeResult = await completeRegister({ ...values, email });
    if (completeResult.success) {
      const loginResult = await loginUser({ email, password: values.password }, "/selectPlan");
      if (loginResult.success) {
        resetForm();
      }
    }
    stopLoading();
  };

  const schemaComplete = SchemaCompleteRegisterValidate();

  return (
    <Formik
      initialValues={{
        username: "",
        password: "",
        confirmPassword: "",
        terms: false,
      }}
      validationSchema={schemaComplete}
      onSubmit={handleSubmit}
    >
      {({ values, touched }) => (
        <section className="w-full mt-24 flex flex-col justify-center items-center ">
          <Form className="flex flex-col gap-5 flex-nowrap border-2 items-center border-white rounded-xl w-[calc(100%-20px)] md:w-[700px] p-5 shadow-2xl bg-gray-200">
            
                <h1 className="text-[30px] font-bold tex-center">
                  {t("Complete Your")} <span className="text-[#284B63]">{t("Sign Up")}</span>
                </h1>
                <div className='border-t-2 border-gray-300 mb-2'></div>

                <span className="fullWidth text-center text-gray-400">{t("Introduce your details to complete your registration.")} <strong>{email}</strong> </span>
                

              <div className="flex flex-col h-14 w-full sm:w-[70%] ">
                {/*  //?box input ConfirmPassword */}
                <div className="flex md:w-full ">
                  <span
                    className="inline-flex items-center px-2 text-lg text-my-gray cursor-pointer bg-dark-blue border rounded-e-0 border-gray-300 border-e-0 rounded-s-md"
                    onClick={toggleShowPassword}
                  >
                    <FaUser />
                  </span>
                  <Field
                    className={`rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 text-sm border-gray-300 p-2.5  dark:bg-my-gray dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 `}
                    type="text"
                    title="User Name"
                    name="username"
                    placeholder={t("Username")}
                    maxLength="64"
                  />
                  <br />
                </div>
                <ErrorMessage
                  name="username"
                  className="text-red-600 font-semibold"
                  component="span"
                />
              </div>

              <div className="flex flex-col h-14 w-full sm:w-[70%] ">
                {/*  //?box input Password */}
                <div className="flex md:w-full ">
                  <span
                    className="inline-flex items-center px-2 text-lg text-my-gray cursor-pointer bg-dark-blue border rounded-e-0 border-gray-300 border-e-0 rounded-s-md "
                    onClick={toggleShowPassword}
                  >
                    {showPassword ? <FaLockOpen /> : <FaLock />}
                  </span>
                  <Field
                    className={`rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 text-sm border-gray-300 p-2.5  dark:bg-my-gray dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 `}
                    type={showPassword ? "text" : "password"}
                    title="Password"
                    name="password"
                    placeholder={t("Password")}
                    maxLength="64"
                  />
                  <br />
                </div>
                <ErrorMessage
                  name="password"
                  className="text-red-600 font-semibold"
                  component="span"
                />
              </div>

              <div className="flex flex-col h-14 w-full sm:w-[70%] ">
                {/*  //?box input ConfirmPassword */}
                <div className="flex md:w-full ">
                  <span
                    className="inline-flex items-center px-2 text-lg text-my-gray cursor-pointer bg-dark-blue border rounded-e-0 border-gray-300 border-e-0 rounded-s-md "
                    onClick={toggleShowPassword}
                  >
                    {showPassword ? <FaLockOpen /> : <FaLock />}
                  </span>
                  <Field
                    className={`rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 text-sm border-gray-300 p-2.5  dark:bg-my-gray dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 `}
                    type={showPassword ? "text" : "password"}
                    title="Confirm Password"
                    name="confirmPassword"
                    placeholder={t("Confirm Password")}
                    maxLength="64"
                  />
                  <br />
                </div>
                <ErrorMessage
                  name="confirmPassword"
                  className="text-red-600 font-semibold"
                  component="span"
                />
              </div>
            
            <div className="flex flex-col items-start">
              <div className="mt-2">
                <Field type="checkbox" name="remember" className="mr-2" />
                <label htmlFor="remember">{t("Remember me")}</label>
              </div>
              <div>
                <Field type="checkbox" name="terms" className="mr-2" />
                <label
                  htmlFor="terms"
                  className={`${
                    touched.terms && !values.terms ? "text-red-500" : ""
                  }`}
                >
                  {t("I accept the Terms and Conditions")}
                </label>
              </div>
            </div>
            <SubmitButton text={t("Sign Up")} />
          </Form>
        </section>
      )}
    </Formik>
  );
};

export default CompleteRegisterForm;
