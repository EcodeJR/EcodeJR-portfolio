import api from './api';

const register = async (userData) => {
    const response = await api.post('/auth/register', userData);
    if (response.data.token) {
        localStorage.setItem('token', response.data.token);
    }
    return response.data;
};

const login = async (userData) => {
    const response = await api.post('/auth/login', userData);
    if (response.data.token) {
        localStorage.setItem('token', response.data.token);
    }
    return response.data;
};

const logout = () => {
    localStorage.removeItem('token');
};

const getCurrentUser = async () => {
    const response = await api.get('/auth/me');
    return response.data;
};

const updateDetails = async (userData) => {
    const response = await api.put('/auth/updatedetails', userData);
    return response.data;
};

const updatePassword = async (passwordData) => {
    const response = await api.put('/auth/updatepassword', passwordData);
    if (response.data.token) {
        localStorage.setItem('token', response.data.token);
    }
    return response.data;
};

const authService = {
    register,
    login,
    logout,
    getCurrentUser,
    updateDetails,
    updatePassword,
};

export default authService;
