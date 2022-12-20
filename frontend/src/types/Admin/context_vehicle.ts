import React from "react";

export interface IVehicle {
    id: string,
    name: string,
    description: string,
    brand_id: number,
    model_id: number,
    photo: string,
    price: number,
}

export interface IBrand {
    id: number,
    name: string,
}

export interface IModel {
    id: number,
    name: string,
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
        pages: number,
        page: number,
        per_page: number,
        total: number,
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