import { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { useNotification } from '../context/NotificationContext';
import api from '../services/api';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        serviceInterested: 'Web Development',
        description: '',
    });
    const [loading, setLoading] = useState(false);
    const { showSuccess, showError } = useNotification();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post('/inquiries', formData);
            showSuccess('Message sent successfully! We will get back to you soon.');
            setFormData({
                name: '',
                email: '',
                serviceInterested: 'Web Development',
                description: '',
            });
        } catch (err) {
            showError(err.response?.data?.message || 'Failed to send message');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
                            Get in Touch
                        </h1>
                        <p className="mt-4 text-xl text-gray-500">
                            Have a project in mind? Let's discuss how we can work together.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Contact Info */}
                        <div className="bg-white rounded-lg shadow-lg p-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
                            <div className="space-y-6">
                                <div className="flex items-start">
                                    <FaEnvelope className="h-6 w-6 text-primary-600 mt-1" />
                                    <div className="ml-4">
                                        <h3 className="text-lg font-medium text-gray-900">Email</h3>
                                        <p className="text-gray-500">contact@ecodejr.com</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <FaPhone className="h-6 w-6 text-primary-600 mt-1" />
                                    <div className="ml-4">
                                        <h3 className="text-lg font-medium text-gray-900">Phone</h3>
                                        <p className="text-gray-500">+1 (555) 123-4567</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <FaMapMarkerAlt className="h-6 w-6 text-primary-600 mt-1" />
                                    <div className="ml-4">
                                        <h3 className="text-lg font-medium text-gray-900">Location</h3>
                                        <p className="text-gray-500">New York, NY</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8">
                                <h3 className="text-lg font-medium text-gray-900 mb-4">Follow Me</h3>
                                {/* Social icons repeated here or imported */}
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="bg-white rounded-lg shadow-lg p-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send a Message</h2>
                            <form onSubmit={handleSubmit}>
                                <Input
                                    label="Name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                                <Input
                                    label="Email"
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                                <div className="mb-4">
                                    <label htmlFor="serviceInterested" className="block text-sm font-medium text-gray-700 mb-1">
                                        Service Interested In
                                    </label>
                                    <select
                                        id="serviceInterested"
                                        name="serviceInterested"
                                        value={formData.serviceInterested}
                                        onChange={handleChange}
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                                    >
                                        <option>Web Development</option>
                                        <option>Mobile App</option>
                                        <option>UI/UX Design</option>
                                        <option>Backend System</option>
                                        <option>Other</option>
                                    </select>
                                </div>
                                <Input
                                    label="Project Description"
                                    type="textarea"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    required
                                    rows={5}
                                />
                                <Button type="submit" isLoading={loading} className="w-full">
                                    Send Message
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Contact;
