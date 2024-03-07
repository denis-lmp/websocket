import Axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:80';
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
