const PortfolioProject = require('../models/PortfolioProject');

// @desc    Get all portfolio projects
// @route   GET /api/portfolio
// @access  Public
exports.getPortfolioProjects = async (req, res) => {
    try {
        const projects = await PortfolioProject.find({ isPublished: true }).sort({ displayOrder: 1 });
        res.json({ success: true, count: projects.length, data: projects });
    } catch (error) {
        res.status(500).json({ message: error.message || 'Server Error' });
    }
};

// @desc    Get all portfolio projects (Admin)
// @route   GET /api/portfolio/admin/all
// @access  Private/Admin
exports.getAdminPortfolioProjects = async (req, res) => {
    try {
        const projects = await PortfolioProject.find().sort({ createdAt: -1 });
        res.json({ success: true, count: projects.length, data: projects });
    } catch (error) {
        res.status(500).json({ message: error.message || 'Server Error' });
    }
};

// @desc    Get single portfolio project
// @route   GET /api/portfolio/:id
// @access  Public
exports.getPortfolioProject = async (req, res) => {
    try {
        const project = await PortfolioProject.findOne({
            _id: req.params.id,
            isPublished: true
        });

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        // Increment views
        project.views += 1;
        await project.save({ validateBeforeSave: false });

        res.json({ success: true, data: project });
    } catch (error) {
        res.status(500).json({ message: error.message || 'Server Error' });
    }
};

// @desc    Create new portfolio project
// @route   POST /api/portfolio
// @access  Private/Admin
exports.createPortfolioProject = async (req, res) => {
    try {
        const project = await PortfolioProject.create(req.body);
        res.status(201).json({ success: true, data: project });
    } catch (error) {
        res.status(500).json({ message: error.message || 'Server Error' });
    }
};

// @desc    Update portfolio project
// @route   PUT /api/portfolio/:id
// @access  Private/Admin
exports.updatePortfolioProject = async (req, res) => {
    try {
        const project = await PortfolioProject.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        res.json({ success: true, data: project });
    } catch (error) {
        res.status(500).json({ message: error.message || 'Server Error' });
    }
};

// @desc    Delete portfolio project
// @route   DELETE /api/portfolio/:id
// @access  Private/Admin
exports.deletePortfolioProject = async (req, res) => {
    try {
        const project = await PortfolioProject.findById(req.params.id);

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        await project.deleteOne();

        res.json({ success: true, data: {} });
    } catch (error) {
        res.status(500).json({ message: error.message || 'Server Error' });
    }
};
