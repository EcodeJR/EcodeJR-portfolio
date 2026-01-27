const Message = require('../models/Message');
const ClientProject = require('../models/ClientProject');
const sendEmail = require('../utils/sendEmail');
const { newMessageEmail } = require('../utils/emailTemplates');

// @desc    Get messages for a project
// @route   GET /api/messages/:projectId
// @access  Private
exports.getMessages = async (req, res) => {
    try {
        const project = await ClientProject.findById(req.params.projectId);

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        // Check access
        if (req.user.role !== 'admin' && project.clientId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        const messages = await Message.find({ projectId: req.params.projectId })
            .populate('senderId', 'name')
            .sort({ createdAt: 1 });

        res.json({ success: true, count: messages.length, data: messages });
    } catch (error) {
        res.status(500).json({ message: error.message || 'Server Error' });
    }
};

// @desc    Send a message
// @route   POST /api/messages/:projectId
// @access  Private
exports.sendMessage = async (req, res) => {
    try {
        const project = await ClientProject.findById(req.params.projectId).populate('clientId');

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        // Check access
        if (req.user.role !== 'admin' && project.clientId._id.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        const { content, attachments } = req.body;

        const message = await Message.create({
            projectId: req.params.projectId,
            senderId: req.user.id,
            senderRole: req.user.role,
            content,
            attachments,
        });

        // Notify recipient via email
        try {
            const recipientEmail = req.user.role === 'admin' ? project.clientId.email : process.env.EMAIL_USER;
            const recipientName = req.user.role === 'admin' ? project.clientId.name : 'Admin';

            await sendEmail({
                email: recipientEmail,
                subject: `New Message: ${project.projectName}`,
                html: newMessageEmail(recipientName, req.user.name, project.projectName)
            });
        } catch (err) {
            console.error('Email sending failed:', err);
        }

        res.status(201).json({ success: true, data: message });
    } catch (error) {
        res.status(500).json({ message: error.message || 'Server Error' });
    }
};

// @desc    Mark messages as read
// @route   PUT /api/messages/:projectId/read
// @access  Private
exports.markAsRead = async (req, res) => {
    try {
        // Determine which messages to mark as read (those sent by the OTHER party)
        const senderRole = req.user.role === 'admin' ? 'client' : 'admin';

        await Message.updateMany(
            { projectId: req.params.projectId, senderRole, isRead: false },
            { isRead: true }
        );

        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ message: error.message || 'Server Error' });
    }
};
