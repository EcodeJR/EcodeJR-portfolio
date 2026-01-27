const mongoose = require('mongoose');

const portfolioProjectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    briefDescription: {
        type: String,
        required: true,
        maxlength: 200,
    },
    fullDescription: {
        type: String,
        required: true,
    },
    problemStatement: String,
    solution: String,
    technologies: [{
        type: String,
        trim: true,
    }],
    projectType: {
        type: String,
        enum: ['E-commerce', 'SaaS', 'Landing Page', 'Portfolio', 'Blog', 'Dashboard', 'Mobile App', 'API', 'Other'],
        default: 'Other',
    },
    industry: String,
    images: [String],
    heroImage: String,
    liveDemoUrl: String,
    githubUrl: String,
    dateCompleted: Date,
    clientName: String,
    isFeatured: {
        type: Boolean,
        default: false,
    },
    isPublished: {
        type: Boolean,
        default: true,
    },
    displayOrder: {
        type: Number,
        default: 0,
    },
    visibility: {
        type: String,
        enum: ['recruiters', 'clients', 'both'],
        default: 'both',
    },
    views: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('PortfolioProject', portfolioProjectSchema);
