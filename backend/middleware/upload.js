const multer = require('multer');
const path = require('path');

// Use memory storage instead of disk storage
const storage = multer.memoryStorage();

// File filter (added webp and svg)
const fileFilter = (req, file, cb) => {
    const allowedExtensions = /jpeg|jpg|png|gif|webp|svg|pdf|doc|docx|zip/;
    const ext = path.extname(file.originalname).toLowerCase();
    const mimetype = file.mimetype;

    const isExtAllowed = allowedExtensions.test(ext);
    const isMimeAllowed = allowedExtensions.test(mimetype);

    if (isExtAllowed || isMimeAllowed) {
        return cb(null, true);
    } else {
        console.error(`File Rejected: Name=${file.originalname}, Ext=${ext}, Mime=${mimetype}`);
        cb(new Error('Invalid file type. Only JPEG, PNG, GIF, WEBP, SVG, PDF, DOC, and ZIP files are allowed.'));
    }
};

const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max
    fileFilter: fileFilter,
});

module.exports = upload;
