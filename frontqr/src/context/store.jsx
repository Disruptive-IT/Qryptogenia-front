import { AuthProvider } from "./AuthContext";
import { StepperProvider } from "./StepperContext";
import { LoaderProvider } from './LoaderContext';
import { QrProvider } from "./QrContext";

export const Store = ({ children }) => {
    return (
        <LoaderProvider>
            <AuthProvider>
                <StepperProvider>
                    <QrProvider>
                        {children}
                    </QrProvider>
                </StepperProvider>
            </AuthProvider>
        </LoaderProvider>
    );
};