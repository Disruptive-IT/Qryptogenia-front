import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { SubmitButton } from '../../components/auth/pure/submitButton';
import { useAuthContext } from "../../context/AuthContext";
import { useLoader } from '../../context/LoaderContext';

const PinVerificationForm = ({ onSuccess, email }) => {
    const { verifyPin } = useAuthContext();
    const { startLoading, stopLoading } = useLoader();

    const handleSubmit = async (values, { resetForm }) => {
        startLoading();
        try {
            const result = await verifyPin({ pin: values.pin, email: email });
            stopLoading();
            if (result.success) {
                onSuccess(); 
            } else {
                console.log('Error al verificar el PIN');
            }
        } catch (error) {
            console.error('Error al verificar el PIN:', error);
        } finally {
            stopLoading();
        }
    };

    return (
        <Formik
            initialValues={{ pin: '' }}
            onSubmit={handleSubmit}
        >
            <Form>
                <div className="inputGroup relative">
                    <p>Se ha enviado un correo electrónico a {email}. Por favor, verifica tu bandeja de entrada.</p>
                    <Field className="authInputs" type="text" title="PIN" name="pin" placeholder="PIN" maxLength="4" /><br />
                    <ErrorMessage name="pin" className="errorMessaje absolute left-7" component='span' />
                </div>
                <SubmitButton text="Verificar PIN" />
            </Form>
        </Formik>
    );
};

export default PinVerificationForm;
