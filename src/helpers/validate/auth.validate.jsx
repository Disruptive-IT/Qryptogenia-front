/**
 * @Author : Jobserd Julián Ocampo, @date 2024-08-13 09:48:10
 * @description : Definición de esquemas de validación utilizando Yup para diferentes operaciones: login, registro, validación de PIN, y cambio de contraseña. 
 * @Props : None
 * @return : Yup validation schemas
**/

import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';

export const SchemaLoginValidate = () => {
  const { t } = useTranslation();
  return Yup.object().shape({
    email: Yup.string().email(t('Invalid email')).required(t('Email is required')),
    password: Yup.string().required(t('Password is required')),
  });
};

export const SchemaRegisterValidate = () => {
  const { t } = useTranslation();
  return Yup.object().shape({
    email: Yup.string().email(t('Invalid email')).required(t('Email is required')),
  });
};

export const SchemaPinValidate = () => {
  const { t } = useTranslation();
  return Yup.object().shape({
    pin: Yup.string()
      .required(t('Code is required'))
      .matches(/^\d+$/, t('Please enter digits only.')),
  });
};

export const SchemaCompleteRegisterValidate = () => {
  const { t } = useTranslation();
  return Yup.object().shape({
    username: Yup.string().required(t('Username is required')),
    password: Yup.string()
      .min(8, t('Password is too short - should be 8 chars minimum'))
      .matches(/[a-zA-Z]/, t('The password cannot contain only numbers'))
      .matches(/[A-Z]/, t('Password must contain at least one uppercase letter'))
      .matches(/[a-z]/, t('Password must contain at least one lowercase letter'))
      .matches(/[!@#$%^&*(),.?":{}|<>]/, t('Password must contain at least one special character'))
      .required(t('Password is required')),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], t('Passwords must match'))
      .required(t('Confirm Password is required')),
    terms: Yup.boolean().oneOf([true], t('You must accept the terms and conditions')),
  });
};