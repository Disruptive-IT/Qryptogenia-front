import { AuthProvider } from "./AuthContext";
import { StepperProvider } from "./StepperContext";
import { LoaderProvider } from './LoaderContext';

export const Store = ({ children }) => {
    return (
        <LoaderProvider>
            <AuthProvider>
                <StepperProvider>
                    {children}
                </StepperProvider>
            </AuthProvider>
        </LoaderProvider>
    );
};