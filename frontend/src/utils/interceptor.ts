import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';
import {BASE_API} from './constants';

const axiosInstance = axios.create({
  baseURL: BASE_API,
});

// Add a request interceptor
axiosInstance.interceptors.request.use((
  config: AxiosRequestConfig | any) => {
  const token = localStorage.getItem('token');
  if(token) {
    config.headers['Authorization'] = `Bearer ${token}`;          
  }
  return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    if(error.response?.status === 401) {
      const navigate = useNavigate();
      navigate('/login', { replace: true }); 
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;