const express = require('express');
const router = express.Router();
const {
    getPortfolioProjects,
    getPortfolioProject,
    createPortfolioProject,
    updatePortfolioProject,
    deletePortfolioProject,
} = require('../controllers/portfolioProjectController');
const { protect, authorize } = require('../middleware/auth');

router.route('/')
    .get(getPortfolioProjects)
    .post(protect, authorize('admin'), createPortfolioProject);

router.route('/:id')
    .get(getPortfolioProject)
    .put(protect, authorize('admin'), updatePortfolioProject)
    .delete(protect, authorize('admin'), deletePortfolioProject);

module.exports = router;
