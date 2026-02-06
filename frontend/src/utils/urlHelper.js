/**
 * Resolves a file/image URL to its full absolute path.
 * Handles absolute URLs (Cloudinary) and relative paths (Legacy local storage).
 * 
 * @param {string} path - The image or file path from the database
 * @returns {string} - The corrected absolute URL
 */
export const getSafeUrl = (path) => {
    if (!path) return '';

    // If it's already an absolute URL (Cloudinary, external), return it
    if (path.startsWith('http')) return path;

    // For legacy relative paths, prefix with the backend API host
    const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
    const hostUrl = apiBaseUrl.replace('/api', '');

    // Ensure path starts with /
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;

    return `${hostUrl}${normalizedPath}`;
};

/**
 * Resolves a file URL specifically for downloading.
 * For Cloudinary image-classified PDFs, it adds the fl_attachment flag.
 * 
 * @param {string} path - The file path or URL
 * @param {string} fileName - Optional filename for the download attribute
 * @returns {string} - The corrected download URL
 */
export const getSafeDownloadUrl = (path, fileName = '') => {
    if (!path) return '#';

    let url = getSafeUrl(path);

    // If it's a Cloudinary URL and looks like a download-worthy file,
    // add fl_attachment to force the browser to actually download 
    // rather than just opening the file in a new tab.
    if (url.includes('cloudinary.com') && url.includes('/upload/')) {
        // Apply flag to images and documents to force download behavior
        const isDownloadable = /\.(pdf|docx|doc|zip|rar|png|jpg|jpeg|webp)$/i.test(url) || /\.(pdf|docx|doc|zip|rar|png|jpg|jpeg|webp)$/i.test(fileName);

        if (isDownloadable && !url.includes('fl_attachment')) {
            // Sanitize filename for the flag: Cloudinary expects just the base name, no dots/spaces
            let downloadFlag = 'fl_attachment';
            if (fileName) {
                const cleanBaseName = fileName.split('.')[0].replace(/[^a-zA-Z0-9]/g, '_');
                downloadFlag = `fl_attachment:${cleanBaseName}`;
            }
            url = url.replace('/upload/', `/upload/${downloadFlag}/`);
        }
    }

    return url;
};

/**
 * Ensures a URL is absolute by prefixing it with https:// if it lacks a protocol.
 * This prevents links from being treated as relative to the current site.
 * 
 * @param {string} url - The URL to check
 * @returns {string} - The absolute URL
 */
export const ensureAbsoluteUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('mailto:') || url.startsWith('tel:')) {
        return url;
    }
    return `https://${url}`;
};
