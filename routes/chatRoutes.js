// backend/routes/chatRoutes.js
// const express = require('express');
// const { sendMessage, getMessages } = require('../controllers/chatController');
// const router = express.Router();

// router.post('/send', sendMessage);
// router.get('/messages', getMessages);

// module.exports = router;

const express = require('express');
const router = express.Router();

// Define a simple route for testing
router.get('/', (req, res) => {
    res.send('Chat API is working');
});

module.exports = router;

