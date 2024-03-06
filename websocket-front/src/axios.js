import Axios from 'axios';
import API_URL from './config.js';

const axios = Axios.create({
    baseURL: `${API_URL}/api`,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Access-Control-Allow-Origin": "*",
    },
});

export default axios;
