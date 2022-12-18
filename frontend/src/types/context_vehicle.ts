import React from "react";

export interface IVehicle {
    id: number,
    name: string,
    brand_id: number,
    model_id: number,
    photo: string,
    price: number,
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