import {
  ActionVehicle,
  StateVehicle,
  Types,
} from "../../../types/context_vehicle";

export const VehicleReducer = (
  state: StateVehicle,
  action: ActionVehicle
): StateVehicle => {

  switch (action.type) {

    case Types.SET_LOADING:
      return { ...state, loading: !state.loading };

    case Types.SET_VEHICLES:
      return { ...state, vehicles: action.payload };

    default:
      return { ...state };
  }
};
