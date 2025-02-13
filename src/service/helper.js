import myAxios from 'axios';
import { getToken } from './localstroageService';

export const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const publicAxios = myAxios.create({
    baseURL: BASE_URL
});

export const privateAxios = myAxios.create({
    baseURL: BASE_URL
})

privateAxios.interceptors.request.use(config => {
    const token = getToken();
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, (error) => Promise.reject(error));
