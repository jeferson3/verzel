import axios from 'axios';
import {API_URL} from "../Environment";
import {createBrowserHistory} from "history";

export const Api = axios.create({
    baseURL: API_URL + '/public',
    headers: {
        ContentType: "application/json",
        Accept: "application/json"
    }
});
