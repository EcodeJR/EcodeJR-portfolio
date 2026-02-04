const ClientProject = require('../models/ClientProject');
const User = require('../models/User');
const Inquiry = require('../models/Inquiry');
const Media = require('../models/Media');
const File = require('../models/File');
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

        // Add file counts from both systems for each project
        const projectsWithCounts = await Promise.all(projects.map(async (p) => {
            const standaloneCount = await File.countDocuments({ projectId: p._id });
            const pObj = p.toObject();
            const totalFilesCount = (p.files?.length || 0) + standaloneCount;

            // We'll keep the actual files array as is for the list view to save bandwidth
            // but we can add a totalFiles field for the badges
            return {
                ...pObj,
                totalFiles: totalFilesCount
            };
        }));

        res.json({ success: true, count: projectsWithCounts.length, data: projectsWithCounts });
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

        // Fetch standalone files (System 2)
        const standaloneFiles = await File.find({ projectId: req.params.id });

        // Merge files into a unified format for the frontend
        const unifiedFiles = [
            ...(project.files || []).map(f => ({
                _id: f._id,
                name: f.name,
                size: f.size,
                uploadedAt: f.uploadedAt,
                uploadedBy: f.uploadedBy,
                mediaId: f.mediaId,
                system: 1
            })),
            ...standaloneFiles.map(f => ({
                _id: f._id,
                name: f.fileName,
                size: f.fileSize,
                uploadedAt: f.createdAt,
                uploadedBy: f.uploadedBy,
                fileUrl: f.fileUrl,
                system: 2
            }))
        ].sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt));

        // Create a plain object to avoid Mongoose doc issues when adding virtual fields
        const projectResponse = project.toObject();
        projectResponse.files = unifiedFiles;

        res.json({ success: true, data: projectResponse });
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
        } else {
            project.milestones[milestoneIndex].completedDate = null;
        }

        // Auto-calculate progress
        const total = project.milestones.length;
        if (total > 0) {
            const completed = project.milestones.filter(m => m.status === 'completed').length;
            project.progressPercentage = Math.round((completed / total) * 100);

            // Update current milestone text
            const activeMilestone = [...project.milestones].reverse().find(m => m.status === 'in_progress' || m.status === 'completed');
            if (activeMilestone) {
                project.currentMilestone = activeMilestone.name;
            }
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

// @desc    Create project from inquiry
// @route   POST /api/projects/from-inquiry/:inquiryId
// @access  Private/Admin
exports.createProjectFromInquiry = async (req, res) => {
    try {
        const inquiry = await Inquiry.findById(req.params.inquiryId);
        if (!inquiry) return res.status(404).json({ message: 'Inquiry not found' });

        // Check if user exists as client
        let user = await User.findOne({ email: inquiry.email.toLowerCase() });

        if (!user) {
            // Create a "Shadow Client"
            const tempPassword = Math.random().toString(36).slice(-12);
            user = await User.create({
                name: inquiry.name,
                email: inquiry.email.toLowerCase(),
                password: tempPassword,
                role: 'client',
                phone: inquiry.phone,
                company: inquiry.company
            });
            // Note: In a real app, send a password reset or invite email here
        }

        // Create the project
        const project = await ClientProject.create({
            clientId: user._id,
            projectName: inquiry.subject || `${inquiry.name}'s Project`,
            description: inquiry.description || 'Project initiated from inquiry',
            serviceType: inquiry.serviceInterested,
            budget: inquiry.budgetRange || inquiry.budget,
            status: 'in_progress',
            milestones: [
                { name: 'Onboarding', status: 'completed', completedDate: Date.now() },
                { name: 'Discovery', status: 'in_progress' },
                { name: 'Design', status: 'not_started' },
                { name: 'Development', status: 'not_started' },
                { name: 'Testing', status: 'not_started' },
                { name: 'Deployment', status: 'not_started' }
            ],
            progressPercentage: 16
        });

        // Update inquiry status
        inquiry.status = 'converted';
        await inquiry.save();

        res.status(201).json({ success: true, data: project });
    } catch (error) {
        res.status(500).json({ message: error.message || 'Server Error' });
    }
};


// @desc    Upload project asset
// @route   POST /api/projects/:id/files
// @access  Private
exports.uploadProjectFile = async (req, res) => {
    try {
        const project = await ClientProject.findById(req.params.id);
        if (!project) return res.status(404).json({ message: 'Project not found' });

        // Check access
        if (req.user.role !== 'admin' && project.clientId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized to upload to this project' });
        }

        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        // Upload to Cloudinary
        // Use "auto" to let Cloudinary determine the best bucket (images, raw, etc.)
        const result = await uploadFromBuffer(req.file.buffer, 'client_assets', 'auto', req.file.originalname);

        // Add to project files
        project.files.push({
            name: req.file.originalname,
            fileUrl: result.secure_url,
            size: req.file.size,
            uploadedBy: req.user.id
        });

        await project.save();

        res.status(201).json({ success: true, data: project.files[project.files.length - 1] });
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
