import axios from 'axios';
import authService from './api/authService';

axios.interceptors.request.use(
    config => {
        const user = authService.getCurrentUser();
        if (user) {
            config.headers['Authorization'] = 'Bearer ' + user;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);