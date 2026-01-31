const mongoose = require('mongoose');

const milestoneSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: String,
    status: {
        type: String,
        enum: ['not_started', 'in_progress', 'completed', 'on_hold'],
        default: 'not_started',
    },
    expectedDate: Date,
    completedDate: Date,
});

const paymentMilestoneSchema = new mongoose.Schema({
    description: String,
    amount: Number,
    isPaid: {
        type: Boolean,
        default: false,
    },
    dueDate: Date,
});

const clientProjectSchema = new mongoose.Schema({
    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    projectName: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
    },
    serviceType: {
        type: String,
        required: true,
    },
    budget: String,
    timeline: String,
    status: {
        type: String,
        enum: ['inquiry', 'in_progress', 'completed', 'on_hold'],
        default: 'inquiry',
    },
    currentMilestone: String,
    progressPercentage: {
        type: Number,
        default: 0,
        min: 0,
        max: 100,
    },
    milestones: [milestoneSchema],
    paymentStatus: {
        totalAmount: Number,
        depositAmount: Number,
        depositPaid: {
            type: Boolean,
            default: false,
        },
        finalAmount: Number,
        finalPaid: {
            type: Boolean,
            default: false,
        },
        milestonePayments: [paymentMilestoneSchema],
    },
    files: [
        {
            name: String,
            mediaId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Media'
            },
            size: Number,
            uploadedBy: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            uploadedAt: {
                type: Date,
                default: Date.now
            }
        }
    ],
    completedAt: Date,
}, {
    timestamps: true,
});

module.exports = mongoose.model('ClientProject', clientProjectSchema);
