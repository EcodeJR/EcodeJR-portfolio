const Notification = require('../models/Notification');

// @desc    Get my notifications
// @route   GET /api/notifications
// @access  Private
exports.getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({ userId: req.user.id }).sort({ createdAt: -1 });
        res.json({ success: true, count: notifications.length, data: notifications });
    } catch (error) {
        res.status(500).json({ message: error.message || 'Server Error' });
    }
};

// @desc    Mark notification as read
// @route   PUT /api/notifications/:id/read
// @access  Private
exports.markAsRead = async (req, res) => {
    try {
        const notification = await Notification.findById(req.params.id);

        if (!notification) {
            return res.status(404).json({ message: 'Notification not found' });
        }

        if (notification.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        notification.isRead = true;
        await notification.save();

        res.json({ success: true, data: notification });
    } catch (error) {
        res.status(500).json({ message: error.message || 'Server Error' });
    }
};

// @desc    Mark all notifications as read
// @route   PUT /api/notifications/read-all
// @access  Private
exports.markAllAsRead = async (req, res) => {
    try {
        await Notification.updateMany({ userId: req.user.id, isRead: false }, { isRead: true });
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ message: error.message || 'Server Error' });
    }
};

// @desc    Delete notification
// @route   DELETE /api/notifications/:id
// @access  Private
exports.deleteNotification = async (req, res) => {
    try {
        const notification = await Notification.findById(req.params.id);

        if (!notification) {
            return res.status(404).json({ message: 'Notification not found' });
        }

        if (notification.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        await notification.deleteOne();
        res.json({ success: true, data: {} });
    } catch (error) {
        res.status(500).json({ message: error.message || 'Server Error' });
    }
};
