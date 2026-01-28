import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import authService from '../services/authService';

const Settings = () => {
    const { user, setUser } = useAuth();
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: ''
    });
    const [profileData, setProfileData] = useState({
        name: user?.name || '',
        email: user?.email || ''
    });

    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handlePasswordChange = (e) => {
        setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
    };

    const handleProfileChange = (e) => {
        setProfileData({ ...profileData, [e.target.name]: e.target.value });
    }

    const onUpdatePassword = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        if (passwordData.newPassword !== passwordData.confirmNewPassword) {
            setError('New passwords do not match');
            return;
        }
        setLoading(true);
        try {
            await authService.updatePassword({
                currentPassword: passwordData.currentPassword,
                newPassword: passwordData.newPassword
            });
            setMessage('Password updated successfully');
            setPasswordData({ currentPassword: '', newPassword: '', confirmNewPassword: '' });
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update password');
        } finally {
            setLoading(false);
        }
    };

    const onUpdateProfile = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        setLoading(true);
        try {
            const updatedUser = await authService.updateDetails(profileData);
            setUser(updatedUser.data);
            // Update local storage if needed, but context handles state. 
            // Ideally we shouldn't update email if it invalidates token without backend support, 
            // but here we just update name/email.
            setMessage('Profile updated successfully');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update profile');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="relative p-8 lg:p-12 max-w-4xl mx-auto animate-in fade-in duration-500">
            <div className="space-y-12 relative z-10">
                <header>
                    <h1 className="text-3xl font-black uppercase tracking-tighter">System_Settings</h1>
                    <p className="text-slate-400 font-mono text-sm">Manage your credentials and profile data.</p>
                </header>

                {message && <div className="bg-green-500/10 border border-green-500/30 text-green-500 p-4 rounded text-sm font-mono">{message}</div>}
                {error && <div className="bg-red-500/10 border border-red-500/30 text-red-500 p-4 rounded text-sm font-mono">{error}</div>}

                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                    <h2 className="text-xl font-bold uppercase tracking-wider mb-6 flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">badge</span> Profile Information
                    </h2>
                    <form onSubmit={onUpdateProfile} className="space-y-4">
                        <div>
                            <label className="block text-xs font-mono text-slate-500 uppercase mb-1">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                value={profileData.name}
                                onChange={handleProfileChange}
                                className="w-full bg-black/50 border border-white/20 rounded p-3 text-sm focus:border-primary focus:outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-mono text-slate-500 uppercase mb-1">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                value={profileData.email}
                                onChange={handleProfileChange}
                                className="w-full bg-black/50 border border-white/20 rounded p-3 text-sm focus:border-primary focus:outline-none"
                            />
                        </div>
                        <div className="flex justify-end">
                            <button type="submit" disabled={loading} className="bg-white/10 text-white hover:bg-white hover:text-black px-4 py-2 rounded text-sm font-bold uppercase tracking-widest transition-colors">
                                Update Profile
                            </button>
                        </div>
                    </form>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                    <h2 className="text-xl font-bold uppercase tracking-wider mb-6 flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">lock</span> Security Protocols
                    </h2>
                    <form onSubmit={onUpdatePassword} className="space-y-4">
                        <div>
                            <label className="block text-xs font-mono text-slate-500 uppercase mb-1">Current Password</label>
                            <input
                                type="password"
                                name="currentPassword"
                                value={passwordData.currentPassword}
                                onChange={handlePasswordChange}
                                required
                                className="w-full bg-black/50 border border-white/20 rounded p-3 text-sm focus:border-primary focus:outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-mono text-slate-500 uppercase mb-1">New Password</label>
                            <input
                                type="password"
                                name="newPassword"
                                value={passwordData.newPassword}
                                onChange={handlePasswordChange}
                                required
                                className="w-full bg-black/50 border border-white/20 rounded p-3 text-sm focus:border-primary focus:outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-mono text-slate-500 uppercase mb-1">Confirm New Password</label>
                            <input
                                type="password"
                                name="confirmNewPassword"
                                value={passwordData.confirmNewPassword}
                                onChange={handlePasswordChange}
                                required
                                className="w-full bg-black/50 border border-white/20 rounded p-3 text-sm focus:border-primary focus:outline-none"
                            />
                        </div>
                        <div className="flex justify-end">
                            <button type="submit" disabled={loading} className="bg-primary text-black px-6 py-2 rounded text-sm font-black uppercase tracking-widest hover:bg-white transition-colors">
                                Change Password
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Settings;
