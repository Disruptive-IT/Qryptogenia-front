import axios from 'axios';

const baseBackUrl=import.meta.env.VITE_BASE_BACK_URL

const instance = axios.create({
    baseURL:`${baseBackUrl}`,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

export default instance;