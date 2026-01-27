const express = require('express');
const router = express.Router();
const {
    getTestimonials,
    createTestimonial,
    updateTestimonial,
    deleteTestimonial,
} = require('../controllers/testimonialController');
const { protect, authorize } = require('../middleware/auth');

router.get('/', getTestimonials);

router.use(protect, authorize('admin'));

router.post('/', createTestimonial);
router.route('/:id')
    .put(updateTestimonial)
    .delete(deleteTestimonial);

module.exports = router;
