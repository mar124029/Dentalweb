import axios from 'axios';
import { toast } from 'react-toastify';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const { status, data } = error.response || {};
    switch (status) {
      case 401:
        toast.error('Tu sesión ha expirado. Por favor, vuelve a iniciar sesión.');
        localStorage.removeItem('token');
        window.location.href = '/login';
        break;
      case 500:
        toast.error('Hubo un error en el servidor. Intenta nuevamente más tarde.');
        break;
      case 404:
        toast.error(data?.message || 'Recurso no encontrado.');
        break;
      default:
        toast.error('Ocurrió un error inesperado. Intenta nuevamente.');
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;