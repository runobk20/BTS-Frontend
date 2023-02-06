import axios from "axios";

const backendApi = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_PATH,
});

backendApi.interceptors.request.use(config => {
    config.headers = {
        ...config.headers,
        'x-token': localStorage.getItem('token')
    }

    return config;
})

export default backendApi;