import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { SubmitButton } from '../../components/auth/pure/submitButton';
import { useAuthContext } from "../../context/AuthContext";
import { useLoader } from '../../context/LoaderContext';
import { SchemaCompleteRegisterValidate } from '../../helpers/validate/auth.validate';

const CompleteRegisterForm = ({ onSuccess, email }) => {
    const { completeRegister } = useAuthContext();
    const { startLoading, stopLoading } = useLoader();

    const handleSubmit = async (values, { resetForm }) => {
        startLoading();
        try {
            const result = await completeRegister({ ...values, email });
            stopLoading();
            if (result.success) {
                onSuccess();
            } else {
                console.log('Complete register erorr');
            }
        } catch (error) {
            console.error('Compelte registere error', error);
        } finally {
            stopLoading();
        }
    };

    return (
        <Formik
            initialValues={{ username: '', password: '', confirmPassword: '', }}
            validationSchema={SchemaCompleteRegisterValidate}
            onSubmit={handleSubmit}
        >
            <Form>
                <div className="inputGroup relative">
                    <span className="fullWidth">Ingresa los datos faltantes para Completar tu registro</span>
                    <div className="inputGroup relative">
                        <Field className="authInputs emailIcon" type="text" title="Username" name="username" placeholder="Username" maxLength="64" /><br />
                        <ErrorMessage name="username" className="errorMessaje absolute left-7" component='span' />
                    </div>
                    <div className="inputGroup relative">
                        <Field className="authInputs candado" type="password" title="Password" name="password" placeholder="Password" maxLength="64" />
                        <ErrorMessage name="password" className="errorMessaje absolute left-7 top-8 " component='span' />
                    </div>
                    <div className="inputGroup relative">
                        <Field className="authInputs candado" type="password" title="Confirm Password" name="confirmPassword" placeholder="Confirm Password" maxLength="64" /><br />
                        <ErrorMessage name="confirmPassword" className="errorMessaje absolute left-7" component='span' />
                    </div>
                </div>
                <SubmitButton text="Completar registro" />
            </Form>
        </Formik>
    );
};

export default CompleteRegisterForm;
