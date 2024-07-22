import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { SubmitButton } from '../../components/auth/pure/submitButton';
import { useAuthContext } from "../../context/AuthContext";
import { useLoader } from '../../context/LoaderContext';
import { SchemaCompleteRegisterValidate } from '../../helpers/validate/auth.validate';

const CompleteRegisterForm = ({ email }) => {
    const { completeRegister, loginUser } = useAuthContext();
    const { startLoading, stopLoading } = useLoader();

    const handleSubmit = async (values, { resetForm }) => {
        startLoading();
        const completeResult = await completeRegister({ ...values, email });
        if (completeResult.success) {
            const loginResult = await loginUser({ email, password: values.password });
            if (loginResult.success) {
                resetForm();
            }
        }
        stopLoading();
    };

    return (
        <Formik
            initialValues={{ username: '', password: '', confirmPassword: '', terms: false }}
            validationSchema={SchemaCompleteRegisterValidate}
            onSubmit={handleSubmit}
        >
            {({ values, touched }) => (

                <Form>
                    <div className="inputGroup relative">
                        <div className='mb-5'>
                            <h1 className="authTittle mb-4"><span className='text-[#284B63]'>QR</span>yptogenia</h1>
                            <p>Ingresa los datos faltantes para completar tu registro.</p>
                            <strong>{email}</strong>
                        </div>
                        <span className="fullWidth"></span>
                        <div className="inputGroup relative">
                            <Field className="authInputs emailIcon" type="text" title="Username" name="username" placeholder="Username" maxLength="64" /><br />
                            <ErrorMessage name="username" className="errorMessaje absolute left-7" component='span' />
                        </div>
                        <div className="inputGroup relative">
                            <Field className="authInputs candado" type="password" title="Password" name="password" placeholder="Password" maxLength="64" />
                            <ErrorMessage name="password" className="errorMessaje absolute left-8 top-7 " component='span' />
                        </div>
                        <div className="inputGroup relative">
                            <Field className="authInputs candado" type="password" title="Confirm Password" name="confirmPassword" placeholder="Confirm Password" maxLength="64" /><br />
                            <ErrorMessage name="confirmPassword" className="errorMessaje absolute left-7" component='span' />
                        </div>
                    </div>
                    <div className='flex flex-col items-start my-4'>
                        <div className='mt-2'>
                            <Field type="checkbox" name="remember" className="mr-2" />
                            <label htmlFor="remember">Remember me</label>
                        </div>
                        <div>
                            <Field type="checkbox" name="terms" className="mr-2" />
                            <label htmlFor="terms" className={`${touched.terms && !values.terms ? 'text-red-500' : ''}`}>I accept the Terms and Conditions</label>
                        </div>
                    </div>
                    <SubmitButton text="Completar registro" />
                </Form>
            )}

        </Formik>
    );
};

export default CompleteRegisterForm;
