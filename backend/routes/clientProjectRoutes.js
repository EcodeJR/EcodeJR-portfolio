const express = require('express');
const router = express.Router();
const {
    getClientProjects,
    getClientProject,
    createClientProject,
    updateClientProject,
    updateMilestone,
    deleteClientProject,
} = require('../controllers/clientProjectController');
const { protect, authorize } = require('../middleware/auth');

router.use(protect);

router.route('/')
    .get(getClientProjects)
    .post(authorize('admin'), createClientProject);

router.route('/:id')
    .get(getClientProject)
    .put(authorize('admin'), updateClientProject)
    .delete(authorize('admin'), deleteClientProject);

router.put('/:id/milestones/:milestoneId', authorize('admin'), updateMilestone);

module.exports = router;
