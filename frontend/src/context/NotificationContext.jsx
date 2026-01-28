import { createContext, useState, useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    const showSuccess = (message) => {
        toast.success(message);
    };

    const showError = (message) => {
        toast.error(message);
    };

    const showInfo = (message) => {
        toast.info(message);
    };

    return (
        <NotificationContext.Provider value={{ showSuccess, showError, showInfo }}>
            {children}
            <ToastContainer position="top-right" autoClose={3000} />
        </NotificationContext.Provider>
    );
};

export const useNotification = () => useContext(NotificationContext);
