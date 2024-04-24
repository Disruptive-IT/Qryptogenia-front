import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { SubmitButton } from '../../components/auth/pure/submitButton';
import { useAuthContext } from "../../context/AuthContext";
import { useLoader } from '../../context/LoaderContext';
import { SchemaPinValidate } from '../../helpers/validate/auth.validate';

const PinVerificationForm = ({ onSuccess, onSendVerification,email }) => {
    const { verifyPin } = useAuthContext();
    const { startLoading, stopLoading } = useLoader();

    const handleSendVerification = () => {
        onSendVerification();
    }

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
            validationSchema={SchemaPinValidate}
            onSubmit={handleSubmit}
        >
            <Form>
                <div className="inputGroup relative">
                    <div className='mb-5'>
                        <h1 className="authTittle mb-4"><span className='text-[#284B63]'>QR</span>yptogenia</h1>
                        <p>Se ha enviado un correo electrónico a <strong>{email}</strong> . Por favor, permanezca en la página.</p>
                    </div>
                    <Field className="authInputs" type="text" title="PIN" name="pin" placeholder="PIN" maxLength="4" /><br />
                    <ErrorMessage name="pin" className="errorMessaje absolute left-7" component='span' />
                </div>
                <span className='cursor-pointer hover:text-opacity-80 block mb-4 text-[#103b79]' onClick={handleSendVerification}>Enviar nuevo correo de verificacion</span>
                <SubmitButton text="Verificar PIN" />
            </Form>
        </Formik>
    );
};

export default PinVerificationForm;
