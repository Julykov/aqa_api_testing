const axios = require('axios');

const api = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
    headers: {
        'Content-Type': 'application/json'
    },
    timeout: 5000
});

api.interceptors.request.use(request => {
    console.log(`[REQ] ${request.method.toUpperCase()} ${request.url}`);
    return request;
});

api.interceptors.response.use(response => {
    console.log(`[RES] Статус: ${response.status}`);
    return response;
}, error => {
    console.error(`[ERR] Ошибка на ${error.config.url}: ${error.message}`);
    return Promise.reject(error);
});

module.exports = api;