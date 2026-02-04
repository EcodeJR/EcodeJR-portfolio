const File = require('../models/File');
const ClientProject = require('../models/ClientProject');
const { uploadFromBuffer } = require('../utils/cloudinary');

// @desc    Upload file(s)
// @route   POST /api/files/:projectId
// @access  Private
exports.uploadFile = async (req, res) => {
    try {
        const project = await ClientProject.findById(req.params.projectId);

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        // Check access
        if (req.user.role !== 'admin' && project.clientId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        if (!req.file) {
            return res.status(400).json({ message: 'Please upload a file' });
        }

        // Upload to Cloudinary
        // Use "auto" to let Cloudinary determine the best bucket (images, raw, etc.)
        const result = await uploadFromBuffer(req.file.buffer, 'client_assets', 'auto', req.file.originalname);

        const file = await File.create({
            projectId: req.params.projectId,
            uploadedBy: req.user.id,
            uploaderRole: req.user.role,
            fileName: req.file.originalname,
            fileUrl: result.secure_url,
            fileType: req.file.mimetype,
            fileSize: req.file.size,
            category: req.body.category || 'other',
        });

        res.status(201).json({ success: true, data: file });
    } catch (error) {
        res.status(500).json({ message: error.message || 'Server Error' });
    }
};

// @desc    Get files for a project
// @route   GET /api/files/:projectId
// @access  Private
exports.getFiles = async (req, res) => {
    try {
        const project = await ClientProject.findById(req.params.projectId);

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        // Check access
        if (req.user.role !== 'admin' && project.clientId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        const files = await File.find({ projectId: req.params.projectId }).sort({ createdAt: -1 });

        res.json({ success: true, count: files.length, data: files });
    } catch (error) {
        res.status(500).json({ message: error.message || 'Server Error' });
    }
};

// @desc    Delete file
// @route   DELETE /api/files/:id
// @access  Private
exports.deleteFile = async (req, res) => {
    try {
        const file = await File.findById(req.params.id);

        if (!file) {
            return res.status(404).json({ message: 'File not found' });
        }

        // Only uploader or admin can delete
        if (req.user.role !== 'admin' && file.uploadedBy.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        await file.deleteOne();

        // In a real app, delete actual file from filesystem here

        res.json({ success: true, data: {} });
    } catch (error) {
        res.status(500).json({ message: error.message || 'Server Error' });
    }
};
