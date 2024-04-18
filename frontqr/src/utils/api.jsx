import axios from '../libs/axios';


export const activateEmail = async (values, startLoading, stopLoading) => {
    let timer;
    try {
        timer = setTimeout(() => startLoading(), 500);
        const response = await axios.post('/new-activate-email/', values);
        clearTimeout(timer);
        stopLoading();
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        clearTimeout(timer);
        stopLoading();
        throw error;
    }
};
