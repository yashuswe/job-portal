import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL, 
});


axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('userToken');
  if (token) {
    config.headers['Authorization'] = `${token}`;
  }
  return config;
});

export default axiosInstance;