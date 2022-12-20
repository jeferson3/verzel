import React, { PropsWithChildren, useReducer } from "react";
import { AuthContext } from "./context";
import { data } from "./data";
import { AuthReducer } from "./reducer";

export const AuthContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, data);
    return <AuthContext.Provider value={{state, dispatch}}>{ children }</AuthContext.Provider>
}