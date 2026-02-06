const express = require('express');
const router = express.Router();
const {
    getTestimonials,
    getAdminTestimonials,
    createTestimonial,
    updateTestimonial,
    deleteTestimonial,
} = require('../controllers/testimonialController');
const { protect, authorize } = require('../middleware/auth');

router.get('/', getTestimonials);

// Client can submit, admin can do everything
router.post('/', protect, createTestimonial);

// Admin only routes
router.use(protect, authorize('admin'));

router.get('/admin', getAdminTestimonials);
router.route('/:id')
    .put(updateTestimonial)
    .delete(deleteTestimonial);

module.exports = router;
