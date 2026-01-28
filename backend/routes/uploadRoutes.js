const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const Media = require('../models/Media');

// @desc    Upload image to MongoDB
// @route   POST /api/upload
// @access  Private/Admin
router.post('/', upload.single('image'), async (req, res) => {
    try {
        console.log("Upload request received");
        if (!req.file) {
            console.log("No file in request");
            return res.status(400).json({ message: 'No file uploaded' });
        }

        console.log("File received:", req.file.originalname, "Size:", req.file.size);

        const media = await Media.create({
            data: req.file.buffer,
            contentType: req.file.mimetype,
            fileName: req.file.originalname
        });

        console.log("Media created in DB:", media._id);

        res.json({
            success: true,
            filePath: `/api/upload/raw/${media._id}`,
        });
    } catch (error) {
        console.error("Upload Route Error:", error);
        res.status(500).json({ message: error.message });
    }
});

// @desc    Serve raw image from MongoDB
// @route   GET /api/upload/raw/:id
// @access  Public
router.get('/raw/:id', async (req, res) => {
    try {
        const media = await Media.findById(req.params.id);

        if (!media) {
            return res.status(404).json({ message: 'Media not found' });
        }

        res.set('Content-Type', media.contentType);
        res.send(media.data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
