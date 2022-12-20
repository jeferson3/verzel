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
    },
    brands: {
        data: IBrand[]
    },
    models: {
        data: IModel[]
    }
}

export enum Types {
    SET_LOADING = 'SET_LOADING',
    SET_VEHICLES = 'SET_VEHICLES',
    SET_BRANDS = 'SET_BRANDS',
    SET_MODELS = 'SET_MODELS',
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


export interface IBrandResponseAPI {
    data: Array<IBrand>,
    status: boolean,
    timestamp: string
}

export interface IModelResponseAPI {
    data: Array<IBrand>,
    status: boolean,
    timestamp: string
}


export interface IFilterBuilder {
    search?: string,
    startPrice?: number,
    endPrice?: number,
    brandId?: number,
    modelId?: number
}

