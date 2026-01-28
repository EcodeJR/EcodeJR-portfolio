import { useState, useEffect, useRef } from 'react';
import api from '../../services/api';
import Button from '../common/Button';
import Input from '../common/Input';
import Loader from '../common/Loader';
import { useAuth } from '../../context/AuthContext';
import { FaPaperPlane } from 'react-icons/fa';

const ClientMessages = ({ projectId }) => {
    const { user } = useAuth();
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newMessage, setNewMessage] = useState('');
    const [sending, setSending] = useState(false);
    const messagesEndRef = useRef(null);

    const fetchMessages = async () => {
        try {
            const res = await api.get(`/messages/${projectId}`);
            setMessages(res.data.data);
        } catch (err) {
            console.error('Error fetching messages:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMessages();
        // In a real app, you might set up a socket connection or polling here
        const interval = setInterval(fetchMessages, 10000); // Poll every 10s for simplicity
        return () => clearInterval(interval);
    }, [projectId]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        setSending(true);
        try {
            await api.post(`/messages/${projectId}`, { content: newMessage });
            setNewMessage('');
            fetchMessages(); // Refresh messages immediately
        } catch (err) {
            console.error('Error sending message:', err);
        } finally {
            setSending(false);
        }
    };

    if (loading) return <Loader />;

    return (
        <div className="flex flex-col h-[500px] border rounded-lg overflow-hidden bg-white">
            <div className="bg-gray-50 px-4 py-3 border-b">
                <h3 className="font-medium text-gray-700">Project Discussion</h3>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.length > 0 ? (
                    messages.map((msg) => {
                        const isMe = msg.senderId._id === user._id || msg.senderId === user._id; // Adjust based on populate
                        return (
                            <div key={msg._id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[75%] rounded-lg px-4 py-2 ${isMe ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-800'
                                    }`}>
                                    <p className="text-sm">{msg.content}</p>
                                    <p className={`text-xs mt-1 ${isMe ? 'text-primary-100' : 'text-gray-500'}`}>
                                        {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </p>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="text-center text-gray-500 mt-10">
                        No messages yet. Start the discussion!
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t bg-white">
                <form onSubmit={handleSend} className="flex gap-2">
                    <Input
                        name="message"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type your message..."
                        className="mb-0 flex-1"
                        autoComplete="off"
                    />
                    <Button type="submit" isLoading={sending} disabled={!newMessage.trim()}>
                        <FaPaperPlane />
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default ClientMessages;
