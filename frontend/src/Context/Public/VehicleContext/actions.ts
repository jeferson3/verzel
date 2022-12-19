import {Types, IVehicle, ActionVehicle, IVehicleResponseAPI} from '../../../types/context_vehicle';
import {PUBLIC_API as Api} from "../../../Services/Api";
import {AxiosResponse} from 'axios';
import React from "react";

export const setLoading = (dispatch: React.Dispatch<ActionVehicle>) => {
    dispatch({type: Types.SET_LOADING});
};

export const getVehicles = (page: number = 1, per_page: number = 10, search = "", dispatch: React.Dispatch<ActionVehicle>) => {
    setLoading(dispatch);

    Api({
        url: "/vehicles",
        method: "GET",
        params: {
            page,
            per_page,
            search
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

