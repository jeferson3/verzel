import { ContextVehicleType } from '../../../types/context_vehicle';
import { createContext, useContext } from "react";

export const VehicleContext = createContext({} as ContextVehicleType);

export const useVehicleContext = () => {
    return useContext(VehicleContext);
}