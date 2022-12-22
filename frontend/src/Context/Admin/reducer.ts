import {
  ActionAdmin,
  StateAdmin,
  Types,
} from "../../types/Admin/context_admin";

export const AdminReducer = (
  state: StateAdmin,
  action: ActionAdmin
): StateAdmin => {

  switch (action.type) {

    case Types.SET_LOADING:
      return { ...state, loading: !state.loading };

    case Types.SET_VEHICLES:
      return { ...state, vehicles: action.payload };

    default:
      return { ...state };
  }
};
