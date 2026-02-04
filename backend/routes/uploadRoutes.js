const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { uploadFromBuffer } = require('../utils/cloudinary');

// @desc    Upload image to Cloudinary
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

        // Upload to Cloudinary
        const result = await uploadFromBuffer(req.file.buffer, 'portfolio_projects');

        console.log("Uploaded to Cloudinary:", result.secure_url);

        // We can still create a Media record if we want to track uploads in DB, 
        // but now we'll store the URL instead of the Buffer.
        // However, the current Media model expects 'data' (Buffer).
        // Let's create a new type of record or just return the URL.
        // For now, I'll return the URL directly to the frontend.

        res.json({
            success: true,
            filePath: result.secure_url,
            public_id: result.public_id
        });
    } catch (error) {
        console.error("Upload Route Error:", error);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
