import axios from 'axios';
import {API_URL} from "../Environment";
import {createBrowserHistory} from "history";

export const Api = axios.create({
    baseURL: API_URL
});

Api.interceptors.response.use(
    (response) => {
        return response;
    },
    async function (error) {
        const token = localStorage.getItem("token");
        if (error.response.status === 401 && token) {
            alert(error.response.data.message)
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            createBrowserHistory().push('/');
            window.location.reload();
            return ;
        }
        return Promise.reject(error);
    }
);


Api.defaults.headers.common['Accept'] = "application/json";
Api.defaults.headers.common['Content-Type'] = 'multipart/form-data';
Api.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem('token')
