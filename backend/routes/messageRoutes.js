const express = require('express');
const router = express.Router();
const {
    getMessages,
    sendMessage,
    markAsRead,
} = require('../controllers/messageController');
const { protect } = require('../middleware/auth');

router.use(protect);

router.route('/:projectId')
    .get(getMessages)
    .post(sendMessage);

router.put('/:projectId/read', markAsRead);

module.exports = router;
