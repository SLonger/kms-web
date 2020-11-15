import axios from 'axios';
import { Message, MessageBox } from 'element-ui';
import { UserModule } from '@/store/modules/user';

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
});

service.interceptors.request.use(
  (config) => {
    if (UserModule.token) {
      config.headers['Authorization'] = 'Bearer ' + UserModule.token;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// Response interceptors
service.interceptors.response.use(
  (response) => {
    const res = response.data;
    if (res.code !== 200) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      });
      return Promise.reject(new Error(res.message || 'Error'));
    } else {
      return Promise.resolve(response);
    }
  },
  (error) => {
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    });
    console.log('repose: error2');
    return Promise.reject(error);
  }
);

export default service;
