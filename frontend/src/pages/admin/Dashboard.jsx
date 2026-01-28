import { useState, useEffect } from 'react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import Loader from '../../components/common/Loader';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import api from '../../services/api';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        projects: 0,
        inquiries: 0,
        portfolio: 0,
    });
    const [recentInquiries, setRecentInquiries] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [projectsRes, inquiriesRes, portfolioRes] = await Promise.all([
                    api.get('/projects'),
                    api.get('/inquiries'),
                    api.get('/portfolio'),
                ]);

                setStats({
                    projects: projectsRes.data.count,
                    inquiries: inquiriesRes.data.count,
                    portfolio: portfolioRes.data.count,
                });

                // Get top 5 recent inquiries
                setRecentInquiries(inquiriesRes.data.data.slice(0, 5));
            } catch (err) {
                console.error('Error fetching admin data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-grow flex items-center justify-center">
                <Loader />
            </div>
            <Footer />
        </div>
    );

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Navbar />
            <main className="flex-grow py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-primary-500">
                            <h3 className="text-gray-500 font-medium">Active Projects</h3>
                            <p className="text-3xl font-bold text-gray-900 mt-2">{stats.projects}</p>
                            <Link to="/admin/projects" className="text-sm text-primary-600 hover:text-primary-700 mt-2 inline-block">Manage Projects &rarr;</Link>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-green-500">
                            <h3 className="text-gray-500 font-medium">Inquiries</h3>
                            <p className="text-3xl font-bold text-gray-900 mt-2">{stats.inquiries}</p>
                            <Link to="/admin/inquiries" className="text-sm text-green-600 hover:text-green-700 mt-2 inline-block">View Inquiries &rarr;</Link>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-purple-500">
                            <h3 className="text-gray-500 font-medium">Portfolio Items</h3>
                            <p className="text-3xl font-bold text-gray-900 mt-2">{stats.portfolio}</p>
                            <Link to="/admin/portfolio" className="text-sm text-purple-600 hover:text-purple-700 mt-2 inline-block">Edit Portfolio &rarr;</Link>
                        </div>
                    </div>

                    {/* Recent Inquiries */}
                    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                            <h2 className="text-lg font-medium text-gray-900">Recent Inquiries</h2>
                            <Link to="/admin/inquiries">
                                <Button size="small" variant="text">View All</Button>
                            </Link>
                        </div>
                        <ul className="divide-y divide-gray-200">
                            {recentInquiries.length > 0 ? (
                                recentInquiries.map((inquiry) => (
                                    <li key={inquiry._id} className="px-6 py-4 hover:bg-gray-50">
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">{inquiry.name}</p>
                                                <p className="text-sm text-gray-500">{inquiry.email} • {inquiry.serviceInterested}</p>
                                            </div>
                                            <Badge
                                                variant={
                                                    inquiry.status === 'new' ? 'primary' :
                                                        inquiry.status === 'contacted' ? 'info' :
                                                            inquiry.status === 'converted' ? 'success' : 'secondary'
                                                }
                                            >
                                                {inquiry.status}
                                            </Badge>
                                        </div>
                                    </li>
                                ))
                            ) : (
                                <li className="px-6 py-4 text-center text-gray-500">No inquiries yet.</li>
                            )}
                        </ul>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default AdminDashboard;
