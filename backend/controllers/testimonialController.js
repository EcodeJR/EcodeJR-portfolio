const Testimonial = require('../models/Testimonial');

// @desc    Get all testimonials (Public only published)
// @route   GET /api/testimonials
// @access  Public
exports.getTestimonials = async (req, res) => {
    try {
        const testimonials = await Testimonial.find({ isPublished: true });
        res.json({ success: true, count: testimonials.length, data: testimonials });
    } catch (error) {
        res.status(500).json({ message: error.message || 'Server Error' });
    }
};

// @desc    Create testimonial
// @route   POST /api/testimonials
// @access  Private/Admin
exports.createTestimonial = async (req, res) => {
    try {
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
        const testimonial = await Testimonial.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!testimonial) {
            return res.status(404).json({ message: 'Testimonial not found' });
        }

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
