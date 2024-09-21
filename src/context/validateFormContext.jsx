import {createContext, useContext } from "react";
import { useState } from "react";

/*
 * @Author : Nicolas Barrios,   @date 2024-09-20 14:10:13
 * @description : funcion que contiene el contexto de las variables de validacion de todos los formularios
 * @Props :
 * @return : retona todas las variables y funciones que se requieren para validar formularios antes de crear el qr
 */

const validateContext=createContext();

export default function ValidateProvider({children}){
    const [validateFormApp,setValidateFormApp]=useState(null);
    const [validateFormSocial,setValidateFormSocial]=useState(null);
    const [validateFormMusic,setValidateFormMusic]=useState(null);
    const [validateFormPdf,setValidateFormPdf]=useState(null);
    const [validateFormLink,setValidateFormLink]=useState(null);
    const [validateFormWifi,setValidateFormWifi]=useState(null);
    const [validateFormMenu,setValidateFormMenu]=useState(null);

    return(
        <validateContext.Provider value={{
            validateFormApp,
            setValidateFormApp,
            validateFormSocial,
            setValidateFormSocial,
            validateFormMusic,
            setValidateFormMusic,
            validateFormWifi,
            setValidateFormWifi,
            validateFormLink,
            setValidateFormLink,
            validateFormPdf,
            setValidateFormPdf,
            validateFormMenu,
            setValidateFormMenu
        }}>
            {children}
        </validateContext.Provider>
    )
}

export const useValidate=()=>useContext(validateContext);