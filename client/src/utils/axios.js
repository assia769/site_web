import axios from 'axios';

// Create axios instance
const instance = axios.create({
    baseURL: 'http://localhost:8000',
    withCredentials: true, // This is important for handling cookies
});

// Add request interceptor to include CSRF token
instance.interceptors.request.use(async (config) => {
    // Get CSRF cookie first
    if (!document.cookie.includes('XSRF-TOKEN')) {
        await axios.get('http://localhost:8000/sanctum/csrf-cookie');
    }
    
    // Get CSRF token from cookie
    const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('XSRF-TOKEN='))
        ?.split('=')[1];
    
    if (token) {
        config.headers['X-XSRF-TOKEN'] = decodeURIComponent(token);
    }
    
    return config;
});

export default instance;