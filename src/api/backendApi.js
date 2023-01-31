import axios from "axios";

export const backendApi = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_PATH,
    headers: {'x-token': localStorage.getItem('token')}
});