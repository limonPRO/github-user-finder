import axios from 'axios';
import { getFromLocalStorage } from './utils';

// Create an Axios instance with default configuration
const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api/v1" ,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add JWT token to headers
axiosInstance.interceptors.request.use((config:any) => {
  const token = getFromLocalStorage('token');
   console.log(token, "tokenvvvv")
  // Retrieve token from local storage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Attach token to Authorization header
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Reusable GET function
export const axiosGet = async (url: string) => {
  const response = await axiosInstance.get(url);
  return response.data;
};

// Reusable POST function
export const axiosPost = async (url: string, data?: any) => {
  const response = await axiosInstance.post(url, data);
  return response.data;
};

export default axiosInstance;
