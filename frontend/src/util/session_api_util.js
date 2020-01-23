import axios from 'axios';

export const setAuthToken = token => {
    if (token) {
        debugger;
        // console.log('hi im first')
        const result = axios.defaults.headers.common
        result['Authorization'] = token;
    } else {
        // debugger;
        delete axios.defaults.headers.common['Authorization'];
    }
};

export const signup = (userData) => {
    return axios.post('/api/users/register', userData);
};

export const login = userData => {
    return axios.post('/api/users/login', userData);
};