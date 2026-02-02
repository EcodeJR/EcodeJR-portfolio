const express = require('express');
const router = express.Router();
const {
    getPortfolioProjects,
    getFeaturedProjects,
    getPortfolioProject,
    createPortfolioProject,
    updatePortfolioProject,
    deletePortfolioProject,
    getAdminPortfolioProjects
} = require('../controllers/portfolioProjectController');
const { protect, authorize } = require('../middleware/auth');

router.route('/')
    .get(getPortfolioProjects)
    .post(protect, authorize('admin'), createPortfolioProject);

router.get('/featured', getFeaturedProjects);
router.get('/admin/all', protect, authorize('admin'), getAdminPortfolioProjects);

router.route('/:id')
    .get(getPortfolioProject)
    .put(protect, authorize('admin'), updatePortfolioProject)
    .delete(protect, authorize('admin'), deletePortfolioProject);

module.exports = router;
