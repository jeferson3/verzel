import {Types, IVehicle, ActionVehicle} from '../../../types/context_vehicle';
import {PUBLIC_API as Api} from "../../../Services/Api";
import {AxiosResponse} from 'axios';
import React from "react";

export const setLoading = (dispatch: React.Dispatch<ActionVehicle>) => {
    dispatch({type: Types.SET_LOADING});
};

export const getVehicles = (page: number = 1, per_page: number = 10, dispatch: React.Dispatch<ActionVehicle>) => {
    setLoading(dispatch);

    Api({
        url: "/vehicles",
        method: "GET",
        params: {
            page,
            per_page
        }
    })
        .then((res: AxiosResponse<Array<IVehicle>>) => {
            console.log(res)
            dispatch({
                type: Types.SET_VEHICLES, payload: {
                    data: res.data,
                    page
                }
            });
        })
        .finally(() => {
            setLoading(dispatch);
        });
};

