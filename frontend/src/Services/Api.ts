import axios from 'axios';
import { API_URL } from "../Environment";

export const PUBLIC_API = axios.create({
  baseURL: API_URL + '/public',
  headers: {
    ContentType: "application/json",
    Accept: "application/json"
  }
});
export const ADMIN_API = axios.create({
  baseURL: API_URL,
  headers: {
    ContentType: "application/json",
    Accept: "application/json",
    Authorization: "Bearer token"
  }
});
