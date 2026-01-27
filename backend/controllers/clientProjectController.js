const ClientProject = require('../models/ClientProject');
const sendEmail = require('../utils/sendEmail');
const { milestoneUpdateEmail } = require('../utils/emailTemplates');

// @desc    Get all client projects (Admin sees all, Client sees own)
// @route   GET /api/projects
// @access  Private
exports.getClientProjects = async (req, res) => {
    try {
        let query;

        if (req.user.role === 'admin') {
            query = ClientProject.find();
        } else {
            query = ClientProject.find({ clientId: req.user.id });
        }

        const projects = await query.populate('clientId', 'name email company').sort({ createdAt: -1 });

        res.json({ success: true, count: projects.length, data: projects });
    } catch (error) {
        res.status(500).json({ message: error.message || 'Server Error' });
    }
};

// @desc    Get single client project
// @route   GET /api/projects/:id
// @access  Private
exports.getClientProject = async (req, res) => {
    try {
        const project = await ClientProject.findById(req.params.id).populate('clientId', 'name email company');

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        // Check access
        if (req.user.role !== 'admin' && project.clientId._id.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized to access this project' });
        }

        res.json({ success: true, data: project });
    } catch (error) {
        res.status(500).json({ message: error.message || 'Server Error' });
    }
};

// @desc    Create new client project
// @route   POST /api/projects
// @access  Private/Admin
exports.createClientProject = async (req, res) => {
    try {
        const project = await ClientProject.create(req.body);
        res.status(201).json({ success: true, data: project });
    } catch (error) {
        res.status(500).json({ message: error.message || 'Server Error' });
    }
};

// @desc    Update client project
// @route   PUT /api/projects/:id
// @access  Private/Admin
exports.updateClientProject = async (req, res) => {
    try {
        const project = await ClientProject.findByIdAndUpdate(req.params.id, req.body, {
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

// @desc    Update milestone status
// @route   PUT /api/projects/:id/milestones/:milestoneId
// @access  Private/Admin
exports.updateMilestone = async (req, res) => {
    try {
        const project = await ClientProject.findById(req.params.id).populate('clientId');

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        const milestoneIndex = project.milestones.findIndex(
            (m) => m._id.toString() === req.params.milestoneId
        );

        if (milestoneIndex === -1) {
            return res.status(404).json({ message: 'Milestone not found' });
        }

        const { status } = req.body;
        project.milestones[milestoneIndex].status = status;

        // Update completed date if completed
        if (status === 'completed') {
            project.milestones[milestoneIndex].completedDate = Date.now();
        }

        await project.save();

        // Send email notification
        try {
            await sendEmail({
                email: project.clientId.email,
                subject: `Project Update: ${project.projectName}`,
                html: milestoneUpdateEmail(
                    project.clientId.name,
                    project.projectName,
                    project.milestones[milestoneIndex].name,
                    status
                )
            });
        } catch (err) {
            console.error('Email sending failed:', err);
        }

        res.json({ success: true, data: project });
    } catch (error) {
        res.status(500).json({ message: error.message || 'Server Error' });
    }
};

// @desc    Delete client project
// @route   DELETE /api/projects/:id
// @access  Private/Admin
exports.deleteClientProject = async (req, res) => {
    try {
        const project = await ClientProject.findById(req.params.id);

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        await project.deleteOne();
        res.json({ success: true, data: {} });
    } catch (error) {
        res.status(500).json({ message: error.message || 'Server Error' });
    }
};
