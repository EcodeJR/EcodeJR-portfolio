const express = require('express');
const router = express.Router();
const {
    createInquiry,
    getInquiries,
    getInquiry,
    updateInquiry,
    deleteInquiry,
} = require('../controllers/inquiryController');
const { protect, authorize } = require('../middleware/auth');
const { inquiryLimiter } = require('../middleware/rateLimiter');

router.post('/', inquiryLimiter, createInquiry);

router.use(protect, authorize('admin'));

router.route('/')
    .get(getInquiries);

router.route('/:id')
    .get(getInquiry)
    .put(updateInquiry)
    .delete(deleteInquiry);

module.exports = router;
