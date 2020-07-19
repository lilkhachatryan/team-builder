// import axios as http from 'axios';
//
// export const CancelToken = axios.CancelToken;
// export const isCancel = axios.isCancel;
import { getSessionStorage } from "../utils/storage";
import {Routes} from "../Router";
import { notifyError } from "./notify";

const axios = require('axios').create({
    baseURL: process.env.REACT_APP_API_URL
});

axios.interceptors.request.use(config => {
    let accessToken = getSessionStorage('token');
    if (accessToken) {
        config.headers['token'] = accessToken
    }

    return config;
});

// axios.interceptors.response.use(res => res, e => {
//     if (!e.response || !e.response.status)
//     return Promise.reject(e);
//
//     switch (e.response.status) {
//         case 401:
//             history.push('/topics');
//             // window.location.href = `${process.env.REACT_APP_BASE_HREF}/login`;
//             break
//     }
//
//     return Promise.reject(e)
// });

export const setupInterceptors = (history) => {
    axios.interceptors.response.use(res => res, e => {

        if (!e.response || !e.response.status)
            return Promise.reject(e);

        switch (e.response.status) {
            case 401:
                history.push(Routes.Login);
                notifyError('Session expired');
                break;
            default: notifyError(e.response.data);
        }

        return Promise.reject(e)
    });
};

export default axios;
