import {
  ActionAuth,
  StateAuth,
  Types,
} from "../../types/Auth/context_auth";

export const AuthReducer = (
  state: StateAuth,
  action: ActionAuth
): StateAuth => {

  switch (action.type) {

    case Types.SET_LOADING:
      return { ...state, loading: !state.loading };

    case Types.SET_LOGIN:
      return { ...state, token: action.payload.token, user: action.payload.user };

    default:
      return { ...state };
  }
};
