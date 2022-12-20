import {
  ActionVehicle,
  StateVehicle,
  Types,
} from "../../../types/Public/context_vehicle";

export const VehicleReducer = (
  state: StateVehicle,
  action: ActionVehicle
): StateVehicle => {

  switch (action.type) {

    case Types.SET_LOADING:
      return { ...state, loading: !state.loading };

    case Types.SET_VEHICLES:
      return { ...state, vehicles: action.payload };

    case Types.SET_BRANDS:
      return { ...state, brands: action.payload };

    case Types.SET_MODELS:
      return { ...state, models: action.payload };

    default:
      return { ...state };
  }
};
