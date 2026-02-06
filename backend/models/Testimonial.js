const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
    clientName: {
        type: String,
        required: true,
        trim: true,
    },
    clientRole: String,
    clientCompany: String,
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
    },
    clientPhoto: String,
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    review: {
        type: String,
        required: true,
    },
    projectType: String,
    isPublished: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Testimonial', testimonialSchema);
