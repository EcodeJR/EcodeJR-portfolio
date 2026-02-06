const Testimonial = require('../models/Testimonial');

// @desc    Get all testimonials (Public only published)
// @route   GET /api/testimonials
// @access  Public
exports.getTestimonials = async (req, res) => {
    try {
        const testimonials = await Testimonial.find({ isPublished: true }).sort('-createdAt');
        res.json({ success: true, count: testimonials.length, data: testimonials });
    } catch (error) {
        res.status(500).json({ message: error.message || 'Server Error' });
    }
};

// @desc    Get all testimonials (Admin view)
// @route   GET /api/testimonials/admin
// @access  Private/Admin
exports.getAdminTestimonials = async (req, res) => {
    try {
        const testimonials = await Testimonial.find().sort('-createdAt');
        res.json({ success: true, count: testimonials.length, data: testimonials });
    } catch (error) {
        res.status(500).json({ message: error.message || 'Server Error' });
    }
};

// @desc    Create testimonial
// @route   POST /api/testimonials
// @access  Private
exports.createTestimonial = async (req, res) => {
    try {
        // If not admin, force certain fields
        if (req.user.role !== 'admin') {
            req.body.user = req.user.id;
            req.body.clientName = req.user.name;
            req.body.clientCompany = req.user.company;
            req.body.isPublished = false; // Must be approved
        }

        const testimonial = await Testimonial.create(req.body);
        res.status(201).json({ success: true, data: testimonial });
    } catch (error) {
        res.status(500).json({ message: error.message || 'Server Error' });
    }
};

// @desc    Update testimonial
// @route   PUT /api/testimonials/:id
// @access  Private/Admin
exports.updateTestimonial = async (req, res) => {
    try {
        let testimonial = await Testimonial.findById(req.params.id);

        if (!testimonial) {
            return res.status(404).json({ message: 'Testimonial not found' });
        }

        testimonial = await Testimonial.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        res.json({ success: true, data: testimonial });
    } catch (error) {
        res.status(500).json({ message: error.message || 'Server Error' });
    }
};

// @desc    Delete testimonial
// @route   DELETE /api/testimonials/:id
// @access  Private/Admin
exports.deleteTestimonial = async (req, res) => {
    try {
        const testimonial = await Testimonial.findById(req.params.id);

        if (!testimonial) {
            return res.status(404).json({ message: 'Testimonial not found' });
        }

        await testimonial.deleteOne();
        res.json({ success: true, data: {} });
    } catch (error) {
        res.status(500).json({ message: error.message || 'Server Error' });
    }
};
