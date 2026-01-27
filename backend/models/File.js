const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ClientProject',
        required: true,
    },
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    uploaderRole: {
        type: String,
        enum: ['admin', 'client'],
        required: true,
    },
    fileName: {
        type: String,
        required: true,
    },
    fileUrl: {
        type: String,
        required: true,
    },
    fileType: String,
    fileSize: Number,
    category: {
        type: String,
        enum: ['requirement', 'deliverable', 'asset', 'other'],
        default: 'other',
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('File', fileSchema);
