import { ContextAdminType } from '../../types/Admin/context_admin';
import { createContext, useContext } from "react";

export const AdminContext = createContext({} as ContextAdminType);

export const useAdminContext = () => {
    return useContext(AdminContext);
}