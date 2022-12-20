import React from "react";


export interface IUser {
    id?: number,
    name?: string,
    email?: string,
}
export type ContextAuthType = {
    state: StateAuth,
    dispatch: React.Dispatch<ActionAuth>
}

export interface ActionAuth {
    type: Types;
    payload?: any;
}

export interface ActionLogin {
    type: Types;
    payload?: any;
}

export interface StateAuth {
    loading: boolean,
    user: IUser,
    token: string,
}

export enum Types {
    SET_LOADING = 'SET_LOADING',
    SET_LOGIN = 'SET_LOGIN',
}

export interface ILoginResponseAPI {
    status: boolean,
    timestamp: string,
    user: IUser,
    token: string
}

export interface ILoginResponseErrorAPI {
    data: {
        status: boolean,
        timestamp: string,
        message: string
    }
}