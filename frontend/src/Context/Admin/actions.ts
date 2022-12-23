import {Api} from "../../Services/Api";
import axios, {AxiosError, AxiosResponse} from 'axios';
import React from "react";
import {
    Types,
    ActionAdmin,
    IGetVehicleResponseAPI,
    IVehicle,
    IPOSTVehiclesResponseErrorAPI, IPOSTVehicleResponseAPI
} from "../../types/Admin/context_admin";
import {createBrowserHistory} from "history";

export const setLoading = (dispatch: React.Dispatch<ActionAdmin>) => {
    dispatch({type: Types.SET_LOADING});
};

export const getVehicles = (page: number = 1, per_page: number = 5, dispatch: React.Dispatch<ActionAdmin>) => {
    setLoading(dispatch);

    Api({
        url: "/admin/vehicles",
        method: "GET",
        params: {
            page,
            per_page
        }
    })
        .then((res: AxiosResponse<IGetVehicleResponseAPI>) => {
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


export const deleteVehicle = (id: number, setShow: Function, dispatch: React.Dispatch<ActionAdmin>) => {
    setLoading(dispatch);

    Api({
        url: "/admin/vehicles/" + id,
        method: "DELETE",
    })
        .then((res: AxiosResponse<IPOSTVehicleResponseAPI>) => {
            setShow(false)
            alert(res.data.data.message);
            getVehicles(1, 10, dispatch);
        })
        .finally(() => {
            setLoading(dispatch);
        });
};


export const updateVehicle = (id: number, body: IVehicle, clearForm: Function, setShow: Function, dispatch: React.Dispatch<ActionAdmin>) => {
    setLoading(dispatch);

    Api({
        url: "/admin/vehicles/" + id,
        method: "POST",
        data: {
            _method: 'PUT',
            name: body.name,
            description: body.description,
            price: body.price,
            photo: body.photo ? dataURLtoFile(body.photo) : '',
            model_id: body.model.id,
            brand_id: body.brand.id,
        },
        headers: {
            'Content-Type': 'multipart/form-data'
        }

    })
        .then((res: AxiosResponse<IPOSTVehicleResponseAPI>) => {
            clearForm();
            setShow(false);
            getVehicles(1, 10, dispatch);
            alert(res.data.data.message);
        })
        .catch((err: AxiosError<IPOSTVehiclesResponseErrorAPI>) => {
            if (err.code === "ERR_BAD_REQUEST"){
                alert(err.response?.data.message);
                let msg = err.response?.data.errors.map((e, index) => `${index + 1} - ${e}` + '\n' ).join();
                alert(msg);
            }
            else {
                alert(err.message);
            }
        })
        .finally(() => setLoading(dispatch))
};


export const saveVehicle = (body: IVehicle, clearForm: Function, setShow: Function, dispatch: React.Dispatch<ActionAdmin>) => {

    Api({
        url: "/admin/vehicles",
        method: "POST",
        data: {
            name: body.name,
            description: body.description,
            price: body.price,
            photo: dataURLtoFile(body.photo),
            model_id: body.model.id,
            brand_id: body.brand.id,
        },
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
        .then((res: AxiosResponse<IPOSTVehicleResponseAPI>) => {
            clearForm();
            setShow(false);
            getVehicles(1, 10, dispatch);
            alert(res.data.data.message);
        })
        .catch((err: AxiosError<IPOSTVehiclesResponseErrorAPI>) => {
            if (err.code === "ERR_BAD_REQUEST"){
                alert(err.response?.data.message);
                let msg = err.response?.data.errors.map((e, index) => `${index + 1} - ${e}` + '\n' ).join();
                alert(msg);
            }
            else {
                alert(err.message);
            }
        });
};

function dataURLtoFile(data: string = '') {

    const file = data.split('+-');
    const dataurl = file[0];
    const filename = file[1];
    const arr = dataurl.split(',');
    // @ts-ignore
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, {type:mime});
}