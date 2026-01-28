import { createContext, useState, useEffect, useContext } from 'react';
import authService from '../services/authService';
import Loader from '../components/common/Loader';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const checkLoggedIn = async () => {
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    const data = await authService.getCurrentUser();
                    if (data.success) {
                        setUser(data.data);
                    }
                }
            } catch (err) {
                localStorage.removeItem('token');
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        checkLoggedIn();
    }, []);

    const login = async (userData) => {
        setLoading(true);
        setError(null);
        try {
            const data = await authService.login(userData);
            if (data.success) {
                setUser(data.data); // Adjust based on actual response structure
                return data;
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const register = async (userData) => {
        setLoading(true);
        setError(null);
        try {
            const data = await authService.register(userData);
            if (data.success) {
                setUser(data.data); // Adjust based on actual response structure
                return data;
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        authService.logout();
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                error,
                login,
                register,
                logout,
                isAuthenticated: !!user,
                isAdmin: user?.role === 'admin',
            }}
        >
            {!loading ? children : <Loader />}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
