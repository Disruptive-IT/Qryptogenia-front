import { useContext, useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { SubmitButton } from '../../components/auth/pure/submitButton'
import { GoogleButton } from '../../components/auth/pure/googleButton';
import { IconsLeft } from '../../components/auth/pure/iconsLeft';
import logo from "../../assets/imgs/logoForms.png";
import { useAuthContext } from "../../context/AuthContext";
import CustomDialog from '../../components/UI/modals/Modal';
import { activateEmail } from '../../utils/api'
import { useLoader } from '../../context/LoaderContext'
import { SchemaRegisterValidate } from '../../helpers/validate/auth.validate';

const RegisterForm = () => {
  const { registerUser } = useAuthContext();
  const { startLoading, stopLoading } = useLoader();

  // Estados para controlar la visibilidad del modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalContent, setModalContent] = useState('');
  const [modalPrimaryButtonAction, setModalPrimaryButtonAction] = useState(() => { });

  const handleSubmit = async (values, { resetForm }) => {
    startLoading();
    try {
      const result = await registerUser(values);
      stopLoading();
      if (!result.success) {
        if (result.verifErrorMessage) {
          setModalTitle('Generate new token');
          setModalContent(result.verifErrorMessage);
          setModalPrimaryButtonAction(() => () => {
            resendActivationEmail(resetForm, values);
            setIsModalOpen(false);
          });
          setIsModalOpen(true);
        }
      } else {
        resetForm();
      }
    } catch (error) {
      stopLoading();
      resetForm();
    }
  };

  const resendActivationEmail = async (resetForm, values) => {
    startLoading();
    try {
      const result = await activateEmail(values, startLoading, stopLoading);
      toastSuccess("A new verification link has been sent.");
      resetForm();
    } catch (error) {
      toastError("It has not been at least 10 minutes since the last time a token was generated.");
    } finally {
      stopLoading();
    }
  };
  return (
    <Formik
      initialValues={{ username: '', email: '', password: '', confirmPassword: '', }}
      validationSchema={SchemaRegisterValidate}
      onSubmit={handleSubmit}
    >
      <section>
        <Form className="authFormContainer my-20 m-auto">
          <div className="formContainer">
            <div className="otherSide"></div>
            <div className="inputsGroupsEnd fullWidth">
              <h1 className="authTittle"><span className='text-[#284B63]'>QR</span>yptogenia</h1>
              <span className="fullWidth">Enter your details to register</span>
              <div className="inputGroup relative">
                <Field className="authInputs emailIcon" type="text" title="Username" name="username" placeholder="Username" maxLength="64" /><br />
                <ErrorMessage name="username" className="errorMessaje absolute left-7" component='span' />
              </div>
              <div className="inputGroup relative">
                <Field className="authInputs emailIcon" type="email" title="Email" name="email" placeholder="Email" maxLength="255" /><br />
                <ErrorMessage name="email" className="errorMessaje absolute left-7" component='span' />
              </div>
              <div className="inputGroup relative">
                <Field className="authInputs candado" type="password" title="Password" name="password" placeholder="Password" maxLength="64" />
                <ErrorMessage name="password" className="errorMessaje absolute left-7 top-8 " component='span' />
              </div>
              <div className="inputGroup relative">
                <Field className="authInputs candado" type="password" title="Confirm Password" name="confirmPassword" placeholder="Confirm Password" maxLength="64" /><br />
                <ErrorMessage name="confirmPassword" className="errorMessaje absolute left-7" component='span' />
              </div>
              <SubmitButton text="Register" />
              <GoogleButton text="Register with Google" />
            </div>
            <img src={logo} className="elLogoLeft" alt="" />
            <IconsLeft />
          </div>
        </Form>
        <CustomDialog
          open={isModalOpen}
          setOpen={setIsModalOpen}
          title={modalTitle}
          content={modalContent}
          primaryButtonText="Generate new token"
          primaryButtonAction={modalPrimaryButtonAction}
          secondaryButtonText="Cancel"
          secondaryButtonAction={() => setIsModalOpen(false)}
        />
      </section>
    </Formik>
  );
};
export default RegisterForm;
