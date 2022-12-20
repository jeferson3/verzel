import { ContextVehicleType } from '../../../types/Public/context_vehicle';
import { createContext, useContext } from "react";

export const VehicleContext = createContext({} as ContextVehicleType);

export const useVehicleContext = () => {
    return useContext(VehicleContext);
}