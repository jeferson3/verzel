import React, { PropsWithChildren, useReducer } from "react";
import { AdminContext } from "./context";
import { data } from "./data";
import { AdminReducer } from "./reducer";

export const AdminContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [state, dispatch] = useReducer(AdminReducer, data);
    return <AdminContext.Provider value={{state, dispatch}}>{ children }</AdminContext.Provider>
}