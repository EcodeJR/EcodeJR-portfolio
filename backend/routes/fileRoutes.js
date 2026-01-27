const express = require('express');
const router = express.Router();
const { uploadFile, getFiles, deleteFile } = require('../controllers/fileController');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.use(protect);

router.post('/:projectId', upload.single('file'), uploadFile);
router.get('/:projectId', getFiles);
router.delete('/:id', deleteFile);

module.exports = router;
