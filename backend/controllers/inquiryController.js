const Inquiry = require('../models/Inquiry');
const sendEmail = require('../utils/sendEmail');
const { newInquiryEmail, userInquiryConfirmationEmail } = require('../utils/emailTemplates');

// @desc    Create new inquiry
// @route   POST /api/inquiries
// @access  Public
exports.createInquiry = async (req, res) => {
    try {
        console.log('--- New Inquiry Attempt ---');
        console.log('Payload:', req.body);
        const { email, description, inquiryType } = req.body;

        // Check for duplicate inquiry in the last 30 seconds
        const duplicateInquiry = await Inquiry.findOne({
            email,
            description,
            createdAt: { $gte: new Date(Date.now() - 30 * 1000) }
        });

        if (duplicateInquiry) {
            console.log('Duplicate inquiry detected');
            return res.status(400).json({ message: 'Duplicate inquiry detected. Please wait a moment.' });
        }

        console.log('Creating inquiry in DB...');
        const inquiry = await Inquiry.create(req.body);
        console.log('Inquiry created:', inquiry._id);

        // Send emails in the background (fire and forget) to avoid blocking or timeouts
        const sendEmails = async () => {
            // Admin notification
            try {
                const serviceOrSubject = inquiry.serviceInterested || inquiry.subject || 'General Inquiry';
                console.log('Sending admin email...');
                await sendEmail({
                    email: process.env.EMAIL_USER,
                    subject: `New ${inquiry.inquiryType?.toUpperCase() || 'PROJECT'} Inquiry`,
                    html: newInquiryEmail('Admin', inquiry.name, serviceOrSubject, inquiry.inquiryType || 'project')
                });
                console.log('Admin email sent');
            } catch (err) {
                console.error('Admin email failed:', err.message);
            }

            // User confirmation
            try {
                console.log('Sending user confirmation email...');
                await sendEmail({
                    email: inquiry.email,
                    subject: 'Inquiry Received - EcodeJR',
                    html: userInquiryConfirmationEmail(inquiry.name, inquiry.inquiryType || 'project')
                });
                console.log('User email sent');
            } catch (err) {
                console.error('User confirmation email failed:', err.message);
            }
        };

        // Trigger emails without awaiting
        sendEmails().catch(err => console.error('Background email task error:', err));

        res.status(201).json({ success: true, data: inquiry });
    } catch (error) {
        console.error('Inquiry controller error:', error);
        res.status(500).json({ message: error.message || 'Server Error' });
    }
};

// @desc    Get all inquiries
// @route   GET /api/inquiries
// @access  Private/Admin
exports.getInquiries = async (req, res) => {
    try {
        const inquiries = await Inquiry.find().sort({ createdAt: -1 });
        res.json({ success: true, count: inquiries.length, data: inquiries });
    } catch (error) {
        res.status(500).json({ message: error.message || 'Server Error' });
    }
};

// @desc    Get single inquiry
// @route   GET /api/inquiries/:id
// @access  Private/Admin
exports.getInquiry = async (req, res) => {
    try {
        const inquiry = await Inquiry.findById(req.params.id);

        if (!inquiry) {
            return res.status(404).json({ message: 'Inquiry not found' });
        }

        res.json({ success: true, data: inquiry });
    } catch (error) {
        res.status(500).json({ message: error.message || 'Server Error' });
    }
};

// @desc    Update inquiry status
// @route   PUT /api/inquiries/:id
// @access  Private/Admin
exports.updateInquiry = async (req, res) => {
    try {
        const inquiry = await Inquiry.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!inquiry) {
            return res.status(404).json({ message: 'Inquiry not found' });
        }

        res.json({ success: true, data: inquiry });
    } catch (error) {
        res.status(500).json({ message: error.message || 'Server Error' });
    }
};

// @desc    Delete inquiry
// @route   DELETE /api/inquiries/:id
// @access  Private/Admin
exports.deleteInquiry = async (req, res) => {
    try {
        const inquiry = await Inquiry.findById(req.params.id);

        if (!inquiry) {
            return res.status(404).json({ message: 'Inquiry not found' });
        }

        await inquiry.deleteOne();
        res.json({ success: true, data: {} });
    } catch (error) {
        res.status(500).json({ message: error.message || 'Server Error' });
    }
};
