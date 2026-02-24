const mongoose = require('mongoose');

const portfolioProjectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
    },
    briefDescription: {
        type: String,
        maxlength: 200,
    },
    fullDescription: {
        type: String,
    },
    problemStatement: String,
    solution: String,
    technologies: [{
        type: String,
        trim: true,
    }],
    category: {
        type: String,
        default: 'Other',
    },
    projectType: {
        type: String,
        enum: ['E-commerce', 'SaaS', 'Landing Page', 'Portfolio', 'Blog', 'Dashboard', 'Mobile App', 'API', 'Other'],
        default: 'Other',
    },
    client: String,
    industry: String,
    images: [String],
    imageUrl: String,
    heroImage: String,
    previewImage: String,
    fullViewImage: String,
    liveDemoUrl: String,
    githubUrl: String,
    projectUrl: String,
    repoUrl: String,
    dateCompleted: Date,
    clientName: String,
    results: {
        latency: { type: String, default: '24ms' },
        fps: { type: String, default: '60fps' },
        users: { type: String, default: '10k+' },
        audit: { type: String, default: 'A+' }
    },
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
