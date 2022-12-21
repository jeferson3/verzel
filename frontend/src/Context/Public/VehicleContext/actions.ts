import {
    Types,
    IVehicle,
    ActionVehicle,
    IVehicleResponseAPI,
    IFilterBuilder
} from '../../../types/Public/context_vehicle';
import {Api} from "../../../Services/ApiPublic";
import {AxiosResponse} from 'axios';
import React from "react";
import {IBrandResponseAPI, IModelResponseAPI} from "../../../types/Public/context_vehicle";

export const setLoading = (dispatch: React.Dispatch<ActionVehicle>) => {
    dispatch({type: Types.SET_LOADING});
};

export const getVehicles = (page: number = 1, per_page: number = 10, filter: IFilterBuilder = {}, dispatch: React.Dispatch<ActionVehicle>) => {
    setLoading(dispatch);

    Api({
        url: "/vehicles",
        method: "GET",
        params: {
            page,
            per_page,
            ...filter
        }
    })
        .then((res: AxiosResponse<IVehicleResponseAPI>) => {
            dispatch({
                type: Types.SET_VEHICLES, payload: {
                    data: res.data.data,
                    pages: res.data.pages,
                    total: res.data.total,
                    page,
                    per_page
                }
            });
        })
        .finally(() => {
            setLoading(dispatch);
        });
};


export const getBrands = (useLoading = false, dispatch: React.Dispatch<ActionVehicle>) => {
    if (useLoading) setLoading(dispatch);

    Api({
        url: "/brands",
        method: "GET",
    })
        .then((res: AxiosResponse<IBrandResponseAPI>) => {
            dispatch({
                type: Types.SET_BRANDS, payload: {
                    data: res.data.data,
                }
            });
        })
        .finally(() => {
            if (useLoading) setLoading(dispatch);
        });
};

export const getModels = (useLoading = false, dispatch: React.Dispatch<ActionVehicle>) => {
    if (useLoading) setLoading(dispatch);

    Api({
        url: "/models",
        method: "GET",
    })
        .then((res: AxiosResponse<IModelResponseAPI>) => {
            dispatch({
                type: Types.SET_MODELS, payload: {
                    data: res.data.data,
                }
            });
        })
        .finally(() => {
            if (useLoading) setLoading(dispatch);
        });
};


