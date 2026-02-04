const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Upload a buffer to Cloudinary
 * @param {Buffer} buffer - File buffer from multer
 * @param {String} folder - Cloudinary folder name
 * @param {String} resourceType - "image", "raw", "video", or "auto"
 * @param {String} originalName - Original filename to preserve extension
 * @returns {Promise} - Cloudinary upload result
 */
const uploadFromBuffer = (buffer, folder = 'portfolio', resourceType = 'auto', originalName = null) => {
    return new Promise((resolve, reject) => {
        const options = {
            folder: folder,
            resource_type: resourceType,
            type: 'upload', // Ensure the asset is public
            access_mode: 'public', // Explicitly set access mode
        };

        // For raw files, we MUST provide a public_id with the extension to preserve it
        if (resourceType === 'raw' && originalName) {
            const timestamp = Date.now();
            // Sanitize filename: remove spaces and special chars, but keep extension
            const cleanName = originalName.replace(/[^a-zA-Z0-9.]/g, '_');
            const nameParts = cleanName.split('.');
            const ext = nameParts.pop();
            const baseName = nameParts.join('.');

            options.public_id = `${baseName}_${timestamp}.${ext}`;
            options.use_filename = true;
        }

        const uploadStream = cloudinary.uploader.upload_stream(
            options,
            (error, result) => {
                if (error) {
                    console.error("Cloudinary Upload Stream Error:", error);
                    return reject(error);
                }
                resolve(result);
            }
        );

        uploadStream.end(buffer);
    });
};

module.exports = {
    cloudinary,
    uploadFromBuffer,
};
