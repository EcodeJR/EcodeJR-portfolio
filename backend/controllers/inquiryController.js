const Inquiry = require('../models/Inquiry');
const sendEmail = require('../utils/sendEmail');
const { newInquiryEmail } = require('../utils/emailTemplates');

// @desc    Create new inquiry
// @route   POST /api/inquiries
// @access  Public
exports.createInquiry = async (req, res) => {
    try {
        const inquiry = await Inquiry.create(req.body);

        // Send email to admin
        try {
            await sendEmail({
                email: process.env.EMAIL_USER, // Admin email
                subject: 'New Project Inquiry',
                html: newInquiryEmail('Admin', inquiry.name, inquiry.serviceInterested)
            });
        } catch (err) {
            console.error('Email sending failed:', err);
        }

        res.status(201).json({ success: true, data: inquiry });
    } catch (error) {
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
