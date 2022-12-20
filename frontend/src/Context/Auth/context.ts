import { ContextAuthType } from '../../types/Auth/context_auth';
import { createContext, useContext } from "react";

export const AuthContext = createContext({} as ContextAuthType);

export const useAuthContext = () => {
    return useContext(AuthContext);
}