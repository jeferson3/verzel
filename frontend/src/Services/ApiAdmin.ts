import axios from 'axios';
import {API_URL} from "../Environment";
import {createBrowserHistory} from "history";
axios.interceptors.response.use(
    response => response,
    error => {
        const {status} = error.response;
        if (status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            createBrowserHistory().push('/');
            window.location.reload();
        }
        return Promise.reject(error);
    }
);
export const Api = axios.create({
    baseURL: API_URL
});
Api.defaults.headers.common['Accept'] = "application/json";
Api.defaults.headers.common['ContentType'] = "application/json";
Api.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem('token')
