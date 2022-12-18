import React, { PropsWithChildren, useReducer } from "react";
import { VehicleContext } from "./context";
import { data } from "./data";
import { VehicleReducer } from "./reducer";

export const VehicleContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [state, dispatch] = useReducer(VehicleReducer, data);
    return <VehicleContext.Provider value={{state, dispatch}}>{ children }</VehicleContext.Provider>
}