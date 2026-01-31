const express = require('express');
const router = express.Router();
const {
    getClientProjects,
    getClientProject,
    createClientProject,
    updateClientProject,
    updateMilestone,
    deleteClientProject,
    createProjectFromInquiry,
    uploadProjectFile
} = require('../controllers/clientProjectController');
const { protect, authorize } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.use(protect);

router.post('/:id/files', upload.single('file'), uploadProjectFile);

router.route('/')
    .get(getClientProjects)
    .post(authorize('admin'), createClientProject);

router.route('/:id')
    .get(getClientProject)
    .put(authorize('admin'), updateClientProject)
    .delete(authorize('admin'), deleteClientProject);

router.post('/from-inquiry/:inquiryId', authorize('admin'), createProjectFromInquiry);

router.put('/:id/milestones/:milestoneId', authorize('admin'), updateMilestone);

module.exports = router;
