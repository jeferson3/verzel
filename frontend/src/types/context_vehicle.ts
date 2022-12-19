import React from "react";

export interface IVehicle {
    token: string,
    name: string,
    description: string,
    brand: number,
    model: number,
    image: string,
    value: string,
}

export type ContextVehicleType = {
    state: StateVehicle,
    dispatch: React.Dispatch<ActionVehicle>
}

export interface ActionVehicle {
    type: Types;
    payload?: any;
}

export interface StateVehicle {
    loading: boolean,
    vehicles: {
        data: IVehicle[],
        page: number,
        per_page: number,
    }
}

export enum Types {
    SET_LOADING = 'SET_LOADING',
    SET_VEHICLES = 'SET_VEHICLES'
}

export interface IVehicleResponseAPI {
    data: Array<IVehicle>,
    page: number,
    pages: number,
    per_page: number,
    status: boolean,
    timestamp: string,
    total: number,
}