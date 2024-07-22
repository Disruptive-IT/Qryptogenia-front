import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { SubmitButton } from '../../components/auth/pure/submitButton';
import { useAuthContext } from "../../context/AuthContext";
import { useLoader } from '../../context/LoaderContext';
import { SchemaPinValidate } from '../../helpers/validate/auth.validate';

const PinVerificationForm = ({ onSuccess, onSendVerification, email }) => {
    const { verifyPin } = useAuthContext();

    const handleSendVerification = () => {
        onSendVerification();
    }

    const handleSubmit = async (values) => {
        console.log("ANTES handleSubmit")
        const result = await verifyPin({ pin: values.pin, email: email });
        console.log("DESPUES handleSubmit")
        if (result.success) {
            console.log("BIEN handleSubmit")
            onSuccess();
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
                        <p>An email has been sent to <strong>{email}</strong> </p>
                        <p>Please stay on the page.</p>
                    </div>
                    <Field className="authInputs" type="text" title="PIN" name="pin" placeholder="6 digit code" /><br />
                    <ErrorMessage name="pin" className="errorMessaje absolute left-7" component='span' />
                </div>
                <span className='cursor-pointer hover:text-opacity-80 block mb-4 text-[#103b79]' onClick={handleSendVerification}>Send new verification code</span>
                <SubmitButton text="Verify code" />
            </Form>
        </Formik>
    );
};

export default PinVerificationForm;
