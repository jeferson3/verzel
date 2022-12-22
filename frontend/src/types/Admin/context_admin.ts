import React from "react";

export interface IVehicle {
    id: number,
    name: string,
    description: string,
    brand: IBrand,
    model: IModel,
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


export type ContextAdminType = {
    state: StateAdmin,
    dispatch: React.Dispatch<ActionAdmin>
}

export interface ActionAdmin {
    type: Types;
    payload?: any;
}

export interface ActionAdmin {
    type: Types;
    payload?: any;
}

export interface StateAdmin {
    loading: boolean,
    vehicles: {
        data: IVehicle[],
        pages: number,
        page: number,
        per_page: number,
        total: number,
    },
    brands: IBrand[],
    models: IModel[]
}

export enum Types {
    SET_LOADING = 'SET_LOADING',
    SET_VEHICLES = 'SET_VEHICLES'
}

export interface IGetVehicleResponseAPI {
    status: boolean,
    timestamp: string,
    data: IVehicle[],
    pages: number,
    page: number,
    per_page: number,
    total: number,
}


export interface IGetVehiclesResponseErrorAPI {
    data: {
        status: boolean,
        timestamp: string,
        message: string
    }
}

export interface IPOSTVehicleResponseAPI {
    data: {
        status: boolean,
        timestamp: string,
        message: string,
    }
}


export interface IPOSTVehiclesResponseErrorAPI {
    status: boolean,
    errors: Array<string>,
    message: string
}

