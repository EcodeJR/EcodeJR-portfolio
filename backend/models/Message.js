const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ClientProject',
        required: true,
    },
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    senderRole: {
        type: String,
        enum: ['admin', 'client'],
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    attachments: [String],
    isRead: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Message', messageSchema);
