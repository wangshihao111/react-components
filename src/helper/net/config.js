import axios from 'axios';

let config = {
  baseURL: process.env.baseURL || process.env.apiUrl || 'http://localhost:3000',
  timeout: 60 * 1000, // Timeout
  withCredentials: true // Check cross-site Access-Control
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    console.error(error);
    return Promise.reject(error);
  }
);

_axios.interceptors.response.use(
  function (response) {

  },
  function (error) {
    console.error(error);
    return Promise.reject(error);
  }
);

export default _axios;
