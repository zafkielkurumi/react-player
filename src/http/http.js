import axios from  'axios';
import {HTTPCONFIG } from 'config/config';

axios.defaults.baseURL = HTTPCONFIG.baseUrl;
axios.defaults.timeout = HTTPCONFIG.timeout;

// 请求拦截器
axios.interceptors.request.use(function (config) {
    return config;
  }, function (error) {
    // 处理请求错误
    return Promise.reject(error);
  });

// 响应拦截器
axios.interceptors.response.use(function (response) {
    // 响应数据
    const data = response.data
    return data
  }, function (error) {
    let _message = ''
    throw error;
    return Promise.reject(error); // 按需再抛出错误
    //  处理相应错误
    // return {Code: RESULTCODE.NotSuccess, Message: _message, Data: null }
  });
  

export default axios;

