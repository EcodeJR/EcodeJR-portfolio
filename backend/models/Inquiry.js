const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
    },
    phone: String,
    company: String,
    inquiryType: {
        type: String,
        enum: ['project', 'consultation', 'urgent'],
        default: 'project',
    },
    serviceInterested: {
        type: String,
        // Only required for project inquiries
        required: function () { return this.inquiryType === 'project'; },
    },
    budgetRange: String,
    description: {
        type: String,
        required: true,
    },
    subject: String, // For consultation topic or urgent summary
    preferredDateTime: String, // For consultations
    urgencyLevel: {
        type: String,
        enum: ['low', 'medium', 'high', 'critical'],
    },
    preferredTimeline: String,
    source: String,
    status: {
        type: String,
        enum: ['new', 'contacted', 'in_discussion', 'converted', 'declined'],
        default: 'new',
    },
    internalNotes: String,
}, {
    timestamps: true,
});

module.exports = mongoose.model('Inquiry', inquirySchema);
