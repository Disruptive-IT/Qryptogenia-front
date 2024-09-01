import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { SubmitButton } from "../../components/auth/pure/submitButton";
import { useAuthContext } from "../../context/AuthContext";
import { useLoader } from "../../context/LoaderContext";
import { SchemaPinValidate } from "../../helpers/validate/auth.validate";
import { MdOutlineMailLock } from "react-icons/md";
import { useTranslation } from "react-i18next";
const PinVerificationForm = ({ onSuccess, onSendVerification, email }) => {
  const { verifyPin } = useAuthContext();
  const { t } = useTranslation();
  const handleSendVerification = () => {
    onSendVerification();
  };

  const handleSubmit = async (values) => {
    console.log("ANTES handleSubmit");
    const result = await verifyPin({ pin: values.pin, email: email });
    console.log("DESPUES handleSubmit");
    if (result.success) {
      console.log("BIEN handleSubmit");
      onSuccess();
    }
  };

  const schemaPin = SchemaPinValidate();

  return (
    <Formik
      initialValues={{ pin: "" }}
      validationSchema={schemaPin}
      onSubmit={handleSubmit}
    >
      <section className="w-full mt-24 flex flex-col justify-center items-center ">
        <Form className="flex flex-col flex-nowrap gap-3 border-2 border-white rounded-xl w-[calc(100%-20px)] md:w-[700px] p-5 shadow-2xl bg-gray-200">
          <h1 className="text-[30px] font-bold tex-center">
            <span className="text-[#284B63]">{t("Verificate")}</span> {t("Code")}
          </h1>
          <div className="border-t-2 border-gray-300 mb-2"></div>
          <div className="flex flex-col gap-2 justify-center items-center w-full tansition-all duration-500">
            <span className="fullWidth text-center text-gray-400">
            {t("An email has been sent to")} <strong>{email}</strong>
            </span>
            <span className="fullWidth text-center text-gray-400">
            {t("Verificate your email and get the code to complete your registration.")}
            </span>
            

            <div className="flex flex-col h-14 w-[70%] sm:w-[40%]  ">
              {/*  //?box input User */}
              <div className="flex w-full  ">
                <span className="inline-flex items-center px-2 text-lg text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md dark:bg-my-gray dark:text-black dark:border-gray-600">
                  <MdOutlineMailLock />
                </span>
                <Field
                  className={`rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-my-gray dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:dark-blue dark:focus:border-blue-500 `}
                  type="text"
                  title="PIN"
                  name="pin"
                  placeholder={t("6 Digit Code")}
                  maxLength="6"
                />
              </div>
              <ErrorMessage
                name="pin"
                className="text-red-600 font-semibold "
                component="pin"
              />
            </div>

            <span
              className="cursor-pointer hover:text-opacity-80 block mb-4 text-[#103b79]"
              onClick={handleSendVerification}
            >
              {t("Send new verification code")}
            </span>
            <SubmitButton text={t("Verify code")} />
          </div>
        </Form>
      </section>
    </Formik>
  );
};

export default PinVerificationForm;
