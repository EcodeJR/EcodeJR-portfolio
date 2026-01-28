import React from 'react';
import { useAuth } from '../../context/AuthContext';
import AdminLayout from './AdminLayout';
import ClientLayout from './ClientLayout';
import PublicLayout from './PublicLayout';

const SettingsLayoutWrapper = ({ children }) => {
    const { user } = useAuth();

    if (!user) {
        return <PublicLayout>{children}</PublicLayout>;
    }

    if (user.role === 'admin') {
        return <AdminLayout>{children}</AdminLayout>;
    }

    if (user.role === 'client') {
        return <ClientLayout>{children}</ClientLayout>;
    }

    return <PublicLayout>{children}</PublicLayout>;
};

export default SettingsLayoutWrapper;
