import { AuthProvider } from "./AuthContext";
import { StepperProvider } from "./StepperContext";
import { LoaderProvider } from './LoaderContext';
import { QrProvider } from "./QrContext";
import MenuProvider from "../components/Layout/qrContent/forms/menu/menuContext";

/**
 * @Author : Jobserd Julián Ocampo, @date 2024-08-13 10:01:00
 * @description : Este archivo define el componente `Store` que envuelve a todos los proveedores de contexto necesarios para la aplicación. El `Store` combina `LoaderProvider`, `AuthProvider`, `StepperProvider` y `QrProvider` para proporcionar el estado y las funcionalidades de carga, autenticación, gestión de pasos, y datos del QR a través de la aplicación.
**/

export const Store = ({ children }) => {
    return (
        <LoaderProvider>
            <AuthProvider>
                <StepperProvider>
                    <QrProvider>
                        <MenuProvider>
                            {children}
                        </MenuProvider>
                    </QrProvider>
                </StepperProvider>
            </AuthProvider>
        </LoaderProvider>
    );
};