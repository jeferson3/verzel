import {ADMIN_API as Api} from "../../Services/Api";
import {AxiosError, AxiosResponse} from 'axios';
import React, {SetStateAction} from "react";
import {ActionLogin, ILoginResponseAPI, ILoginResponseErrorAPI, Types} from "../../types/Auth/context_auth";
import {Redirect} from "react-router-dom";

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
