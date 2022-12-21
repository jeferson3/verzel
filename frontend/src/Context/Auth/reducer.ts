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
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      return { ...state, token: action.payload.token, user: action.payload.user };

    case Types.SET_LOGOUT:
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return { ...state, token: "", user: {name: undefined, email: undefined, id: undefined} };

    default:
      return { ...state };
  }
};
