import axios from 'axios';

export const $api = axios.create({
  baseURL: __API__,
});

$api.interceptors.request.use((config) => {
  if (config.headers) {
    // config.headers.Authorization = localStorage.getItem(LOCAL_STORAGE_USER_KEY) || '';
    // console.log('api');

    // config.headers['Content-Type'] = 'application/json';
    config.headers.Authorization = 'Basic 0JrQvtGB0YPRhdC40L06MQ==';
  }

  return config;
});
