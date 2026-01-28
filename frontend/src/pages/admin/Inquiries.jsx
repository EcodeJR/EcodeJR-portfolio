import { useState, useEffect } from 'react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import Loader from '../../components/common/Loader';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import api from '../../services/api';
import { useNotification } from '../../context/NotificationContext';

const AdminInquiries = () => {
    const [inquiries, setInquiries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedInquiry, setSelectedInquiry] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { showSuccess, showError } = useNotification();

    const fetchInquiries = async () => {
        try {
            const res = await api.get('/inquiries');
            setInquiries(res.data.data);
        } catch (err) {
            console.error('Error fetching inquiries:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInquiries();
    }, []);

    const handleStatusChange = async (id, newStatus) => {
        try {
            await api.put(`/inquiries/${id}`, { status: newStatus });
            showSuccess('Status updated');
            fetchInquiries(); // Refresh list
        } catch (err) {
            showError('Failed to update status');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure? This cannot be undone.')) return;
        try {
            await api.delete(`/inquiries/${id}`);
            showSuccess('Inquiry deleted');
            setInquiries(inquiries.filter(i => i._id !== id));
            if (selectedInquiry?._id === id) {
                setIsModalOpen(false);
                setSelectedInquiry(null);
            }
        } catch (err) {
            showError('Failed to delete inquiry');
        }
    };

    const openDetail = (inquiry) => {
        setSelectedInquiry(inquiry);
        setIsModalOpen(true);
    };

    if (loading) return <Loader />;

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Navbar />
            <main className="flex-grow py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-3xl font-bold text-gray-900 mb-8">Inquiry Management</h1>

                    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                        <ul className="divide-y divide-gray-200">
                            {inquiries.map((inquiry) => (
                                <li key={inquiry._id}>
                                    <div className="px-4 py-4 sm:px-6 hover:bg-gray-50 cursor-pointer" onClick={() => openDetail(inquiry)}>
                                        <div className="flex items-center justify-between">
                                            <p className="text-sm font-medium text-primary-600 truncate">{inquiry.name}</p>
                                            <div className="ml-2 flex-shrink-0 flex">
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
                                        </div>
                                        <div className="mt-2 sm:flex sm:justify-between">
                                            <div className="sm:flex">
                                                <p className="flex items-center text-sm text-gray-500">
                                                    {inquiry.email}
                                                </p>
                                                <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                                                    {inquiry.serviceInterested}
                                                </p>
                                            </div>
                                            <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                                                <p>
                                                    Received: {new Date(inquiry.createdAt).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                            {inquiries.length === 0 && (
                                <li className="px-4 py-8 text-center text-gray-500">No inquiries found.</li>
                            )}
                        </ul>
                    </div>

                    <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Inquiry Details">
                        {selectedInquiry && (
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Name</label>
                                    <p className="mt-1 text-sm text-gray-900">{selectedInquiry.name}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Email</label>
                                    <p className="mt-1 text-sm text-gray-900">{selectedInquiry.email}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Service</label>
                                    <p className="mt-1 text-sm text-gray-900">{selectedInquiry.serviceInterested}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Message</label>
                                    <div className="mt-1 text-sm text-gray-900 bg-gray-50 p-3 rounded">{selectedInquiry.description}</div>
                                </div>

                                <div className="pt-4 border-t mt-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Update Status</label>
                                    <div className="flex gap-2 flex-wrap">
                                        {['new', 'contacted', 'in_discussion', 'converted', 'declined'].map(status => (
                                            <button
                                                key={status}
                                                onClick={() => handleStatusChange(selectedInquiry._id, status)}
                                                className={`px-3 py-1 text-xs rounded-full border ${selectedInquiry.status === status
                                                        ? 'bg-primary-100 border-primary-500 text-primary-700'
                                                        : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                                                    }`}
                                            >
                                                {status}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="pt-4 flex justify-end">
                                    <Button variant="danger" size="small" onClick={() => handleDelete(selectedInquiry._id)}>Delete</Button>
                                </div>
                            </div>
                        )}
                    </Modal>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default AdminInquiries;
