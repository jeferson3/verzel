import {Api} from "../../Services/ApiAdmin";
// import {Api as Api_Without_Auth} from "../../Services/Api";
import {AxiosError, AxiosResponse} from 'axios';
import React from "react";
import {
    ActionLogin,
    ICheckAuthResponseAPI, ICheckAuthResponseErrorAPI,
    ILoginResponseAPI,
    ILoginResponseErrorAPI, StateAuth,
    Types
} from "../../types/Auth/context_auth";

export const setLoading = (dispatch: React.Dispatch<ActionLogin>) => {
    dispatch({type: Types.SET_LOADING});
};

export const login = (email: string = "", password: string = "", setPassword: React.Dispatch<React.SetStateAction<string>>, dispatch: React.Dispatch<ActionLogin>) => {
    setLoading(dispatch);

    Api({
        url: "/auth/login",
        method: "POST",
        params: {
            email,
            password,
        }
    })
        .then((res: AxiosResponse<ILoginResponseAPI>) => {
            Api.defaults.headers.common['Authorization'] = "Bearer " + res.data.token;
            dispatch({
                type: Types.SET_LOGIN, payload: res.data
            });
        })
        .catch((err: AxiosError<ILoginResponseErrorAPI>) => {
            alert(err.response?.data.data.message)
            setPassword('');
        })
        .finally(() => {
            setLoading(dispatch);
        });
};

export const logout = (dispatch: React.Dispatch<ActionLogin>) => {

    Api({
        url: "/auth/logout",
        method: "POST",
    })
        .then(() => {
            dispatch({
                type: Types.SET_LOGOUT
            });
        })
};

export const checkLogin = (dispatch: React.Dispatch<ActionLogin>) => {

    Api({
        url: "/auth/me",
        method: "GET",
    })
        .then((res: AxiosResponse<ICheckAuthResponseAPI>) => {
            dispatch({
                type: Types.SET_LOGIN, payload: res.data
            });
        })
        .catch((err: AxiosError<ICheckAuthResponseErrorAPI>) => {
            dispatch({
                type: Types.SET_LOGOUT
            });
            alert(err.response?.data.message);
        })
};

export const isAuthtenticated = (state: StateAuth): boolean => {
    const { user, token } = state;
    return (user.id !== undefined && user.email !== undefined && user.name !== undefined) && token !== "";
};
