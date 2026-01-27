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
    serviceInterested: {
        type: String,
        required: true,
    },
    budgetRange: String,
    description: {
        type: String,
        required: true,
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
